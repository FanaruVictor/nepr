"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

interface NewsItem {
  title: string;
  preview_img: string;
  multimedia: string[]; // Array of multimedia URLs, which can include images
  news_id: string;
}

const NewsPage = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]); // Typed state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1); // Tracks current page

  // Fetch news based on the current page
  useEffect(() => {
    const fetchNews = async () => {
      const skip = (page - 1) * 12;
      const take = 12;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 sec timeout

      try {
        const response = await fetch(`https://flask-ontology-app.onrender.com/news-page?skip=${skip}&take=${take}`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: NewsItem[] = await response.json(); // Typed response
        setNewsItems(data);
      } catch (error) {
        console.log(error);
      } finally {
        clearTimeout(timeoutId);
        setLoading(false);
      }
    };

    fetchNews();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]); // Re-fetch when the page changes

  const goToNextPage = () => {
    setPage(page + 1);
  };

  const goToPrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div className="min-h-screen pt-20 flex flex-wrap justify-center gap-10 px-4">
      {loading && <div className="text-center text-blue-500 text-lg">Loading...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}
      {!loading && !error && (
        <div className="w-full text-center mt-8">
          <button
            onClick={goToPrevPage}
            disabled={page === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded-md mr-4 disabled:opacity-50"
          >
            {"<"}
          </button>
          <span className="font-semibold text-gray-700">{` ${page} `}</span>
          <button
            onClick={goToNextPage}
            className="px-4 py-2 bg-blue-500 text-white rounded-md ml-4 disabled:opacity-50"
          >
            {">"}
          </button>
        </div>
      )}

      {!loading && !error &&
        newsItems.map((news, index) => (
          <Link key={index} href={`/news/${news.news_id}`} passHref className="w-full sm:w-1/3 lg:w-1/4">
            <div className="h-56 bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition relative group">
              {/* Image or fallback */}
              {news.multimedia && news.multimedia.length > 0 && news.multimedia[0] !== "" ? (
                <img
                  src={news.preview_img}
                  alt="image"
                  className="w-full h-3/4 object-cover transition-all duration-300 group-hover:h-1/2"
                />
              ) : (
                <div className="w-full h-3/4 bg-gray-200"></div>
              )}

              {/* Title */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-blue-700 truncate">{news.title}</h3>
              </div>
            </div>
          </Link>
        ))}
      
      {!loading && !error && (
        <div className="w-full text-center mt-8">
          <button
            onClick={goToPrevPage}
            disabled={page === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded-md mr-4 disabled:opacity-50"
          >
            {"<"}
          </button>
          <span className="font-semibold">{` ${page} `}</span>
          <button
            onClick={goToNextPage}
            className="px-4 py-2 bg-blue-500 text-white rounded-md ml-4 disabled:opacity-50"
          >
            {">"}
          </button>
        </div>
      )}
    </div>
  );
};

export default NewsPage;
