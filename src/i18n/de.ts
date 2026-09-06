import type { Copy } from './types';

/**
 * German copy. The primary market — written as German, not translated from
 * the English file. Address is always "du" (brief §8.4).
 *
 * Terminology is taken from the app's own Localizable.strings (§6.0):
 * the tab is **Werkstatt** (not "Garage") and the button is **3D-Überflug**
 * (not "3D-Flyover"). Do not "fix" these towards the English words.
 */
const de: Copy = {
  lang: 'de',
  htmlLang: 'de',
  ogLocale: 'de_DE',
  ogLocaleAlternate: 'en_US',

  meta: {
    title: 'Ride Streak – Fahrrad-Statistiken aus Apple Health',
    description:
      'Verwandle deine Apple-Health-Fahrten in echte Radsport-Analysen: Statistiken, Trainingsbelastung und eine Werkstatt, die Verschleiß mitzählt. Kostenlos für iPhone.',
    ogTitle: 'Ride Streak – Deine Fahrten. Dein Material. Dein Fortschritt.',
    ogDescription:
      'Radsport-Analysen auf Profi-Niveau aus deinen Apple-Health-Fahrten – plus eine Werkstatt, die dir sagt, wann Kette, Reifen und Bremsen dran sind.',
    ogImageAlt:
      'Ride Streak für iPhone – Fahrrad-Statistiken, Trainingsanalyse und Verschleißkontrolle',
  },

  a11y: {
    skipToContent: 'Zum Inhalt springen',
    openMenu: 'Menü öffnen',
    closeMenu: 'Menü schließen',
    mainNav: 'Hauptnavigation',
    languageNav: 'Sprache wählen',
    appStoreBadge: 'Ride Streak kostenlos im App Store laden',
  },

  nav: {
    features: 'Funktionen',
    analysis: 'Analyse',
    garage: 'Werkstatt',
    pricing: 'Preise',
    faq: 'FAQ',
    cta: 'Laden',
  },

  hero: {
    h1Line1: 'Deine Fahrten. Dein Material.',
    h1Line2: 'Dein Fortschritt.',
    sub: 'Ride Streak liest deine Fahrten aus Apple Health und macht daraus Radsport-Analysen auf Profi-Niveau – und sagt dir, wann Kette, Reifen und Bremsen dran sind.',
    cta: 'Kostenlos im App Store laden',
    trust: 'Kostenlos · Ohne Konto · Deine Daten bleiben auf deinem iPhone',
    secondary: 'Funktionen ansehen',
    shot: {
      key: 'statistics-basic',
      alt: 'Ride Streak Statistik-Tab mit Jahresdistanz, Vergleich zum Vorjahr und Jahresziel',
    },
  },

  wedge: {
    lead: 'Ride Streak zeichnet deine Fahrten nicht auf – das machen deine Uhr, dein Garmin oder dein Wahoo längst. Ride Streak liest sie aus Apple Health und macht daraus das, was dir bisher gefehlt hat.',
    items: [
      {
        title: 'Ehrlich verglichen',
        body: 'Jede Zahl mit dem Vergleich zum selben Zeitraum im Vorjahr – nicht nur eine Summe.',
      },
      {
        title: 'Wirklich analysiert',
        body: 'Trainingsbelastung, Leistungszonen, Form – aus den Daten, die du schon aufzeichnest.',
      },
      {
        title: 'Material im Blick',
        body: 'Eine Werkstatt, die die Kilometer jedes Bauteils mitzählt und rechtzeitig meldet.',
      },
    ],
  },

  worksWith: {
    title: 'Fahrten kommen von deinen Geräten',
    note: 'Ride Streak liest deine Fahrten aus Apple Health – egal, womit du sie aufgezeichnet hast.',
    items: ['Apple Health', 'Apple Watch', 'Garmin', 'Wahoo', 'iPhone'],
  },

  features: [
    {
      id: 'fortschritt',
      eyebrow: 'Statistiken',
      h2: 'Dein Fortschritt – ehrlich verglichen',
      lead: 'Tag, Woche, Monat, Jahr. Jede Zahl mit dem Vergleich zum selben Zeitraum im Vorjahr, als gestrichelte Linie direkt im Diagramm. Setz dir ein Ziel und die große Zahl wird zum Fortschrittsring.',
      bullets: [
        'Distanz, Höhenmeter, Dauer und Kalorien – umschaltbar in jedem Zeitraum',
        'Ziele pro Kennzahl und Zeitraum, zum Beispiel 4.000 km im Jahr',
        'Wochen-Streak: alle Kalenderwochen am Stück, in denen du gefahren bist',
        'Persönliche Rekorde als Podium, mit der alten Bestmarke beim Überbieten',
      ],
      shot: {
        key: 'statistics-prs',
        alt: 'Persönliche Rekorde in Ride Streak mit Jahresdiagramm, Bestleistungen und Fitness-und-Form-Verlauf',
      },
    },
    {
      id: 'fahrten',
      eyebrow: 'Fahrtdetails',
      h2: 'Jede Fahrt bis ins Detail',
      lead: 'Streckenkarte in Geschwindigkeitsfarben, Höhenprofil mit Scrubber, echte Herzfrequenzzonen, 5-km-Splits, Runden von deinem Radcomputer und deine Segmente. Du entscheidest, welche Abschnitte du siehst.',
      bullets: [
        'Vollbildkarte mit der Strecke nach Geschwindigkeit eingefärbt',
        'Höhenprofil mit Scrubber, VAM des längsten Anstiegs und steilster Rampe',
        'Geschwindigkeitsverteilung, Trittfrequenzkurve und Tagesrhythmus mit Pausen',
        'Jeder Abschnitt und jede Kennzahl lässt sich ein-, ausblenden und umsortieren',
      ],
      shot: {
        key: '3d-flyover-map',
        alt: 'Routenkarte einer Fahrt in Ride Streak, nach Geschwindigkeit eingefärbt mit Legende von langsam bis schnell',
      },
      extraShots: [
        {
          key: 'workout-details-velocity',
          alt: 'Geschwindigkeitsverteilung und Trittfrequenzkurve einer Fahrt in Ride Streak',
        },
        {
          key: 'workout-details-heartrate',
          alt: 'Herzfrequenzzonen und 5-km-Splits einer Fahrt in Ride Streak',
        },
        {
          key: 'workout-details-more',
          alt: 'Tagesrhythmus, Höhenprofil und Temperaturverlauf einer Fahrt in Ride Streak',
        },
      ],
    },
    {
      id: 'werkstatt',
      eyebrow: 'Werkstatt',
      h2: 'Die Werkstatt: wissen, wann gewechselt wird',
      lead: 'Trag deine Räder ein, häng die Verschleißteile dran – Kette, Kassette, Reifen, Bremsbeläge, Züge, Lenkerband. Ride Streak zählt die Kilometer automatisch mit und meldet sich, bevor es teuer wird.',
      bullets: [
        'Kette, Kassette, Bremsbeläge, Reifen, Züge, Lenkerband, Bremsscheiben oder ein eigenes Teil',
        'Eigene Wechsel-Grenze pro Bauteil, farbcodiert von in Ordnung bis überfällig',
        'Modellname und Kauflink pro Teil – nachbestellen direkt von der Teilekarte',
        'Fahrten landen per Regel automatisch am richtigen Rad, überschreiben geht immer',
      ],
      shot: {
        key: 'garage',
        alt: 'Werkstatt-Ansicht in Ride Streak mit Verschleißanzeige für Bremsbeläge, Reifen, Lenkerband und Kette',
      },
    },
    {
      id: 'training',
      eyebrow: 'Analyse',
      h2: 'Trainiere nach Zahlen, nicht nach Gefühl',
      lead: 'Trainingsbelastung für jede Fahrt – über Leistung, oder als Schätzung aus der Herzfrequenz, wenn du keinen Powermeter hast. Dazu die volle Leistungsanalyse mit Power-Kurve und Zonen, und der Formverlauf aus Fitness, Ermüdung und Form.',
      bullets: [
        'Trainingsbelastung als Anzeige mit Skala – mit Quellen-Badge, ob aus Leistung oder Herzfrequenz',
        'Normalized Power, Intensity Factor, Variability Index, W/kg und Gesamtarbeit',
        'Bestleistungen über 5 s, 1 min, 5 min und 20 min, Power-Kurve und die sieben Coggan-Zonen',
        'Fitness, Ermüdung und Form über 6 Wochen, 3 Monate oder ein Jahr',
      ],
      pro: true,
      shot: {
        key: 'workout-details-basic',
        alt: 'Trainingsbelastung einer Fahrt in Ride Streak: Anzeige mit Wert 77, relative Anstrengung und Geschwindigkeitskarte',
      },
    },
    {
      id: 'touren',
      eyebrow: 'Touren',
      h2: 'Aus einer Woche Radfahren wird eine Tour',
      lead: 'Fass zusammengehörige Fahrten zu einer Tour zusammen – Ride Streak erkennt mehrtägige Touren sogar von selbst und schlägt sie dir vor. Danach siehst du die ganze Reise auf einmal.',
      bullets: [
        'Gesamtdistanz, Höhenmeter, Kalorien und Temperaturspanne über alle Etappen',
        'Tag-für-Tag-Verlauf mit Fahrzeiten, Pausen und Höhenübersicht',
        'Die komplette Route aller Fahrten auf einer Vollbildkarte',
        'Tour-Zusammenfassung als Bild teilen',
      ],
      shot: {
        key: 'tour',
        alt: 'Tour-Detail in Ride Streak mit 184,6 km Gesamtdistanz, Tagesverlauf über zwei Tage und Übersichtskarte',
      },
    },
    {
      id: 'teilen',
      eyebrow: 'Teilen',
      h2: 'Fahrten, die man herzeigt',
      lead: 'Leg deine Werte über dein eigenes Foto – oder über ein Video. Distanz, Geschwindigkeit, Höhenmeter und deine Route werden fest eingebrannt, Rekorde bekommen ein goldenes Abzeichen.',
      bullets: [
        'Bild oder Overlay-Video aus deinem eigenen Foto oder Clip – HDR bleibt HDR',
        'Du bestimmst, welche Werte im Overlay zu sehen sind',
        'Neue Bestleistungen werden automatisch als Rekord hervorgehoben',
        'Die Vorschau ist immer kostenlos – Pro brauchst du erst zum Speichern und Teilen',
      ],
      shot: {
        key: 'share-workout',
        alt: 'Workout teilen in Ride Streak: Vorschau mit eingeblendeter Distanz, Route und hervorgehobenem Rekord',
      },
    },
    {
      id: 'ueberflug',
      eyebrow: '3D-Überflug',
      h2: 'Flieg deine Strecke in 3D ab',
      lead: 'Der 3D-Überflug fliegt deine Route über echtes Satellitengelände ab, während Geschwindigkeit, Distanz und Zeit live mitlaufen. Pausieren, spulen, auf 2× oder 4× beschleunigen.',
      bullets: [
        'Kameraflug über Satellitengelände mit Live-Werten',
        'Play, Pause, Scrubber und Tempo 2× oder 4×',
        'Bei einer Tour fliegt die Kamera alle Etappen hintereinander ab',
        'Bewegung reduzieren wird respektiert: dann statische 3D-Karte statt Flug',
      ],
      pro: true,
      shot: {
        key: '3d-flyover-feature',
        alt: '3D-Überflug in Ride Streak: Kameraflug über die Strecke mit Live-Werten für Geschwindigkeit, Distanz und Bewegungszeit',
      },
    },
    {
      id: 'privat',
      eyebrow: 'Widgets & Privatsphäre',
      h2: 'Auf dem Homescreen. Und bei dir.',
      lead: 'Widgets für Wochen-, Monats- und Jahresdistanz, direkt aus Apple Health. Und deine Daten bleiben auf deinem iPhone – hochgeladen wird nur, was du ausdrücklich freigibst.',
      bullets: [
        'Drei Widgets in klein und mittel, das Wochen-Widget mit 7-Tage-Balken',
        'Sie lesen Apple Health direkt und bleiben aktuell, ohne dass du die App öffnest',
        'Kein Konto nötig, keine Werbung, kein Datenverkauf',
        'RideStreak Cloud ist optional und speichert nur Tageswerte – nie deine GPS-Strecken',
      ],
    },
  ],

  garageStates: {
    intro:
      'Jedes Bauteil hat seine eigene Grenze. Ride Streak rechnet die Kilometer der zugeordneten Fahrten dagegen und färbt den Status entsprechend.',
    states: [
      {
        state: 'ok',
        label: 'In Ordnung',
        example: 'Reifen hinten · 1.610 von 3.500 km · 46 %',
      },
      {
        state: 'soon',
        label: 'Bald ersetzen',
        example: 'Bremsbeläge hinten · 1.610 von 2.000 km · 80 %',
      },
      {
        state: 'overdue',
        label: 'Überfällig',
        example: 'Bremsbeläge vorne · 1.610 von 1.500 km · 107 %',
      },
    ],
  },

  strava: {
    id: 'strava',
    eyebrow: 'Optional',
    h2: 'Mit Strava wird jede Fahrt vollständig',
    lead: 'Dein Radcomputer zeichnet mehr auf, als in Apple Health landet. Wenn du magst, verbindest du einmal Strava – und Ride Streak holt sich den Rest.',
    bullets: [
      'Leistung und Trittfrequenz von Powermeter und Radcomputer',
      'Segmente mit PR-Medaillen und Top-10-Kronen',
      'Runden von deinem Garmin oder Wahoo',
      'Fahrten, die nie in Apple Health ankommen, werden trotzdem gezählt',
      'Deine echten Herzfrequenzzonen statt einer Schätzung nach Alter',
    ],
    closing:
      'Kein Muss: Ride Streak funktioniert auch mit Apple Health allein. Strava macht es nur genauer. Trennst du die Verbindung, werden alle importierten Daten wieder aus der App entfernt.',
    attribution:
      'Strava ist eine Marke von Strava, Inc. Ride Streak steht in keiner Verbindung zu Strava, Inc. und wird von Strava nicht unterstützt oder gesponsert.',
  },

  compare: {
    id: 'kostenlos-pro',
    eyebrow: 'Umfang',
    h2: 'Was kostenlos ist – und was Pro dazulegt',
    lead: 'Ride Streak ist ohne Abo vollständig benutzbar. Pro schaltet die Trainingsanalyse, den 3D-Überflug und den Export frei.',
    freeLabel: 'Kostenlos',
    proLabel: 'Pro',
    includedLabel: 'Enthalten',
    notIncludedLabel: 'Nicht enthalten',
    rows: [
      { label: 'Statistiken für Tag, Woche, Monat und Jahr', free: true },
      { label: 'Vergleich mit dem Vorjahreszeitraum', free: true },
      { label: 'Ziele, Wochen-Streak und persönliche Rekorde', free: true },
      { label: 'Fahrtdetails mit Karte, Höhenprofil und Splits', free: true },
      { label: 'Herzfrequenzzonen, Runden und Segmente', free: true },
      { label: 'Werkstatt: Räder, Bauteile und Verschleiß', free: true },
      { label: 'Mehrtägige Touren', free: true },
      { label: 'Homescreen-Widgets', free: true },
      { label: 'Vorschau beim Teilen', free: true },
      { label: 'Kalorien in den Statistiken', free: false },
      { label: 'Trainingsbelastung (TSS)', free: false },
      { label: 'Leistungsanalyse mit Power-Kurve und Zonen', free: false },
      { label: 'Fitness & Form (CTL, ATL, TSB)', free: false },
      { label: '3D-Überflug', free: false },
      { label: 'Bild- und Video-Export beim Teilen', free: false },
      { label: 'iCloud-Sync über deine Geräte', free: false },
    ],
  },

  pricing: {
    id: 'preise',
    eyebrow: 'Preise',
    h2: 'Kostenlos starten, Pro nur wenn du willst',
    lead: 'Ride Streak ist kostenlos – Statistiken, Ziele, Streak, Rekorde, Fahrtdetails, Werkstatt, Touren und Widgets sind ohne Abo dabei. Pro schaltet Trainingsbelastung, Leistungsanalyse, Fitness & Form, 3D-Überflug, Bild- und Video-Export, Kalorien und iCloud-Sync frei.',
    perMonth: 'pro Monat',
    perYear: 'pro Jahr',
    once: 'einmalig',
    forever: 'für immer',
    savingsLine: 'Spare {amount} gegenüber monatlich ({percent} %)',
    terms:
      'Alle Preise inkl. MwSt. Abos verlängern sich automatisch und lassen sich jederzeit in den iPhone-Einstellungen kündigen. Lebenslang ist ein einmaliger Kauf ohne Verlängerung. Die Abrechnung läuft über deine Apple-ID.',
    tiers: [
      {
        id: 'free',
        name: 'Kostenlos',
        tagline: 'Die ganze App, ohne Abo',
        price: null,
        period: 'für immer',
        features: [
          'Statistiken, Ziele und Streak',
          'Persönliche Rekorde',
          'Fahrtdetails mit Karte und Splits',
          'Werkstatt und Touren',
          'Widgets',
        ],
      },
      {
        id: 'monthly',
        name: 'Pro monatlich',
        tagline: 'Erst mal ausprobieren',
        price: 0.99,
        period: 'pro Monat',
        features: ['Alles aus Pro', 'Monatlich kündbar'],
      },
      {
        id: 'yearly',
        name: 'Pro jährlich',
        tagline: 'Das beste Verhältnis',
        price: 9.99,
        period: 'pro Jahr',
        featured: true,
        badge: 'Beliebteste',
        features: ['Alles aus Pro', 'Zwölf Monate am Stück', 'Jährlich kündbar'],
      },
      {
        id: 'lifetime',
        name: 'Lebenslang',
        tagline: 'Einmal zahlen, fertig',
        price: 24.99,
        period: 'einmalig',
        features: ['Alles aus Pro', 'Keine Verlängerung', 'Gilt dauerhaft'],
      },
    ],
  },

  faq: {
    id: 'faq',
    eyebrow: 'FAQ',
    h2: 'Häufige Fragen',
    lead: 'Was Leute vor dem Laden am häufigsten wissen wollen.',
    items: [
      {
        q: 'Zeichnet Ride Streak meine Fahrten auf?',
        a: 'Nein. Ride Streak zeichnet keine Fahrten auf und hat keine Aufnahme-, Navigations- oder Routenplanungsfunktion. Die App liest fertige Fahrten aus Apple Health und, wenn du magst, aus Strava. Aufzeichnen kannst du mit deiner Apple Watch, einem Garmin, einem Wahoo oder jeder App, die nach Apple Health schreibt.',
      },
      {
        q: 'Ist Ride Streak kostenlos?',
        a: 'Ja. Statistiken, Ziele, der Wochen-Streak, persönliche Rekorde, alle Fahrtdetails mit Karte und Splits, die Werkstatt, mehrtägige Touren und die Widgets kosten nichts und brauchen kein Konto. Optional schaltet Ride Streak Pro Trainingsbelastung, Leistungsanalyse, Fitness & Form, den 3D-Überflug, den Export beim Teilen, Kalorien und iCloud-Sync frei.',
      },
      {
        q: 'Brauche ich Strava?',
        a: 'Nein. Apple Health allein reicht vollständig aus. Eine Strava-Verbindung ist optional und ergänzt Werte, die dein Radcomputer aufzeichnet, aber nicht nach Apple Health schreibt: Leistung, Trittfrequenz, detaillierte Splits, Segmente, Runden sowie deine echten Trainingszonen, FTP und dein Gewicht.',
      },
      {
        q: 'Funktioniert es mit Garmin und Wahoo?',
        a: 'Ja. Fahrten von Garmin- und Wahoo-Geräten erreichen Ride Streak über Apple Health, sofern die jeweilige App dorthin schreibt. Über eine optionale Strava-Verbindung kommen zusätzlich Fahrten an, die nie in Apple Health landen – inklusive Runden, Leistung und Trittfrequenz vom Radcomputer.',
      },
      {
        q: 'Welches iPhone und welche iOS-Version brauche ich?',
        a: 'Du brauchst ein iPhone mit iOS 18.5 oder neuer. Ride Streak ist eine reine iPhone-App. Auf dem iPad läuft sie nur im iPhone-Kompatibilitätsmodus, eine eigene iPad-Version gibt es nicht.',
      },
      {
        q: 'Gibt es eine Apple-Watch-, iPad- oder Android-App?',
        a: 'Nein. Ride Streak gibt es ausschließlich für das iPhone. Es gibt keine Apple-Watch-App, keine iPad-Version, keine Android-Version und keine Weboberfläche. Fahrten, die du mit deiner Apple Watch aufzeichnest, erreichen Ride Streak über Apple Health – dafür brauchst du keine App auf der Uhr.',
      },
      {
        q: 'Was passiert mit meinen Daten?',
        a: 'Deine Raddaten liegen auf deinem iPhone und in Apple Health. Nichts wird hochgeladen, solange du es nicht ausdrücklich einschaltest. RideStreak Cloud ist optional und speichert nur tägliche Trainingszusammenfassungen – Datum, Dauer, Distanz, Höhenmeter, Trainingsbelastung – auf Servern in der EU, nie deine GPS-Strecken und nie rohe Herzfrequenzdaten. Du kannst die Einwilligung jederzeit in den Einstellungen widerrufen und dein Konto samt Serverdaten löschen.',
      },
      {
        q: 'Was verfolgt die Werkstatt?',
        a: 'Die Werkstatt zählt die Kilometer einzelner Bauteile ab ihrem Einbaudatum: Kette, Kassette, Bremsbeläge vorne und hinten, Reifen vorne und hinten, Schalt- und Bremszüge, Lenkerband, Bremsscheiben sowie eigene Teile. Pro Teil legst du eine Wechsel-Grenze fest; der Status geht von in Ordnung über beobachten und bald ersetzen bis überfällig.',
      },
      {
        q: 'Was bedeuten Fitness, Ermüdung und Form (CTL, ATL, TSB)?',
        a: 'Fitness (CTL) ist deine Trainingsbelastung gemittelt über 42 Tage und steht für die Grundlage, die du dir aufgebaut hast. Ermüdung (ATL) ist derselbe Wert über 7 Tage und zeigt die frische Belastung. Form (TSB) ist Fitness minus Ermüdung: positiv heißt ausgeruht, negativ heißt belastet. Ride Streak berechnet alle drei auf deinem Gerät.',
      },
      {
        q: 'Kann ich Pro kündigen?',
        a: 'Ja, jederzeit. Das Abo läuft über deine Apple-ID und lässt sich in den iPhone-Einstellungen unter deinem Namen bei Abonnements kündigen. Nach dem Ende der bezahlten Periode bleibt die App mit allen kostenlosen Funktionen nutzbar. Die lebenslange Option ist ein einmaliger Kauf und verlängert sich nicht.',
      },
      {
        q: 'Wie unterscheidet sich Ride Streak von Strava oder Apple Fitness?',
        a: 'Ride Streak ersetzt weder deine Aufzeichnung noch dein soziales Netzwerk – es ist die Auswertungs- und Wartungsschicht darüber. Statt einer Feed-Ansicht bekommst du ehrliche Zeitraumvergleiche, Trainingsbelastung und Leistungsanalyse auch ohne Powermeter, und eine Werkstatt, die den Verschleiß jedes Bauteils mitzählt. Das alles ohne Konto, ohne Werbung und mit deinen Daten auf dem Gerät.',
      },
    ],
  },

  finalCta: {
    h2: 'Deine Daten liegen längst da. Hol was raus.',
    lead: 'Ride Streak liest deine Fahrten aus Apple Health, vergleicht sie ehrlich und passt auf dein Material auf.',
    cta: 'Kostenlos im App Store laden',
    trust: 'Kostenlos · Ohne Konto · iPhone mit iOS 18.5 oder neuer',
  },

  stickyCta: {
    label: 'Kostenlos laden',
  },

  footer: {
    tagline:
      'Radsport-Analysen aus Apple Health – mit einer Werkstatt, die den Verschleiß mitzählt.',
    productHeading: 'Produkt',
    legalHeading: 'Rechtliches',
    supportHeading: 'Support',
    languageHeading: 'Sprache',
    supportIntro: 'Fragen, Fehler oder Wünsche? Schreib direkt an:',
    links: {
      features: 'Funktionen',
      pricing: 'Preise',
      faq: 'FAQ',
      blog: 'Ratgeber',
      impressum: 'Impressum',
      privacy: 'Datenschutz',
      terms: 'AGB',
      support: 'Support',
    },
    appleTrademark:
      'Apple, das Apple-Logo, Apple Health, Apple Watch und App Store sind Marken von Apple Inc., eingetragen in den USA und anderen Ländern.',
    stravaTrademark:
      'Strava ist eine Marke von Strava, Inc. Garmin und Wahoo sind Marken der jeweiligen Inhaber. Ride Streak steht in keiner Verbindung zu diesen Unternehmen.',
    copyright: 'Alle Rechte vorbehalten.',
    priceNote:
      'Preise können je nach Region abweichen. Maßgeblich ist der im App Store angezeigte Preis.',
  },

  blog: {
    indexTitle: 'Ratgeber',
    indexDescription:
      'Verschleißgrenzen, Trainingskennzahlen und Apple Health: praktische Anleitungen rund um Rad-Daten auf dem iPhone.',
    indexLead:
      'Praktische Anleitungen zu Verschleiß, Trainingskennzahlen und deinen Rad-Daten auf dem iPhone.',
    readMore: 'Weiterlesen',
    backToBlog: 'Zurück zum Ratgeber',
    publishedOn: 'Veröffentlicht am',
    updatedOn: 'Aktualisiert am',
    ctaHeading: 'Mit Ride Streak zählt dein iPhone automatisch mit',
    ctaBody:
      'Ride Streak liest deine Fahrten aus Apple Health, rechnet die Kilometer jedem Bauteil zu und meldet sich, bevor etwas überfällig wird.',
  },

  legal: {
    lastUpdated: 'Stand',
    backHome: 'Zurück zur Startseite',
  },
};

export default de;
