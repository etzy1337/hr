import { useEffect, useState } from "react";
import { getJobOffers } from "../Api/JobOfferApi";
import type { JobOffer } from "../Models/JobOffer";
import { useNavigate } from "react-router-dom";
import AddJobOfferModal from "../Components/AddJobOfferModal";
import { useAuth } from "../Context/AuthContext";
import { getApiErrorMessage } from "../Utils/ErrorHandler";

const JobOfferPage = () => {
  const [offers, setOffers] = useState<JobOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  const load = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getJobOffers();
      setOffers(data);
    } catch (err: unknown) {
      setError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleApply = (id: number) => {
    navigate(`/apply/${id}`);
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
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Job Offers
        </h1>

        {isAdmin() && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Add Job Offer
          </button>
        )}
      </div>

      {/* LIST */}
      {offers.length === 0 && (
        <div className="text-gray-500">
          No offers available
        </div>
      )}

      <div className="grid gap-4">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="border rounded-lg p-4 shadow-sm bg-white"
          >
            <h3 className="text-lg font-semibold">
              {offer.jobTitle}
            </h3>

            <p className="text-gray-600 mt-2">
              {offer.description}
            </p>

            <button
              onClick={() => handleApply(offer.id)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Apply
            </button>
          </div>
        ))}
      </div>

      {/* MODAL */}
      <AddJobOfferModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreated={load}
      />
    </div>
  );
};

export default JobOfferPage;