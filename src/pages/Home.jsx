import { useEffect, useState } from "react";

const Home = () => {
  const myKey = import.meta.env.VITE_API_KEY;
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const cachedNews = localStorage.getItem("news");
        if (!cachedNews || cachedNews === "[]") {
          const response = await fetch(
            `https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&apiKey=${myKey}`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch news");
          }
          const data = await response.json();
          if (data.articles && data.articles.length > 0) {
            localStorage.setItem("news", JSON.stringify(data.articles));
            setNews(data.articles);
          } else {
            console.log("No news data found in API response");
          }
        } else {
          setNews(JSON.parse(cachedNews));
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [myKey]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>HOME</h1>
      <div>
        {news.map((article, index) => (
          <div key={index} className="border-2 bg-gray-300 mb-2">
            <h2 className="text-lg font-bold">{article.title}</h2>
            <p className="line-clamp-2">{article.description}</p>
            <img src={article.urlToImage} alt={article.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
