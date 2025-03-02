import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Layout from "../components/Layout";
import { formatDateShort } from "../utils/formatDate";

const API_KEY = import.meta.env.VITE_API_KEY;

const Home = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Retrieve cached news from localStorage
        const cachedNews = localStorage.getItem("news");
        if (!cachedNews || cachedNews === "[]") {
          const response = await fetch(
            `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch news");
          }

          const data = await response.json();
          if (data.articles && data.articles.length > 0) {
            // Cache the news articles in localStorage
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
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const handleClick = (articleId) => {
    navigate(`/article/${articleId}`);
  };

  return (
    <Layout>
      <div className="flex flex-col py-4 px-4">
        <div className="flex justify-between items-center border-b-2 pb-4">
          <h3 className="font-Ibarra font-semibold text-2xl">
            Trending Articles
          </h3>
          <div className="flex items-center justify-center rounded-2xl border-1 border-news-gray px-2 py-1">
            <p className="text-sm font-Inter text-news-orange font-medium">
              {Math.floor(news.length / 2)} New
            </p>
          </div>
        </div>
        <div className="py-10 flex flex-col gap-10">
          {news.slice(0, news.length / 2).map((article, index) => {
            return (
              <div
                key={index}
                className=" bg-news-bg flex mb-2 gap-3 h-24 cursor-pointer"
                onClick={() => handleClick(index)}
              >
                <div className="min-w-10 max-w-10 pb-2.5">
                  <div className=" flex flex-col items-center border-b-2 h-full w-full">
                    <h2 className="font-Inter font-semibold text-3xl italic">
                      {(index + 1).toString().padStart(2, "0")}
                    </h2>
                  </div>
                </div>

                <div className="flex flex-col justify-between ">
                  <h2 className="text-xl font-medium  font-Inter line-clamp-2">
                    {article.title}
                  </h2>
                  <p className="text-news-gray line-clamp-1">
                    {article.publishedAt &&
                      formatDateShort(article.publishedAt)}
                    , {article.author}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
