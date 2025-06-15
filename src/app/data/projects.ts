export interface Project {
  name: string;
  language: string;
  type: string;
  image: string;
  description: string;
  techIcons: string[];
}


export const projectsList: Project[] = [
  {
    name: "shn's Platz (Portfolio)",
    language: 'TypeScript',
    type: 'Frontend',
    image: '/assets/project1.png',
    description: 'Retro-themed personal portfolio built with Next.js (App Router), TypeScript, and Tailwind CSS. The site is modular, fully responsive, and deployed on Vercel for optimal performance and scalability.',
    techIcons: [
      '/assets/nextjs_icon.png',
      '/assets/typescript_icon.png',
      '/assets/tailwind_icon.png'
    ]
  },
  {
    name: 'Portfolio Website',
    language: 'TypeScript',
    type: 'Web',
    image: '/assets/project2.png',
    description: 'Portfolio built with Next.js and Tailwind CSS.',
    techIcons: ['/assets/react_icon.png']
  },
  {
    name: 'Task Manager',
    language: 'JavaScript',
    type: 'Web',
    image: '/assets/project3.png',
    description: 'To-do list with drag-and-drop support.',
    techIcons: ['/assets/react_icon.png']
  },
  {
    name: 'Task Manager',
    language: 'JavaScript',
    type: 'Web',
    image: '/assets/project3.png',
    description: 'To-do list with drag-and-drop support.',
    techIcons: ['/assets/react_icon.png']
  },
  {
    name: 'Task Manager',
    language: 'JavaScript',
    type: 'Web',
    image: '/assets/project3.png',
    description: 'To-do list with drag-and-drop support.',
    techIcons: ['/assets/react_icon.png']
  },
];