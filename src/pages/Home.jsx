import { useEffect, useState } from "react";

const Home = () => {
  const myKey = import.meta.env.VITE_API_KEY;
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=${myKey}`
        );
        const data = await response.json();
        setNews(data.articles); // Prilagodi prema API strukturi
        setLoading(false);
      } catch (err) {
        setError("Greška pri učitavanju vesti.");
        console.log(err);
        setLoading(false);
      }
    };

    fetchNews();
    console.log(news);
  }, []);

  return <div>Home</div>;
};

export default Home;
