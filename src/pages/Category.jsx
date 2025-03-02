import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";

const API_KEY = import.meta.env.VITE_API_KEY;

const Category = () => {
  const { category } = useParams(); // Get category from URL parameters
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Hook for navigation

  // Navigate to article page
  const handleArticleClick = (id) => {
    navigate(`/article/${id}`, { state: { fromCategory: category } });
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const cachedCategories = JSON.parse(localStorage.getItem("categories")); // Get cached categories

        if (cachedCategories && cachedCategories[category]) {
          setArticles(cachedCategories[category]); // Set articles from cache
          setLoading(false);
          return;
        }

        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?category=${category}&country=us&apiKey=${API_KEY}`
        );

        if (!response.ok) throw new Error("Failed to fetch news");

        const data = await response.json();
        if (data.articles && data.articles.length > 0) {
          const updatedCategories = cachedCategories || {};
          updatedCategories[category] = data.articles;

          localStorage.setItem("categories", JSON.stringify(updatedCategories)); // Update cache

          setArticles(data.articles);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category]); // Fetch news when category changes

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Filter articles to only show those with images
  const articlesWithImages = articles.filter((article) => article.urlToImage);

  return (
    <Layout>
      <section className="p-4">
        <div className="flex justify-between items-center border-b-2 pb-4">
          <h3 className="font-Ibarra font-semibold text-2xl capitalize">
            {category} News
          </h3>
          <div className="flex items-center justify-center rounded-2xl border-1 border-news-gray px-2 py-1">
            <p className="text-sm font-Inter text-news-orange font-medium">
              {articlesWithImages.length} New
            </p>
          </div>
        </div>
        <section className="grid grid-cols-1 gap-6 pt-6 pb-10">
          {articlesWithImages.length > 0 ? (
            articlesWithImages.map((article, index) => (
              <div
                key={index}
                className="cursor-pointer relative"
                onClick={() => handleArticleClick(index)}
              >
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="min-h-60 max-h-60 w-full object-cover"
                />
                {/* Darken */}
                <div className="absolute inset-0 bg-black opacity-60 "></div>
                <h2 className="text-xl font-medium text-white font-Inter line-clamp-2 absolute bottom-5 left-3">
                  {article.title}
                </h2>
              </div>
            ))
          ) : (
            <p>No articles available</p>
          )}
        </section>
      </section>
    </Layout>
  );
};

export default Category;
