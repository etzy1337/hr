import { useEffect, useState } from "react";
import {
  getGroupedApplications,
  acceptApplication,
  rejectApplication
} from "../Api/ApplicationApi";
import type { GroupedApplications } from "../Models/Application";
import { getApiErrorMessage } from "../Utils/ErrorHandler";

const ExaminerPage = () => {
  const [data, setData] = useState<GroupedApplications[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await getGroupedApplications();
      setData(res);
    } catch (err: unknown) {
      setError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleAccept = async (id: string) => {
    try {
      await acceptApplication(id);
      await load();
    } catch (err: unknown) {
      setError(getApiErrorMessage(err));
    }
  };

  const handleReject = async (id: string) => {
    try {
      await rejectApplication(id);
      await load();
    } catch (err: unknown) {
      setError(getApiErrorMessage(err));
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-gray-500">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Examiner Panel
      </h1>

      {data.length === 0 && (
        <div className="text-gray-500">
          No applications
        </div>
      )}

      <div className="space-y-6">
        {data.map((group) => (
          <div
            key={group.jobOfferTitle}
            className="border rounded-lg p-4 bg-white shadow-sm"
          >
            <h2 className="text-xl font-semibold mb-4">
              {group.jobOfferTitle}
            </h2>

            <div className="space-y-3">
              {group.applications.map((app) => {
                const isFinalStatus =
                  app.status === "Accepted" ||
                  app.status === "Rejected";

                return (
                  <div
                    key={app.id}
                    className="border rounded p-3 flex justify-between"
                  >
                    {/* LEFT */}
                    <div>
                      <p className="font-medium">
                        {app.name} {app.surname}
                      </p>

                      <p className="text-sm text-gray-500">
                        {new Date(app.date).toLocaleString()}
                      </p>

                      <p className="text-xs text-gray-400">
                        CV: {app.cvFileName}
                      </p>

                      <span className="text-xs inline-block mt-1 px-2 py-1 bg-gray-100 rounded">
                        {app.status}
                      </span>

                      {app.score !== null &&
                        app.evaluation !== null && (
                          <div className="mt-2 text-sm bg-gray-50 p-2 rounded">
                            <p className="font-semibold">
                              Score: {app.score}/10
                            </p>
                            <p className="text-gray-700 mt-1">
                              {app.evaluation}
                            </p>
                          </div>
                        )}
                    </div>

                    {/* RIGHT */}
                    <div className="flex gap-2 items-start">
                      {!isFinalStatus ? (
                        <>
                          <button
                            onClick={() => handleAccept(app.id)}
                            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                          >
                            Accept
                          </button>

                          <button
                            onClick={() => handleReject(app.id)}
                            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            app.status === "Accepted"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {app.status}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExaminerPage;