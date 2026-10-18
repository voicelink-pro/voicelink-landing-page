import Link from "next/link";
import { ArrowRightIcon, ArrowUpRightIcon } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionEyebrow } from "@/components/layout/section-eyebrow";
import { buttonVariants } from "@/components/ui/button";
import { contactHref } from "@/config/navigation";
import { cn } from "@/lib/utils";

import { voicebotArticle } from "../_content/blog";
import { ArticleHero } from "./article-hero";
import { ArticleSidebar } from "./article-sidebar";
import { ArticleToc } from "./article-toc";

function CitationLink({ number }: { number: number }) {
  return (
    <a
      href={`#zrodlo-${number}`}
      aria-label={`Źródło ${number}`}
      className="ml-1 inline-flex items-center rounded-md bg-secondary px-1.5 py-0.5 text-xs font-semibold text-primary tabular-nums transition-colors hover:bg-primary hover:text-white"
    >
      [{number}]
    </a>
  );
}

function SourceLinks({
  links,
}: {
  links: readonly { label: string; href: string }[];
}) {
  return (
    <>
      {links.map((link, index) => (
        <span key={link.href}>
          {index > 0 ? <span> i </span> : null}
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-primary underline underline-offset-4 hover:opacity-80"
          >
            <span>{link.label}</span>
            <ArrowUpRightIcon aria-hidden="true" className="size-3.5" />
          </a>
        </span>
      ))}
    </>
  );
}

const sectionScrollMargin =
  "scroll-mt-[calc(var(--site-header-height)+1.5rem)]";

const proseClassName =
  "text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8";

export function VoicebotArticleView() {
  const article = voicebotArticle;

  return (
    <>
      <ArticleHero
        title={article.title}
        author={article.author}
        publishedAt={article.publishedAt}
        publishedDateLabel={article.publishedDateLabel}
        readingTime={article.readingTime}
        coverImage={article.coverImage}
      />

      <Section
        aria-labelledby="article-hero-heading"
        className="border-t-0 bg-background pt-6 sm:pt-8"
      >
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
            <ArticleSidebar>
              <ArticleToc items={article.toc} />

              <div className="rounded-3xl bg-[#062059] p-6 text-white">
                <p className="text-xs font-semibold tracking-[0.14em] text-white/75 uppercase">
                  Kalkulator i analiza
                </p>
                <p className="subsection-title mt-2 text-xl text-white">
                  Zobacz, jak VoiceLink zadziała u Ciebie
                </p>
                <p className="mt-2.5 text-sm leading-6 text-white/85">
                  Umów rozmowę z zespołem VoiceLink albo policz potencjał
                  oszczędności w kalkulatorze.
                </p>
                <div className="mt-5 flex flex-col gap-2.5">
                  <Link
                    href={contactHref}
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "h-11 w-full bg-white text-sm text-[#062059] hover:bg-white/90",
                    )}
                  >
                    Umów analizę
                  </Link>
                  <Link
                    href="/kalkulator-oszczednosci"
                    className={cn(
                      buttonVariants({ size: "lg", variant: "outline" }),
                      "h-11 w-full border-white/25 bg-white/10 text-sm text-white hover:bg-white/18 hover:text-white",
                    )}
                  >
                    Kalkulator oszczędności
                    <ArrowRightIcon data-icon="inline-end" />
                  </Link>
                </div>
              </div>
            </ArticleSidebar>

            <article className="order-1 flex min-w-0 flex-col gap-10 lg:col-span-8 lg:col-start-5">
              <div className="flex flex-col gap-4">
                {article.lead.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-base leading-7 text-pretty text-foreground sm:text-lg sm:leading-8"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <section
                id="jak-dziala-asystent-glosowy-ai-w-przychodni"
                aria-labelledby="heading-jak-dziala"
                className={cn("flex flex-col gap-4", sectionScrollMargin)}
              >
                <h2 id="heading-jak-dziala" className="section-title">
                  Jak działa asystent głosowy AI w przychodni?
                </h2>
                <p className={proseClassName}>
                  Podczas rozmowy system rozpoznaje wypowiedź pacjenta,
                  interpretuje jego prośbę i przygotowuje odpowiedź wypowiadaną
                  głosem. Rozwiązania tego typu korzystają również z mechanizmów
                  sterujących tempem wymiany zdań, ciszą i przerywaniem
                  wypowiedzi.
                  <CitationLink number={1} />
                </p>
                <p className={proseClassName}>
                  Kiedy pacjent pyta o godziny otwarcia, asystent korzysta z
                  informacji przekazanych przez placówkę. Gdy chce umówić
                  wizytę, potrzebne jest dodatkowo sprawdzenie dostępnych
                  terminów i zapisanie rezerwacji w odpowiednim systemie. Takie
                  czynności wykonuje się przez skonfigurowane połączenia z
                  narzędziami zewnętrznymi.
                  <CitationLink number={2} />
                </p>
                <p className={proseClassName}>
                  To ważne przy wyborze rozwiązania. Płynna rozmowa jest jedną
                  częścią obsługi. Równie istotne jest to, czy ustalenia
                  trafiają do terminarza i czy pacjent otrzymuje właściwe
                  potwierdzenie.
                </p>

                <div className="flex flex-col gap-4">
                  <h3 className="subsection-title text-xl text-foreground sm:text-2xl">
                    Czym voicebot różni się od tradycyjnego menu telefonicznego?
                  </h3>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    W typowym menu IVR pacjent słyszy komunikat i wybiera
                    odpowiedni numer na klawiaturze telefonu. Asystent głosowy
                    umożliwia opisanie sprawy własnymi słowami, na przykład:
                    „Chcę umówić konsultację kardiologiczną” albo „Potrzebuję
                    przełożyć wizytę”.
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Voicebot może dopytać o brakujące informacje i przeprowadzić
                    pacjenta przez kolejne kroki. W VoiceLink rozmówca może też
                    przerwać wypowiedź asystenta, aby doprecyzować prośbę lub
                    zmienić wybór.
                  </p>
                </div>
              </section>

              <section
                id="jak-wyglada-rezerwacja-wizyty-przez-voicelink"
                aria-labelledby="heading-rezerwacja"
                className={cn(
                  "flex flex-col gap-6 border-t border-border pt-10",
                  sectionScrollMargin,
                )}
              >
                <h2 id="heading-rezerwacja" className="section-title">
                  Jak wygląda rezerwacja wizyty przez VoiceLink?
                </h2>
                <p className={proseClassName}>
                  Przebieg rozmowy przygotowujemy zgodnie z zasadami danej
                  placówki. Typowy proces obejmuje ustalenie potrzeby pacjenta,
                  zebranie danych, sprawdzenie terminów i zapisanie wybranej
                  wizyty.
                </p>

                <div className="flex flex-col gap-4">
                  <h3 className="subsection-title text-xl text-foreground sm:text-2xl">
                    Powitanie i informacja o rozmowie z AI
                  </h3>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Asystent przedstawia się jako wirtualny asystent AI
                    placówki. Pacjent od początku wie, z kim rozmawia.
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Informowanie o interakcji z AI jest również przedmiotem art.
                    50 AI Act. Komisja Europejska wskazuje, że obowiązki
                    dotyczące przejrzystości stosuje się od 2 sierpnia 2026
                    roku, a informacja o bezpośredniej rozmowie z AI powinna być
                    jasna i przekazana najpóźniej przy pierwszej interakcji.
                    Przepis przewiduje wyjątek dla sytuacji, w których charakter
                    interakcji jest oczywisty.
                    <CitationLink number={3} />
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Przykładowe powitanie może brzmieć:
                  </p>
                  <blockquote className="border-l-2 border-primary pl-4 text-base leading-7 text-pretty text-foreground sm:text-lg">
                    Dzień dobry, tu wirtualny asystent AI przychodni. W czym
                    mogę pomóc?
                  </blockquote>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="subsection-title text-xl text-foreground sm:text-2xl">
                    Ustalenie specjalizacji lub lekarza
                  </h3>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Pacjent mówi, jakiej konsultacji potrzebuje lub do którego
                    lekarza chce się zapisać. Jeśli informacje są niepełne,
                    asystent zadaje pytania potrzebne do wyboru odpowiedniej
                    usługi.
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Znaczenie mają zasady placówki: zakres przyjmowanych
                    pacjentów, rodzaje wizyt i ich długość. To one określają,
                    jakie terminy można zaproponować.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="subsection-title text-xl text-foreground sm:text-2xl">
                    Zebranie danych potrzebnych do rejestracji
                  </h3>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    W typowym procesie VoiceLink zbiera imię, nazwisko i numer
                    telefonu. Jeżeli rejestracja w danej placówce wymaga numeru
                    PESEL, można uwzględnić go w konfiguracji.
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Zakres danych ustalamy dla konkretnego procesu. PESEL nie
                    jest uniwersalnym wymogiem każdej rozmowy ani odpowiedzi na
                    pytanie o ofertę.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="subsection-title text-xl text-foreground sm:text-2xl">
                    Sprawdzenie terminów i potwierdzenie wyboru
                  </h3>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Asystent sprawdza dostępność w podłączonym terminarzu,
                    proponuje wolne terminy i czeka na decyzję pacjenta. Po jej
                    potwierdzeniu zapisuje wizytę.
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Pacjent może na przykład poprosić o konsultację po południu
                    albo wybrać inny dzień spośród dostępnych możliwości.
                    Ostateczny zapis powinien odpowiadać ustaleniom rozmowy i
                    regułom rezerwacji placówki.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="subsection-title text-xl text-foreground sm:text-2xl">
                    Wysłanie potwierdzenia SMS
                  </h3>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Po utworzeniu rezerwacji VoiceLink wysyła potwierdzenie SMS.
                    Wiadomość może zawierać datę, godzinę, nazwę placówki, adres
                    i dane kontaktowe.
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Dzięki temu pacjent ma najważniejsze informacje pod ręką,
                    bez konieczności ich zapisywania podczas rozmowy.
                  </p>
                </div>
              </section>

              <section
                id="co-potrafi-voicebot-medyczny-poza-umawianiem-wizyt"
                aria-labelledby="heading-poza"
                className={cn(
                  "flex flex-col gap-6 border-t border-border pt-10",
                  sectionScrollMargin,
                )}
              >
                <h2 id="heading-poza" className="section-title">
                  Co potrafi voicebot medyczny poza umawianiem wizyt?
                </h2>

                <div className="flex flex-col gap-4">
                  <h3 className="subsection-title text-xl text-foreground sm:text-2xl">
                    Zmieniać i odwoływać rezerwacje
                  </h3>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Asystent może obsługiwać prośby o zmianę lub odwołanie
                    terminu, zgodnie z funkcjami dostępnej integracji. W
                    konfiguracji trzeba uwzględnić sposób odnalezienia właściwej
                    wizyty i potwierdzenia, że zgłoszenie dotyczy odpowiedniego
                    pacjenta.
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Istotny jest wynik w terminarzu. Odwołana wizyta powinna
                    zmienić status, a zwolniony termin wrócić do dostępności
                    zgodnie z zasadami systemu placówki.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="subsection-title text-xl text-foreground sm:text-2xl">
                    Odpowiadać na pytania organizacyjne
                  </h3>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    VoiceLink może przekazywać informacje o godzinach otwarcia,
                    lokalizacji, cenach usług i zasadach zapisów. Może również
                    podawać zatwierdzone przez placówkę instrukcje dotyczące
                    przygotowania do badań.
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Zakres odpowiedzi wynika z przygotowanej bazy wiedzy. Cennik
                    i informacje organizacyjne trzeba aktualizować, kiedy
                    zmienia się oferta lub sposób działania przychodni.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="subsection-title text-xl text-foreground sm:text-2xl">
                    Potwierdzać wizyty telefonicznie i SMS
                  </h3>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Asystent może kontaktować się z pacjentami przed wizytą.
                    Scenariusz określa sposób potwierdzenia, obsługę rezygnacji
                    i dalsze postępowanie przy braku odpowiedzi.
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Sam mechanizm telefonicznych potwierdzeń jest wykorzystywany
                    również w polskim systemie publicznym. Od października 2026
                    roku w centralnej e-rejestracji działa wirtualna asystentka
                    Anna, umożliwiająca potwierdzenie lub odwołanie wizyty. Jej
                    zakres jest ściśle określony i nie obejmuje nowych
                    rezerwacji ani zmiany terminu. Pokazuje to, że funkcje
                    poszczególnych asystentów mogą się różnić.
                    <CitationLink number={4} />
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="subsection-title text-xl text-foreground sm:text-2xl">
                    Wysyłać linki do płatności
                  </h3>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    W placówce korzystającej z płatności online VoiceLink może
                    przesłać pacjentowi link do opłacenia wizyty. Moment wysyłki
                    i dalszą obsługę ustalamy podczas konfiguracji.
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Sprawdzanie statusu wpłaty czy obsługa zwrotów wymagają
                    odpowiednich funkcji po stronie systemu płatniczego i
                    uzgodnienia całego procesu.
                  </p>
                </div>
              </section>

              <section
                id="czy-placowka-musi-zmieniac-numer-telefonu"
                aria-labelledby="heading-numer"
                className={cn(
                  "flex flex-col gap-6 border-t border-border pt-10",
                  sectionScrollMargin,
                )}
              >
                <h2 id="heading-numer" className="section-title">
                  Czy placówka musi zmieniać numer telefonu?
                </h2>
                <div className="rounded-3xl border border-primary/20 bg-secondary p-6 sm:p-7">
                  <p className="text-base leading-7 font-medium text-pretty text-foreground sm:text-lg sm:leading-8">
                    <strong>
                      VoiceLink podłączamy do aktualnego numeru placówki.
                      Pacjenci mogą nadal korzystać z numeru, który już znają.
                    </strong>
                  </p>
                </div>
                <p className={proseClassName}>
                  W opisywanym modelu wszystkie połączenia trafiają najpierw do
                  asystenta. Wykonuje on zadania objęte konfiguracją, a sprawy
                  wymagające pracownika przekazuje do rejestracji. Sposób
                  podłączenia uzgadniamy z uwzględnieniem obecnej telefonii.
                </p>

                <div className="flex flex-col gap-4">
                  <h3 className="subsection-title text-xl text-foreground sm:text-2xl">
                    Ile rozmów asystent może prowadzić jednocześnie?
                  </h3>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    W oferowanym wariancie VoiceLink obsługuje do 20
                    jednoczesnych połączeń. Pacjenci mogą więc prowadzić osobne
                    rozmowy z asystentem w tym samym czasie.
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Podczas wdrożenia ustalamy również możliwości telefonii
                    placówki i sposób obsługi ruchu po osiągnięciu uzgodnionego
                    limitu.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="subsection-title text-xl text-foreground sm:text-2xl">
                    Czy asystent działa po zamknięciu przychodni?
                  </h3>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Asystent może odbierać połączenia również poza godzinami
                    pracy rejestracji i realizować zadania dostępne w danej
                    konfiguracji.
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Jeśli sprawa wymaga pracownika, a rejestracja jest
                    zamknięta, VoiceLink informuje o jej niedostępności i podaje
                    godziny, w których pacjent może skontaktować się z zespołem.
                    Warto jasno rozróżnić dostępność automatycznej obsługi od
                    dostępności człowieka.
                  </p>
                </div>
              </section>

              <section
                id="z-jakimi-systemami-mozna-polaczyc-voicelink"
                aria-labelledby="heading-systemy"
                className={cn(
                  "flex flex-col gap-6 border-t border-border pt-10",
                  sectionScrollMargin,
                )}
              >
                <h2 id="heading-systemy" className="section-title">
                  Z jakimi systemami można połączyć VoiceLink?
                </h2>
                <p className={proseClassName}>
                  Zakres oferowanych połączeń obejmuje rozwiązania KAMSOFT i
                  systemy współpracujące z OSOZ, Proassist, MyDr EDM, cloudiMed,
                  Google Calendar oraz indywidualne systemy placówek.
                </p>
                <p className={proseClassName}>
                  Dla konkretnego wdrożenia potwierdzamy dostępne operacje i
                  wymagane uprawnienia. Sama nazwa programu nie określa jeszcze
                  zakresu integracji. Znaczenie mogą mieć jego wersja,
                  aktywowane moduły i możliwości udostępnione przez dostawcę.
                </p>

                <div className="overflow-hidden rounded-[1.125rem] bg-white ring-1 ring-foreground/8">
                  <table className="w-full border-collapse text-left">
                    <caption className="sr-only">
                      {article.systemsTable.caption}
                    </caption>
                    <thead>
                      <tr className="border-b border-border bg-muted/60">
                        <th
                          scope="col"
                          className="w-[42%] px-5 py-3.5 text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase sm:px-6 sm:py-4"
                        >
                          {article.systemsTable.columns.system}
                        </th>
                        <th
                          scope="col"
                          className="px-5 py-3.5 text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase sm:px-6 sm:py-4"
                        >
                          {article.systemsTable.columns.setup}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {article.systemsTable.rows.map((row) => (
                        <tr key={row.label}>
                          <th
                            scope="row"
                            className="px-5 py-4 text-left text-sm leading-6 font-medium text-pretty text-foreground sm:px-6 sm:text-base"
                          >
                            {row.label}
                          </th>
                          <td className="px-5 py-4 text-sm leading-6 text-pretty text-muted-foreground sm:px-6 sm:text-base sm:leading-7">
                            {row.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className={proseClassName}>
                  Jeżeli mamy już integrację z danym systemem, potrzebujemy
                  odpowiednio nadanego dostępu, na przykład klucza dostępowego.
                  Jeśli połączenie wymaga przygotowania, kontakt z dostawcą i
                  prace integracyjne organizujemy po stronie VoiceLink. Niekiedy
                  potrzebne jest wskazanie osoby odpowiedzialnej za system lub
                  udzielenie upoważnienia do współpracy.
                </p>
              </section>

              <section
                id="co-sie-dzieje-gdy-asystent-nie-rozumie-pacjenta"
                aria-labelledby="heading-przekazanie"
                className={cn(
                  "flex flex-col gap-6 border-t border-border pt-10",
                  sectionScrollMargin,
                )}
              >
                <h2 id="heading-przekazanie" className="section-title">
                  Co się dzieje, gdy asystent nie rozumie pacjenta?
                </h2>
                <p className={proseClassName}>
                  Przekazanie do człowieka jest częścią dobrze zaprojektowanej
                  obsługi telefonicznej. Może być potrzebne przy trudnościach z
                  komunikacją, nietypowej sprawie lub zadaniu wykraczającym poza
                  uprawnienia asystenta.
                </p>
                <p className={proseClassName}>
                  W VoiceLink konfigurujemy rozmowę tak, aby po wykryciu
                  problemu z porozumieniem asystent przekierował pacjenta do
                  rejestracji, zgodnie z jej dostępnością. Pacjent powinien
                  otrzymać jasną informację o dalszym przebiegu kontaktu.
                </p>
                <p className={proseClassName}>
                  Podobnie należy postąpić przy problemie z zapisem wizyty.
                  Potwierdzenie rezerwacji powinno wynikać z powodzenia operacji
                  w terminarzu. Jeśli nie udało się jej wykonać, potrzebna jest
                  informacja o problemie i ustalona ścieżka dalszej obsługi.
                </p>

                <div className="flex flex-col gap-4">
                  <h3 className="subsection-title text-xl text-foreground sm:text-2xl">
                    Czy można rozmawiać w innym języku?
                  </h3>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    VoiceLink może obsługiwać między innymi język polski,
                    angielski, niemiecki i ukraiński. Wybór kolejnych języków
                    ustalamy podczas konfiguracji.
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Przygotowanie obsługi obejmuje również treść odpowiedzi,
                    nazwy usług i sposób wymawiania informacji
                    charakterystycznych dla danej placówki. Działanie warto
                    sprawdzić na przykładowych rozmowach przed uruchomieniem.
                  </p>
                </div>
              </section>

              <section
                id="jak-wyglada-wdrozenie-voicebota-w-placowce-medycznej"
                aria-labelledby="heading-wdrozenie"
                className={cn(
                  "flex flex-col gap-6 border-t border-border pt-10",
                  sectionScrollMargin,
                )}
              >
                <h2 id="heading-wdrozenie" className="section-title">
                  Jak wygląda wdrożenie voicebota w placówce medycznej?
                </h2>
                <p className={proseClassName}>
                  Typowe wdrożenie VoiceLink trwa około czterech tygodni. Termin
                  zależy przede wszystkim od zakresu obsługi, dostępnej
                  integracji i sprawności uzgodnień z placówką.
                </p>

                <div className="flex flex-col gap-4">
                  <h3 className="subsection-title text-xl text-foreground sm:text-2xl">
                    Ustalenie zasad i przygotowanie scenariuszy
                  </h3>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Po stronie przychodni potrzebna jest osoba odpowiedzialna za
                    współpracę. Wspólnie ustalamy usługi, grafik, zasady
                    rezerwacji, potrzebne dane pacjenta i sytuacje wymagające
                    przekazania rozmowy.
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Zespół VoiceLink przygotowuje konfigurację oraz scenariusze.
                    Placówka konsultuje sposób obsługi i potwierdza informacje,
                    z których będzie korzystać asystent.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="subsection-title text-xl text-foreground sm:text-2xl">
                    Podłączenie systemów i testy
                  </h3>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Kolejny etap obejmuje integrację z terminarzem i telefonią
                    oraz sprawdzenie całego procesu. Testy powinny obejmować
                    także brak wolnych terminów, zmianę decyzji pacjenta,
                    przerwanie wypowiedzi i kontakt poza godzinami pracy.
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Przygotowując obsługę danych, ustalamy niezbędny zakres
                    dostępu oraz zasady ich przechowywania i udostępniania
                    uprawnionym osobom.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="subsection-title text-xl text-foreground sm:text-2xl">
                    Uruchomienie i kontrola jakości
                  </h3>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Po uruchomieniu warto regularnie sprawdzać, czy rozmowy
                    kończą się właściwym rozwiązaniem sprawy. W VoiceLink Center
                    można analizować rozmowy i pracę asystenta.
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    W ocenie pomagają powody przekazań do rejestracji, wyniki
                    rezerwacji i uwagi pacjentów. Dzięki temu można poprawiać
                    konfigurację, zamiast opierać ocenę wyłącznie na liczbie
                    odebranych telefonów.
                  </p>
                </div>
              </section>

              <section
                id="najczestsze-pytania-o-voicebota-medycznego"
                aria-labelledby="heading-faq"
                className={cn(
                  "flex flex-col gap-6 border-t border-border pt-10",
                  sectionScrollMargin,
                )}
              >
                <h2 id="heading-faq" className="section-title">
                  Najczęstsze pytania o voicebota medycznego
                </h2>
                <div className="grid gap-8">
                  {article.faq.map((item) => (
                    <div key={item.id} className="flex flex-col gap-3">
                      <h3 className="subsection-title text-xl text-foreground sm:text-2xl">
                        {item.question}
                      </h3>
                      <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                        {item.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section
                id="sprawdz-jak-voicelink-moze-dzialac-w-twojej-placowce"
                aria-labelledby="heading-cta"
                className={cn(
                  "flex flex-col gap-5 rounded-3xl bg-[#062059] p-6 text-white sm:p-8 lg:p-10",
                  sectionScrollMargin,
                )}
              >
                <SectionEyebrow className="bg-white/15 text-white [&_img]:brightness-0 [&_img]:invert">
                  Konsultacja z VoiceLink
                </SectionEyebrow>
                <h2 id="heading-cta" className="section-title text-white">
                  Sprawdź, jak VoiceLink może działać w Twojej placówce
                </h2>
                <p className="text-base leading-7 text-pretty text-white/90 sm:text-lg sm:leading-8">
                  Podczas analizy obsługi telefonicznej pacjentów przyjrzymy się
                  rodzajom zgłoszeń, obecnej telefonii i systemowi rezerwacji.
                  Ustalimy, które sprawy asystent może kończyć samodzielnie,
                  kiedy potrzebna jest rejestracja i jak mierzyć efekty.
                </p>
                <p className="text-base leading-7 font-medium text-pretty text-white sm:text-lg sm:leading-8">
                  <strong>
                    Umów analizę obsługi telefonicznej pacjentów i poznaj zakres
                    wdrożenia VoiceLink dla Twojej placówki.
                  </strong>
                </p>
                <div className="pt-2">
                  <Link
                    href={contactHref}
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "h-auto min-h-11 shrink bg-white px-6 py-3 text-center text-sm whitespace-normal text-[#062059] hover:bg-white/90 sm:min-h-12 sm:px-7 sm:text-base",
                    )}
                  >
                    Umów analizę obsługi telefonicznej
                    <ArrowRightIcon data-icon="inline-end" />
                  </Link>
                </div>
              </section>

              <section
                id="zrodla"
                aria-labelledby="heading-zrodla"
                className={cn(
                  "flex flex-col gap-5 border-t border-border pt-10",
                  sectionScrollMargin,
                )}
              >
                <h2 id="heading-zrodla" className="subsection-title text-2xl">
                  Źródła
                </h2>
                <ol className="flex flex-col gap-4">
                  {article.sources.map((source) => (
                    <li
                      key={source.id}
                      id={`zrodlo-${source.id}`}
                      className={cn(
                        "flex items-start gap-3 rounded-2xl border border-border bg-muted/60 p-4 text-sm leading-6 text-muted-foreground sm:p-5",
                        sectionScrollMargin,
                      )}
                    >
                      <span className="font-semibold text-primary tabular-nums">
                        {source.id}.
                      </span>
                      <div className="flex-1">
                        <span>{source.text} </span>
                        <SourceLinks
                          links={
                            "links" in source
                              ? source.links
                              : [{ label: source.linkLabel, href: source.href }]
                          }
                        />
                        <span>.</span>
                      </div>
                    </li>
                  ))}
                </ol>
                <p className="text-xs leading-6 text-pretty text-muted-foreground sm:text-sm">
                  {article.methodologyNote}
                </p>
              </section>
            </article>
          </div>
        </Container>
      </Section>
    </>
  );
}
