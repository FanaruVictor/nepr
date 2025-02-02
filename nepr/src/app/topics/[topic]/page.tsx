import News from "@/app/components/news";

interface NewsItem {
  title: string;
  preview_img: string;
  multimedia: string[]; 
  news_id: string;
}

interface Topics{
  news_list: NewsItem[];
}

export default async function TopicDetails({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
    const topic = (await params).topic ?? "";
    
    let news : Topics = {
      news_list: []
    };

    const fetchNews = async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000); 

      try {
        const response = await fetch(`https://flask-ontology-app.onrender.com/topics/${topic}`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        news = data;
      } catch (error) {
        console.error("Failed to load news", error);
      } finally {
        clearTimeout(timeoutId);
      }
    };

    await fetchNews();

    return (
      <News newsList={news.news_list}></News>
    )
};