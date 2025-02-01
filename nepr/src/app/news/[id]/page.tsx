import Link from "next/link";
import Carousel from "../../components/carousel";

interface NewsItem {
  title: string;
  author?: string;
  date: string;
  source: string;
  content: string;
  multimedia: string[]; // Array of strings representing image URLs
}

export default async function NewsDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id ?? "1";
  let newsItem: NewsItem ;

  const fetchNews = async () => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 sec timeout

    try {
      const response = await fetch(`https://flask-ontology-app.onrender.com/news/${id}`, {
        signal: controller.signal,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      newsItem = data;
      console.log(newsItem);
    } catch (error) {
      console.error("Failed to load news", error);
    } finally {
      clearTimeout(timeoutId);
    }
  };

  await fetchNews();
  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-4 ">
      {/* Floating Back Button */}
      <Link href="/news">
        <div
          className="fixed top-20 left-4 p-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition-colors z-50"
          aria-label="Back to News"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </div>
      </Link>

      {/* News Content */}
      <div className="px-4 ">
        <h1 className="text-4xl font-bold text-blue-700 mt-8 text-left">{newsItem.title}</h1>

        {newsItem.author && <h3 className="text-m text-gray-700 mt-4 text-justify">Written by: {newsItem.author}</h3>}
        <h4 className="t-s text-gray-700 mt-4 text-justify">Published on: {newsItem.date}</h4>
        <p className="text-xs text-gray-700 mt-4 text-justify">Source: {newsItem.source}</p>

        <Carousel multimedia={newsItem.multimedia}></Carousel>
        <p className="text-lg text-gray-700 mt-4 text-justify">{newsItem.content}</p>
      </div>
    </div>
  );
}
