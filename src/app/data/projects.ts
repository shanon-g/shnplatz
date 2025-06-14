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
    name: 'Weather App',
    language: 'JavaScript',
    type: 'Web',
    image: '/assets/project1.png',
    description: 'A simple weather app using OpenWeather API.',
    techIcons: ['/assets/react_icon.png']
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