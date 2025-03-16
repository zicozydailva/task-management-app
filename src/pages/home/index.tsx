import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 to-blue-300 text-gray-800">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
        <h1 className="text-4xl font-bold mb-4 text-primary">Welcome! 🎉</h1>
        <p className="text-lg my-8 text-gray-600">
          Join us for an amazing experience. Let's get started! 🚀
        </p>
        <Link
          to="/auth/login"
          className="px-6 py-3 mt-4 bg-primary text-white rounded-full text-lg font-semibold shadow-md hover:bg-blue-700 transition"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Home;
