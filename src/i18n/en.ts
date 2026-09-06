import type { Copy } from './types';

/**
 * English copy. Written as English, mirroring the German file's structure but
 * not its sentences (brief §8.4).
 *
 * Terminology follows the app's English strings: **Garage** and **3D Flyover**
 * (the German page uses Werkstatt / 3D-Überflug — see de.ts).
 * Units stay metric everywhere; the app has no imperial mode.
 */
const en: Copy = {
  lang: 'en',
  htmlLang: 'en',
  ogLocale: 'en_US',
  ogLocaleAlternate: 'de_DE',

  meta: {
    title: 'Ride Streak – Cycling Stats from Apple Health',
    description:
      'Turn your Apple Health rides into real cycling analysis: stats, training load, and a garage that tracks component wear. Free on iPhone.',
    ogTitle: 'Ride Streak – Your rides. Your gear. Your progress.',
    ogDescription:
      'Pro-level cycling analysis from the rides already in Apple Health — plus a garage that tells you when your chain, tires and brakes are due.',
    ogImageAlt:
      'Ride Streak for iPhone – cycling stats, training analysis and component wear tracking',
  },

  a11y: {
    skipToContent: 'Skip to content',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    mainNav: 'Main navigation',
    languageNav: 'Choose language',
    appStoreBadge: 'Download Ride Streak free on the App Store',
  },

  nav: {
    features: 'Features',
    analysis: 'Analysis',
    garage: 'Garage',
    pricing: 'Pricing',
    faq: 'FAQ',
    cta: 'Download',
  },

  hero: {
    h1Line1: 'Your rides. Your gear.',
    h1Line2: 'Your progress.',
    sub: 'Ride Streak reads the rides already in Apple Health and turns them into pro-level cycling analysis — and tells you when your chain, tires and brakes are due.',
    cta: 'Download free on the App Store',
    trust: 'Free · No account · Your data stays on your iPhone',
    secondary: 'See the features',
    shot: {
      key: 'statistics-basic',
      alt: 'Ride Streak stats tab showing yearly distance, year-over-year comparison and a yearly goal',
    },
  },

  wedge: {
    lead: "Ride Streak doesn't record your rides — your watch, your Garmin or your Wahoo already does. It reads them from Apple Health and gives you what was missing.",
    items: [
      {
        title: 'Honestly compared',
        body: 'Every number carries the comparison to the same window a year ago, not just a total.',
      },
      {
        title: 'Actually analysed',
        body: 'Training load, power zones and form — from the data you already record.',
      },
      {
        title: 'Gear accounted for',
        body: 'A garage that counts the kilometres on every part and speaks up in time.',
      },
    ],
  },

  worksWith: {
    title: 'Rides come from the devices you already use',
    note: 'Ride Streak reads your rides from Apple Health — whatever you recorded them with.',
    items: ['Apple Health', 'Apple Watch', 'Garmin', 'Wahoo', 'iPhone'],
  },

  features: [
    {
      id: 'progress',
      eyebrow: 'Statistics',
      h2: 'Your progress, honestly compared',
      lead: 'Day, week, month, year. Every number carries the comparison to the same window a year ago, drawn as a dashed line right in the chart. Set a goal and the big number becomes a progress ring.',
      bullets: [
        'Distance, elevation, duration and calories — switchable in every timeframe',
        'Goals per metric and timeframe, for example 4,000 km this year',
        'Weekly streak: consecutive calendar weeks with at least one ride',
        'Personal records as a podium, showing the old best when you beat it',
      ],
      shot: {
        key: 'statistics-prs',
        alt: 'Personal records in Ride Streak with a yearly chart, best efforts and the fitness and form trend',
      },
    },
    {
      id: 'rides',
      eyebrow: 'Ride detail',
      h2: 'Every ride, in full detail',
      lead: "A speed-coloured route map, an elevation profile you can scrub, real heart-rate zones, 5 km splits, your bike computer's laps and your segments. You choose which sections you see.",
      bullets: [
        'Full-screen map with the track coloured by speed',
        'Elevation profile with a scrubber, plus VAM of the longest climb and the steepest section',
        'Speed distribution, cadence curve and a day rhythm with every break',
        'Every section and hero stat can be shown, hidden and reordered',
      ],
      shot: {
        key: '3d-flyover-map',
        alt: 'Route map of a ride in Ride Streak, coloured by speed with a slow-to-fast legend',
      },
      extraShots: [
        {
          key: 'workout-details-velocity',
          alt: 'Speed distribution and cadence curve for a ride in Ride Streak',
        },
        {
          key: 'workout-details-heartrate',
          alt: 'Heart-rate zones and 5 km splits for a ride in Ride Streak',
        },
        {
          key: 'workout-details-more',
          alt: 'Day rhythm, elevation profile and temperature curve for a ride in Ride Streak',
        },
      ],
    },
    {
      id: 'garage',
      eyebrow: 'Garage',
      h2: 'The Garage: know before it wears out',
      lead: 'Add your bikes and the parts that wear — chain, cassette, tires, brake pads, cables, bar tape. Ride Streak counts the kilometres automatically and tells you before it gets expensive.',
      bullets: [
        'Chain, cassette, brake pads, tires, cables, bar tape, rotors or a custom part',
        'Your own replacement threshold per part, colour-coded from healthy to overdue',
        'Model name and buy link per part — reorder straight from the part card',
        'Rules assign rides to the right bike automatically; you can always override',
      ],
      shot: {
        key: 'garage',
        alt: 'Garage view in Ride Streak showing wear status for brake pads, tires, bar tape and chain',
      },
    },
    {
      id: 'training',
      eyebrow: 'Analysis',
      h2: 'Train by the numbers',
      lead: 'Training load for every ride — from power, or estimated from heart rate when you have no power meter. Plus a full power analysis with power curve and zones, and your fitness, fatigue and form over time.',
      bullets: [
        'Training load on a labelled scale, with a source badge for power or heart rate',
        'Normalized Power, Intensity Factor, Variability Index, W/kg and total work',
        'Best efforts at 5 s, 1 min, 5 min and 20 min, a power curve and the seven Coggan zones',
        'Fitness, fatigue and form over 6 weeks, 3 months or a year',
      ],
      pro: true,
      shot: {
        key: 'workout-details-basic',
        alt: 'Training load for a ride in Ride Streak: a gauge reading 77, relative effort and a speed-coloured map',
      },
    },
    {
      id: 'tours',
      eyebrow: 'Tours',
      h2: 'One week of riding, one tour',
      lead: 'Group rides that belong together into a tour — Ride Streak spots multi-day trips on its own and suggests them. Then you see the whole journey at once.',
      bullets: [
        'Total distance, elevation, calories and temperature range across every stage',
        'A day-by-day timeline with riding time, breaks and an elevation overview',
        'The complete route of every ride on one full-screen map',
        'Share the tour summary as an image',
      ],
      shot: {
        key: 'tour',
        alt: 'Tour detail in Ride Streak with 184.6 km total distance, a two-day timeline and an overview map',
      },
    },
    {
      id: 'sharing',
      eyebrow: 'Sharing',
      h2: 'Rides worth showing off',
      lead: 'Lay your numbers over your own photo — or over a video. Distance, speed, elevation and your route are burned in, and personal records get a gold badge.',
      bullets: [
        'An image or an overlay video from your own photo or clip — HDR stays HDR',
        'You choose which stats appear in the overlay',
        'New best efforts are highlighted as records automatically',
        'The preview is always free — Pro is only needed to save and share',
      ],
      shot: {
        key: 'share-workout',
        alt: 'Share Workout in Ride Streak: a preview with distance, route and a highlighted record overlaid',
      },
    },
    {
      id: 'flyover',
      eyebrow: '3D Flyover',
      h2: 'Fly your route in 3D',
      lead: '3D Flyover flies your route over real satellite terrain while speed, distance and time run live alongside. Pause, scrub, speed it up to 2× or 4×.',
      bullets: [
        'A camera flight over satellite terrain with live readouts',
        'Play, pause, a scrubber and 2× or 4× speed',
        'For a tour the camera flies every stage back to back',
        'Reduce Motion is respected: a static 3D map instead of the flight',
      ],
      pro: true,
      shot: {
        key: '3d-flyover-feature',
        alt: '3D Flyover in Ride Streak: the camera flying the route with live speed, distance and moving-time readouts',
      },
    },
    {
      id: 'privacy',
      eyebrow: 'Widgets & privacy',
      h2: 'On your home screen. And yours alone.',
      lead: 'Widgets for weekly, monthly and yearly distance, straight from Apple Health. And your data stays on your iPhone — nothing is uploaded unless you explicitly switch it on.',
      bullets: [
        'Three widgets in small and medium, the weekly one with a 7-day bar chart',
        'They read Apple Health directly and stay current without opening the app',
        'No account required, no ads, no data selling',
        'RideStreak Cloud is opt-in and stores daily summaries only — never your GPS routes',
      ],
    },
  ],

  garageStates: {
    intro:
      'Every part carries its own threshold. Ride Streak counts the kilometres of the rides assigned to that bike against it and colours the status accordingly.',
    states: [
      {
        state: 'ok',
        label: 'Healthy',
        example: 'Rear tire · 1,610 of 3,500 km · 46%',
      },
      {
        state: 'soon',
        label: 'Replace soon',
        example: 'Rear brake pads · 1,610 of 2,000 km · 80%',
      },
      {
        state: 'overdue',
        label: 'Overdue',
        example: 'Front brake pads · 1,610 of 1,500 km · 107%',
      },
    ],
  },

  strava: {
    id: 'strava',
    eyebrow: 'Optional',
    h2: 'With Strava, every ride fills in',
    lead: 'Your bike computer records more than reaches Apple Health. If you want, connect Strava once and Ride Streak picks up the rest.',
    bullets: [
      'Power and cadence from your power meter and head unit',
      'Segments with PR medals and top-10 crowns',
      'Laps from your Garmin or Wahoo',
      'Rides that never reach Apple Health still get counted',
      'Your real heart-rate zones instead of an age-based guess',
    ],
    closing:
      'Optional: Ride Streak works on Apple Health alone. Strava just makes it sharper. Disconnect and every imported Strava record is removed from the app again.',
    attribution:
      'Strava is a trademark of Strava, Inc. Ride Streak is not affiliated with, endorsed or sponsored by Strava, Inc.',
  },

  compare: {
    id: 'free-vs-pro',
    eyebrow: 'What you get',
    h2: "What's free — and what Pro adds",
    lead: 'Ride Streak is fully usable without a subscription. Pro unlocks the training analysis, 3D Flyover and export.',
    freeLabel: 'Free',
    proLabel: 'Pro',
    includedLabel: 'Included',
    notIncludedLabel: 'Not included',
    rows: [
      { label: 'Stats for day, week, month and year', free: true },
      { label: 'Comparison with the same period last year', free: true },
      { label: 'Goals, weekly streak and personal records', free: true },
      { label: 'Ride detail with map, elevation profile and splits', free: true },
      { label: 'Heart-rate zones, laps and segments', free: true },
      { label: 'Garage: bikes, parts and wear', free: true },
      { label: 'Multi-day tours', free: true },
      { label: 'Home screen widgets', free: true },
      { label: 'Share preview', free: true },
      { label: 'Calories in the statistics', free: false },
      { label: 'Training load (TSS)', free: false },
      { label: 'Power analysis with power curve and zones', free: false },
      { label: 'Fitness & Form (CTL, ATL, TSB)', free: false },
      { label: '3D Flyover', free: false },
      { label: 'Image and video export when sharing', free: false },
      { label: 'iCloud sync across your devices', free: false },
    ],
  },

  pricing: {
    id: 'pricing',
    eyebrow: 'Pricing',
    h2: 'Start free, go Pro only if you want to',
    lead: 'Ride Streak is free — stats, goals, streak, records, ride details, the Garage, tours and widgets need no subscription. Pro unlocks training load, power analysis, Fitness & Form, 3D Flyover, image and video export, calories and iCloud sync.',
    perMonth: 'per month',
    perYear: 'per year',
    once: 'one-time',
    forever: 'forever',
    savingsLine: 'Save {amount} against monthly ({percent}%)',
    terms:
      'All prices include VAT. Subscriptions renew automatically and can be cancelled any time in your iPhone Settings. Lifetime is a one-time purchase that does not renew. Billing runs through your Apple ID.',
    tiers: [
      {
        id: 'free',
        name: 'Free',
        tagline: 'The whole app, no subscription',
        price: null,
        period: 'forever',
        features: [
          'Stats, goals and streak',
          'Personal records',
          'Ride detail with map and splits',
          'Garage and tours',
          'Widgets',
        ],
      },
      {
        id: 'monthly',
        name: 'Pro monthly',
        tagline: 'Try it out first',
        price: 0.99,
        period: 'per month',
        features: ['Everything in Pro', 'Cancel monthly'],
      },
      {
        id: 'yearly',
        name: 'Pro yearly',
        tagline: 'The best value',
        price: 9.99,
        period: 'per year',
        featured: true,
        badge: 'Best value',
        features: ['Everything in Pro', 'Twelve months at once', 'Cancel yearly'],
      },
      {
        id: 'lifetime',
        name: 'Lifetime',
        tagline: 'Pay once, done',
        price: 24.99,
        period: 'one-time',
        features: ['Everything in Pro', 'No renewal', 'Yours permanently'],
      },
    ],
  },

  faq: {
    id: 'faq',
    eyebrow: 'FAQ',
    h2: 'Frequently asked questions',
    lead: 'What people most want to know before downloading.',
    items: [
      {
        q: 'Does Ride Streak record my rides?',
        a: 'No. Ride Streak does not record rides and has no recording, navigation or route-planning feature. It reads finished rides from Apple Health and, if you want, from Strava. Record with your Apple Watch, a Garmin, a Wahoo or any app that writes to Apple Health.',
      },
      {
        q: 'Is Ride Streak free?',
        a: 'Yes. Stats, goals, the weekly streak, personal records, all ride details with map and splits, the Garage, multi-day tours and the widgets cost nothing and need no account. Ride Streak Pro optionally unlocks training load, power analysis, Fitness & Form, 3D Flyover, export when sharing, calories and iCloud sync.',
      },
      {
        q: 'Do I need Strava?',
        a: 'No. Apple Health alone is entirely enough. A Strava connection is optional and adds values your bike computer records but does not write to Apple Health: power, cadence, detailed splits, segments, laps, plus your real training zones, FTP and weight.',
      },
      {
        q: 'Does it work with Garmin and Wahoo?',
        a: 'Yes. Rides from Garmin and Wahoo devices reach Ride Streak through Apple Health, as long as their app writes there. An optional Strava connection additionally brings in rides that never reach Apple Health at all — including laps, power and cadence from the head unit.',
      },
      {
        q: 'Which iPhone and iOS version do I need?',
        a: 'You need an iPhone running iOS 18.5 or later. Ride Streak is an iPhone-only app. It runs on iPad in iPhone compatibility mode, but there is no dedicated iPad version.',
      },
      {
        q: 'Is there an Apple Watch, iPad or Android app?',
        a: 'No. Ride Streak is iPhone only. There is no Apple Watch app, no iPad version, no Android version and no web interface. Rides you record on your Apple Watch reach Ride Streak through Apple Health, so no app on the watch is needed.',
      },
      {
        q: 'Where does my data go?',
        a: 'Your cycling data lives on your iPhone and in Apple Health. Nothing is uploaded unless you explicitly turn it on. RideStreak Cloud is optional, opt-in, and stores only daily training summaries — date, duration, distance, elevation, training load — on servers in the EU, never your GPS routes and never raw heart-rate data. You can withdraw consent or delete your account and all server data at any time from Settings.',
      },
      {
        q: 'What does the Garage track?',
        a: 'The Garage counts the kilometres on individual parts from their install date: chain, cassette, front and rear brake pads, front and rear tires, shift and brake cables, bar tape, brake rotors and custom parts. You set a replacement threshold per part, and the status runs from healthy through watch and replace soon to overdue.',
      },
      {
        q: 'What do fitness, fatigue and form (CTL, ATL, TSB) mean?',
        a: 'Fitness (CTL) is your training load averaged over 42 days and stands for the base you have built. Fatigue (ATL) is the same value over 7 days and shows recent strain. Form (TSB) is fitness minus fatigue: positive means rested, negative means loaded. Ride Streak computes all three on your device.',
      },
      {
        q: 'Can I cancel Pro?',
        a: 'Yes, any time. The subscription runs through your Apple ID and can be cancelled in iPhone Settings under your name, in Subscriptions. When the paid period ends the app stays usable with every free feature. The lifetime option is a one-time purchase and does not renew.',
      },
      {
        q: 'How is it different from Strava or Apple Fitness?',
        a: 'Ride Streak replaces neither your recording nor your social network — it is the analysis and maintenance layer on top. Instead of a feed you get honest period comparisons, training load and power analysis even without a power meter, and a garage that counts the wear on every component. All of it with no account, no ads, and your data on the device.',
      },
    ],
  },

  finalCta: {
    h2: 'The data is already there. Get something out of it.',
    lead: 'Ride Streak reads your rides from Apple Health, compares them honestly and keeps an eye on your gear.',
    cta: 'Download free on the App Store',
    trust: 'Free · No account · iPhone running iOS 18.5 or later',
  },

  stickyCta: {
    label: 'Download free',
  },

  footer: {
    tagline: 'Cycling analysis from Apple Health — with a garage that counts the wear.',
    productHeading: 'Product',
    legalHeading: 'Legal',
    supportHeading: 'Support',
    languageHeading: 'Language',
    supportIntro: 'Questions, bugs or requests? Write directly to:',
    links: {
      features: 'Features',
      pricing: 'Pricing',
      faq: 'FAQ',
      blog: 'Guides',
      impressum: 'Imprint',
      privacy: 'Privacy',
      terms: 'Terms',
      support: 'Support',
    },
    appleTrademark:
      'Apple, the Apple logo, Apple Health, Apple Watch and App Store are trademarks of Apple Inc., registered in the U.S. and other countries.',
    stravaTrademark:
      'Strava is a trademark of Strava, Inc. Garmin and Wahoo are trademarks of their respective owners. Ride Streak is not affiliated with these companies.',
    copyright: 'All rights reserved.',
    priceNote:
      'Prices may vary by region. The price shown in the App Store is the one that applies.',
  },

  blog: {
    indexTitle: 'Guides',
    indexDescription:
      'Wear thresholds, training metrics and Apple Health: practical guides to your cycling data on iPhone.',
    indexLead:
      'Practical guides to component wear, training metrics and your cycling data on iPhone.',
    readMore: 'Read more',
    backToBlog: 'Back to guides',
    publishedOn: 'Published',
    updatedOn: 'Updated',
    ctaHeading: 'Ride Streak counts it for you',
    ctaBody:
      'Ride Streak reads your rides from Apple Health, attributes the kilometres to each component and speaks up before anything goes overdue.',
  },

  legal: {
    lastUpdated: 'Last updated',
    backHome: 'Back to the homepage',
  },
};

export default en;
