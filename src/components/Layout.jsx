import Navigation from "./Navigation";

const Layout = ({ children }) => {
  return (
    <div className="bg-news-bg min-h-dvh">
      <Navigation />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
