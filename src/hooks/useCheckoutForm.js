import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "checkoutFormDraft";

function formatCardNumber(value) {
  const digits = String(value ?? "")
    .replace(/\D/g, "")
    .slice(0, 16);
  return digits.match(/.{1,4}/g)?.join(" ") ?? "";
}

const defaultFormState = {
  fullName: "",
  email: "",
  address: "",
  city: "",
  country: "",
  billingSameAsShipping: true,
  billingAddress: "",
  billingCity: "",
  billingCountry: "",
  cardName: "",
  cardNumber: "",
  expiry: "",
  cvv: "",
  deliveryMethod: "standard",
};

function readStoredForm() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return defaultFormState;

    const parsed = JSON.parse(saved);
    if (parsed.cardNumber) {
      parsed.cardNumber = formatCardNumber(parsed.cardNumber);
    }
    return { ...defaultFormState, ...parsed };
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return defaultFormState;
  }
}

export function useCheckoutForm() {
  const [form, setForm] = useState(readStoredForm);
  const [touched, setTouched] = useState({});

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    } catch (error) {
      console.error("Unable to persist checkout form:", error);
    }
  }, [form]);

  const handleChange = useCallback((event) => {
    const { name, value, type, checked } = event.target;

    if (name === "cardNumber") {
      setForm((current) => ({
        ...current,
        cardNumber: formatCardNumber(value),
      }));
      return;
    }

    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }, []);

  const handleBlur = useCallback((event) => {
    const { name } = event.target;
    setTouched((current) => ({ ...current, [name]: true }));
  }, []);

  const setDeliveryMethod = useCallback((method) => {
    setForm((current) => ({ ...current, deliveryMethod: method }));
  }, []);

  return {
    form,
    touched,
    handleChange,
    handleBlur,
    setDeliveryMethod,
    setTouched,
  };
}

export function validateCheckoutForm(
  form,
  { billingSameAsShipping = true } = {},
) {
  const requiredFields = [
    "fullName",
    "email",
    "address",
    "city",
    "country",
    "cardName",
    "cardNumber",
    "expiry",
    "cvv",
  ];

  if (!billingSameAsShipping) {
    requiredFields.push("billingAddress", "billingCity", "billingCountry");
  }

  const touchedState = Object.fromEntries(
    requiredFields.map((name) => [name, true]),
  );

  return requiredFields.reduce((errors, name) => {
    const error = getFieldError(name, form[name], touchedState);

    if (error) {
      errors[name] = error;
    }

    return errors;
  }, {});
}

export function getFieldError(name, value, touched, { required = true } = {}) {
  if (!touched[name] || !required) return "";

  const trimmed = String(value ?? "").trim();

  if (!trimmed) {
    return "This field is required.";
  }

  switch (name) {
    case "email":
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)
        ? ""
        : "Enter a valid email address.";
    case "cardNumber":
      return trimmed.replace(/\s/g, "").length >= 13
        ? ""
        : "Enter a valid card number.";
    case "expiry":
      return /^\d{2}\/\d{2}$/.test(trimmed) || /^\d{4}-\d{2}$/.test(trimmed)
        ? ""
        : "Use MM/YY format.";
    case "cvv":
      return /^\d{3,4}$/.test(trimmed) ? "" : "Enter a valid CVV.";
    default:
      return "";
  }
}
