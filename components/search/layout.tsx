import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="search-screen relative">
      <main className="search-main">{children}</main>
    </div>
  );
};

export default Layout;
