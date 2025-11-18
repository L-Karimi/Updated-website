import { useState, useEffect } from "react";
import MarketingWebsite from "./views/MarketingWebsite";

function App() {
  const [currentRoute, setCurrentRoute] = useState(() => window.location.hash || "");

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(window.location.hash || "");
    };
    window.addEventListener("hashchange", handleHashChange);
    
    // Ensure we start at marketing route if no hash
    if (!currentRoute || currentRoute === "#/") {
      window.location.hash = "#/marketing";
    }
    
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [currentRoute]);

  return <MarketingWebsite />;
}

export default App;