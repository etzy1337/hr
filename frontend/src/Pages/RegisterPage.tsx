import { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getApiErrorMessage } from "../Utils/ErrorHandler";

const RegisterPage = () => {
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      await registerUser({
        name,
        surname,
        email,
        password,
        repeatPassword,
      });

      navigate("/");
    } catch (err: unknown) {
      setError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4">
        Register
      </h1>

      <form onSubmit={handleRegister}>
        <input
          className="w-full p-2 border mb-3"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full p-2 border mb-3"
          placeholder="Surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />

        <input
          className="w-full p-2 border mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-2 border mb-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          className="w-full p-2 border mb-3"
          type="password"
          placeholder="Repeat Password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />

        {error && (
          <p className="text-red-500 mb-2 text-sm">
            {error}
          </p>
        )}

        <button
          disabled={loading}
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Loading..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;