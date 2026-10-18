import Link from "next/link";
import { ArrowRightIcon, ArrowUpRightIcon } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionEyebrow } from "@/components/layout/section-eyebrow";
import { buttonVariants } from "@/components/ui/button";
import { contactHref } from "@/config/navigation";
import { cn } from "@/lib/utils";

import { noShowArticle } from "../_content/blog";
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

const sectionScrollMargin =
  "scroll-mt-[calc(var(--site-header-height)+1.5rem)]";

const proseClassName =
  "text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8";

const cardClassName = "flex flex-col gap-4";

export function NoShowArticleView() {
  const article = noShowArticle;

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
                  Analiza frekwencji
                </p>
                <p className="subsection-title mt-2 text-xl text-white">
                  Sprawdź potwierdzanie wizyt w swojej placówce
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
                {article.lead.map((paragraph, index) => (
                  <p
                    key={paragraph}
                    className="text-base leading-7 text-pretty text-foreground sm:text-lg sm:leading-8"
                  >
                    {index === 1 ? <strong>{paragraph}</strong> : paragraph}
                  </p>
                ))}
              </div>

              <section
                id="dlaczego-pacjenci-nie-przychodza-na-umowione-wizyty"
                aria-labelledby="heading-dlaczego"
                className={cn("flex flex-col gap-4", sectionScrollMargin)}
              >
                <h2 id="heading-dlaczego" className="section-title">
                  Dlaczego pacjenci nie przychodzą na umówione wizyty?
                </h2>
                <p className={proseClassName}>
                  Nieobecność może mieć kilka przyczyn. Pacjent zapomniał o
                  terminie, pomylił godzinę, zachorował albo nie jest w stanie
                  dojechać. Przy długim oczekiwaniu mogła też zmienić się jego
                  sytuacja.
                </p>
                <p className={proseClassName}>
                  Z rozmów VoiceLink z placówkami wynika, że powtarzającym się
                  problemem jest również trudność z odwołaniem wizyty. Pacjent
                  próbuje zadzwonić, trafia na zajętą linię lub czeka w kolejce.
                  Odkłada kontakt na później, a placówka nadal widzi w
                  terminarzu zajęte miejsce.
                </p>
                <p className={proseClassName}>
                  Na tę barierę zwraca uwagę także NFZ, który wskazuje, że
                  pacjenci nie zawsze mogą dodzwonić się do placówki, aby
                  zgłosić rezygnację.
                  <CitationLink number={1} />
                </p>
                <p className={proseClassName}>
                  Dlatego warto sprawdzić całą drogę pacjenta. Czy dostał
                  informację o rezerwacji? Czy otrzymał przypomnienie? Czy może
                  odwołać wizytę bez kilkunastu minut oczekiwania na połączenie?
                </p>
              </section>

              <section
                id="potwierdzenie-rezerwacji-przypomnienie-i-potwierdzenie-obecnosci"
                aria-labelledby="heading-trzy"
                className={cn(
                  "flex flex-col gap-6 border-t border-border pt-10",
                  sectionScrollMargin,
                )}
              >
                <h2 id="heading-trzy" className="section-title">
                  Potwierdzenie rezerwacji, przypomnienie i potwierdzenie
                  obecności to trzy różne rzeczy
                </h2>
                <p className={proseClassName}>
                  Te wiadomości mogą wyglądać podobnie, ale każda spełnia inną
                  funkcję.
                </p>

                <div className={cardClassName}>
                  <h3 className="subsection-title text-xl text-foreground sm:text-2xl">
                    Potwierdzenie rezerwacji porządkuje informacje
                  </h3>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Wiadomość wysłana po umówieniu wizyty pozwala pacjentowi
                    sprawdzić datę, godzinę i adres placówki. To szczególnie
                    przydatne, gdy rezerwacja odbyła się przez telefon, a
                    pacjent nie miał możliwości zapisania szczegółów.
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Warto już w tej wiadomości wyjaśnić, jak zmienić termin lub
                    odwołać wizytę.
                  </p>
                </div>

                <div className={cardClassName}>
                  <h3 className="subsection-title text-xl text-foreground sm:text-2xl">
                    Przypomnienie pomaga wrócić do zaplanowanej wizyty
                  </h3>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Pacjent mógł umówić konsultację kilka tygodni wcześniej.
                    Przypomnienie przywraca ją do jego bieżących planów i daje
                    szansę na wcześniejsze zgłoszenie problemu.
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Przegląd Cochrane z 2013 roku, obejmujący 8 badań i 6615
                    uczestników, wskazuje, że przypomnienia SMS poprawiały
                    frekwencję w porównaniu z brakiem przypomnień. Autorzy
                    ocenili jakość dowodów jako niską do umiarkowanej.
                    <CitationLink number={2} />
                  </p>
                </div>

                <div className={cardClassName}>
                  <h3 className="subsection-title text-xl text-foreground sm:text-2xl">
                    Potwierdzenie obecności daje placówce odpowiedź
                  </h3>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Samo wysłanie wiadomości nie mówi jeszcze, czy pacjent
                    zamierza przyjść. Prośba o potwierdzenie pozwala uzyskać
                    odpowiedź i odpowiednio wcześniej zareagować na rezygnację.
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Warto przy tym zachować jasne rozróżnienie:{" "}
                    <strong className="font-medium text-foreground">
                      brak odpowiedzi nie jest tym samym co odwołanie wizyty.
                    </strong>{" "}
                    Pacjent mógł nie zauważyć wiadomości albo nie mieć
                    możliwości odebrania telefonu.
                  </p>
                </div>
              </section>

              <section
                id="jak-powinno-wygladac-skuteczne-przypomnienie-sms-o-wizycie"
                aria-labelledby="heading-sms"
                className={cn(
                  "flex flex-col gap-6 border-t border-border pt-10",
                  sectionScrollMargin,
                )}
              >
                <h2 id="heading-sms" className="section-title">
                  Jak powinno wyglądać skuteczne przypomnienie SMS o wizycie?
                </h2>
                <p className={proseClassName}>
                  Dobra wiadomość pozwala szybko ustalić trzy rzeczy: kiedy jest
                  wizyta, gdzie należy się zgłosić i jak odpowiedzieć.
                </p>
                <p className={proseClassName}>
                  Przykładowa treść może wyglądać tak:
                </p>
                <blockquote className="border-l-2 border-primary pl-4 text-base leading-7 text-pretty text-foreground sm:text-lg">
                  Dzień dobry! Przypominamy o wizycie w {"{nazwa_placówki}"} w
                  dniu {"{data}"} o {"{godzina}"}, pod adresem {"{adres}"}.
                  Prosimy o potwierdzenie odpowiedzią na tę wiadomość. Jeśli nie
                  możesz przyjść, napisz, że odwołujesz wizytę. Zmiana terminu:{" "}
                  {"{telefon}"}.
                </blockquote>
                <p className={proseClassName}>
                  Taki wzór wymaga kanału SMS, który obsługuje odpowiedzi i
                  przekazuje je do właściwej wizyty. Wysłanie wiadomości z
                  numeru, na który nie można odpowiedzieć, wymaga wskazania
                  innej drogi kontaktu.
                </p>

                <div className={cardClassName}>
                  <h3 className="subsection-title text-xl text-foreground sm:text-2xl">
                    Pozwól pacjentowi odpowiedzieć własnymi słowami
                  </h3>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Pacjent nie zawsze napisze dokładnie „TAK”. Może
                    odpowiedzieć „potwierdzam”, „będę” albo „ok”. System
                    powinien obsługiwać takie naturalne odpowiedzi.
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    W VoiceLink{" "}
                    <InternalLink href="/jak-to-dziala/funkcje#funkcje">
                      potwierdzanie wizyt
                    </InternalLink>{" "}
                    może uwzględniać właśnie ten sposób komunikacji. Pacjent
                    odpowiada na wiadomość bez konieczności zapamiętywania
                    jednej wymaganej komendy.
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Trzeba też przewidzieć odpowiedzi mniej jednoznaczne.
                    „Potwierdzam, ale potrzebuję późniejszej godziny” wymaga
                    dalszej obsługi. Taka wiadomość nie powinna kończyć procesu
                    tak samo jak zwykłe potwierdzenie obecności.
                  </p>
                </div>
              </section>

              <section
                id="kiedy-wysylac-przypomnienia-o-wizytach"
                aria-labelledby="heading-kiedy"
                className={cn(
                  "flex flex-col gap-4 border-t border-border pt-10",
                  sectionScrollMargin,
                )}
              >
                <h2 id="heading-kiedy" className="section-title">
                  Kiedy wysyłać przypomnienia o wizytach?
                </h2>
                <p className={proseClassName}>
                  Harmonogram powinien dawać pacjentowi czas na reakcję, a
                  placówce możliwość ponownego wykorzystania zwolnionego
                  miejsca.
                </p>
                <p className={proseClassName}>
                  W badaniu z 2018 roku, obejmującym ponad 54 tysiące pacjentów,
                  dwa przypomnienia wysyłane 3 dni i 1 dzień przed wizytą
                  ograniczały nieobecności skuteczniej niż pojedyncze
                  przypomnienie. Odsetek nieobecności wyniósł odpowiednio 4,4%
                  przy dwóch przypomnieniach, 5,8% przy przypomnieniu 3 dni
                  wcześniej i 5,3% przy przypomnieniu dzień wcześniej. To wyniki
                  konkretnego badania, a nie prognoza dla każdej poradni.
                  <CitationLink number={3} />
                </p>
                <p className={proseClassName}>
                  Schemat obejmujący wcześniejszą wiadomość oraz przypomnienie
                  bliżej wizyty może być punktem wyjścia do testów. Ostateczne
                  ustawienia warto uzależnić od rodzaju świadczeń, czasu
                  oczekiwania i tego, jak szybko placówka potrafi zaprosić
                  kolejnego pacjenta.
                </p>
                <p className={proseClassName}>
                  Przy badaniach wymagających przygotowania informacja musi
                  dotrzeć odpowiednio wcześniej. Treść instrukcji i termin jej
                  wysłania powinny wynikać z zaleceń placówki.
                </p>
              </section>

              <section
                id="kiedy-warto-dolaczyc-telefoniczne-potwierdzanie-wizyt"
                aria-labelledby="heading-telefon"
                className={cn(
                  "flex flex-col gap-6 border-t border-border pt-10",
                  sectionScrollMargin,
                )}
              >
                <h2 id="heading-telefon" className="section-title">
                  Kiedy warto dołączyć telefoniczne potwierdzanie wizyt?
                </h2>
                <p className={proseClassName}>
                  Jeśli mimo wiadomości SMS liczba nieobecności pozostaje
                  niezadowalająca, warto rozważyć dodatkowy kontakt
                  telefoniczny.
                </p>
                <p className={proseClassName}>
                  Rozmowa pozwala od razu wyjaśnić, co pacjent chce zrobić. Może
                  potwierdzić obecność, odwołać wizytę albo poprosić o inny
                  termin. Telefon daje też możliwość kontaktu z osobami, którym
                  trudniej korzystać z wiadomości tekstowych.
                </p>
                <p className={proseClassName}>
                  W VoiceLink zaczynamy od zaprojektowania procesu przypomnień i
                  potwierdzeń SMS. Jeżeli wyniki wskazują na potrzebę
                  dodatkowych działań, dołączamy połączenia wychodzące
                  realizowane przez{" "}
                  <InternalLink href="/jak-to-dziala/funkcje">
                    asystenta głosowego
                  </InternalLink>
                  .
                </p>

                <div className={cardClassName}>
                  <h3 className="subsection-title text-xl text-foreground sm:text-2xl">
                    Jedna rozmowa może zakończyć się zmianą terminu
                  </h3>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Asystent pyta o potwierdzenie wizyty. Jeśli pacjent nie może
                    przyjść, może od razu pomóc znaleźć nowy termin i dokonać
                    rezerwacji, zgodnie z zakresem{" "}
                    <InternalLink href="/jak-to-dziala/integracja">
                      integracji z terminarzem
                    </InternalLink>
                    .
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Jeżeli pacjent chce zrezygnować, asystent może odwołać
                    wizytę w tej samej rozmowie. Pacjent nie musi później osobno
                    kontaktować się z rejestracją.
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Przy nieodebranym połączeniu można zaplanować kolejne próby
                    kontaktu. Odstępy, godziny i zasady zakończenia prób warto
                    ustalić z placówką, uwzględniając czas pozostały do wizyty.
                  </p>
                </div>
              </section>

              <section
                id="proste-odwolywanie-wizyt-pomaga-odzyskiwac-wolne-terminy"
                aria-labelledby="heading-odwolanie"
                className={cn(
                  "flex flex-col gap-6 border-t border-border pt-10",
                  sectionScrollMargin,
                )}
              >
                <h2 id="heading-odwolanie" className="section-title">
                  Proste odwoływanie wizyt pomaga odzyskiwać wolne terminy
                </h2>
                <p className={proseClassName}>
                  Dla pacjenta rezygnacja z wizyty powinna być łatwa również
                  wtedy, gdy rejestracja obsługuje inne połączenia.
                </p>
                <p className={proseClassName}>
                  Może temu służyć odpowiedź na SMS, rozmowa z asystentem
                  głosowym lub inny dostępny kanał zarządzania rezerwacją.
                  Ważne, żeby zgłoszenie dotarło do placówki i zostało
                  prawidłowo odnotowane w terminarzu.
                </p>
                <p className={proseClassName}>
                  NHS zaleca łączenie przypomnień z prostą możliwością odwołania
                  i przełożenia wizyty. Zwraca też uwagę na korzyści z
                  komunikacji dwustronnej, w której pacjent może odpowiedzieć na
                  otrzymaną wiadomość.
                  <CitationLink number={4} />
                </p>

                <div className={cardClassName}>
                  <h3 className="subsection-title text-xl text-foreground sm:text-2xl">
                    Zaplanuj, co dzieje się po zwolnieniu miejsca
                  </h3>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Wcześniejsze odwołanie daje czas na zaproszenie kolejnej
                    osoby. Warto więc przygotować listę pacjentów
                    zainteresowanych szybszym terminem oraz ustalić sposób
                    kontaktu z nimi.
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    VoiceLink może objąć wdrożeniem również kontakt z taką
                    listą. Zakres działania ustalamy indywidualnie, zależnie od
                    organizacji pracy i możliwości systemu rezerwacji.
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Liczy się cały proces: odebranie rezygnacji, aktualizacja
                    terminarza, kontakt z kolejną osobą i potwierdzenie nowej
                    rezerwacji. Dopiero ponowne obsadzenie miejsca pozwala
                    odzyskać jego wykorzystanie.
                  </p>
                </div>
              </section>

              <section
                id="jak-ograniczyc-reczne-potwierdzanie-wizyt-przez-rejestracje"
                aria-labelledby="heading-reczne"
                className={cn(
                  "flex flex-col gap-4 border-t border-border pt-10",
                  sectionScrollMargin,
                )}
              >
                <h2 id="heading-reczne" className="section-title">
                  Jak ograniczyć ręczne potwierdzanie wizyt przez rejestrację?
                </h2>
                <p className={proseClassName}>
                  Przy dużej liczbie rezerwacji ręczne potwierdzanie oznacza
                  dziesiątki wiadomości, telefonów i ponownych prób kontaktu. W
                  tym samym czasie pacjenci dzwonią z nowymi sprawami i
                  podchodzą do stanowiska rejestracji.
                </p>
                <p className={proseClassName}>
                  Automatyzacja może przejąć powtarzalne etapy: wysyłanie
                  przypomnień, obsługę odpowiedzi oraz kontakt telefoniczny
                  według ustalonego scenariusza. Zespół otrzymuje wtedy mniej
                  spraw wymagających ręcznego sprawdzenia.
                </p>
                <p className={proseClassName}>
                  Warunkiem jest czytelny przepływ informacji. Pracownicy
                  powinni wiedzieć, które wizyty są potwierdzone, które odwołane
                  i które nadal wymagają wyjaśnienia. Zakres automatycznej
                  aktualizacji tych statusów trzeba ustalić przy integracji z
                  systemem placówki.
                </p>
              </section>

              <section
                id="jak-sprawdzic-czy-liczba-nieobecnosci-rzeczywiscie-spada"
                aria-labelledby="heading-pomiar"
                className={cn(
                  "flex flex-col gap-6 border-t border-border pt-10",
                  sectionScrollMargin,
                )}
              >
                <h2 id="heading-pomiar" className="section-title">
                  Jak sprawdzić, czy liczba nieobecności rzeczywiście spada?
                </h2>
                <p className={proseClassName}>
                  Warto zacząć od ustalenia punktu wyjścia. Wskaźnik no show to
                  udział wizyt, na które pacjent nie przyszedł i których
                  wcześniej nie odwołał, w przyjętej puli zaplanowanych wizyt.
                </p>
                <p className={proseClassName}>
                  Jeśli w analizowanym miesiącu było 1000 zaplanowanych wizyt, a
                  100 zakończyło się niezgłoszoną nieobecnością, wskaźnik wynosi
                  10%. Porównując kolejne okresy, trzeba stosować tę samą
                  definicję i sposób liczenia.
                </p>
                <div className="rounded-3xl border border-border bg-muted p-6 sm:p-7">
                  <p className="text-base leading-7 text-foreground">
                    Poza samym wskaźnikiem warto sprawdzać:
                  </p>
                  <ol className="mt-4 flex list-decimal flex-col gap-3 pl-5 text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    {article.checklist.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </div>
                <p className={proseClassName}>
                  Wzrost liczby wcześniejszych odwołań może oznaczać, że nowy
                  proces działa. Placówka dowiaduje się o rezygnacji przed
                  godziną wizyty i ma możliwość zaproszenia kolejnej osoby.
                </p>

                <div className={cardClassName}>
                  <h3 className="subsection-title text-xl text-foreground sm:text-2xl">
                    Czy można ograniczyć no show do 5%?
                  </h3>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Najlepszy dotychczasowy wynik zgłaszany przez VoiceLink to
                    poziom 5% nieobecności. To dane własne firmy dotyczące
                    konkretnego wdrożenia.
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Tego poziomu nie należy traktować jako gwarancji dla każdej
                    placówki. Do oceny skali poprawy potrzebne są również wynik
                    wyjściowy, okres pomiaru i liczba analizowanych wizyt.
                  </p>
                  <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                    Dlatego celem wdrożenia powinno być osiągnięcie mierzalnej
                    poprawy w warunkach danej poradni. Samo uruchomienie wysyłki
                    SMS jest początkiem pracy. Kolejne decyzje warto podejmować
                    na podstawie odpowiedzi pacjentów i rzeczywistej frekwencji.
                  </p>
                </div>
              </section>

              <section
                id="jak-voicelink-pomaga-ograniczyc-nieodwolane-wizyty"
                aria-labelledby="heading-pomoc"
                className={cn(
                  "flex flex-col gap-5 rounded-3xl bg-[#062059] p-6 text-white sm:p-8 lg:p-10",
                  sectionScrollMargin,
                )}
              >
                <SectionEyebrow className="bg-white/15 text-white [&_img]:brightness-0 [&_img]:invert">
                  Konsultacja z VoiceLink
                </SectionEyebrow>
                <h2 id="heading-pomoc" className="section-title text-white">
                  Jak VoiceLink pomaga ograniczyć nieodwołane wizyty?
                </h2>
                <p className="text-base leading-7 text-pretty text-white/90 sm:text-lg sm:leading-8">
                  VoiceLink wdraża proces przypomnień i potwierdzania dopasowany
                  do sposobu pracy placówki. Obejmuje on wiadomości SMS z
                  obsługą naturalnych odpowiedzi pacjentów, a w razie potrzeby
                  także połączenia wychodzące.
                </p>
                <p className="text-base leading-7 text-pretty text-white/90 sm:text-lg sm:leading-8">
                  Podczas rozmowy asystent może potwierdzić obecność, pomóc
                  przełożyć wizytę albo ją odwołać. Możliwe jest również
                  przygotowanie kontaktu z listą oczekujących. Zakres
                  automatyzacji zależy od uzgodnionego procesu i integracji z
                  terminarzem.
                </p>
                <p className="text-base leading-7 text-pretty text-white/90 sm:text-lg sm:leading-8">
                  Punktem wyjścia jest sprawdzenie, gdzie obecnie pojawiają się
                  trudności. Czy pacjenci zapominają? Czy nie mogą się
                  dodzwonić? Czy rejestracja nie ma czasu na ponowne próby
                  kontaktu? Odpowiedzi pozwalają dobrać działania do
                  rzeczywistego problemu.
                </p>
                <p className="text-base leading-7 font-medium text-pretty text-white sm:text-lg sm:leading-8">
                  <strong>
                    Umów analizę obsługi telefonicznej pacjentów z VoiceLink.
                  </strong>{" "}
                  Przyjrzymy się sposobowi potwierdzania i odwoływania wizyt w
                  Twojej placówce oraz wskażemy, które etapy warto usprawnić,
                  aby ograniczyć nieobecności i odciążyć rejestrację.
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
                id="najczestsze-pytania-o-przypomnienia-i-potwierdzanie-wizyt"
                aria-labelledby="heading-faq"
                className={cn(
                  "flex flex-col gap-6 border-t border-border pt-10",
                  sectionScrollMargin,
                )}
              >
                <h2 id="heading-faq" className="section-title">
                  Najczęstsze pytania o przypomnienia i potwierdzanie wizyt
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
