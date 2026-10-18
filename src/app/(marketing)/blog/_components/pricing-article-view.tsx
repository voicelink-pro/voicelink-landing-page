import Link from "next/link";
import { ArrowRightIcon, ArrowUpRightIcon } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionEyebrow } from "@/components/layout/section-eyebrow";
import { buttonVariants } from "@/components/ui/button";
import { contactHref } from "@/config/navigation";
import { cn } from "@/lib/utils";

import { pricingArticle } from "../_content/blog";
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

function ArticleTable({
  caption,
  columns,
  rows,
  align,
}: {
  caption: string;
  columns: readonly string[];
  rows: readonly (readonly string[])[];
  align?: readonly ("left" | "right")[];
}) {
  return (
    <div className="overflow-x-auto rounded-[1.125rem] bg-white ring-1 ring-foreground/8">
      <table className="w-full min-w-[40rem] border-collapse text-left">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-border bg-muted/60">
            {columns.map((column, index) => (
              <th
                key={column}
                scope="col"
                className={cn(
                  "px-5 py-3.5 text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase sm:px-6 sm:py-4",
                  align?.[index] === "right" && "text-right",
                )}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((row) => (
            <tr key={row.join("|")}>
              {row.map((cell, index) =>
                index === 0 ? (
                  <th
                    key={cell}
                    scope="row"
                    className="px-5 py-4 text-left text-sm leading-6 font-medium text-pretty text-foreground sm:px-6 sm:text-base"
                  >
                    {cell}
                  </th>
                ) : (
                  <td
                    key={cell}
                    className={cn(
                      "px-5 py-4 text-sm leading-6 text-pretty text-muted-foreground sm:px-6 sm:text-base sm:leading-7",
                      align?.[index] === "right" &&
                        "text-right font-medium whitespace-nowrap text-foreground tabular-nums",
                    )}
                  >
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const sectionScrollMargin =
  "scroll-mt-[calc(var(--site-header-height)+1.5rem)]";

const proseClassName =
  "text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8";

const cardClassName = "flex flex-col gap-4";

export function PricingArticleView() {
  const article = pricingArticle;

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
                  Wycena i kalkulator
                </p>
                <p className="subsection-title mt-2 text-xl text-white">
                  Policz opłacalność dla swojej placówki
                </p>
                <p className="mt-2.5 text-sm leading-6 text-white/85">
                  Umów analizę z zespołem VoiceLink albo sprawdź szacunek w
                  kalkulatorze oszczędności.
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
                id="z-czego-sklada-sie-cena-voicebota-medycznego"
                aria-labelledby="heading-sklad"
                className={cn("flex flex-col gap-6", sectionScrollMargin)}
              >
                <h2 id="heading-sklad" className="section-title">
                  Z czego składa się cena voicebota medycznego?
                </h2>
                <p className={proseClassName}>
                  Koszt obejmuje przygotowanie rozwiązania do pracy oraz jego
                  późniejsze wykorzystanie. Wdrożenie finansuje konfigurację
                  procesów i uruchomienie obsługi. Rozliczenie bieżące zależy
                  przede wszystkim od liczby minut i wiadomości.
                </p>
                <ArticleTable
                  caption={article.priceTable.caption}
                  columns={article.priceTable.columns}
                  rows={article.priceTable.rows}
                />
                <p className={proseClassName}>
                  Wszystkie podane ceny VoiceLink są kwotami brutto. Przy
                  porównywaniu ofert należy sprawdzać zarówno sposób
                  prezentowania cen, jak i zakres usług objętych rozliczeniem.
                </p>

                <div className={cardClassName}>
                  <h3 className="subsection-title text-xl text-foreground sm:text-2xl">
                    Co obejmuje standardowe wdrożenie za 3000 zł?
                  </h3>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Standardowy zakres obejmuje przygotowanie obsługi
                    zarządzania wizytami,{" "}
                    <InternalLink href="/jak-to-dziala/funkcje#funkcje">
                      potwierdzeń SMS
                    </InternalLink>{" "}
                    i odpowiedzi na pytania organizacyjne. Zespół VoiceLink
                    konfiguruje scenariusze we współpracy z osobą odpowiedzialną
                    za wdrożenie po stronie placówki.
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Zakres współpracy obejmuje również konfigurację
                    zabezpieczeń, dostęp do VoiceLink Center, wsparcie
                    techniczne i raporty przez sześć miesięcy. Szczegóły{" "}
                    <InternalLink href="/jak-to-dziala/integracja">
                      połączenia z terminarzem
                    </InternalLink>{" "}
                    oraz potrzebne dostępy ustalamy przed uruchomieniem.
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Warto zwrócić uwagę na efekt całego procesu. Rezerwacja
                    powinna zostać zapisana we właściwym kalendarzu, a pacjent
                    otrzymać potwierdzenie. To te czynności decydują o tym, ile
                    pracy pozostanie po stronie rejestracji.
                  </p>
                </div>

                <div className={cardClassName}>
                  <h3 className="subsection-title text-xl text-foreground sm:text-2xl">
                    Jak wygląda późniejsza opieka?
                  </h3>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Opieka obejmuje aktualizowanie informacji w bazie wiedzy,
                    poprawki scenariuszy oraz pracę z panelem VoiceLink Center.
                    Z zespołem odpowiedzialnym za konfigurację można kontaktować
                    się siedem dni w tygodniu, również w weekendy.
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Taka dostępność kontaktu nie oznacza automatycznie
                    całodobowego dyżuru technicznego. Zakres wsparcia i warunki
                    reakcji określa umowa.
                  </p>
                </div>
              </section>

              <section
                id="ile-wynosi-miesieczny-koszt-rozmow-i-sms"
                aria-labelledby="heading-miesiac"
                className={cn(
                  "flex flex-col gap-6 border-t border-border pt-10",
                  sectionScrollMargin,
                )}
              >
                <h2 id="heading-miesiac" className="section-title">
                  Ile wynosi miesięczny koszt rozmów i SMS?
                </h2>
                <p className={proseClassName}>
                  W modelu VoiceLink nie płaci się stałego abonamentu za
                  korzystanie z asystenta. Rozliczenie opiera się na
                  wykorzystanych minutach i wysłanych SMS. Kwota miesięczna
                  zależy więc od rzeczywistego ruchu i uzgodnionej stawki.
                </p>
                <p className={proseClassName}>
                  Przykładowo, przy stawce podstawowej:
                </p>
                <ArticleTable
                  caption={article.usageTable.caption}
                  columns={article.usageTable.columns}
                  rows={article.usageTable.rows}
                  align={["left", "right", "right"]}
                />
                <p className={proseClassName}>
                  To przykład rozliczenia zużycia. Jeśli placówka ponosi
                  dodatkowe koszty API, telefonii lub serwera, trzeba dodać je
                  do tej kwoty.
                </p>

                <div className={cardClassName}>
                  <h3 className="subsection-title text-xl text-foreground sm:text-2xl">
                    Dlaczego sama liczba połączeń nie wystarcza do wyceny?
                  </h3>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Dwie placówki mogą odbierać podobną liczbę telefonów, ale
                    mieć różne koszty obsługi. Znaczenie ma długość rozmów, ich
                    tematy oraz liczba połączeń wychodzących, na przykład przy
                    potwierdzaniu wizyt.
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Do prognozy potrzebujemy również liczby wysyłanych
                    wiadomości. Jedna wizyta może wiązać się z potwierdzeniem
                    rezerwacji, przypomnieniem i dalszą wymianą SMS.
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Przed podpisaniem umowy warto sprawdzić zasady naliczania
                    czasu rozmów, rozliczania ruchu przychodzącego i
                    wychodzącego oraz dłuższych wiadomości SMS. Te szczegóły
                    pozwalają przełożyć raport z telefonii na wiarygodny budżet.
                  </p>
                </div>
              </section>

              <section
                id="jakie-dodatkowe-koszty-moze-poniesc-placowka"
                aria-labelledby="heading-dodatkowe"
                className={cn(
                  "flex flex-col gap-6 border-t border-border pt-10",
                  sectionScrollMargin,
                )}
              >
                <h2 id="heading-dodatkowe" className="section-title">
                  Jakie dodatkowe koszty może ponieść placówka?
                </h2>

                <div className={cardClassName}>
                  <h3 className="subsection-title text-xl text-foreground sm:text-2xl">
                    Dostęp do systemu medycznego
                  </h3>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Automatyczne sprawdzanie terminów i zapisywanie wizyt wymaga
                    odpowiedniego dostępu do terminarza. Dostawca systemu
                    medycznego może naliczać opłatę za API lub potrzebną usługę
                    integracyjną.
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Przykładowo KAMSOFT publikuje osobno wyceniane usługi
                    związane z rejestracją online. Nie oznacza to jednak, że
                    każda placówka potrzebuje tych samych modułów i ponosi
                    identyczny koszt. Zakres trzeba sprawdzić dla jej systemu i
                    sposobu integracji.
                    <CitationLink number={1} />
                  </p>
                </div>

                <div className={cardClassName}>
                  <h3 className="subsection-title text-xl text-foreground sm:text-2xl">
                    Telefonia i serwer integracyjny
                  </h3>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Dodatkowe wydatki mogą dotyczyć połączeń telefonicznych i
                    infrastruktury łączącej asystenta z systemem placówki. Ich
                    wysokość zależy od obecnej telefonii oraz przyjętej
                    architektury.
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Brak abonamentu VoiceLink nie oznacza więc, że w całym
                    wdrożeniu nie mogą wystąpić żadne stałe opłaty zewnętrzne.
                    Przed decyzją warto mieć jedno zestawienie wszystkich
                    kosztów początkowych i miesięcznych.
                  </p>
                </div>
              </section>

              <section
                id="kiedy-voicebot-medyczny-zaczyna-sie-oplacac"
                aria-labelledby="heading-prog"
                className={cn(
                  "flex flex-col gap-6 border-t border-border pt-10",
                  sectionScrollMargin,
                )}
              >
                <h2 id="heading-prog" className="section-title">
                  Kiedy voicebot medyczny zaczyna się opłacać?
                </h2>
                <p className={proseClassName}>
                  Najprościej obliczyć, ile dodatkowych zrealizowanych wizyt
                  potrzeba, aby pokryć miesięczny koszt obsługi.
                </p>
                <div className="rounded-3xl border border-primary/20 bg-secondary p-6 sm:p-7">
                  <p className="text-base leading-7 font-medium text-pretty text-foreground sm:text-lg sm:leading-8">
                    <strong>
                      Liczba wizyt potrzebna do pokrycia kosztu = pełny
                      miesięczny koszt rozwiązania ÷ kwota pozostająca placówce
                      z dodatkowej wizyty.
                    </strong>
                  </p>
                  <p className="mt-3 text-base leading-7 text-muted-foreground">
                    Wynik zaokrąglamy w górę do pełnej wizyty.
                  </p>
                </div>
                <p className={proseClassName}>
                  To zastosowanie zasady progu rentowności. W takim obliczeniu
                  znaczenie ma cena usługi pomniejszona o koszty zmienne jej
                  wykonania. Podobną metodę przedstawia U.S. Small Business
                  Administration w materiałach dotyczących analizy rentowności.
                  <CitationLink number={2} />
                </p>

                <div className={cardClassName}>
                  <h3 className="subsection-title text-xl text-foreground sm:text-2xl">
                    Dlaczego nie dzielimy kosztu wyłącznie przez cenę wizyty?
                  </h3>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Przy cenie konsultacji 300 zł część przychodu przeznacza się
                    na wynagrodzenie lekarza i inne koszty związane z wykonaniem
                    świadczenia.
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Załóżmy, że z dodatkowej wizyty po pokryciu kosztów, które
                    pojawiają się wraz z jej realizacją, pozostaje placówce 150
                    zł. To właśnie tę kwotę przyjmujemy do kalkulacji. Nie jest
                    ona końcowym zyskiem całej placówki, ponieważ musi jeszcze
                    pokrywać jej pozostałe koszty.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="subsection-title text-xl text-foreground sm:text-2xl">
                    Czy 12 do 15 dodatkowych wizyt wystarczy?
                  </h3>
                  <p className={proseClassName}>
                    Załóżmy, że pełny miesięczny koszt ocenianego wariantu
                    wynosi 2000 zł. Liczba wizyt potrzebna do jego pokrycia
                    zależy od kwoty pozostającej placówce:
                  </p>
                  <ArticleTable
                    caption={article.thresholdTable.caption}
                    columns={article.thresholdTable.columns}
                    rows={article.thresholdTable.rows}
                    align={["left", "right"]}
                  />
                  <div className="rounded-3xl bg-[#062059] p-6 text-white sm:p-7">
                    <p className="text-xs font-semibold tracking-[0.14em] text-white/75 uppercase">
                      Próg z przykładu
                    </p>
                    <p className="subsection-title mt-2 text-xl text-white sm:text-2xl">
                      <strong>
                        Przy kwocie 140 do 170 zł pozostającej z wizyty około 12
                        do 15 dodatkowych wizyt miesięcznie pokrywa koszt 2000
                        zł.
                      </strong>
                    </p>
                  </div>
                  <p className={proseClassName}>
                    To kilka wizyt tygodniowo. Dla placówki z wolnymi terminami
                    i nieobsłużonymi zgłoszeniami taki próg może być osiągalny.
                    Wymaga jednak pomiaru, ile wizyt rzeczywiście przybyło
                    dzięki zmianie obsługi.
                  </p>
                  <p className={proseClassName}>
                    W tym przykładzie 2000 zł oznacza cały miesięczny koszt dla
                    ocenianego wolumenu, łącznie z wymaganymi opłatami
                    zewnętrznymi. Jeżeli rzeczywista suma jest wyższa, próg
                    trzeba odpowiednio przeliczyć.
                  </p>
                </div>
              </section>

              <section
                id="po-jakim-czasie-zwraca-sie-koszt-wdrozenia"
                aria-labelledby="heading-zwrot"
                className={cn(
                  "flex flex-col gap-6 border-t border-border pt-10",
                  sectionScrollMargin,
                )}
              >
                <h2 id="heading-zwrot" className="section-title">
                  Po jakim czasie zwraca się koszt wdrożenia?
                </h2>
                <p className={proseClassName}>
                  Pokrycie kosztów bieżących i odzyskanie jednorazowych 3000 zł
                  za wdrożenie to dwa etapy kalkulacji.
                </p>
                <p className={proseClassName}>
                  Przyjmijmy miesięczny koszt 2000 zł i 150 zł pozostające
                  placówce z każdej dodatkowej wizyty:
                </p>
                <ArticleTable
                  caption={article.paybackTable.caption}
                  columns={article.paybackTable.columns}
                  rows={article.paybackTable.rows}
                  align={["left", "right", "right", "left"]}
                />
                <p className={proseClassName}>
                  Obliczenie jest proste: koszt wdrożenia dzielimy przez
                  miesięczną nadwyżkę po kosztach bieżących.
                </p>
                <p className={proseClassName}>
                  Przy 30 dodatkowych wizytach otrzymujemy:
                </p>
                <div className="rounded-3xl bg-[#062059] p-6 text-white sm:p-7">
                  <p className="subsection-title text-xl text-white sm:text-2xl">
                    <strong>3000 zł ÷ 2500 zł = około 1,2 miesiąca.</strong>
                  </p>
                </div>
                <p className={proseClassName}>
                  Zakładamy stałą liczbę dodatkowych wizyt i pełny miesięczny
                  koszt utrzymany na poziomie 2000 zł. Jeśli wzrost ruchu
                  podnosi rachunek za rozmowy lub SMS, trzeba uwzględnić go
                  ponownie.
                </p>
                <p className={proseClassName}>
                  Żeby przy tych samych założeniach pokryć wdrożenie oraz 2000
                  zł obsługi już w pierwszym miesiącu, potrzeba 34 dodatkowych
                  wizyt. W praktyce okres uruchamiania i optymalizacji może
                  wpływać na tempo uzyskiwania wyników.
                </p>
              </section>

              <section
                id="skad-moga-pochodzic-dodatkowe-wizyty"
                aria-labelledby="heading-zrodla-wizyt"
                className={cn(
                  "flex flex-col gap-6 border-t border-border pt-10",
                  sectionScrollMargin,
                )}
              >
                <h2 id="heading-zrodla-wizyt" className="section-title">
                  Skąd mogą pochodzić dodatkowe wizyty?
                </h2>

                <div className={cardClassName}>
                  <h3 className="subsection-title text-xl text-foreground sm:text-2xl">
                    Skuteczna obsługa telefonów zainteresowanych pacjentów
                  </h3>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Asystent może obsłużyć zgłoszenia, których rejestracja nie
                    mogła wcześniej przyjąć. Korzyść finansowa pojawia się
                    wtedy, gdy kontakt prowadzi do dodatkowej, opłaconej wizyty.
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Trzeba uwzględnić pacjentów, którzy i tak dodzwoniliby się
                    później lub zapisali przez internet. Sam wzrost liczby
                    odebranych telefonów nie określa jeszcze przyrostu
                    przychodu.
                  </p>
                </div>

                <div className={cardClassName}>
                  <h3 className="subsection-title text-xl text-foreground sm:text-2xl">
                    Mniej nieodwołanych nieobecności
                  </h3>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Potwierdzenia i przypomnienia mogą pomagać pacjentom
                    pamiętać o terminie oraz zgłaszać rezygnację wcześniej.
                    VoiceLink umożliwia obsługę takich kontaktów przez SMS i
                    telefon.
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Badania wspierają zasadność stosowania przypomnień. Przegląd
                    Cochrane z 2013 roku obejmujący osiem badań z randomizacją
                    wskazywał poprawę obecności po przypomnieniach SMS w
                    porównaniu z ich brakiem. Jakość dowodów oceniono jako niską
                    do umiarkowanej.
                    <CitationLink number={3} />
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Konkretny poziom nieobecności wymaga jednak pomiaru w danej
                    placówce. Wariant spadku do 5% można wykorzystać w
                    symulacji, podając go jako założenie. Finansowy efekt zależy
                    również od tego, czy zwolnione terminy uda się obsadzić.
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Przy zliczaniu korzyści tę samą wizytę uwzględniamy tylko
                    raz, nawet jeśli pacjent skorzystał z kilku automatycznych
                    kontaktów.
                  </p>
                </div>
              </section>

              <section
                id="jak-uwzglednic-odzyskany-czas-rejestracji"
                aria-labelledby="heading-czas"
                className={cn(
                  "flex flex-col gap-4 border-t border-border pt-10",
                  sectionScrollMargin,
                )}
              >
                <h2 id="heading-czas" className="section-title">
                  Jak uwzględnić odzyskany czas rejestracji?
                </h2>
                <p className={proseClassName}>
                  Przejęcie powtarzalnych rozmów może pozwolić pracownikom
                  sprawniej obsługiwać pacjentów na miejscu i ograniczyć
                  zaległości.
                </p>
                <p className={proseClassName}>
                  Wartość tego czasu warto pokazać oddzielnie. Jeśli
                  wynagrodzenia i obsada pozostają takie same, odzyskane godziny
                  nie są automatycznie oszczędnością gotówkową. W analizie
                  finansowej można natomiast uwzględnić rzeczywiście ograniczone
                  nadgodziny lub wydatki na zewnętrzną obsługę.
                </p>
                <p className={proseClassName}>
                  Po stronie pracy personelu należy również policzyć sprawy
                  przekazane przez asystenta, poprawki i bieżący nadzór. Dzięki
                  temu wynik pokazuje rzeczywiste odciążenie zespołu.
                </p>
              </section>

              <section
                id="jak-pilotaz-pomaga-sprawdzic-oplacalnosc"
                aria-labelledby="heading-pilotaz"
                className={cn(
                  "flex flex-col gap-4 border-t border-border pt-10",
                  sectionScrollMargin,
                )}
              >
                <h2 id="heading-pilotaz" className="section-title">
                  Jak pilotaż pomaga sprawdzić opłacalność?
                </h2>
                <p className={proseClassName}>
                  W VoiceLink współpraca rozpoczyna się miesięczną umową
                  pilotażową. W tym okresie optymalizujemy asystenta i
                  sprawdzamy szacunkowe wykorzystanie minut oraz wiadomości.
                </p>
                <p className={proseClassName}>
                  Następnie współpraca odbywa się na czas nieokreślony z
                  miesięcznym okresem wypowiedzenia. Koszty wykorzystania
                  podczas pilotażu i szczegółowy zakres prac określają ustalenia
                  umowne.
                </p>
                <p className={proseClassName}>
                  Pilotaż pozwala porównać prognozę z rzeczywistym ruchem. Warto
                  oceniać koszty, skuteczność zakończenia spraw, czas pracy
                  rejestracji i wyniki rezerwacji. Liczbę dodatkowych wizyt oraz
                  nieobecności należy porównywać z podobnym okresem,
                  uwzględniając zmiany w grafiku i sezonowość.
                </p>
              </section>

              <section
                id="najczestsze-pytania-o-cene-voicebota-medycznego"
                aria-labelledby="heading-faq"
                className={cn(
                  "flex flex-col gap-6 border-t border-border pt-10",
                  sectionScrollMargin,
                )}
              >
                <h2 id="heading-faq" className="section-title">
                  Najczęstsze pytania o cenę voicebota medycznego
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
                id="policz-oplacalnosc-voicelink-dla-swojej-placowki"
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
                  Policz opłacalność VoiceLink dla swojej placówki
                </h2>
                <p className="text-base leading-7 text-pretty text-white/90 sm:text-lg sm:leading-8">
                  Najlepszym punktem wyjścia są dane o rozmowach, wizytach i
                  kosztach ich realizacji. Na tej podstawie można ustalić
                  budżet, próg opłacalności i wynik potrzebny do odzyskania
                  kosztu wdrożenia.
                </p>
                <p className="text-base leading-7 text-pretty text-white/90 sm:text-lg sm:leading-8">
                  Podczas analizy obsługi telefonicznej pacjentów omówimy ruch w
                  Twojej placówce, sposób potwierdzania terminów, dostępny
                  system i potrzebne integracje.
                </p>
                <p className="text-base leading-7 font-medium text-pretty text-white sm:text-lg sm:leading-8">
                  <strong>
                    Umów analizę obsługi telefonicznej pacjentów i sprawdź koszt
                    oraz opłacalność VoiceLink dla swojej placówki.
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
                  Źródła i podstawa wyliczeń
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
                        <a
                          href={source.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-medium text-primary underline underline-offset-4 hover:opacity-80"
                        >
                          <span>{source.linkLabel}</span>
                          <ArrowUpRightIcon
                            aria-hidden="true"
                            className="size-3.5"
                          />
                        </a>
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
