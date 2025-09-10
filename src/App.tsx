import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SidebarLayout } from "./components/layout/SidebarLayout";
import { LandingPage } from "./pages/LandingPage";
import { Dashboard } from "./pages/Dashboard";
import { Watchlist } from "./pages/Watchlist";
import { Screener } from "./pages/Screener";
import { StockDetail } from "./pages/StockDetail";
import { Premium } from "./pages/Premium";
import { Chat } from "./pages/Chat";
import { Settings } from "./pages/Settings";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Aboutit } from "./pages/About";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/about" element={<Aboutit />} />
          <Route path="/" element={<LandingPage />} />

          {/* Dashboard routes - no authentication required */}
          <Route
            path="/dashboard"
            element={
              <SidebarLayout>
                <Dashboard />
              </SidebarLayout>
            }
          />
          <Route
            path="/screener"
            element={
              <SidebarLayout>
                <Screener />
              </SidebarLayout>
            }
          />
          <Route
            path="/stock/:symbol"
            element={
              <SidebarLayout>
                <StockDetail />
              </SidebarLayout>
            }
          />
          <Route
            path="/premium"
            element={
              <SidebarLayout>
                <Premium />
              </SidebarLayout>
            }
          />
          <Route
            path="/chat"
            element={
              <SidebarLayout>
                <Chat />
              </SidebarLayout>
            }
          />
          <Route
            path="/watchlist"
            element={
              <SidebarLayout>
                <Watchlist />
              </SidebarLayout>
            }
          />
          <Route
            path="/settings"
            element={
              <SidebarLayout>
                <Settings />
              </SidebarLayout>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
