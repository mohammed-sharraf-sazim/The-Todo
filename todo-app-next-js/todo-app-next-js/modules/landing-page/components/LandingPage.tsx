import React from "react";
import Link from "next/link";

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-300 to-purple-300 text-white">
      <h1 className="text-5xl font-bold mb-4">Welcome to The Todo 😀</h1>
      <p className="text-xl mb-8">
        Manage your tasks efficiently and effectively.
      </p>
      <Link href="/todo">
        <button className="px-6 py-3 bg-white text-blue-500 font-semibold rounded-lg shadow-md hover:bg-gray-200">
          Get Started
        </button>
      </Link>
    </div>
  );
};

export default LandingPage;
