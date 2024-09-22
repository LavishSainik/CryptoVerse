import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store";
import { CryptoProvider } from "./context/CryptoContext";
// Lazy load the App component
const App = lazy(() => import("./App"));

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
    
    <Provider store={store}>
    <CryptoProvider>
      {/* Suspense fallback for lazy loading */}
      <Suspense fallback={<div>Loading...</div>}>
        <App />
      </Suspense>
      </CryptoProvider>
    </Provider>
  </Router>
);

// Lazy Loading the App Component:
// This will split your app into smaller bundles, loading only what’s needed when the user navigates to different parts of your site.
// Suspense Component:
// The Suspense component shows a fallback (like a loading spinner or message) while the App component is being loaded.
// React 18 Rendering:
// If you're on React 18, ReactDOM.createRoot is used for rendering. It allows for concurrent rendering which can further improve performance.