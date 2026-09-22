import Link from "next/link";

import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="flex min-h-dvh items-center py-16">
      <section
        className="flex max-w-xl flex-col items-start gap-6"
        aria-labelledby="not-found-heading"
      >
        <p className="text-sm font-medium text-muted-foreground">Błąd 404</p>
        <h1
          id="not-found-heading"
          className="text-4xl font-semibold tracking-tight text-balance"
        >
          Nie znaleziono strony
        </h1>
        <p className="leading-7 text-muted-foreground">
          Adres może być nieprawidłowy lub strona została przeniesiona.
        </p>
        <Link className={buttonVariants()} href="/">
          Wróć na stronę główną
        </Link>
      </section>
    </Container>
  );
}
