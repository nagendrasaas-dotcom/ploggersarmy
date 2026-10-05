import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export type Field = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea" | "select";
  options?: string[];
  required?: boolean;
  half?: boolean;
};

export function EnquiryForm({ fields, submitLabel, successMessage }: { fields: Field[]; submitLabel: string; successMessage: string }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const schema = z.object(
    Object.fromEntries(
      fields.map((f) => {
        let s = z.string().trim().max(f.type === "textarea" ? 2000 : 200);
        if (f.type === "email") s = s.email("Enter a valid email");
        return [f.name, f.required ? s.min(1, `${f.label} is required`) : s.optional().or(z.literal(""))];
      }),
    ),
  );

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const r = schema.safeParse(data);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => (errs[String(i.path[0])] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setSent(true);
    e.currentTarget.reset();
    toast.success(successMessage);
  }

  const base =
    "w-full border-0 border-b-2 border-border bg-transparent px-0 py-3 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-0";

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
      {fields.map((f) => (
        <div key={f.name} className={f.half ? "" : "sm:col-span-2"}>
          <label htmlFor={f.name} className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
            {f.label}
            {f.required && " *"}
          </label>
          {f.type === "textarea" ? (
            <textarea id={f.name} name={f.name} rows={4} className={base} />
          ) : f.type === "select" ? (
            <select id={f.name} name={f.name} className={base} defaultValue="">
              <option value="" disabled>
                Choose one
              </option>
              {f.options?.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          ) : (
            <input id={f.name} name={f.name} type={f.type ?? "text"} className={base} />
          )}
          {errors[f.name] && <p className="mt-1 text-sm text-destructive">{errors[f.name]}</p>}
        </div>
      ))}
      <div className="sm:col-span-2">
        <Button type="submit" variant="ink" size="xl">
          {submitLabel}
        </Button>
        {sent && <p className="mt-4 text-sm text-primary">{successMessage}</p>}
      </div>
    </form>
  );
}
