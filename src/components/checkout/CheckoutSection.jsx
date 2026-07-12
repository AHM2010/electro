import { memo } from "react";

function CheckoutSection({
  id,
  title,
  description,
  icon: Icon,
  children,
  className = "",
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 ${className}`}
    >
      <div className="mb-5 flex items-start gap-3 border-b border-gray-100 pb-4">
        {Icon && (
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600"
            aria-hidden="true"
          >
            <Icon className="h-5 w-5" strokeWidth={1.75} />
          </span>
        )}

        <div>
          <h2
            id={`${id}-heading`}
            className="text-lg font-semibold tracking-tight text-gray-900 sm:text-xl"
          >
            {title}
          </h2>

          {description && (
            <p className="mt-1 text-sm leading-relaxed text-gray-500">
              {description}
            </p>
          )}
        </div>
      </div>

      {children}
    </section>
  );
}

export default memo(CheckoutSection);
