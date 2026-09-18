import { cn } from "@/lib/utils";

type FormFieldProps = {
  label: string;
  htmlFor?: string;
  help?: string;
  error?: string;
  success?: string;
  children: React.ReactNode;
  className?: string;
};

export function FormField({
  label,
  htmlFor,
  help,
  error,
  success,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-component-gap", className)}>
      <label htmlFor={htmlFor} className="type-small text-white/70">
        {label}
      </label>
      {children}
      {error ? <p className="type-small text-red-300" role="alert">{error}</p> : null}
      {!error && success ? <p className="type-small text-white/70">{success}</p> : null}
      {!error && !success && help ? <p className="type-small text-white/40">{help}</p> : null}
    </div>
  );
}
