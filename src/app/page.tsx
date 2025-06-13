export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-white text-gray-900">
      <h1 className="text-4xl font-bold mb-4">Hi, I'm Shanon 👋</h1>
      <p className="text-lg mb-6">Welcome to my portfolio website.</p>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold mb-2">Projects</h2>
        <ul className="space-y-4">
          <li className="border p-4 rounded-lg shadow">
            <h3 className="text-xl font-bold">Project 1: Chat App</h3>
            <p className="text-sm">Full-stack chat app with real-time features.</p>
            <a
              href="https://yourchatapp.com"
              className="text-blue-600 underline mt-2 inline-block"
              target="_blank"
              rel="noopener noreferrer"
            >
              Live Demo
            </a>
          </li>
        </ul>
      </section>
    </main>
  );
}
