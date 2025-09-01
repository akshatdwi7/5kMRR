import React from "react";

export const SimpleLanding: React.FC = () => {
  console.log("SimpleLanding component rendering...");
  
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Screeno</h1>
        <p className="text-xl text-gray-400 mb-8">
          Invest With Data, Not Emotion
        </p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
          Start your free trial
        </button>
        <div className="mt-4 text-sm text-gray-500">
          Simple version - testing deployment
        </div>
      </div>
    </div>
  );
};
