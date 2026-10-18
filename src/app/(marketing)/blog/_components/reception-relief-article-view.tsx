import Link from "next/link";
import { ArrowRightIcon, ArrowUpRightIcon } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionEyebrow } from "@/components/layout/section-eyebrow";
import { buttonVariants } from "@/components/ui/button";
import { contactHref } from "@/config/navigation";
import { cn } from "@/lib/utils";

import { receptionReliefArticle } from "../_content/blog";
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

export function ReceptionReliefArticleView() {
  const article = receptionReliefArticle;

  return (
    <>
      <ArticleHero
        title={article.title}
        author={article.author}
        publishedAt={article.publishedAt}
        publishedDateLabel={article.publishedDateLabel}
        readingTime={article.readingTime}
        coverImage={article.coverImage}
        coverPosition="object-[center_36%]"
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
                  Sprawdź obciążenie swojej rejestracji
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
                id="dlaczego-dwie-lub-trzy-osoby-na-rejestracji-wciaz-maja-za-duzo-pracy"
                aria-labelledby="heading-dlaczego"
                className={cn("flex flex-col gap-4", sectionScrollMargin)}
              >
                <h2 id="heading-dlaczego" className="section-title">
                  Dlaczego dwie lub trzy osoby na rejestracji wciąż mają za dużo
                  pracy?
                </h2>
                <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                  W placówkach, z którymi rozmawiamy w VoiceLink, na jednej
                  zmianie często pracują dwie lub trzy osoby. Według
                  przekazywanych nam szacunków przeciętna rozmowa trwa około
                  trzech do czterech minut. W tym czasie do rejestracji
                  podchodzą kolejni pacjenci, trzeba przyjąć płatność i
                  sprawdzić zmiany w grafiku.
                </p>
                <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                  Dużym obciążeniem jest przerywanie jednej czynności, aby
                  rozpocząć następną. Pracownik wraca do niedokończonej sprawy,
                  ponownie sprawdza dane i przypomina sobie, co zostało już
                  ustalone.
                </p>
                <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                  Podobne trudności opisano w badaniu 70 pracowników rejestracji
                  w Anglii, opublikowanym w 2020 roku w „BMC Family Practice”.
                  Autorzy wskazali wysokie wymagania związane z różnorodnością
                  obowiązków i przetwarzaniem informacji. Jako jedną z
                  możliwości wsparcia zespołu zaproponowali rozdzielenie
                  złożonych czynności i ograniczenie przerw w pracy. To małe
                  badanie zagraniczne, ale dobrze ilustruje mechanizm znany
                  również z codziennej pracy polskich rejestracji.
                  <CitationLink number={1} />
                </p>
                <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                  Przed zwiększeniem zatrudnienia warto więc ustalić, jakie
                  obowiązki zajmują najwięcej czasu i które z nich wymagają
                  każdorazowo rozmowy z pracownikiem.
                </p>
              </section>

              <section
                id="ktore-zadania-rejestracji-medycznej-mozna-zautomatyzowac"
                aria-labelledby="heading-zadania"
                className={cn(
                  "flex flex-col gap-6 border-t border-border pt-10",
                  sectionScrollMargin,
                )}
              >
                <h2 id="heading-zadania" className="section-title">
                  Które zadania rejestracji medycznej można zautomatyzować?
                </h2>

                <div className="flex flex-col gap-4">
                  <h3 className="subsection-title text-xl text-foreground sm:text-2xl">
                    Umawianie, zmiany i odwoływanie wizyt
                  </h3>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Rezerwacja wymaga sprawdzenia usługi, lekarza i dostępnego
                    terminu, a następnie zapisania danych pacjenta. Podobny
                    schemat powtarza się przy kolejnych rozmowach.
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Asystent głosowy połączony z terminarzem może przeprowadzić
                    pacjenta przez ten proces. Zakres automatyzacji zależy od
                    integracji oraz zasad zapisów obowiązujących w placówce.
                    Trzeba ustalić między innymi długość wizyt, ograniczenia
                    wiekowe, sposób wyboru usługi i przypadki wymagające
                    kontaktu z rejestracją.
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Największe odciążenie daje zakończenie sprawy w systemie
                    placówki. Jeśli pracownik musi później odsłuchać każdą
                    rozmowę i ręcznie przepisać rezerwację, znaczna część pracy
                    pozostaje.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="subsection-title text-xl text-foreground sm:text-2xl">
                    Potwierdzanie wizyt przez SMS i telefon
                  </h3>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Ręczne potwierdzanie wizyt zajmuje czas także wtedy, gdy
                    pacjent nie odbiera. Pracownik wybiera numer, czeka,
                    podejmuje kolejną próbę i odnotowuje wynik.
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    VoiceLink może realizować potwierdzenia telefoniczne i SMS.
                    Sposób obsługi odpowiedzi oraz aktualizacji statusu wizyty
                    ustala się w ramach wdrożenia. Potwierdzenie, prośba o
                    zmianę terminu i brak odpowiedzi powinny uruchamiać
                    odpowiednie dalsze działania.
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Przypomnienia mają również znaczenie dla frekwencji.
                    Przegląd Cochrane z 2013 roku obejmujący osiem badań z
                    randomizacją i 6615 uczestników wskazywał, że przypomnienia
                    SMS poprawiały obecność na wizytach w porównaniu z brakiem
                    przypomnień. Jakość dowodów oceniono jako niską do
                    umiarkowanej. Wyniki dotyczą przypomnień, a nie konkretnego
                    współczesnego asystenta AI, i nie pozwalają obiecać
                    jednakowej redukcji nieobecności w każdej przychodni.
                    <CitationLink number={2} />
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="subsection-title text-xl text-foreground sm:text-2xl">
                    Odpowiedzi na powtarzalne pytania
                  </h3>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Godziny otwarcia, adres, cena konsultacji czy zasady
                    przygotowania do badania mogą być tematem wielu podobnych
                    rozmów.
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Asystent może odpowiadać na podstawie informacji
                    zatwierdzonych przez placówkę. Wymaga to aktualizowania bazy
                    wiedzy przy zmianach cennika, oferty i organizacji pracy.
                    Odpowiedzi dotyczące przygotowania do badań powinny być
                    uzgodnione z personelem medycznym.
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Dzięki temu pracownik rzadziej przerywa obsługę pacjenta na
                    miejscu, aby kolejny raz przekazać tę samą informację.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="subsection-title text-xl text-foreground sm:text-2xl">
                    Wysyłanie linków do płatności
                  </h3>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    W placówkach pobierających przedpłaty część pracy wiąże się
                    z przekazaniem pacjentowi sposobu opłacenia wizyty.
                    VoiceLink może wysłać link do płatności w ramach ustalonego
                    procesu obsługi.
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Osobnego ustalenia wymaga sprawdzanie statusu transakcji,
                    obsługa braku wpłaty i ewentualne zwroty. Wysłanie linku
                    automatyzuje konkretną czynność. Dalszy zakres zależy od
                    integracji z systemem płatności i zasad placówki.
                  </p>
                </div>
              </section>

              <section
                id="jak-uporzadkowac-prace-obecnego-zespolu"
                aria-labelledby="heading-zespol"
                className={cn(
                  "flex flex-col gap-6 border-t border-border pt-10",
                  sectionScrollMargin,
                )}
              >
                <h2 id="heading-zespol" className="section-title">
                  Jak uporządkować pracę obecnego zespołu?
                </h2>

                <div className="flex flex-col gap-4">
                  <h3 className="subsection-title text-xl text-foreground sm:text-2xl">
                    Rozdziel obsługę telefoniczną i pracę przy okienku w
                    godzinach szczytu
                  </h3>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Warto sprawdzić, czy w najbardziej obciążonych godzinach
                    jedna osoba może skupić się na pacjentach obecnych w
                    placówce, a druga na sprawach telefonicznych. Podział może
                    obowiązywać tylko przez część zmiany.
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    NHS England w wytycznych dotyczących organizacji pierwszego
                    kontaktu zaleca uwzględnianie wszystkich kanałów: telefonów,
                    zgłoszeń internetowych i pacjentów zgłaszających się
                    osobiście. Dopiero taki obraz pozwala dopasować dostępność
                    zespołu do zapotrzebowania.
                    <CitationLink number={3} />
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="subsection-title text-xl text-foreground sm:text-2xl">
                    Ustal wspólne zasady i odpowiedzialność za zaległe sprawy
                  </h3>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Zespół powinien mieć dostęp do aktualnych informacji o
                    usługach i zasadach rezerwacji. Potrzebuje również jasnego
                    podziału odpowiedzialności za oddzwanianie, odpowiedzi na
                    wiadomości i sprawy przekazane przez asystenta.
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Pacjent, który otrzymał informację o późniejszym kontakcie,
                    powinien wiedzieć, kiedy go oczekiwać. Pracownik przejmujący
                    zgłoszenie musi natomiast wiedzieć, co pozostaje do
                    zrobienia. To ogranicza powtarzanie pracy i ponowne telefony
                    z pytaniem o tę samą sprawę.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="subsection-title text-xl text-foreground sm:text-2xl">
                    Połącz automatyzację z terminarzem i codzienną pracą
                    placówki
                  </h3>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Przegląd 63 badań dotyczących konsultacji internetowych,
                    opublikowany w 2022 roku, wskazywał, że obciążenie personelu
                    zależało między innymi od sposobu wdrożenia. Brak integracji
                    z innym oprogramowaniem i organizacją pracy mógł zwiększać
                    liczbę obowiązków. Badania dotyczyły konsultacji
                    internetowych, ale stanowią przydatną wskazówkę przy
                    projektowaniu obsługi zgłoszeń.
                    <CitationLink number={4} />
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Dlatego przed uruchomieniem asystenta trzeba prześledzić
                    całą sprawę pacjenta: od rozpoczęcia rozmowy do zapisanej
                    wizyty, wysłanej wiadomości lub przekazania pracownikowi.
                  </p>
                </div>
              </section>

              <section
                id="ile-czasu-moze-odzyskac-rejestracja"
                aria-labelledby="heading-czas"
                className={cn(
                  "flex flex-col gap-6 border-t border-border pt-10",
                  sectionScrollMargin,
                )}
              >
                <h2 id="heading-czas" className="section-title">
                  Ile czasu może odzyskać rejestracja? Przykład obliczenia
                </h2>
                <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                  Załóżmy, że zespół obsługuje dziennie 100 rozmów, łącznie z
                  telefonami dotyczącymi rezerwacji i potwierdzeń. Każda zajmuje
                  średnio 3,5 minuty. Daje to 350 minut pracy zespołu, czyli 5
                  godzin i 50 minut dziennie.
                </p>
                <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                  Przyjmijmy, że po wdrożeniu 60% tych spraw kończy się bez
                  udziału rejestracji. Od odzyskanego czasu odejmijmy dodatkową
                  pracę związaną z obsługą systemu.
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
                  To przykład oparty na założeniach, a nie wynik pomiaru u
                  klienta. Przyjęte 60% oznacza sprawy rzeczywiście zakończone
                  bez udziału pracownika. Rozmowy przekazane do rejestracji
                  pozostają w części wymagającej jej pracy. Dodatkowe 25 minut
                  obejmuje czynności powstałe wskutek wdrożenia.
                </p>
                <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                  W obliczeniu uwzględniamy rozmowy, które wcześniej obsługiwał
                  człowiek. Odebranie przez asystenta dodatkowych telefonów,
                  które dotychczas pozostawały nieodebrane, poprawia dostępność
                  placówki, ale nie jest oszczędnością czasu wcześniej
                  poświęcanego przez personel.
                </p>

                <div className="flex flex-col gap-4">
                  <h3 className="subsection-title text-xl text-foreground sm:text-2xl">
                    Czy 68 godzin oznacza oszczędność na wynagrodzeniach?
                  </h3>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Odzyskany czas można przeznaczyć na pacjentów przy okienku,
                    zaległe zadania i wzrost liczby zgłoszeń. Nie oznacza on
                    automatycznie obniżenia wydatków na płace.
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Znaczenie ma także rozkład tych godzin. Kilka minut
                    odzyskanych w różnych momentach dnia nie zawsze pozwala
                    skrócić zmianę. Przy decyzji o kolejnym etacie należy ocenić
                    obciążenie w szczycie oraz potrzebną obsadę podczas urlopów
                    i nieobecności. Osobno warto uwzględnić czas początkowej
                    konfiguracji i szkolenia zespołu.
                  </p>
                </div>
              </section>

              <section
                id="co-jesli-pacjent-nie-porozumie-sie-z-asystentem"
                aria-labelledby="heading-przekazanie"
                className={cn(
                  "flex flex-col gap-6 border-t border-border pt-10",
                  sectionScrollMargin,
                )}
              >
                <h2 id="heading-przekazanie" className="section-title">
                  Co, jeśli pacjent nie porozumie się z asystentem?
                </h2>

                <div className="flex flex-col gap-4">
                  <h3 className="subsection-title text-xl text-foreground sm:text-2xl">
                    Rozmowa powinna mieć jasną ścieżkę przekazania do człowieka
                  </h3>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Pacjent może mówić niewyraźnie, potrzebować nietypowej
                    usługi albo mieć trudność z wyjaśnieniem sprawy. W takim
                    przypadku asystent powinien rozpoznać problem i przekazać
                    kontakt do rejestracji.
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    W VoiceLink jest to element konfiguracji obsługi. Celem jest
                    uniknięcie sytuacji, w której rozmowa trwa mimo braku
                    porozumienia. Trzeba przy tym ustalić dostępność pracowników
                    oraz sposób postępowania poza godzinami ich pracy.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="subsection-title text-xl text-foreground sm:text-2xl">
                    Reakcję starszych pacjentów warto sprawdzić w praktyce
                  </h3>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Przy wdrożeniu znaczenie mają wyraźny głos, tempo
                    wypowiedzi, krótkie pytania i możliwość uzyskania pomocy
                    pracownika. Jakość dźwięku należy sprawdzić przez
                    rzeczywiste połączenie telefoniczne.
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Sam wiek nie przesądza o tym, jak pacjent poradzi sobie z
                    rozmową. Warto analizować sytuacje wymagające powtórzeń i
                    przekazania do rejestracji, a następnie poprawiać sposób
                    prowadzenia rozmowy.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="subsection-title text-xl text-foreground sm:text-2xl">
                    Zespół powinien uczestniczyć we wdrożeniu
                  </h3>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Pracownicy rejestracji znają najczęstsze pytania i wyjątki
                    od zasad zapisów. Ich udział pomaga przygotować asystenta do
                    codziennych sytuacji.
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Warto też uzgodnić, na co zostanie przeznaczony odzyskany
                    czas. Może to być spokojniejsza obsługa na miejscu, szybsze
                    rozwiązywanie trudnych spraw lub ograniczenie zaległości.
                    Taki cel daje zespołowi konkretny powód do zaangażowania.
                  </p>
                </div>
              </section>

              <section
                id="jak-utrzymac-jakosc-obslugi-po-automatyzacji"
                aria-labelledby="heading-jakosc"
                className={cn(
                  "flex flex-col gap-4 border-t border-border pt-10",
                  sectionScrollMargin,
                )}
              >
                <h2 id="heading-jakosc" className="section-title">
                  Jak utrzymać jakość obsługi po automatyzacji?
                </h2>
                <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                  Asystent może konsekwentnie korzystać z ustalonych zasad
                  rozmowy, aktualnej bazy informacji i procedur przekazania
                  kontaktu. Utrzymanie jakości wymaga jednak regularnego
                  sprawdzania efektów.
                </p>
                <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                  W VoiceLink Center można analizować rozmowy i pracę asystenta.
                  W ocenie odciążenia warto uwzględniać udział spraw
                  zakończonych samodzielnie, powody przekazań do rejestracji
                  oraz czas potrzebny na poprawki. Pomocne są również uwagi
                  pacjentów i pracowników.
                </p>
                <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                  Z obserwacji VoiceLink wynika, że po wdrożeniach placówki
                  zwracają uwagę na łatwiejszy kontakt telefoniczny i odciążenie
                  zespołu. Pojawiają się też informacje o lepszym wykorzystaniu
                  terminów. Wielkość zmian w przychodach i nieobecnościach
                  wymaga osobnego pomiaru.
                </p>
              </section>

              <section
                id="najczestsze-pytania-o-odciazenie-rejestracji-medycznej"
                aria-labelledby="heading-faq"
                className={cn(
                  "flex flex-col gap-6 border-t border-border pt-10",
                  sectionScrollMargin,
                )}
              >
                <h2 id="heading-faq" className="section-title">
                  Najczęstsze pytania o odciążenie rejestracji medycznej
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
                  Jeżeli zastanawiasz się, czy Twoja placówka potrzebuje
                  kolejnej osoby na rejestracji, warto najpierw sprawdzić, co
                  zajmuje czas obecnego zespołu.
                </p>
                <p className="text-base leading-7 text-pretty text-white/90 sm:text-lg sm:leading-8">
                  Podczas analizy obsługi telefonicznej pacjentów z VoiceLink
                  przyjrzymy się liczbie rozmów, potwierdzaniu wizyt, godzinom
                  największego ruchu i sposobowi przekazywania spraw. Omówimy,
                  które zadania można zautomatyzować i gdzie potrzebna jest
                  zmiana organizacji pracy.
                </p>
                <p className="text-base leading-7 font-medium text-pretty text-white sm:text-lg sm:leading-8">
                  <strong>
                    Umów analizę obsługi telefonicznej pacjentów i sprawdź, jak
                    odciążyć rejestrację w Twojej placówce.
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
