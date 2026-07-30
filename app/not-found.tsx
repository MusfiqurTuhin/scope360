import { ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-brand">
        Error 404
      </p>
      <h1 className="font-display mt-6 text-(length:--text-h1) text-ink-100">
        This page is out of scope.
      </h1>
      <p className="mt-4 max-w-md text-ink-200/65">
        The page you requested does not exist or has been moved.
      </p>
      <div className="mt-9">
        <ButtonLink href="/">Back to home</ButtonLink>
      </div>
    </section>
  );
}
