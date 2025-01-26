"use client";

import Link from "next/link";
import {newsItems} from "../../../data/news";

const NewsDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
    const id = (await params).id;
    const news = newsItems.find((news) => news.id === id);

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
    <h1 className="text-4xl font-bold text-blue-700 mt-8 text-left">{news.title}</h1>
    {news.image ? (
      <img
        src={news.image}
        alt={news.title}
        className="my-6 max-w-full h-auto rounded-lg shadow-lg mx-auto"
      />
    ) : (
      <div className="my-6 bg-gray-200 rounded-lg w-full max-w-lg h-64 flex items-center justify-center mx-auto">
        <p className="text-gray-600">No Image Available</p>
      </div>
    )}
    <p className="text-lg text-gray-700 mt-4 text-justify">{news.content}</p>
  </div>
</div>

  );
};

export default NewsDetails;
