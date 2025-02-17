import { useEffect, useState } from "react";
import Layout from "../components/Layout";

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
    <Layout>
      <div className="border-t-6 flex flex-col py-4 px-4">
        <div className="flex justify-between items-center border-b-2 pb-4">
          <h3 className="font-Playfair-Display font-semibold text-xl">
            Popular Article Now
          </h3>
          <div className="flex items-center justify-center rounded-2xl border-1 border-gray-400 px-2 py-1">
            <p className="text-sm font-Inter text-orange-500 font-medium">
              20 New
            </p>
          </div>
        </div>
        <div className="py-10 flex flex-col gap-10">
          {news.slice(0, 20).map((article, index) => {
            const formatedDate = new Date(
              article.publishedAt
            ).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            });

            return (
              <div
                key={index}
                className=" bg-news-bg flex mb-2 gap-3 h-24 cursor-pointer"
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
                  <p className="text-news-gray">
                    {formatedDate}, {article.author}
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
