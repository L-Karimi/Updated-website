import { useState, useEffect } from "react";
import MarketingWebsite from "./views/MarketingWebsite";
import CoverPage from "./views/CoverPage";

function App() {
  const [currentRoute, setCurrentRoute] = useState(() => window.location.hash || "");

  // Handle hash route changes for marketing website and cover page
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(window.location.hash || "");
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Route to Marketing Website
  if (currentRoute.startsWith("#/marketing")) {
    return <MarketingWebsite />;
  }

  // Route to Cover Page (default when no hash or #/cover)
  if (!currentRoute || currentRoute === "#/" || currentRoute === "#/cover" || currentRoute.startsWith("#/cover")) {
    return <CoverPage />;
  }

  // For any other routes, show the marketing website
  return <MarketingWebsite />;
}

export default App;