import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-5">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">

        <h1 className="text-6xl font-bold text-red-500">
          403
        </h1>

        <h2 className="text-2xl font-semibold mt-4">
          Access Denied
        </h2>

        <p className="text-gray-600 mt-3">
          You don't have permission to access this page.
        </p>

        <Link
          to="/"
          className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
        >
          Back to Home
        </Link>

      </div>
    </div>
  );
};

export default Unauthorized;