import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

import TodoApp from "./components/TodoApp";
import "./index.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <TodoApp />
  </StrictMode>
);
