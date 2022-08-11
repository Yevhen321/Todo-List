import React from "react";
import { Header } from "./Header";

export const PageWrapper = (props) => {
  return (
    <div>
      <Header />
      {props.children}
    </div>
  );
};
