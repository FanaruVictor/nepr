"use client";
import Link from "next/link";

const News = ({newsList}) => {
  return (
  <div className="min-h-screen flex flex-wrap justify-center gap-10 px-4">
      
      {
        newsList.map((news, index) => (
          <Link key={index} href={`/news/${news.news_id}`} passHref className="w-full sm:w-1/3 lg:w-1/4">
            <div className="h-56 bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition relative group">
              {/* Image or fallback */}
              {news.preview_img ? (
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
    </div>
  );
};

export default News;
