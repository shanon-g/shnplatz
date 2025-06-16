export interface Project {
  name: string;
  language: string;
  type: string;
  image: string;
  description: string;
  links: string[];
  techIcons: string[];
}


export const projectsList: Project[] = [
  {
    name: 'shn\'s Platz (Portfolio)',
    language: 'TypeScript',
    type: 'Frontend',
    image: '/assets/projectImages/shnplatz.png',
    description: 'Retro-themed personal portfolio built with Next.js, TypeScript, and Tailwind CSS. The site is modular, fully responsive, and deployed on Vercel for optimal performance and scalability.',
    links: [
      'https://github.com/shanon-g/shnplatz',
      'https://github.com/shanon-g/shnplatz'
    ],
    techIcons: [
      '/assets/typescript_icon.png',
      '/assets/nextjs_icon.png',
      '/assets/tailwind_icon.png'
    ]
  },
  {
    name: 'Skill Bridge',
    language: 'JavaScript',
    type: 'Fullstack',
    image: '/assets/projectImages/skillbridge.png',
    description: 'A matchmaking platform for collaborative skill exchange, built with React (Vite), Express, and MySQL in JavaScript. Features include swipe-to-match profiles, real-time messaging, and JWT-based authentication. Collab project; mainly made backend.',
    links: [
      'https://github.com/joannemarcelina/Sofeng-AOL'
    ],
    techIcons: [
      '/assets/javascript_icon.png',
      '/assets/react_icon.png',
      '/assets/express_icon.png',
      '/assets/mysql_icon.png'
    ]
  },
  {
    name: '76th (2D Platformer)',
    language: 'C# (Unity)',
    type: 'Game',
    image: '/assets/projectImages/76th.png',
    description: 'A 2D platformer for Indonesia\'s 76th Independence, built with Unity featuring room-based level transitions, shooting mechanics, wall-jumping, and player animation control.',
    links: [
      'https://shnplatz.itch.io/76th',
      'https://github.com/shanon-g/76th_Game'
    ],
    techIcons: [
      '/assets/csharp_icon.png',
      '/assets/unity_icon.png'
    ]
  },
  {
    name: 'Portable Automatic Air Purifier - IoT',
    language: 'Python',
    type: 'IoT, Deep Learning',
    image: '/assets/projectImages/paap.png',
    description: 'IoT prototype detects air quality using DHT11 & MQ135 sensors & activates an air purifier based on LSTM-predicted pollution levels (PPM). Includes MongoDB storage, REST API integration, FastAPI + AI inference, Streamlit dashboard. Collab project; mainly helped model & database.',
    links: [
      'https://www.youtube.com/watch?v=-eJvXcAzU8k&t=8s',
      'https://l1nq.com/github-Prototype-PAAP',
    ],
    techIcons: [
      '/assets/python_icon.png',
      '/assets/jupyter_icon.png',
      '/assets/mongodb_icon.png'
    ]
  },
  {
    name: 'ASL Alphabet Classifier',
    language: 'Python',
    type: 'Computer Vision, Deep Learning',
    image: '/assets/projectImages/asl.png',
    description: 'Trained a deep learning model to classify American Sign Language (ASL) alphabet using a MobileNetV2 base with data augmentation and fine-tuning. Achieved 99.08% F1 Score on test set using 85k+ training images and class balancing. Collab Project',
    links: [
      'https://github.com/shanon-g/asl',
    ],
    techIcons: [
      '/assets/python_icon.png',
      '/assets/jupyter_icon.png',
      '/assets/tensorflow_icon.png'
    ]
  },
  {
    name: 'Bubble FizzPop',
    language: 'C',
    type: 'Game',
    image: '/assets/projectImages/bubblefizzpop.png',
    description: 'A console-based arcade shooting game written in C. Players control a cannon to shoot balls upward and destroy falling targets labeled with decreasing values (3→2→1). The game includes movement mechanics, progressive difficulty via random waves, a scoring system, and a built-in tutorial. Features win/lose conditions, interactive UI, and trail effects using ASCII characters.',
    links: [
      'https://github.com/shanon-g/bubbleFizzpop'
    ],
    techIcons: [
      '/assets/c_icon.png'
    ]
  },
  {
    name: 'Christian Wijaya (Simple e-Commerce)',
    language: 'JavaScript',
    type: 'Frontend',
    image: '/assets/projectImages/cw.png',
    description: 'A very simple luxury fashion brand website built with HTML, CSS, & JavaScript. Features responsive pages for product listings (filters), detail views, and event registration. Includes interactive elements like dynamic image previews, scroll-to-top buttons, and mobile-friendly navigation.',
    links: [
      'https://github.com/shanon-g/cwShop'
    ],
    techIcons: [
      '/assets/javascript_icon.png',
      '/assets/html_icon.png',
      '/assets/css_icon.png',
    ]
  },
];