import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Handle 404 redirects
(function (l) {
	if (l.search[1] === "/") {
		var decoded = l.search
			.slice(1)
			.split("&")
			.map(function (s) {
				return s.replace(/~and~/g, "&");
			})
			.join("?");
		window.history.replaceState(
			{},
			"",
			l.pathname.slice(0, -1) + decoded + l.hash
		);
	}
})(window.location);

createRoot(document.getElementById("root")!).render(<App />);
