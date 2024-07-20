import { createRoot } from "react-dom/client";

import TodoApp from "./components/TodoApp";
import "./index.css";

const root = createRoot(document.getElementById("root"));

root.render(<TodoApp />);
