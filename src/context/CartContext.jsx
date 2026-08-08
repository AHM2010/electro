import { useCallback, useEffect, useMemo, useState } from "react";
import CartContext from "./cartContextCore";
import { allProducts } from "../data/productsData";

const availableProductIds = new Set(
  allProducts.filter((product) => product.inStock !== false).map((product) => product.id),
);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cartItems");
      const parsedCart = savedCart ? JSON.parse(savedCart) : [];

      return Array.isArray(parsedCart)
        ? parsedCart.filter(
            (item) =>
              item?.id && item?.quantity > 0 && availableProductIds.has(item.id),
          )
        : [];
    } catch {
      localStorage.removeItem("cartItems");
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Unable to persist cart items:", error);
    }
  }, [cartItems]);

  const addToCart = useCallback((product, quantity = 1) => {
    if (!product?.id || product.inStock === false) return;

    const quantityToAdd = Math.max(1, Number(quantity) || 1);

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + quantityToAdd,
              }
            : item,
        );
      }

      return [
        ...prev,
        {
          ...product,
          quantity: quantityToAdd,
        },
      ];
    });
  }, []);

  const increaseQuantity = useCallback((id) => {
    setCartItems((prev) => {
      return prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      );
    });
  }, []);

  const decreaseQuantity = useCallback((id) => {
    setCartItems((prev) => {
      return prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity - 1),
            }
          : item,
      );
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) =>
          total + (Number(item.price) || 0) * (Number(item.quantity) || 0),
        0,
      ),
    [cartItems],
  );

  const totalItems = useMemo(
    () =>
      cartItems.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0),
    [cartItems],
  );

  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
      increaseQuantity,
      decreaseQuantity,
      removeFromCart,
      clearCart,
      subtotal,
      totalItems,
    }),
    [
      addToCart,
      cartItems,
      decreaseQuantity,
      increaseQuantity,
      removeFromCart,
      clearCart,
      subtotal,
      totalItems,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
