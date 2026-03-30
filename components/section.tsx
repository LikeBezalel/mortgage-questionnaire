import { ReactNode } from "react";

export function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        {description ? (
          <p className="mt-2 text-sm text-neutral-600">{description}</p>
        ) : null}
      </div>
      <div className="space-y-5">{children}</div>
    </section>
  );
}