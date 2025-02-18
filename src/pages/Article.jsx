import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { formatDateNumeric } from "../utils/formatDate";

const Article = () => {
  const [article, setArticle] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const getArticleFromLocalStorage = () => {
      try {
        const newsArray = JSON.parse(localStorage.getItem("news"));
        if (newsArray && newsArray.length > 0) {
          const article = newsArray[id];
          setArticle(article);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getArticleFromLocalStorage();
  }, [id]);

  return (
    <Layout>
      <section className="bg-news-bg flex flex-col px-4 py-5">
        <header className="border-b pb-6">
          <h1 className="font-Cormorant font-bold text-3xl">{article.title}</h1>
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
                className="text-sm font-Inter text-orange-500 shadow-2xl rounded-2xl border border-orange-500 px-4 py-2"
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
