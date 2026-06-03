import { useEffect, useState } from "react";
import api from "../Api/api";
import { getUserApplications } from "../Api/ApplicationApi";

type Application = {
  id: string;
  name: string;
  surname: string;
  jobOfferTitle: string;
  date: string;
  status: string;
  score: number | null;
  evaluation: string | null;
  cvId: number;
};

const MyApplicationsPage = () => {
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  const load = async () => {
    try {
      const data = await getUserApplications();
      setApps(data);
    } catch {
      setError("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  load();
}, []);

  if (loading)
    return <div className="p-6 text-gray-600">Loading...</div>;

  if (error)
    return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Applications</h1>

      {apps.length === 0 && (
        <div className="text-gray-500">No applications found</div>
      )}

      <div className="space-y-4">
        {apps.map((app) => (
          <div
            key={app.id}
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between">
              <h2 className="font-semibold text-lg">
                {app.jobOfferTitle}
              </h2>

              <span
                className={`px-2 py-1 text-xs rounded ${
                  app.status === "Evaluated"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {app.status}
              </span>
            </div>

            <p className="text-sm text-gray-500 mt-1">
              {new Date(app.date).toLocaleString()}
            </p>

            {app.score !== null && (
              <p className="mt-2 text-sm">
                Score: <span className="font-bold">{app.score}/10</span>
              </p>
            )}

            {app.evaluation && (
              <p className="mt-2 text-sm text-gray-700">
                {app.evaluation}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyApplicationsPage;