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
    image: '/assets/shnplatz.png',
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
    image: '/assets/skillbridge.png',
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
    image: '/assets/76th.png',
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
    name: 'Portable Automatic Air Purifier IoT',
    language: 'Python',
    type: 'IoT, AI',
    image: '/assets/paap.png',
    description: 'IoT prototype detects air quality using DHT11 & MQ135 sensors & activates an air purifier based on LSTM-predicted pollution levels (PPM). Includes MongoDB storage, REST API integration, FastAPI + AI inference, Streamlit dashboard. Collab project; mainly helped model & database.',
    links: [
      'https://l1nq.com/github-Prototype-PAAP',
      'https://www.youtube.com/watch?v=-eJvXcAzU8k&t=8s'
    ],
    techIcons: [
      '/assets/jupyter_icon.png',
      '/assets/python_icon.png',
      '/assets/mongodb_icon.png'
    ]
  },
  {
    name: 'ASL Detection (Machine Learning)',
    language: 'Python',
    type: 'AI',
    image: '/assets/asl.png',
    description: 'To-do list with drag-and-drop support.',
    links: [
      
    ],
    techIcons: [
      '/assets/jupyter_icon.png',
      '/assets/python_icon.png'
    ]
  },
  {
    name: 'Task Manager',
    language: 'JavaScript',
    type: 'Web',
    image: '/assets/project3.png',
    description: 'To-do list with drag-and-drop support.',
    links: [

    ],
    techIcons: ['/assets/react_icon.png']
  },
];