export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl font-extrabold text-blue-700">
          Nepr
        </h1>
        <p className="text-lg text-gray-600 mt-4">
          The Web News Provenance Platform
        </p>
      </main>

      <footer className="w-full py-4 text-center text-sm text-gray-800 bg-transparent mt-auto">
        © 2025 Nepr. All rights reserved.
      </footer>
    </div>
  );
}
