'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface NewsItem {
  position: number;
  title: string;
  link: string;
  thumbnail: string;
  date: string;
  source: {
    name: string;
    icon: string;
    authors: string[];
  };
}

const NewsPage = () => {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);

  const fetchNews = async () => {
    try {
      const response = await fetch('/api/fetch-news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) throw new Error('Network response was not ok');
      
      const data = await response.json();
      console.log('Fetched:', data);
  
      // If the actual array is nested, fix it here
      setNewsData(data.news_results || data || []);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };
  

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="min-h-screen bg-[#1a1a1a] p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Latest Market News</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {newsData.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#121212] rounded-2xl shadow-lg hover:shadow-blue-700 transition-shadow duration-300 p-4 flex flex-col"
          >
            <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden">
              <Image
                src={item.thumbnail}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Image
                src={item.source.icon}
                alt={item.source.name}
                width={20}
                height={20}
              />
              <span>{item.source.name}</span>
            </div>
            <p className="text-xs mt-2 text-gray-500 italic">
              {item.source.authors?.join(', ')} • {item.date}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default NewsPage;
