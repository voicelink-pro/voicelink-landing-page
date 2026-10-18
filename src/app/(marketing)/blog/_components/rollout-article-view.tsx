import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionEyebrow } from "@/components/layout/section-eyebrow";
import { buttonVariants } from "@/components/ui/button";
import { contactHref } from "@/config/navigation";
import { cn } from "@/lib/utils";

import { rolloutArticle } from "../_content/blog";
import { ArticleHero } from "./article-hero";
import { ArticleSidebar } from "./article-sidebar";
import { ArticleToc } from "./article-toc";

function InternalLink({
  href,
  children,
}: {
  href: `/${string}`;
  children: string;
}) {
  return (
    <Link
      href={href}
      className="font-medium text-primary underline underline-offset-4 hover:opacity-80"
    >
      {children}
    </Link>
  );
}

const sectionScrollMargin =
  "scroll-mt-[calc(var(--site-header-height)+1.5rem)]";

const proseClassName =
  "text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8";

const cardClassName = "flex flex-col gap-4";

export function RolloutArticleView() {
  const article = rolloutArticle;

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
                  Proces wdrożenia
                </p>
                <p className="subsection-title mt-2 text-xl text-white">
                  Sprawdź, jak wyglądałby start w Twojej placówce
                </p>
                <p className="mt-2.5 text-sm leading-6 text-white/85">
                  Umów analizę z zespołem VoiceLink albo policz potencjał
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
                {article.lead.map((paragraph, index) => (
                  <p
                    key={paragraph}
                    className="text-base leading-7 text-pretty text-foreground sm:text-lg sm:leading-8"
                  >
                    {index === 2 ? <strong>{paragraph}</strong> : paragraph}
                  </p>
                ))}
              </div>

              <section
                id="krok-1-analiza-obslugi-telefonicznej-i-potrzeb-placowki"
                aria-labelledby="heading-krok-1"
                className={cn("flex flex-col gap-6", sectionScrollMargin)}
              >
                <h2 id="heading-krok-1" className="section-title">
                  Krok 1. Analiza obsługi telefonicznej i potrzeb placówki
                </h2>
                <p className={proseClassName}>
                  Na początku sprawdzamy, jak obecnie wygląda kontakt z
                  pacjentami. Potrzebujemy zrozumieć zarówno skalę połączeń, jak
                  i codzienną pracę rejestracji.
                </p>
                <p className={proseClassName}>
                  Rozmawiamy o liczbie telefonów, godzinach największego
                  obciążenia, nieodebranych połączeniach i najczęstszych
                  powodach kontaktu. Sprawdzamy, ile osób pracuje na rejestracji
                  i jakie zadania wykonują poza obsługą telefonu.
                </p>
                <p className={proseClassName}>
                  Przyglądamy się również potwierdzaniu wizyt. Czy placówka
                  wysyła przypomnienia SMS? Czy pracownicy dzwonią do pacjentów?
                  Ile czasu to zajmuje i jaki jest aktualny poziom nieodwołanych
                  nieobecności, określany jako no show?
                </p>

                <div className="rounded-3xl border border-border bg-muted p-6 sm:p-7">
                  <h3 className="subsection-title text-xl text-foreground sm:text-2xl">
                    Jakie informacje pomagają zaplanować wdrożenie?
                  </h3>
                  <p className="mt-3 text-base leading-7 text-foreground">
                    Przydatne są przede wszystkim:
                  </p>
                  <ol className="mt-4 flex list-decimal flex-col gap-3 pl-5 text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    {article.checklist.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </div>
                <p className={proseClassName}>
                  Jeżeli część statystyk nie jest dostępna, ustalamy, na jakich
                  informacjach możemy oprzeć analizę i co warto zacząć mierzyć.
                </p>
                <p className={proseClassName}>
                  Na tej podstawie proponujemy{" "}
                  <InternalLink href="/jak-to-dziala/funkcje">
                    zakres asystenta
                  </InternalLink>
                  . Może obejmować zarządzanie wizytami, odpowiadanie na
                  pytania, obsługę potwierdzeń albo połączenia wychodzące.
                  Ustalamy też, kiedy sprawa powinna trafić do pracownika
                  placówki.
                </p>
              </section>

              <section
                id="krok-2-umowa-platnosc-i-spotkanie-projektowe"
                aria-labelledby="heading-krok-2"
                className={cn(
                  "flex flex-col gap-6 border-t border-border pt-10",
                  sectionScrollMargin,
                )}
              >
                <h2 id="heading-krok-2" className="section-title">
                  Krok 2. Umowa, płatność i spotkanie projektowe
                </h2>
                <p className={proseClassName}>
                  Po uzgodnieniu zakresu współpracy, podpisaniu umowy i
                  dokonaniu ustalonej płatności przechodzimy do spotkania
                  projektowego.
                </p>
                <p className={proseClassName}>
                  To moment, w którym przekładamy potrzeby placówki na konkretne
                  zasady prowadzenia rozmów. Uzgadniamy, co asystent ma mówić, o
                  co pytać i jakie działania wykonywać w poszczególnych
                  sytuacjach.
                </p>

                <div className={cardClassName}>
                  <h3 className="subsection-title text-xl text-foreground sm:text-2xl">
                    Scenariusze rozmów i zasady rejestracji
                  </h3>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Omawiamy między innymi umawianie nowych wizyt, wyszukiwanie
                    terminów, zmianę rezerwacji i jej odwołanie. Ustalamy, jakie
                    informacje są potrzebne do obsługi pacjenta i w jakiej
                    kolejności należy je zbierać.
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Ważne są szczegóły: wybór lekarza, rodzaje wizyt, czas ich
                    trwania, zasady proponowania terminów oraz sposób
                    przekazania rozmowy do rejestracji.
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Przykładowo pacjent może poprosić o konkretną specjalizację,
                    nie znając nazwiska lekarza. Na spotkaniu ustalamy, jak
                    asystent ma poprowadzić taką rozmowę i jakie możliwości
                    przedstawić.
                  </p>
                </div>

                <div className={cardClassName}>
                  <h3 className="subsection-title text-xl text-foreground sm:text-2xl">
                    Głos, ton i sposób komunikacji
                  </h3>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Wybieramy również głos asystenta i ustalamy jego ton.
                    Rozmowa powinna pasować do charakteru placówki i być
                    zrozumiała dla jej pacjentów.
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Dopracowujemy powitanie, sposób zadawania pytań i długość
                    wypowiedzi. Ustalamy też, jak asystent reaguje, gdy pacjent
                    czegoś nie dosłyszy, zmieni zdanie albo potrzebuje
                    dodatkowego wyjaśnienia.
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Po tym etapie obie strony wiedzą, jak ma wyglądać obsługa
                    poszczególnych spraw.
                  </p>
                </div>
              </section>

              <section
                id="krok-3-konfiguracja-asystenta-po-stronie-voicelink"
                aria-labelledby="heading-krok-3"
                className={cn(
                  "flex flex-col gap-4 border-t border-border pt-10",
                  sectionScrollMargin,
                )}
              >
                <h2 id="heading-krok-3" className="section-title">
                  Krok 3. Konfiguracja asystenta po stronie VoiceLink
                </h2>
                <p className={proseClassName}>
                  Na podstawie ustaleń przygotowujemy asystenta. Konfigurujemy
                  scenariusze rozmów, bazę informacji o placówce i działania
                  potrzebne do realizacji uzgodnionego zakresu.
                </p>
                <p className={proseClassName}>
                  Uwzględniamy między innymi godziny pracy, lokalizacje, ofertę,
                  zasady zapisów oraz odpowiedzi na powtarzające się pytania.
                  Przygotowujemy też sposób obsługi sytuacji, w których
                  potrzebna jest pomoc człowieka.
                </p>
                <p className={proseClassName}>
                  Na tym etapie po stronie placówki ważne jest przekazanie
                  aktualnych materiałów i wyjaśnienie ewentualnych niejasności.
                  Jeżeli zasady rejestracji różnią się między lekarzami lub
                  usługami, warto opisać te różnice przed rozpoczęciem testów.
                </p>
                <p className={proseClassName}>
                  Dzięki temu asystent może działać zgodnie z rzeczywistą
                  organizacją pracy poradni.
                </p>
              </section>

              <section
                id="krok-4-testy-na-osobnym-numerze-telefonu"
                aria-labelledby="heading-krok-4"
                className={cn(
                  "flex flex-col gap-6 border-t border-border pt-10",
                  sectionScrollMargin,
                )}
              >
                <h2 id="heading-krok-4" className="section-title">
                  Krok 4. Testy na osobnym numerze telefonu i w systemie
                  testowym
                </h2>
                <p className={proseClassName}>
                  Gdy pierwsza konfiguracja jest gotowa, udostępniamy numer
                  testowy. Zespół placówki może zadzwonić i sprawdzić asystenta
                  z perspektywy pacjenta.
                </p>
                <p className={proseClassName}>
                  Na tym etapie korzystamy z systemu testowego. Można przejść
                  przez przygotowane scenariusze i ocenić, czy rozmowy
                  przebiegają zgodnie z oczekiwaniami.
                </p>

                <div className={cardClassName}>
                  <h3 className="subsection-title text-xl text-foreground sm:text-2xl">
                    Co warto sprawdzić podczas testów?
                  </h3>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Najwięcej informacji dają rozmowy przypominające te, które
                    rejestracja odbiera każdego dnia. Warto spróbować umówić
                    wizytę, zmienić termin, zadać kilka pytań albo poprosić o
                    kontakt z pracownikiem.
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Dobrze sprawdzić również sytuacje mniej oczywiste. Pacjent
                    może poprawić nazwisko, zmienić wybranego lekarza w połowie
                    rozmowy albo wrócić do wcześniejszego pytania.
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Zbieramy uwagi zespołu i wprowadzamy poprawki. Dopracowujemy
                    zarówno logikę działania, jak i sposób komunikacji. Przed
                    przejściem dalej placówka akceptuje przygotowane
                    rozwiązanie.
                  </p>
                </div>
              </section>

              <section
                id="krok-5-podlaczenie-prawdziwego-kalendarza"
                aria-labelledby="heading-krok-5"
                className={cn(
                  "flex flex-col gap-4 border-t border-border pt-10",
                  sectionScrollMargin,
                )}
              >
                <h2 id="heading-krok-5" className="section-title">
                  Krok 5. Podłączenie prawdziwego kalendarza i ponowne testy
                </h2>
                <p className={proseClassName}>
                  Po dopracowaniu asystenta łączymy go z rzeczywistym
                  terminarzem placówki, zgodnie z możliwościami uzgodnionej{" "}
                  <InternalLink href="/jak-to-dziala/integracja">
                    integracji
                  </InternalLink>
                  .
                </p>
                <div className="rounded-3xl border border-primary/20 bg-secondary p-6 sm:p-7">
                  <p className="text-base leading-7 font-medium text-pretty text-foreground sm:text-lg sm:leading-8">
                    <strong>
                      Testy nadal odbywają się na osobnym numerze telefonu.
                    </strong>{" "}
                    Pozwala to sprawdzić współpracę z właściwym systemem przed
                    uruchomieniem obsługi na numerze znanym pacjentom.
                  </p>
                </div>
                <p className={proseClassName}>
                  Weryfikujemy wyszukiwanie dostępności, proponowanie terminów
                  oraz zapis, zmianę i odwołanie wizyty. Sprawdzamy również, czy
                  informacje trafiają do odpowiedniego kalendarza i czy
                  szczegóły rezerwacji są poprawne.
                </p>
                <p className={proseClassName}>
                  Ponieważ pracujemy już z prawdziwym terminarzem, działania
                  testowe uzgadniamy z placówką. Ważne jest sprawdzenie całego
                  procesu, od prośby pacjenta do prawidłowego odnotowania
                  operacji w systemie.
                </p>
              </section>

              <section
                id="krok-6-kontrolowane-uruchomienie-na-numerze-placowki"
                aria-labelledby="heading-krok-6"
                className={cn(
                  "flex flex-col gap-4 border-t border-border pt-10",
                  sectionScrollMargin,
                )}
              >
                <h2 id="heading-krok-6" className="section-title">
                  Krok 6. Kontrolowane uruchomienie na numerze placówki
                </h2>
                <p className={proseClassName}>
                  Kiedy testy przebiegają prawidłowo, przechodzimy do
                  uruchomienia asystenta na numerze placówki.
                </p>
                <p className={proseClassName}>
                  To kolejny etap weryfikacji. Sprawdzamy zachowanie w
                  rzeczywistych rozmowach z pacjentami, którzy mogą mówić
                  inaczej niż osoby testujące rozwiązanie. Używają skrótów,
                  przerywają, dopytują i opisują kilka spraw jednocześnie.
                </p>
                <p className={proseClassName}>
                  Obserwujemy, czy asystent prawidłowo rozpoznaje potrzeby
                  rozmówców, wykonuje ustalone zadania i przekazuje sprawy do
                  rejestracji w odpowiednich sytuacjach.
                </p>
                <p className={proseClassName}>
                  Sposób oraz zakres tego uruchomienia ustalamy z placówką. Na
                  podstawie pierwszych rozmów wprowadzamy potrzebne korekty i
                  przygotowujemy rozwiązanie do rozpoczęcia pilotażu.
                </p>
              </section>

              <section
                id="krok-7-pierwszy-miesiac-pilotazowy-i-optymalizacja"
                aria-labelledby="heading-krok-7"
                className={cn(
                  "flex flex-col gap-6 border-t border-border pt-10",
                  sectionScrollMargin,
                )}
              >
                <h2 id="heading-krok-7" className="section-title">
                  Krok 7. Pierwszy miesiąc pilotażowy i optymalizacja
                </h2>
                <p className={proseClassName}>
                  Po sprawdzeniu działania na numerze placówki rozpoczynamy
                  pierwszy miesiąc pilotażowy.
                </p>
                <p className={proseClassName}>
                  W tym czasie analizujemy rzeczywiste wykorzystanie asystenta.
                  Przyglądamy się rozmowom, powtarzającym się pytaniom i
                  sytuacjom, które wymagają dopracowania. Aktualizujemy
                  scenariusze oraz informacje potrzebne do obsługi pacjentów.
                </p>
                <p className={proseClassName}>
                  Pilotaż pozwala ocenić, jak rozwiązanie sprawdza się w
                  codziennej pracy. Pokazuje też, które zadania można obsługiwać
                  sprawniej i gdzie nadal potrzebne jest zaangażowanie
                  rejestracji.
                </p>

                <div className={cardClassName}>
                  <h3 className="subsection-title text-xl text-foreground sm:text-2xl">
                    Dobór abonamentu na podstawie zużycia
                  </h3>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    W pierwszym miesiącu badamy również rzeczywiste zużycie
                    minutowe. Sprawdzamy, ile rozmów obsługuje asystent i jak
                    długo one trwają.
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    To podstawa do dobrania abonamentu odpowiadającego potrzebom
                    placówki. Uwzględniamy także uzgodniony zakres działania, w
                    tym ewentualne połączenia wychodzące i obsługę potwierdzeń.
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Po ocenie pilotażu uzgadniamy warunki dalszej współpracy i
                    podpisujemy umowę na czas nieokreślony.
                  </p>
                </div>
              </section>

              <section
                id="krok-8-stale-wsparcie-i-analiza-w-voicelink-center"
                aria-labelledby="heading-krok-8"
                className={cn(
                  "flex flex-col gap-4 border-t border-border pt-10",
                  sectionScrollMargin,
                )}
              >
                <h2 id="heading-krok-8" className="section-title">
                  Krok 8. Stałe wsparcie i analiza w VoiceLink Center
                </h2>
                <p className={proseClassName}>
                  Współpraca trwa również po zakończeniu pilotażu. Placówka ma
                  dostęp do wsparcia technicznego, a kontakt z zespołem
                  odpowiedzialnym za konfigurację jest dostępny 7 dni w
                  tygodniu.
                </p>
                <p className={proseClassName}>
                  To przydatne, gdy zmieniają się godziny pracy, oferta, zasady
                  rejestracji albo informacje przekazywane pacjentom. Asystent
                  powinien nadążać za tymi zmianami.
                </p>
                <p className={proseClassName}>
                  Placówka otrzymuje także dostęp do{" "}
                  <strong>
                    <InternalLink href="/voicelink-center">
                      VoiceLink Center
                    </InternalLink>
                  </strong>
                  , czyli panelu pozwalającego analizować rozmowy i oceniać
                  działanie asystenta.
                </p>
                <p className={proseClassName}>
                  Dzięki temu właściciel lub manager może przyglądać się
                  wykorzystaniu rozwiązania i omawiać z nami kolejne
                  usprawnienia na podstawie danych z obsługi.
                </p>
              </section>

              <section
                id="ile-trwa-wdrozenie-asystenta-glosowego"
                aria-labelledby="heading-czas"
                className={cn(
                  "flex flex-col gap-4 border-t border-border pt-10",
                  sectionScrollMargin,
                )}
              >
                <h2 id="heading-czas" className="section-title">
                  Ile trwa wdrożenie asystenta głosowego?
                </h2>
                <p className={proseClassName}>
                  Czas wdrożenia zależy od zakresu zadań, liczby scenariuszy i
                  sposobu integracji z systemem placówki.
                </p>
                <p className={proseClassName}>
                  Znaczenie ma również dostępność materiałów, uzgodnienie zasad
                  rejestracji i czas potrzebny zespołowi na testy. Prostsza
                  konfiguracja informacyjna wymaga innego zakresu prac niż
                  obsługa kilku lokalizacji, wielu rodzajów wizyt i połączeń
                  wychodzących.
                </p>
                <p className={proseClassName}>
                  Dlatego harmonogram ustalamy po analizie potrzeb. Osobnym
                  etapem jest pierwszy miesiąc pilotażowy, który rozpoczynamy po
                  przygotowaniu i sprawdzeniu rozwiązania.
                </p>
              </section>

              <section
                id="jak-przygotowac-placowke-do-wdrozenia"
                aria-labelledby="heading-przygotowanie"
                className={cn(
                  "flex flex-col gap-5 rounded-3xl bg-[#062059] p-6 text-white sm:p-8 lg:p-10",
                  sectionScrollMargin,
                )}
              >
                <SectionEyebrow className="bg-white/15 text-white [&_img]:brightness-0 [&_img]:invert">
                  Konsultacja z VoiceLink
                </SectionEyebrow>
                <h2
                  id="heading-przygotowanie"
                  className="section-title text-white"
                >
                  Jak przygotować placówkę do wdrożenia?
                </h2>
                <p className="text-base leading-7 text-pretty text-white/90 sm:text-lg sm:leading-8">
                  Warto wyznaczyć osobę, która dobrze zna pracę rejestracji i
                  będzie koordynować ustalenia po stronie placówki.
                </p>
                <p className="text-base leading-7 text-pretty text-white/90 sm:text-lg sm:leading-8">
                  Pomocne są aktualne informacje o lekarzach, usługach,
                  godzinach pracy i zasadach umawiania wizyt. Przydadzą się też
                  najczęstsze pytania pacjentów oraz przykłady spraw, które
                  powinny trafiać do pracownika.
                </p>
                <p className="text-base leading-7 text-pretty text-white/90 sm:text-lg sm:leading-8">
                  Dużą wartość ma udział rejestracji w testach. To właśnie ten
                  zespół najlepiej zna codzienne rozmowy i potrafi wskazać
                  szczegóły ważne dla pacjentów.
                </p>
                <p className="text-base leading-7 font-medium text-pretty text-white sm:text-lg sm:leading-8">
                  <strong>
                    Chcesz sprawdzić, jak taki proces wyglądałby w Twojej
                    placówce? Umów analizę obsługi telefonicznej pacjentów z
                    VoiceLink.
                  </strong>{" "}
                  Przyjrzymy się obecnej sytuacji, omówimy możliwości integracji
                  i zaproponujemy zakres asystenta dopasowany do sposobu pracy
                  Twojego zespołu.
                </p>
                <div className="pt-2">
                  <Link
                    href={contactHref}
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "h-auto min-h-11 shrink bg-white px-6 py-3 text-center text-sm whitespace-normal text-[#062059] hover:bg-white/90 sm:min-h-12 sm:px-7 sm:text-base",
                    )}
                  >
                    Umów analizę obsługi telefonicznej pacjentów
                    <ArrowRightIcon data-icon="inline-end" />
                  </Link>
                </div>
              </section>

              <section
                id="najczestsze-pytania-o-wdrozenie-asystenta-glosowego"
                aria-labelledby="heading-faq"
                className={cn(
                  "flex flex-col gap-6 border-t border-border pt-10",
                  sectionScrollMargin,
                )}
              >
                <h2 id="heading-faq" className="section-title">
                  Najczęstsze pytania o wdrożenie asystenta głosowego
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
            </article>
          </div>
        </Container>
      </Section>
    </>
  );
}
