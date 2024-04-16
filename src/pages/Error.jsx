
import { Link } from "react-router-dom";

export default function Error() {


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#083F46] text-white">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg md:text-xl mb-8">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
      <Link to="/" className="bg-white text-[#083F46] font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 hover:bg-opacity-80">Go back to Home</Link>
    </div>
  );
}
