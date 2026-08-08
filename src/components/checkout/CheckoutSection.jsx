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
      data-aos="fade-up"
      className={`surface-card p-4 sm:p-6 ${className}`}
    >
      <div className="mb-4 flex items-start gap-3 border-b border-slate-100 pb-3 dark:border-slate-800 sm:mb-5 sm:pb-4">
        {Icon && (
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 sm:h-10 sm:w-10"
            aria-hidden="true"
          >
            <Icon className="h-5 w-5" strokeWidth={1.75} />
          </span>
        )}

        <div>
          <h2
            id={`${id}-heading`}
            className="text-base font-bold tracking-tight text-slate-900 dark:text-white sm:text-xl"
          >
            {title}
          </h2>

          {description && (
            <p className="mt-0.5 text-xs leading-relaxed text-gray-500 sm:mt-1 sm:text-sm">
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
