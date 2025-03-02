import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { formatDateNumeric } from "../utils/formatDate";

const Article = () => {
  const [article, setArticle] = useState(null);
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    const getArticleFromLocalStorage = () => {
      try {
        let foundArticle = null;
        const fromCategory = location.state?.fromCategory; // Check if navigated from a category

        if (fromCategory) {
          // Get the article from the category in localStorage
          const categoriesData = JSON.parse(localStorage.getItem("categories"));
          const newsInCategory = categoriesData[fromCategory];
          foundArticle = newsInCategory[id];
        } else {
          // Get the article from the general news in localStorage
          const newsArray = JSON.parse(localStorage.getItem("news")) || [];
          foundArticle = newsArray[id];
        }
        setArticle(foundArticle);
      } catch (error) {
        console.log(error);
      }
    };

    getArticleFromLocalStorage();
  }, [id, location]);

  // Display a message if the article is not found
  if (!article) {
    return (
      <Layout>
        <section className="flex flex-col items-center justify-center h-screen">
          <h2 className="text-xl font-bold">Article not found</h2>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="bg-news-bg flex flex-col px-4 py-5">
        <header className="border-b pb-6">
          <h1 className="font-Ibarra font-bold text-3xl">{article.title}</h1>
          <div className="flex font-Inter items-center pt-4 text-news-gray text-sm font-medium border-gray-300">
            <hr className="w-8 h-[2px] bg-black mr-3" />
            <address className="mr-2 not-italic">
              {article.author ? article.author.split(",")[0] : "Unknown"}
            </address>
            <span className="text-red-500 scale-125 mr-2">•</span>
            <time dateTime={article.publishedAt}>
              {article.publishedAt && formatDateNumeric(article.publishedAt)}
            </time>
          </div>
        </header>

        <article className="pt-6 flex-grow">
          <img
            src={article.urlToImage}
            alt={article.title}
            className="min-h-52 object-cover"
          />
          <p className="pt-6 pb-8 font-Inter">
            {article.content
              ? article.content.replace(/\s?\[\+\d+\schars\]$/, "") + "..."
              : "Content not available"}
          </p>
          {article.url && (
            <div className="flex items-center justify-center  ">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-Inter text-news-orange shadow-2xl rounded-2xl border border-news-orange px-4 py-2"
              >
                Continue Reading
              </a>
            </div>
          )}
        </article>
      </section>
    </Layout>
  );
};

export default Article;
