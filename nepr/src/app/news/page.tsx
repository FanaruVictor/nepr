"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { newsItems } from "../../data/news";
const NewsPage = () => {

  

  return (
<div className="  min-h-screen pt-20 flex flex-wrap justify-center gap-10 px-4">
  {newsItems.map((news) => (
    <Link key={news.id} href={`/news/${news.id}`} passHref className="w-full sm:w-1/3 lg:w-1/4 ">
      <div className="h-56 bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition relative group">
        {/* Image with shrinking effect on hover */}
        {news.image ? (
          <img
            src={news.image}
            alt={news.title}
            className="w-full h-3/4 object-cover transition-all duration-300 group-hover:h-1/2"
          />
        ) : (
          <div className="w-full h-3/4 bg-gray-200 flex items-center justify-center">
            <p className="text-gray-500">No Image</p>
          </div>
        )}

        {/* Title with expanded space on hover */}
        <div className="p-4 flex flex-col justify-between">
          <h3 className="text-lg font-bold text-blue-700 group-hover:h-auto group-hover:overflow-visible group-hover:text-clip group-hover:whitespace-normal truncate transition-all duration-300">
            {news.title}
          </h3>
        </div>
      </div>
    </Link>
  ))}
</div>



  );
};

export default NewsPage;
