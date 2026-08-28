import type { Project } from '@/types/proj';

export const projectsList: Project[] = [
  {
    name: "shn's Platz (Portfolio)",
    language: 'TypeScript',
    types: ['web'],
    image: '/assets/projectImages/shnplatz.png',
    description: 'Retro-themed personal portfolio built with Next.js, TypeScript, Tailwind CSS, and Three JS elements. The site is modular, and fully responsive for optimal performance and scalability.',
    links: [
      { kind: 'live', url: 'https://shnplatz.vercel.app' },
      { kind: 'source', url: 'https://github.com/shanon-g/shnplatz' }
    ],
    techIcons: [
      { src: '/assets/typescript_icon.png', label: 'TypeScript' },
      { src: '/assets/nextjs_icon.png', label: 'Next.js' },
      { src: '/assets/tailwind_icon.png', label: 'Tailwind CSS' },
      { src: '/assets/threejs_icon.png', label: 'Three.js' }
    ]
  },
  {
    name: 'Portable Automatic Air Purifier - IoT',
    language: 'Python',
    types: ['ai-ml', 'web'],
    featured: true,
    image: '/assets/projectImages/paap.png',
    description: 'IoT prototype detects air quality with DHT11 & MQ135 sensors & activates air purifier based on LSTM-predicted pollution levels. Includes MongoDB storage, REST API, FastAPI + AI, Streamlit dashboard. Collab project; mainly helped model & database.',
    links: [
      { kind: 'demo', url: 'https://www.youtube.com/watch?v=-eJvXcAzU8k&t=8s' },
      { kind: 'source', url: 'https://l1nq.com/github-Prototype-PAAP' }
    ],
    techIcons: [
      { src: '/assets/python_icon.png', label: 'Python' },
      { src: '/assets/jupyter_icon.png', label: 'Jupyter' },
      { src: '/assets/mongodb_icon.png', label: 'MongoDB' }
    ]
  },
  {
    name: 'Shot Cut',
    language: 'Swift',
    types: ['ai-ml', 'ios'],
    image: '/assets/projectImages/shotcut.png',
    description: 'Frame-extraction app for cinematographers to build shot list references. Using Apple\'s Vision framework, the app automatically processes videos & curates frames from scene changes, eliminating the need for manual scrubbing during pre-production. Collab project; mainly did front-end',
    links: [
      { kind: 'source', url: 'https://github.com/absolutecinema-c9' },
    ],
    techIcons: [
      { src: '/assets/swift_icon.png', label: 'Swift' },
    ]
  },
  {
    name: 'Skill Bridge',
    language: 'JavaScript',
    types: ['web'],
    image: '/assets/projectImages/skillbridge.png',
    description: 'A matchmaking platform for collaborative skill exchange, built with React (Vite), Express, and MySQL in JavaScript. Features include swipe-to-match profiles, real-time messaging, and JWT-based authentication. Collab project; mainly made backend.',
    links: [
      { kind: 'source', url: 'https://github.com/joannemarcelina/Sofeng-AOL' }
    ],
    techIcons: [
      { src: '/assets/javascript_icon.png', label: 'JavaScript' },
      { src: '/assets/react_icon.png', label: 'React' },
      { src: '/assets/express_icon.png', label: 'Express' },
      { src: '/assets/mysql_icon.png', label: 'MySQL' }
    ]
  },
  {
    name: '76th (2D Platformer)',
    language: 'C# (Unity)',
    types: ['game'],
    image: '/assets/projectImages/76th.png',
    description: "A 2D platformer for Indonesia's 76th Independence, built with Unity featuring room-based level transitions, shooting mechanics, wall-jumping, and player animation control.",
    links: [
      { kind: 'live', url: 'https://shnplatz.itch.io/76th' },
      { kind: 'source', url: 'https://github.com/shanon-g/76th_Game' }
    ],
    techIcons: [
      { src: '/assets/csharp_icon.png', label: 'C#' },
      { src: '/assets/unity_icon.png', label: 'Unity' }
    ]
  },
  {
    name: 'ASL Alphabet Classifier',
    language: 'Python',
    types: ['ai-ml'],
    image: '/assets/projectImages/asl.png',
    description: 'Trained a deep learning model to classify American Sign Language (ASL) alphabet using a MobileNetV2 base with data augmentation and fine-tuning. Achieved 99.08% F1 Score on test set using 85k+ training images and class balancing.',
    links: [
      { kind: 'source', url: 'https://github.com/shanon-g/asl' }
    ],
    techIcons: [
      { src: '/assets/python_icon.png', label: 'Python' },
      { src: '/assets/jupyter_icon.png', label: 'Jupyter' },
      { src: '/assets/tensorflow_icon.png', label: 'TensorFlow' }
    ]
  },
  {
    name: 'Christian Wijaya (Simple e-Commerce)',
    language: 'JavaScript',
    types: ['web'],
    image: '/assets/projectImages/cw.png',
    description: 'A very simple luxury fashion brand website built with HTML, CSS, & JavaScript. Features responsive pages for product listings (filters), detail views, and event registration. Includes interactive elements like dynamic image previews, scroll-to-top buttons, and mobile-friendly navigation.',
    links: [
      { kind: 'source', url: 'https://github.com/shanon-g/cwShop' }
    ],
    techIcons: [
      { src: '/assets/javascript_icon.png', label: 'JavaScript' },
      { src: '/assets/html_icon.png', label: 'HTML' },
      { src: '/assets/css_icon.png', label: 'CSS' }
    ]
  },
  {
    name: "Don't Tilt!",
    language: 'Swift',
    types: ['game', 'ios'],
    featured: false,
    image: '/assets/projectImages/donttilt.png',
    description: "A fast-paced motion-based iOS game. Keep your phone perfectly flat while completing randomized physical challenges like jumping or moonwalking against the clock, tracked via CoreMotion with CoreHaptics feedback when you start to tip. Solo project, live on the App Store.",
    links: [
      { kind: 'appstore', url: 'https://apps.apple.com/id/app/dont-tilt/id6782811446' }
    ],
    techIcons: [
      { src: '/assets/swift_icon.png', label: 'Swift' }
    ]
  },
  {
    name: 'Feelo',
    language: 'Swift',
    types: ['game', 'ios'],
    featured: false,
    image: '/assets/projectImages/feelo.png',
    description: "An interactive emotion-learning app helping children aged 3–6 recognize emotions through movement-based scenarios with parental guidance, combining narrated story scenarios with AVFoundation and Vision-powered movement activities. Collab project; developed the user interface.",
    links: [
      { kind: 'testflight', url: 'https://testflight.apple.com/join/kGEKqESh' }
    ],
    techIcons: [
      { src: '/assets/swift_icon.png', label: 'Swift' },
      { src: '/assets/webkit_icon.png', label: 'WebKit' }
    ]
  },
  {
    name: 'Sonic Pals',
    language: 'Swift',
    types: ['game', 'ios'],
    featured: true,
    image: '/assets/projectImages/sonicpals.png',
    description: "An AR educational app, built with ARKit and RealityKit, helping children understand ultrasonic waves through an immersive, animal-point-of-view simulation with guided navigation, and end-of-level quiz. Collab project; developed scene reconstruction logic, and AR session.",
    links: [
      { kind: 'testflight', url: 'https://testflight.apple.com/join/sWyUugPY' }
    ],
    techIcons: [
      { src: '/assets/swift_icon.png', label: 'Swift' },
      { src: '/assets/realitycomposer_icon.png', label: 'Reality Composer Pro 2' }
    ]
  }
];
