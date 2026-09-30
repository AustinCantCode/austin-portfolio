/** Contact form rules, shared by the form (inline errors) and the server. */
export type Field = "name" | "email" | "message";
export type Values = Record<Field, string>;
export type Errors = Partial<Record<Field, string>>;

export const LIMITS = { name: 100, email: 200, message: 5000 } as const;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateField(field: Field, raw: string): string | undefined {
  const v = raw.trim();
  if (field === "name") {
    if (!v) return "Enter your name.";
    if (v.length > LIMITS.name)
      return `Keep your name under ${LIMITS.name} characters.`;
  }
  if (field === "email") {
    if (!v) return "Enter your email address so I can reply.";
    if (!EMAIL.test(v) || v.length > LIMITS.email)
      return "Enter an email address like name@example.com.";
  }
  if (field === "message") {
    if (v.length < 10) return "Write a little more about the role or project.";
    if (v.length > LIMITS.message)
      return `Keep your message under ${LIMITS.message} characters.`;
  }
  return undefined;
}

export function validate(values: Values): Errors {
  const errors: Errors = {};
  for (const f of ["name", "email", "message"] as Field[]) {
    const e = validateField(f, values[f]);
    if (e) errors[f] = e;
  }
  return errors;
}
