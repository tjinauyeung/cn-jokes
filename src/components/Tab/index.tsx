import * as React from "react";
import "./index.scss";

export const Tab = ({ active, onClick, children }) => (
  <button
    className="btn tab"
    style={{ fontWeight: active ? 900 : 400 }}
    onClick={onClick}
  >
    {children}
  </button>
);
