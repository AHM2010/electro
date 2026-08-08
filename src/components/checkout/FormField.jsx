import { memo, useId } from "react";

export const inputStyles =
  "mt-1.5 block w-full min-h-12 px-4 py-3 rounded-xl border border-slate-300 bg-white text-base text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 hover:border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:disabled:bg-slate-800";

function FormField({
  label,
  id: idProp,
  name,
  type = "text",
  value,
  onChange,
  onBlur,
  required = false,
  helperText,
  error,
  autoComplete,
  inputMode,
  placeholder,
  className = "",
  ...rest
}) {
  const generatedId = useId();
  const id = idProp || `${name}-${generatedId}`;
  const helperId = helperText ? `${id}-helper` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [errorId, helperId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
        {label}
        {required && (
          <span className="ml-0.5 text-red-600" aria-hidden="true">
            *
          </span>
        )}
      </label>

      {helperText && (
        <p id={helperId} className="mt-1 text-xs text-gray-500">
          {helperText}
        </p>
      )}

      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder={placeholder}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={describedBy}
        className={`${inputStyles} ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`}
        {...rest}
      />

      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export default memo(FormField);
