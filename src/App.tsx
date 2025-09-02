import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { SidebarLayout } from "./components/layout/SidebarLayout";
import { LandingPage } from "./pages/LandingPage";

import { Dashboard } from "./pages/Dashboard";
import { Screener } from "./pages/Screener";
import { StockDetail } from "./pages/StockDetail";
import { Premium } from "./pages/Premium";
import { Chat } from "./pages/Chat";
import { Settings } from "./pages/Settings";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Aboutit } from "./pages/About";

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/about" element={<Aboutit />} />
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/dashboard"
        element={
          <SidebarLayout>
            <Dashboard />
          </SidebarLayout>
        }
      />
      {/* Authenticated routes */}
      {isAuthenticated && (
        <>
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
                <Dashboard />
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
        </>
      )}
      {/* Optionally, add a 404 route */}
    </Routes>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
