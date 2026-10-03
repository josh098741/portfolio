import galiumImage from '../assets/galium.jpg'
import tasklinkImage from '../assets/tasklink.png'
import zenviaImage from '../assets/zenvia.png'

export const appImages = {
  Zenvia: zenviaImage,
  Galium: galiumImage,
  TaskLink: tasklinkImage,
}

export const profile = {
  name: 'Joshua Moronge',
  firstName: 'Joshua',
  lastName: 'Moronge',
  handle: 'josh098741',
  studio: 'Infinity Quest Labs',
  role: 'Full-Stack & Game Developer',
  location: 'Nairobi Juja, Kenya',
  timezone: 'EAT (UTC+3)',
  email: 'morongemokaya@gmail.com',
  altEmail: 'infinityquestlabs@gmail.com',
  phone: '+254 720 060 752',
  availability: 'Open to collaborations',
  github: 'https://github.com/josh098741',
  website: 'https://www.infinityquestlabs.co.ke',
  avatar:
    'https://avatars.githubusercontent.com/u/196846929?v=4',
  headline:
    'A passionate developer who builds real-time, high-performance, and visually engaging applications — from AAA-level game mechanics to full-stack production systems and cross-platform mobile apps.',
  roles: [
    'Full-Stack Developer',
    'React Native Engineer',
    'Game Developer',
    'Realtime Systems Architect',
    'Backend Engineer',
  ],
}

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'apps', label: 'Apps' },
  { id: 'projects', label: 'Projects' },
  { id: 'stack', label: 'Stack' },
  { id: 'journey', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
]

export const stats = [
  { value: 3, suffix: '', label: 'Apps on Google Play', hint: 'Zenvia · Galium · TaskLink' },
  { value: 37, suffix: '', label: 'Public repositories', hint: 'on GitHub' },
  { value: 119, suffix: '+', label: 'Commits on TaskLink', hint: 'backend + mobile' },
  { value: 6, suffix: '', label: 'Languages shipped', hint: 'JS · TS · Python · C++ · C · Java' },
]

export const about = {
  paragraphs: [
    "I'm Joshua Moronge, the developer behind Infinity Quest Labs — an independent studio where I design and ship everything from AAA-style game mechanics to production web systems and cross-platform mobile apps.",
    'Most of my work lives on the Google Play Store. Each app is designed and built end-to-end: the React Native and Expo frontend, the Node and Express backend, the MongoDB and PostgreSQL data layer, and the realtime layer that keeps clients in sync over WebSockets and Socket.io.',
    'When I am not shipping mobile apps I am in Unreal Engine writing gameplay systems in C++, or pushing the limits of what the web can do in real time. I care about frame budgets, cold-start times, network latency, and interfaces that feel genuinely alive.',
  ],
  focus: [
    {
      icon: 'Gamepad2',
      title: 'Game Development',
      body: 'Unreal Engine 5 and C++. Gameplay systems, AI behaviour, physics and AAA-level mechanics.',
    },
    {
      icon: 'Layers',
      title: 'Full-Stack Web',
      body: 'React frontends over Node and Express APIs, with JWT auth and real-world data modelling.',
    },
    {
      icon: 'Smartphone',
      title: 'Cross-Platform Mobile',
      body: 'React Native with Expo. Three apps shipped to Google Play under Infinity Quest Labs.',
    },
    {
      icon: 'Zap',
      title: 'Realtime Systems',
      body: 'WebSockets and Socket.io for live sync, presence and low-latency event streaming.',
    },
    {
      icon: 'Database',
      title: 'Data Layer',
      body: 'MongoDB and PostgreSQL with Mongoose — schema design, indexing and aggregation.',
    },
    {
      icon: 'Sparkles',
      title: 'AI & Automation',
      body: 'Exploring LLM agent frameworks, AI developer tooling and intelligent automation.',
    },
  ],
  learning: ['Java', 'C', 'TanStack Query', 'Zustand', 'Python III'],
}

export const apps = [
  {
    name: 'Zenvia',
    tagline: 'Personal finance and budgeting, rebuilt for clarity',
    publisher: 'INFINITY QUEST LABS',
    category: 'Finance',
    rating: 'Rated 3+',
    downloads: '50+',
    updated: 'Oct 2, 2026',
    icon: 'Wallet',
    image: appImages.Zenvia,
    tile: 'light',
    accent: 'from-emerald-500/25 to-teal-500/5',
    ring: 'group-hover:border-emerald-400/60',
    glow: 'group-hover:shadow-emerald-500/20',
    description:
      'A simple and powerful personal finance and budgeting app designed to help you take full control of your money. Track income, expenses and savings in one place, build budgets, and read your financial health at a glance.',
    features: [
      'Record daily income and expenses in seconds',
      'Create and manage personal budgets',
      'Detailed financial summaries and reports',
      'Track spending habits over time',
      'Savings goals with live progress',
      'Encrypted in transit with data-deletion on request',
    ],
    stack: ['React Native', 'Expo', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    links: [
      {
        label: 'Play Store',
        href: 'https://play.google.com/store/apps/details?id=com.morongemokaya.zenvia',
      },
    ],
    primary: true,
  },
  {
    name: 'Galium',
    tagline: 'Movies and TV, minus the clutter',
    publisher: 'INFINITY QUEST LABS',
    category: 'Entertainment',
    rating: 'Rated 12+',
    downloads: '10+',
    updated: 'Sep 10, 2026',
    icon: 'Clapperboard',
    image: appImages.Galium,
    tile: 'dark',
    accent: 'from-fuchsia-500/25 to-purple-500/5',
    ring: 'group-hover:border-fuchsia-400/60',
    glow: 'group-hover:shadow-fuchsia-500/20',
    description:
      'Your home for exploring movies and TV shows. Search thousands of titles and dive into everything you need before you watch — full cast and crew, trailers, user and critic reviews, and rich show information in one clean, easy-to-browse app.',
    features: [
      'Browse trending, popular and top-rated titles',
      'Full cast and crew for every title',
      'Trailers, synopsis, ratings and reviews',
      'Fast search straight to the details view',
      'Personal watchlist synced to your account',
      'No data shared with third parties',
    ],
    stack: ['React Native', 'Expo', 'REST APIs', 'Auth', 'AsyncStorage'],
    links: [
      {
        label: 'Play Store',
        href: 'https://play.google.com/store/apps/details?id=com.infinityquestlabs.galium',
      },
    ],
    primary: true,
  },
  {
    name: 'TaskLink',
    tagline: 'Where jobs and tasks meet',
    publisher: 'INFINITY QUEST LABS',
    category: 'Productivity',
    rating: 'In review',
    downloads: 'Coming soon',
    updated: 'Oct 2, 2026',
    icon: 'Link2',
    image: appImages.TaskLink,
    tile: 'light',
    accent: 'from-sky-500/25 to-indigo-500/5',
    ring: 'group-hover:border-sky-400/60',
    glow: 'group-hover:shadow-sky-500/20',
    description:
      'A job and task finder that connects people to work. TaskLink pairs a mobile client with a full backend so listings, tasks and opportunities stay in sync across devices in real time.',
    features: [
      'Mobile client and backend in one codebase',
      '119+ commits of active development',
      'Job and task discovery with live sync',
      'Deployed and running on Vercel',
      'Real-time sync over Socket.io',
      'Open to early users right now',
    ],
    stack: ['React Native', 'Expo', 'Node.js', 'Express', 'MongoDB', 'Socket.io'],
    links: [
      {
        label: 'Play Store',
        href: 'https://play.google.com/store/apps/details?id=com.infinityquestlabs.tasklink',
      },
      { label: 'Live app', href: 'https://task-link-eight.vercel.app' },
    ],
    primary: false,
  },
]

export const projects = [
  {
    name: 'TaskLink',
    description:
      'Job and task finder with a React Native mobile client and an Express backend, deployed on Vercel with realtime sync.',
    language: 'JavaScript',
    languageColor: '#f1e05a',
    stars: 1,
    href: 'https://github.com/josh098741/TaskLink',
    topics: ['react-native', 'expo', 'express', 'mongodb', 'realtime'],
  },
  {
    name: 'Pinley',
    description:
      'Featured JavaScript project in the Infinity Quest Labs catalogue — starred on GitHub.',
    language: 'JavaScript',
    languageColor: '#f1e05a',
    stars: 1,
    href: 'https://github.com/josh098741/Pinley',
    topics: ['javascript', 'web'],
  },
  {
    name: 'ReelQuest',
    description:
      'TypeScript project exploring content discovery and recommendation flows.',
    language: 'TypeScript',
    languageColor: '#3178c6',
    stars: 0,
    href: 'https://github.com/josh098741/ReelQuest',
    topics: ['typescript', 'discovery'],
  },
  {
    name: 'productify',
    description:
      'Turning rough ideas into shippable products — scoping, structure and execution.',
    language: 'JavaScript',
    languageColor: '#f1e05a',
    stars: 0,
    href: 'https://github.com/josh098741/productify',
    topics: ['javascript', 'product'],
  },
  {
    name: 'react-native-wallet',
    description:
      'React Native mobile wallet — the mobile-finance work behind the Zenvia line of apps.',
    language: 'JavaScript',
    languageColor: '#f1e05a',
    stars: 0,
    href: 'https://github.com/josh098741/react-native-wallet',
    topics: ['react-native', 'fintech'],
  },
  {
    name: 'Authentication',
    description:
      'Production-minded auth flows: JWT issuance, refresh, protected routes and validation.',
    language: 'JavaScript',
    languageColor: '#f1e05a',
    stars: 0,
    href: 'https://github.com/josh098741/Authentication',
    topics: ['jwt', 'auth', 'security'],
  },
  {
    name: 'CHAT-APP',
    description:
      'Realtime messaging built on WebSockets and Socket.io with live presence.',
    language: 'JavaScript',
    languageColor: '#f1e05a',
    stars: 0,
    href: 'https://github.com/josh098741/CHAT-APP',
    topics: ['socket.io', 'websockets', 'realtime'],
  },
  {
    name: 'OPEN_CHAT_AI',
    description:
      'AI-powered chat experiments — model integration and conversational UX.',
    language: 'JavaScript',
    languageColor: '#f1e05a',
    stars: 0,
    href: 'https://github.com/josh098741/OPEN_CHAT_AI',
    topics: ['ai', 'llm', 'chat'],
  },
  {
    name: 'TradingAgents',
    description:
      'Multi-agent LLM financial trading framework — studied and extended for AI tooling.',
    language: 'Python',
    languageColor: '#3572A5',
    stars: 0,
    href: 'https://github.com/josh098741/TradingAgents',
    topics: ['python', 'ai', 'agents', 'finance'],
  },
  {
    name: 'Scrapling',
    description:
      'Adaptive web scraping framework used for data collection and automation pipelines.',
    language: 'Python',
    languageColor: '#3572A5',
    stars: 0,
    href: 'https://github.com/josh098741/Scrapling',
    topics: ['python', 'scraping', 'automation'],
  },
  {
    name: 'Nexa',
    description: 'A JavaScript project from the Infinity Quest Labs build queue.',
    language: 'JavaScript',
    languageColor: '#f1e05a',
    stars: 0,
    href: 'https://github.com/josh098741/Nexa',
    topics: ['javascript'],
  },
  {
    name: 'TypeScript-Tutorial',
    description:
      'Type system deep-dives — generics, narrowing and patterns used in production RN code.',
    language: 'TypeScript',
    languageColor: '#3178c6',
    stars: 0,
    href: 'https://github.com/josh098741/TypeScript-Tutorial',
    topics: ['typescript', 'learning'],
  },
]

export const stack = [
  {
    icon: 'Braces',
    label: 'Languages',
    accent: 'text-primary',
    items: ['JavaScript', 'TypeScript', 'Python', 'C++', 'C', 'Java'],
  },
  {
    icon: 'Smartphone',
    label: 'Frontend & Mobile',
    accent: 'text-secondary',
    items: ['React', 'React Native', 'Expo', 'TailwindCSS', 'TanStack Query', 'Zustand', 'HTML5', 'CSS3'],
  },
  {
    icon: 'Server',
    label: 'Backend & Databases',
    accent: 'text-accent',
    items: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Mongoose', 'Socket.io', 'JWT'],
  },
  {
    icon: 'Gamepad2',
    label: 'Game Development',
    accent: 'text-warning',
    items: ['Unreal Engine', 'C++'],
  },
]

export const marqueeItems = [
  'React Native',
  'Expo',
  'Unreal Engine',
  'C++',
  'Node.js',
  'Express',
  'TypeScript',
  'MongoDB',
  'PostgreSQL',
  'Socket.io',
  'WebSockets',
  'React',
  'TailwindCSS',
  'Zustand',
  'TanStack Query',
  'Mongoose',
  'JWT',
  'Python',
]

export const journey = [
  {
    period: 'Now',
    title: 'Shipping on Google Play',
    body: 'Zenvia, Galium and TaskLink are live under Infinity Quest Labs — released, published and iterating on real user feedback.',
    icon: 'Rocket',
  },
  {
    period: '2026',
    title: 'Infinity Quest Labs',
    body: 'Founded an independent studio to build and publish cross-platform products end-to-end, from React Native and Expo clients to Express and MongoDB backends.',
    icon: 'Building2',
  },
  {
    period: '2025',
    title: 'Going deep on mobile',
    body: 'A long run of React Native and Expo projects — wallets, task apps, chat and AI tooling — rebuilding the fundamentals: navigation, state, auth and offline behaviour.',
    icon: 'Smartphone',
  },
  {
    period: 'Ongoing',
    title: 'Unreal Engine and C++',
    body: 'Game development runs in parallel: gameplay systems, AI behaviour and AAA-level mechanics, focused on performance budgets and frame-rate discipline.',
    icon: 'Gamepad2',
  },
  {
    period: 'Next',
    title: 'AI tooling and realtime backends',
    body: 'Expanding into LLM agent systems and advanced realtime backends — always with an eye on shipping something a real person can actually use.',
    icon: 'Sparkles',
  },
]

export const collaborations = [
  'Games',
  'AI tools',
  'Mobile apps',
  'Advanced backend systems',
]

export const socials = [
  { label: 'GitHub', href: profile.github, icon: 'Github' },
  { label: 'Email', href: `mailto:${profile.email}`, icon: 'Mail' },
  { label: 'Website', href: profile.website, icon: 'Globe' },
]