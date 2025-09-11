import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  path?: string;
  isActive?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  showHome?: boolean;
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  showHome = true,
  className = "",
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <nav
      className={`flex items-center space-x-2 text-sm ${className}`}
      aria-label="Breadcrumb"
    >
      {showHome && (
        <>
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center text-gray-500 hover:text-blue-600 transition-colors duration-200"
            title="Go to Dashboard"
          >
            <Home className="w-4 h-4" />
          </button>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </>
      )}

      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <ChevronRight className="w-4 h-4 text-gray-400" />}
          {item.isActive ? (
            <span className="text-gray-900 font-medium" aria-current="page">
              {item.label}
            </span>
          ) : (
            <button
              onClick={() => item.path && handleNavigation(item.path)}
              className={`text-gray-500 hover:text-blue-600 transition-colors duration-200 ${
                item.path ? "cursor-pointer" : "cursor-default"
              }`}
              disabled={!item.path}
            >
              {item.label}
            </button>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

// Helper function to generate breadcrumbs based on current route
export const generateBreadcrumbs = (
  pathname: string,
  params?: Record<string, string>
): BreadcrumbItem[] => {
  const pathSegments = pathname.split("/").filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [];

  // Map route segments to readable labels
  const routeLabels: Record<string, string> = {
    dashboard: "Dashboard",
    screener: "Screener",
    sector: "Sector",
    stock: "Stock Details",
    watchlist: "Watchlist",
    settings: "Settings",
    premium: "Premium",
    chat: "Chat",
    about: "About",
  };

  let currentPath = "";

  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === pathSegments.length - 1;

    // Handle dynamic routes
    if (segment.startsWith(":")) {
      const paramKey = segment.substring(1);
      const paramValue = params?.[paramKey];
      if (paramValue) {
        breadcrumbs.push({
          label: paramValue,
          path: isLast ? undefined : currentPath,
          isActive: isLast,
        });
      }
    } else {
      const label =
        routeLabels[segment] ||
        segment.charAt(0).toUpperCase() + segment.slice(1);
      breadcrumbs.push({
        label,
        path: isLast ? undefined : currentPath,
        isActive: isLast,
      });
    }
  });

  return breadcrumbs;
};
