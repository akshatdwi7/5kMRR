import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";

export const Screener: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Ensure Material Symbols font is loaded once
  useEffect(() => {
    const existing = document.getElementById("material-symbols-font");
    if (!existing) {
      const link = document.createElement("link");
      link.id = "material-symbols-font";
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0";
      document.head.appendChild(link);
    }
  }, []);

  const getIconName = (sectorName: string): string => {
    const key = sectorName.toLowerCase();
    const map: Record<string, string> = {
      abrasives: "construction",
      "advertising & media": "live_tv",
      agriculture: "agriculture",
      "air conditioners": "ac_unit",
      airlines: "flight",
      "airport management services": "local_airport",
      "aluminium & aluminium products": "precision_manufacturing",
      "amusement parks/recreation/club": "attractions",
      "animal feed": "restaurant",
      aquaculture: "water",
      "auto ancillary": "car_repair",
      "automobile two & three wheelers": "two_wheeler",
      "automobiles - dealers & distributors": "storefront",
      "automobiles - passenger cars": "directions_car",
      "automobiles-tractors": "agriculture",
      "automobiles-trucks/lcv": "local_shipping",
      "bank - private": "account_balance",
      "bank - public": "account_balance",
      batteries: "battery_charging_full",
      bearings: "settings",
      "bpo/ites": "support_agent",
      "breweries & distilleries": "sports_bar",
      chemicals: "science",
      "consumer food": "fastfood",
      "real estate": "apartment",
      "steel & iron": "build",
      "plastic products": "category",
      "electric equipment": "bolt",
      "it services": "devices",
      cement: "factory",
      "oil & gas": "oil_barrel",
      telecom: "cell_tower",
      power: "bolt",
      fertilizers: "compost",
      sugar: "cookie",
      paper: "description",
      "diamond & jewellery": "diamond",
      "media & entertainment": "movie",
      shipping: "directions_boat",
      "airlines ": "flight",
      hotels: "hotel",
      education: "school",
      healthcare: "health_and_safety",
      insurance: "health_and_safety",
      "mutual funds": "stacked_line_chart",
      nbfc: "account_balance",
      mining: "landslide",
      defence: "security",
      railways: "train",
      ports: "anchor",
      airports: "local_airport",
    };
    return map[key] || "category";
  };

  // Comprehensive Indian stock market sectors from Ticker
  const sectors = [
    {
      name: "Abrasives",
      description: "The one that scraps away all inconsistencies.",
      companies: 3,
      micro: 0,
      small: 1,
      mid: 2,
      large: 0,
      icon: "🔧",
    },
    {
      name: "Advertising & Media",
      description: "The one that creates and distributes media content.",
      companies: 14,
      micro: 12,
      small: 2,
      mid: 0,
      large: 0,
      icon: "📺",
    },
    {
      name: "Agriculture",
      description: "The one that gives us vegetables and fruits to eat.",
      companies: 54,
      micro: 47,
      small: 5,
      mid: 2,
      large: 0,
      icon: "🌾",
    },
    {
      name: "Air Conditioners",
      description: "The one that's keeps it cool with no noise.",
      companies: 5,
      micro: 0,
      small: 1,
      mid: 2,
      large: 2,
      icon: "❄️",
    },
    {
      name: "Airlines",
      description:
        "The one that takes us around the world in the shortest time.",
      companies: 7,
      micro: 1,
      small: 3,
      mid: 2,
      large: 1,
      icon: "✈️",
    },
    {
      name: "Airport Management Services",
      description: "The one that oversees it all in airports for your journey.",
      companies: 2,
      micro: 0,
      small: 1,
      mid: 0,
      large: 1,
      icon: "🛫",
    },
    {
      name: "Aluminium & Aluminium Products",
      description: "The one that can wrap up almost everything.",
      companies: 18,
      micro: 15,
      small: 2,
      mid: 0,
      large: 1,
      icon: "🔩",
    },
    {
      name: "Amusement Parks/Recreation/Club",
      description: "The one that's all about the fun stuff and food.",
      companies: 5,
      micro: 2,
      small: 2,
      mid: 1,
      large: 0,
      icon: "🎢",
    },
    {
      name: "Animal Feed",
      description: "The one that's all about nutritious feeds for animals.",
      companies: 7,
      micro: 4,
      small: 1,
      mid: 2,
      large: 0,
      icon: "🌱",
    },
    {
      name: "Aquaculture",
      description: "The one that takes care of aquatic animals.",
      companies: 8,
      micro: 7,
      small: 1,
      mid: 0,
      large: 0,
      icon: "🐟",
    },
    {
      name: "Auto Ancillary",
      description: "The one that provides parts to keep our vehicles running.",
      companies: 106,
      micro: 42,
      small: 33,
      mid: 25,
      large: 6,
      icon: "🚗",
    },
    {
      name: "Automobile Two & Three Wheelers",
      description: "The one that suits couples and smaller groups.",
      companies: 11,
      micro: 4,
      small: 1,
      mid: 2,
      large: 4,
      icon: "🏍️",
    },
    {
      name: "Automobiles - Dealers & Distributors",
      description: "The one that makes cars and buses available to public.",
      companies: 8,
      micro: 5,
      small: 2,
      mid: 1,
      large: 0,
      icon: "🚙",
    },
    {
      name: "Automobiles - Passenger Cars",
      description: "The one that lets families travel together comfortably.",
      companies: 5,
      micro: 1,
      small: 1,
      mid: 0,
      large: 3,
      icon: "🚘",
    },
    {
      name: "Automobiles-Tractors",
      description: "The one that is used in farms or construction sites.",
      companies: 3,
      micro: 0,
      small: 1,
      mid: 1,
      large: 1,
      icon: "🚜",
    },
    {
      name: "Automobiles-Trucks/Lcv",
      description: "The one that transports goods efficiently.",
      companies: 5,
      micro: 0,
      small: 0,
      mid: 3,
      large: 2,
      icon: "🚛",
    },
    {
      name: "Bank - Private",
      description: "The one from where we give and take money.",
      companies: 29,
      micro: 0,
      small: 7,
      mid: 12,
      large: 10,
      icon: "🏦",
    },
    {
      name: "Bank - Public",
      description: "The one from where we give and take money.",
      companies: 12,
      micro: 0,
      small: 0,
      mid: 1,
      large: 11,
      icon: "🏛️",
    },
    {
      name: "Batteries",
      description: "The one that keeps the car running (toy or real).",
      companies: 12,
      micro: 8,
      small: 1,
      mid: 2,
      large: 1,
      icon: "🔋",
    },
    {
      name: "Bearings",
      description: "The one that keeps it all smooth and constant.",
      companies: 16,
      micro: 10,
      small: 3,
      mid: 2,
      large: 1,
      icon: "⚙️",
    },
    {
      name: "BPO/ITeS",
      description: "The one to which all the IT work is delegated.",
      companies: 39,
      micro: 27,
      small: 7,
      mid: 4,
      large: 1,
      icon: "💻",
    },
    {
      name: "Breweries & Distilleries",
      description: "The one that takes you away from reality.",
      companies: 18,
      micro: 5,
      small: 7,
      mid: 3,
      large: 3,
      icon: "🍺",
    },
    {
      name: "Chemicals",
      description: "The one that is a scientific form of magic.",
      companies: 185,
      micro: 108,
      small: 42,
      mid: 30,
      large: 5,
      icon: "🧪",
    },
    {
      name: "Textile",
      description: "The one that forms the raw material for clothes.",
      companies: 225,
      micro: 184,
      small: 28,
      mid: 11,
      large: 2,
      icon: "🧵",
    },
    {
      name: "Trading",
      description: "The one that most businesses conduct.",
      companies: 408,
      micro: 361,
      small: 32,
      mid: 13,
      large: 2,
      icon: "📈",
    },
    {
      name: "Real Estate",
      description: "The one that's in charge of building our homes.",
      companies: 188,
      micro: 129,
      small: 28,
      mid: 25,
      large: 6,
      icon: "🏗️",
    },
    {
      name: "Steel & Iron",
      description: "The one that's widely used as building materials.",
      companies: 129,
      micro: 77,
      small: 29,
      mid: 18,
      large: 5,
      icon: "🔩",
    },
    {
      name: "Consumer Food",
      description: "The one that fulfils our hunger instantly.",
      companies: 112,
      micro: 80,
      small: 15,
      mid: 13,
      large: 4,
      icon: "🍽️",
    },
    {
      name: "Auto Ancillary",
      description: "The one that provides parts to keep our vehicles running.",
      companies: 106,
      micro: 42,
      small: 33,
      mid: 25,
      large: 6,
      icon: "🚗",
    },
    {
      name: "Plastic Products",
      description: "The one that most containers are made of and we use daily.",
      companies: 147,
      micro: 117,
      small: 22,
      mid: 6,
      large: 2,
      icon: "📦",
    },
    {
      name: "Electric Equipment",
      description: "The one for which electricity was invented.",
      companies: 88,
      micro: 43,
      small: 26,
      mid: 10,
      large: 9,
      icon: "⚡",
    },
    {
      name: "IT Services",
      description: "The one that powers the digital world.",
      companies: 156,
      micro: 89,
      small: 34,
      mid: 25,
      large: 8,
      icon: "💻",
    },
    {
      name: "Cement",
      description: "The one that binds and structures the building.",
      companies: 47,
      micro: 15,
      small: 16,
      mid: 10,
      large: 6,
      icon: "🏭",
    },
    {
      name: "Oil & Gas",
      description: "The one that fuels our energy needs.",
      companies: 67,
      micro: 23,
      small: 18,
      mid: 15,
      large: 11,
      icon: "⛽",
    },
    {
      name: "Telecom",
      description: "The one that connects us all.",
      companies: 17,
      micro: 7,
      small: 3,
      mid: 2,
      large: 5,
      icon: "📱",
    },
    {
      name: "Power",
      description: "The one that primarily generates electricity.",
      companies: 43,
      micro: 14,
      small: 6,
      mid: 11,
      large: 12,
      icon: "⚡",
    },
    {
      name: "Fertilizers",
      description: "The one that helps crops grow better.",
      companies: 23,
      micro: 8,
      small: 7,
      mid: 5,
      large: 3,
      icon: "🌱",
    },
    {
      name: "Sugar",
      description: "The one that makes our food sweet.",
      companies: 42,
      micro: 26,
      small: 11,
      mid: 5,
      large: 0,
      icon: "🍯",
    },
    {
      name: "Paper",
      description: "The one that is used in printing, packaging, etc.",
      companies: 53,
      micro: 43,
      small: 9,
      mid: 1,
      large: 0,
      icon: "📄",
    },
    {
      name: "Diamond & Jewellery",
      description: "The one that costs high but enhances your look.",
      companies: 59,
      micro: 42,
      small: 8,
      mid: 7,
      large: 2,
      icon: "💎",
    },
    {
      name: "Media & Entertainment",
      description: "The one that brings you your favourite shows.",
      companies: 31,
      micro: 21,
      small: 7,
      mid: 3,
      large: 0,
      icon: "🎬",
    },
    {
      name: "Shipping",
      description: "The one that transfers product via sea.",
      companies: 17,
      micro: 10,
      small: 4,
      mid: 3,
      large: 0,
      icon: "🚢",
    },
    {
      name: "Airlines",
      description:
        "The one that takes us around the world in the shortest time.",
      companies: 7,
      micro: 1,
      small: 3,
      mid: 2,
      large: 1,
      icon: "✈️",
    },
    {
      name: "Hotels",
      description: "The one that provides comfort during travel.",
      companies: 15,
      micro: 8,
      small: 4,
      mid: 2,
      large: 1,
      icon: "🏨",
    },
    {
      name: "Education",
      description: "The one where primary knowledge is achieved.",
      companies: 25,
      micro: 21,
      small: 3,
      mid: 1,
      large: 0,
      icon: "🎓",
    },
    {
      name: "Healthcare",
      description: "The one that takes care of our health.",
      companies: 34,
      micro: 18,
      small: 8,
      mid: 6,
      large: 2,
      icon: "🏥",
    },
    {
      name: "Insurance",
      description: "The one that protects us from risks.",
      companies: 19,
      micro: 2,
      small: 5,
      mid: 7,
      large: 5,
      icon: "🛡️",
    },
    {
      name: "Mutual Funds",
      description: "The one that pools money for investments.",
      companies: 8,
      micro: 0,
      small: 1,
      mid: 3,
      large: 4,
      icon: "📊",
    },
    {
      name: "NBFC",
      description: "The one that provides financial services.",
      companies: 45,
      micro: 12,
      small: 15,
      mid: 12,
      large: 6,
      icon: "🏦",
    },
    {
      name: "Agriculture",
      description: "The one that gives us vegetables and fruits to eat.",
      companies: 54,
      micro: 47,
      small: 5,
      mid: 2,
      large: 0,
      icon: "🌾",
    },
    {
      name: "Mining",
      description: "The one that extracts valuable resources from earth.",
      companies: 28,
      micro: 15,
      small: 8,
      mid: 3,
      large: 2,
      icon: "⛏️",
    },
    {
      name: "Defence",
      description: "The one where the security matters.",
      companies: 17,
      micro: 0,
      small: 8,
      mid: 6,
      large: 3,
      icon: "🛡️",
    },
    {
      name: "Railways",
      description: "The one that also rides on the train tracks.",
      companies: 3,
      micro: 0,
      small: 0,
      mid: 3,
      large: 0,
      icon: "🚂",
    },
    {
      name: "Ports",
      description: "The one that's a parking lot for ships.",
      companies: 4,
      micro: 1,
      small: 0,
      mid: 1,
      large: 2,
      icon: "⚓",
    },
    {
      name: "Airports",
      description: "The one that oversees it all in airports for your journey.",
      companies: 2,
      micro: 0,
      small: 1,
      mid: 0,
      large: 1,
      icon: "🛫",
    },
  ];

  // Filter sectors based on search query
  const filteredSectors = sectors.filter(
    (sector) =>
      sector.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sector.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Sector
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Go to your favourite sector and analyse it in detail.
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for a sector"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Sectors Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSectors.map((sector, index) => (
            <div
              key={index}
              className="bg-gradient-to-b from-blue-200 to-white dark:from-blue-900 dark:to-blue-800 rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border border-blue-200 dark:border-blue-700"
            >
              {/* Icon Section (Material Icons) */}
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-4xl text-gray-800 dark:text-gray-100">
                    {getIconName(sector.name)}
                  </span>
                </div>
              </div>

              {/* Title and Description */}
              <div className="text-center mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {sector.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {sector.description}
                </p>
              </div>

              {/* Company Count - Pill Shape */}
              <div className="flex justify-center mb-6">
                <div className="bg-blue-200 dark:bg-blue-700 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full text-sm font-medium">
                  {sector.companies} Listed Companies
                </div>
              </div>

              {/* Market Cap Breakdown - Horizontal */}
              <div className="grid grid-cols-4 gap-2 mb-6">
                <div className="text-center">
                  <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                    MICRO
                  </div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {sector.micro}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                    SMALL
                  </div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {sector.small}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                    MID
                  </div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {sector.mid}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                    LARGE
                  </div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {sector.large}
                  </div>
                </div>
              </div>

              {/* Details Button */}
              <div className="flex justify-center">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200">
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredSectors.length === 0 && (
          <div className="text-center py-16">
            <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No sectors found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try searching with different keywords
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
