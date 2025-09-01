import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { LandingPage } from "./pages/LandingPage";
import { Dashboard } from "./pages/Dashboard";
import { Screener } from "./pages/Screener";
import { StockDetail } from "./pages/StockDetail";
import { Premium } from "./pages/Premium";
import { Chat } from "./pages/Chat";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Aboutit } from "./pages/About";

function AppContent() {
  const { isAuthenticated } = useAuth();

  console.log('AppContent rendering, isAuthenticated:', isAuthenticated);

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/about" element={<Aboutit />} />
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Layout>
              <Dashboard />
            </Layout>
          ) : (
            <LandingPage />
          )
        }
      />
      {/* Authenticated routes */}
      {isAuthenticated && (
        <>
          <Route
            path="/screener"
            element={
              <Layout>
                <Screener />
              </Layout>
            }
          />
          <Route
            path="/stock/:symbol"
            element={
              <Layout>
                <StockDetail />
              </Layout>
            }
          />
          <Route
            path="/premium"
            element={
              <Layout>
                <Premium />
              </Layout>
            }
          />
          <Route
            path="/chat"
            element={
              <Layout>
                <Chat />
              </Layout>
            }
          />
          <Route
            path="/watchlist"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />
          <Route
            path="/settings"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />
        </>
      )}
      {/* Optionally, add a 404 route */}
    </Routes>
  );
}

function App() {
  console.log('App component loading...');
  
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
