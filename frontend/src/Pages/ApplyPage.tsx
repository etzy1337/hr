import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { applyToJob } from "../Api/ApplicationApi";
import { getApiErrorMessage } from "../Utils/ErrorHandler";

const ApplyPage = () => {
  const { jobOfferId } = useParams<{ jobOfferId: string }>();
  const navigate = useNavigate();

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file || !jobOfferId) return;

    setLoading(true);
    setError(null);

    try {
      await applyToJob(Number(jobOfferId), file);
      navigate("/my-applications-page");
    } catch (err: unknown) {
      setError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4">
        Apply for Job
      </h1>

      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) =>
            setFile(e.target.files?.[0] || null)
          }
          className="mb-4 w-full"
        />

        {error && (
          <p className="text-red-500 mb-3 text-sm">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Sending..." : "Apply"}
        </button>
      </form>
    </div>
  );
};

export default ApplyPage;