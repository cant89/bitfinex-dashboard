import React from "react";
import Header from "./Header";

type TProps = {
  children?: object;
};

const Layout: React.FunctionComponent<TProps> = ({ children }) => {
  return (
    <section>
      <Header />
      {children}
    </section>
  );
};

export default Layout;
