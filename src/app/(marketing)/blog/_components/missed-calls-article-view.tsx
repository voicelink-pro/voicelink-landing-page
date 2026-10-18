import Link from "next/link";
import { ArrowRightIcon, ArrowUpRightIcon } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionEyebrow } from "@/components/layout/section-eyebrow";
import { buttonVariants } from "@/components/ui/button";
import { contactHref } from "@/config/navigation";
import { cn } from "@/lib/utils";

import { missedCallsArticle } from "../_content/blog";
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

const sectionScrollMargin =
  "scroll-mt-[calc(var(--site-header-height)+1.5rem)]";

export function MissedCallsArticleView() {
  const article = missedCallsArticle;

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
                  Policz koszty w swojej placówce
                </p>
                <p className="mt-2.5 text-sm leading-6 text-white/85">
                  Skorzystaj z kalkulatora oszczędności lub umów rozmowę z
                  zespołem VoiceLink, aby przeanalizować ruch telefoniczny w
                  Twojej rejestracji.
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
                id="dlaczego-placowka-nie-odbiera-wszystkich-telefonow"
                aria-labelledby="heading-dlaczego"
                className={cn("flex flex-col gap-4", sectionScrollMargin)}
              >
                <h2 id="heading-dlaczego" className="section-title">
                  Dlaczego placówka nie odbiera wszystkich telefonów?
                </h2>
                <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                  W rejestracji kilka spraw często wymaga uwagi w tej samej
                  chwili. Pacjent przy okienku chce zapłacić za wizytę. Kolejny
                  potrzebuje informacji o gabinecie. W tym czasie dzwoni osoba
                  zainteresowana konsultacją, a na drugim połączeniu ktoś
                  próbuje przełożyć termin.
                </p>
                <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                  Z rozmów prowadzonych przez VoiceLink z placówkami wynika, że
                  skala ruchu bywa bardzo różna. Spotykamy się zarówno z około
                  30, jak i 250 połączeniami dziennie. Wskazywany udział
                  nieodebranych telefonów wynosi od około 20% do nawet 80%. To
                  obserwacje z konkretnych rozmów i placówek, a nie
                  reprezentatywna statystyka dla polskiego rynku.
                </p>
                <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                  Powtarzają się natomiast podobne trudności: jednoczesna
                  obsługa pacjentów na miejscu i przez telefon, spiętrzenia
                  połączeń oraz brak czasu na oddzwanianie. W prywatnych
                  przychodniach większy ruch może występować zarówno rano, jak i
                  w godzinach południowych. Własny rozkład połączeń warto więc
                  sprawdzić przed zmianą grafiku zespołu.
                </p>
              </section>

              <section
                id="co-placowka-traci-gdy-pacjent-sie-nie-dodzwoni"
                aria-labelledby="heading-co-traci"
                className={cn(
                  "flex flex-col gap-6 border-t border-border pt-10",
                  sectionScrollMargin,
                )}
              >
                <h2 id="heading-co-traci" className="section-title">
                  Co placówka traci, gdy pacjent się nie dodzwoni?
                </h2>

                <div className="flex flex-col gap-4">
                  <h3 className="subsection-title text-xl text-foreground sm:text-2xl">
                    Niezarezerwowane wizyty
                  </h3>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Osoba zainteresowana prywatną konsultacją może zadzwonić
                    ponownie, skorzystać z zapisów internetowych albo wybrać
                    inny gabinet. Dopiero ostatnia sytuacja może oznaczać
                    utraconą rezerwację dla placówki, jeśli miała ona
                    odpowiednią usługę i dostępny termin.
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Znaczenie ma również skuteczność późniejszego kontaktu. Samo
                    wykonanie połączenia zwrotnego nie oznacza odzyskania
                    pacjenta. Trzeba ustalić, czy udało się porozmawiać i
                    rozwiązać jego sprawę.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="subsection-title text-xl text-foreground sm:text-2xl">
                    Terminy, których nie udało się odwołać
                  </h3>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Zajęta linia utrudnia również zgłoszenie nieobecności.
                    Pacjent może próbować odwołać konsultację, ale informacja
                    nie dociera do rejestracji na czas. W grafiku pozostaje
                    zajęty termin, którego placówka nie może zaproponować komuś
                    innemu.
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Ten problem znajduje odzwierciedlenie w polskich badaniach.
                    W ogólnopolskiej ankiecie przeprowadzonej w sierpniu 2025
                    roku i opublikowanej w „Medical Science Monitor” w marcu
                    2026 roku uczestniczyły 1162 osoby. Spośród 142 respondentów
                    deklarujących co najmniej jedną nieodwołaną nieobecność na
                    wizycie, 27,5% wskazało niemożność dodzwonienia się do
                    placówki jako przyczynę.
                    <CitationLink number={1} />
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    To deklaracje badanych, a nie pomiar połączeń z central
                    telefonicznych. Wynik nie oznacza, że 27,5% wszystkich wizyt
                    przepada z powodu zajętego telefonu. Pokazuje jednak, że
                    dostępność kontaktu zasługuje na uwagę także przy analizie
                    nieobecności pacjentów.
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Narodowy Fundusz Zdrowia również zwracał uwagę, że otrzymuje
                    sygnały i skargi dotyczące trudności z telefonicznym
                    odwołaniem wizyty. W komunikacie z 2024 roku podkreślił
                    znaczenie zapewnienia pacjentom realnego kontaktu z
                    placówką.
                    <CitationLink number={2} />
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="subsection-title text-xl text-foreground sm:text-2xl">
                    Dodatkowa praca rejestracji
                  </h3>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Nieobsłużona sprawa może wrócić jako kolejne połączenie,
                    wiadomość lub osobista wizyta przy okienku. Zespół ponownie
                    ustala powód kontaktu i szuka rozwiązania.
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Ten czas ma wartość, ale jego odzyskanie nie musi oznaczać
                    obniżenia kosztów wynagrodzeń. Może przede wszystkim
                    pozwolić lepiej obsłużyć pacjentów obecnych w przychodni i
                    ograniczyć zaległości. Przy ocenie korzyści warto rozdzielić
                    oszczędność czasu od rzeczywistego spadku wydatków.
                  </p>
                </div>
              </section>

              <section
                id="jak-obliczyc-koszt-nieodebranych-telefonow-w-przychodni"
                aria-labelledby="heading-jak-obliczyc"
                className={cn(
                  "flex flex-col gap-6 border-t border-border pt-10",
                  sectionScrollMargin,
                )}
              >
                <h2 id="heading-jak-obliczyc" className="section-title">
                  Jak obliczyć koszt nieodebranych telefonów w przychodni?
                </h2>

                <div className="rounded-3xl border border-primary/20 bg-secondary p-6 sm:p-7">
                  <p className="text-base leading-7 font-medium text-pretty text-foreground sm:text-lg sm:leading-8">
                    <strong>
                      Potencjalny utracony przychód można oszacować, mnożąc
                      liczbę nieobsłużonych spraw dotyczących rezerwacji przez
                      prawdopodobieństwo zakończenia ich płatną wizytą oraz
                      średni przychód z takiej wizyty.
                    </strong>
                  </p>
                  <p className="mt-3 text-base leading-7 text-muted-foreground">
                    Najwięcej uwagi wymaga ustalenie dwóch pierwszych wartości.
                  </p>
                </div>

                <div className="grid gap-8">
                  <div className="flex flex-col gap-3">
                    <span className="text-xs font-semibold tracking-[0.16em] text-eyebrow uppercase tabular-nums">
                      01
                    </span>
                    <h3 className="subsection-title text-xl text-foreground sm:text-2xl">
                      Krok 1. Policz sprawy, które pozostały bez obsługi
                    </h3>
                    <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                      Jedna osoba może wykonać pięć prób połączenia w tej samej
                      sprawie. W raporcie pojawi się pięć nieodebranych
                      telefonów, choć chodzi o jedną potrzebę kontaktu.
                    </p>
                    <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                      Z analizy trzeba też wyłączyć sprawy rozwiązane później
                      przez rejestrację, internet lub kontakt osobisty. Sam
                      numer telefonu nie zawsze pozwala ustalić liczbę
                      pacjentów, ponieważ z jednego numeru może korzystać
                      rodzina.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <span className="text-xs font-semibold tracking-[0.16em] text-eyebrow uppercase tabular-nums">
                      02
                    </span>
                    <h3 className="subsection-title text-xl text-foreground sm:text-2xl">
                      Krok 2. Ustal, ile spraw dotyczyło rezerwacji
                    </h3>
                    <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                      W rozmowach z placówkami spotykamy się z szacunkami, że
                      około 60% do 70% telefonów dotyczy umawiania wizyt.
                      Pozostałe obejmują między innymi recepty, zmiany terminów
                      i odwołania. To wskazówka do rozpoczęcia analizy, którą
                      trzeba zweryfikować we własnej rejestracji.
                    </p>
                    <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                      Powód kontaktu osób, które się nie dodzwoniły, często
                      pozostaje nieznany. Pomocne mogą być wyniki oddzwaniania
                      oraz porównanie z tematami odebranych rozmów. Takie
                      szacunki nadal warto przedstawiać jako przybliżenie.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <span className="text-xs font-semibold tracking-[0.16em] text-eyebrow uppercase tabular-nums">
                      03
                    </span>
                    <h3 className="subsection-title text-xl text-foreground sm:text-2xl">
                      Krok 3. Uwzględnij możliwość zrealizowania wizyty
                    </h3>
                    <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                      Zapytanie o termin nie gwarantuje rezerwacji. Pacjent może
                      nie zaakceptować ceny, potrzebować innego specjalisty lub
                      szukać wcześniejszej daty.
                    </p>
                    <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                      Do wyliczenia przychodu najlepiej przyjąć szansę na wizytę
                      faktycznie zrealizowaną i opłaconą. Jeżeli znamy tylko
                      liczbę rezerwacji, trzeba dodatkowo uwzględnić późniejsze
                      odwołania i nieobecności. Pomocne są wyniki obsłużonych,
                      podobnych zapytań, choć nie muszą one dokładnie odpowiadać
                      zachowaniu osób, z którymi nie udało się porozmawiać.
                    </p>
                  </div>
                </div>
              </section>

              <section
                id="przyklad-100-polaczen-dziennie-i-wizyta-za-300-zl"
                aria-labelledby="heading-przyklad"
                className={cn(
                  "flex flex-col gap-6 border-t border-border pt-10",
                  sectionScrollMargin,
                )}
              >
                <h2 id="heading-przyklad" className="section-title">
                  Przykład: 100 połączeń dziennie i wizyta za 300 zł
                </h2>
                <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                  Przyjmijmy prywatną przychodnię pracującą przez 22 dni w
                  miesiącu. Poniższe liczby tworzą przykład obliczeniowy. Nie są
                  wynikiem audytu konkretnego klienta ani obietnicą efektów
                  wdrożenia.
                </p>

                <div className="overflow-hidden rounded-[1.125rem] bg-white ring-1 ring-foreground/8">
                  <table className="w-full border-collapse text-left">
                    <caption className="sr-only">
                      {article.exampleTable.caption}
                    </caption>
                    <thead>
                      <tr className="border-b border-border bg-muted/60">
                        <th
                          scope="col"
                          className="px-5 py-3.5 text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase sm:px-6 sm:py-4"
                        >
                          {article.exampleTable.columns.assumption}
                        </th>
                        <th
                          scope="col"
                          className="px-5 py-3.5 text-right text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase sm:px-6 sm:py-4"
                        >
                          {article.exampleTable.columns.value}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {article.exampleTable.rows.map((row) => (
                        <tr key={row.label}>
                          <th
                            scope="row"
                            className="px-5 py-4 text-left text-sm leading-6 font-normal text-pretty text-foreground sm:px-6 sm:text-base"
                          >
                            {row.label}
                          </th>
                          <td className="px-5 py-4 text-right text-sm font-medium whitespace-nowrap text-foreground tabular-nums sm:px-6 sm:text-base">
                            {row.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="rounded-3xl bg-[#062059] p-6 text-white sm:p-7">
                  <p className="text-xs font-semibold tracking-[0.14em] text-white/75 uppercase">
                    Wynik przykładowego wyliczenia
                  </p>
                  <p className="subsection-title mt-2 text-xl text-white sm:text-2xl">
                    <strong>{article.exampleTable.resultHighlight}</strong>
                  </p>
                </div>

                <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                  Przejście od 660 nieodebranych prób do 300 nieobsłużonych
                  spraw jest osobnym założeniem. W rzeczywistej analizie trzeba
                  je zastąpić ustaleniami z raportów i historii kontaktu.
                </p>
                <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                  Wynik zależy też od przyjętej skuteczności. Gdyby szansa na
                  zrealizowaną wizytę wynosiła 25%, przy tych samych pozostałych
                  założeniach otrzymalibyśmy 45 wizyt i 13 500 zł potencjalnego
                  przychodu. Dlatego warto porównywać kilka scenariuszy.
                </p>

                <div className="flex flex-col gap-4">
                  <h3 className="subsection-title text-xl text-foreground sm:text-2xl">
                    Przychód z wizyty a zysk placówki
                  </h3>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Z przychodu trzeba pokryć między innymi wynagrodzenie
                    lekarza, materiały i inne koszty wykonania świadczenia. Przy
                    ocenie opłacalności poprawy obsługi należy uwzględnić także
                    koszt wybranego rozwiązania.
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Ograniczeniem jest również terminarz. Jeżeli przychodnia ma
                    miejsce jedynie na 40 dodatkowych wizyt w danym miesiącu,
                    przy cenie 300 zł ich przychód wyniesie najwyżej 12 000 zł.
                    Pozostałe zapytania mogą zakończyć się późniejszą
                    rezerwacją, ale nie powinny powiększać wyniku za ten sam
                    miesiąc.
                  </p>
                </div>
              </section>

              <section
                id="czy-nieodebrany-telefon-ma-takie-samo-znaczenie-w-placowce-publicznej"
                aria-labelledby="heading-publiczna"
                className={cn(
                  "flex flex-col gap-4 border-t border-border pt-10",
                  sectionScrollMargin,
                )}
              >
                <h2 id="heading-publiczna" className="section-title">
                  Czy nieodebrany telefon ma takie samo znaczenie w placówce
                  publicznej?
                </h2>
                <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                  W publicznej placówce skutki finansowe zależą od rodzaju
                  świadczeń i sposobu ich rozliczania. Liczby nieodebranych
                  połączeń nie można po prostu pomnożyć przez cenę prywatnej
                  konsultacji.
                </p>
                <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                  Pozostają natomiast problemy z dostępnością świadczeń,
                  odwoływaniem terminów i obciążeniem rejestracji. Rzecznik Praw
                  Pacjenta podkreśla, że w podstawowej opiece zdrowotnej kontakt
                  telefoniczny powinien być rzeczywiście dostępny bez zbędnej
                  zwłoki. Samo udostępnienie numeru telefonu nie wystarcza.
                  <CitationLink number={3} />
                </p>
              </section>

              <section
                id="jak-ograniczyc-liczbe-nieodebranych-telefonow"
                aria-labelledby="heading-jak-ograniczyc"
                className={cn(
                  "flex flex-col gap-6 border-t border-border pt-10",
                  sectionScrollMargin,
                )}
              >
                <h2 id="heading-jak-ograniczyc" className="section-title">
                  Jak ograniczyć liczbę nieodebranych telefonów?
                </h2>

                <div className="grid gap-8">
                  <div className="flex flex-col gap-3">
                    <h3 className="subsection-title text-xl text-foreground sm:text-2xl">
                      Dopasuj obsadę do godzin największego ruchu
                    </h3>
                    <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                      Przeanalizuj połączenia w przedziałach po 30 minut.
                      Porównaj ruch telefoniczny z liczbą pacjentów
                      obsługiwanych na miejscu. Sprawdź, czy w najbardziej
                      obciążonych godzinach można przeznaczyć część czasu
                      zespołu wyłącznie na kontakt telefoniczny.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <h3 className="subsection-title text-xl text-foreground sm:text-2xl">
                      Ustal, kto odpowiada za oddzwanianie
                    </h3>
                    <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                      Lista nieodebranych połączeń potrzebuje osoby
                      odpowiedzialnej za jej obsługę oraz ustalonego czasu
                      reakcji. Warto zapisywać wynik kontaktu, aby kolejne osoby
                      z zespołu wiedziały, czy sprawa została rozwiązana.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <h3 className="subsection-title text-xl text-foreground sm:text-2xl">
                      Ułatw zmianę i odwołanie terminu
                    </h3>
                    <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                      Przypomnienie o wizycie powinno wskazywać dostępną drogę
                      rezygnacji. Może to być telefon, link lub odpowiedź na
                      wiadomość, zależnie od możliwości placówki. Odwołany
                      termin musi następnie trafić do terminarza, aby można było
                      zaproponować go innej osobie.
                    </p>
                    <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                      W analizie finansowej trzeba uważać na podwójne liczenie.
                      Korzyści z odzyskania rezerwacji i ponownego obsadzenia
                      zwolnionych terminów należy przypisywać do konkretnych
                      wizyt, aby tej samej nie uwzględnić dwa razy.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <h3 className="subsection-title text-xl text-foreground sm:text-2xl">
                      Sprawdź, które rozmowy może obsłużyć asystent głosowy
                    </h3>
                    <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                      Przy powtarzalnych sprawach wsparciem może być asystent
                      głosowy AI. W zależności od konfiguracji VoiceLink może
                      przejmować połączenia, gdy rejestracja jest zajęta, lub
                      obsługiwać pacjentów poza jej godzinami pracy.
                    </p>
                    <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                      Zakres obejmujący rezerwację, zmianę i odwołanie wizyty
                      zależy od integracji z systemem placówki. Sprawy
                      wymagające udziału pracownika powinny mieć określoną
                      ścieżkę przekazania.
                    </p>
                    <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                      Efekt warto mierzyć liczbą rozwiązanych spraw i
                      zrealizowanych wizyt. Samo odebranie telefonu przez system
                      nie przesądza jeszcze, że pacjent otrzymał pomoc, której
                      potrzebował.
                    </p>
                  </div>
                </div>
              </section>

              <section
                id="jak-sprawdzic-skale-problemu-w-swojej-placowce"
                aria-labelledby="heading-jak-sprawdzic"
                className={cn(
                  "flex flex-col gap-4 border-t border-border pt-10",
                  sectionScrollMargin,
                )}
              >
                <h2 id="heading-jak-sprawdzic" className="section-title">
                  Jak sprawdzić skalę problemu w swojej placówce?
                </h2>
                <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                  Dobrym początkiem jest analiza co najmniej dwóch typowych
                  tygodni pracy. Powinna obejmować także dni i godziny
                  największego ruchu. Krótki pomiar warto później porównać z
                  innym okresem, szczególnie jeśli przychodnia działa sezonowo.
                </p>
                <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                  Potrzebne będą liczby połączeń odebranych, nieodebranych i
                  przerwanych podczas oczekiwania, godziny kontaktu oraz wyniki
                  oddzwaniania. Do oceny finansowej dochodzą powody zgłoszeń,
                  skuteczność rezerwacji, średnia wartość zrealizowanej wizyty i
                  wolne miejsca w grafiku.
                </p>
                <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                  Dopiero takie zestawienie pozwala ocenić, czy największym
                  problemem jest obsada rejestracji, organizacja oddzwaniania,
                  dostępność terminów czy obsługa powtarzalnych pytań.
                </p>
              </section>

              <section
                id="najczestsze-pytania-o-nieodebrane-telefony-w-placowce-medycznej"
                aria-labelledby="heading-faq"
                className={cn(
                  "flex flex-col gap-6 border-t border-border pt-10",
                  sectionScrollMargin,
                )}
              >
                <h2 id="heading-faq" className="section-title">
                  Najczęstsze pytania o nieodebrane telefony w placówce
                  medycznej
                </h2>

                <div className="grid gap-8">
                  {article.faq.map((item) => (
                    <div key={item.id} className="flex flex-col gap-3">
                      <h3 className="subsection-title text-xl text-foreground sm:text-2xl">
                        {item.question}
                      </h3>
                      <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                        {item.answer}
                        {"citation" in item && item.citation ? (
                          <CitationLink number={item.citation} />
                        ) : null}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section
                id="umow-analize-obslugi-telefonicznej-pacjentow"
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
                  Umów analizę obsługi telefonicznej pacjentów
                </h2>
                <p className="text-base leading-7 text-pretty text-white/90 sm:text-lg sm:leading-8">
                  Jeżeli chcesz ustalić, ile nieodebrane telefony mogą kosztować
                  Twoją placówkę, zacznijmy od sposobu pracy rejestracji i
                  dostępnych danych.
                </p>
                <p className="text-base leading-7 text-pretty text-white/90 sm:text-lg sm:leading-8">
                  Podczas analizy obsługi telefonicznej pacjentów z zespołem
                  VoiceLink przyjrzymy się liczbie zgłoszeń, godzinom
                  największego obciążenia, oddzwanianiu i najczęstszym sprawom
                  pacjentów. Omówimy, gdzie warto poprawić organizację pracy i
                  które zadania może przejąć asystent głosowy.
                </p>
                <p className="text-base leading-7 font-medium text-pretty text-white sm:text-lg sm:leading-8">
                  <strong>
                    Umów analizę obsługi telefonicznej pacjentów i sprawdź,
                    gdzie Twoja placówka może poprawić dostępność rejestracji.
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
