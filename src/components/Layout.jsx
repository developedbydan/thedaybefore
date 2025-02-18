import Navigation from "./Navigation";

const Layout = ({ children }) => {
  return (
    <div className="bg-news-bg min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">{children}</main>
    </div>
  );
};

export default Layout;
