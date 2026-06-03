import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const Navbar = () => {
  const { user, logoutUser, isAuthenticated, isAdmin, isExaminer } =
    useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b">
      {/* LEFT */}
      <Link
        to="/"
        className="text-xl font-bold text-gray-800 hover:text-black"
      >
        HR System
      </Link>

      {/* CENTER LINKS */}
      <div className="flex gap-6 items-center">
        <Link
          to="/job-offers-page"
          className="text-gray-600 hover:text-black"
        >
          Job Offers
        </Link>

        {isAuthenticated && (
          <Link
            to="/my-applications-page"
            className="text-gray-600 hover:text-black"
          >
            My Applications
          </Link>
        )}

        {isAdmin() && (
          <button
            onClick={() => navigate("/examiner-page")}
            className="text-purple-600 hover:text-black"
          >
            Examiner Panel
          </button>
        )}

        {isExaminer() && (
          <button
            onClick={() => navigate("/examiner-page")}
            className="text-purple-600 hover:text-black"
          >
            Examiner Panel
          </button>
        )}
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <span className="text-sm text-gray-600">
              {user?.name} {user?.surname}
            </span>

            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-gray-600 hover:text-black"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="text-gray-600 hover:text-black"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;