import { useState } from "react";
import { addJobOffer } from "../Api/JobOfferApi";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void;
};

const AddJobOfferModal = ({ isOpen, onClose, onCreated }: Props) => {
  const [jobTitle, setJobTitle] = useState("");
  const [salary, setSalary] = useState<number>(0);
  const [description, setDescription] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await addJobOffer({
        jobTitle,
        salary,
        description,
      });

      onCreated();
      onClose();
    } catch (err: any) {
      setError(err?.response?.data?.title || "Error creating job offer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white w-[500px] p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Add Job Offer</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            className="w-full border p-2"
            placeholder="Job Title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />

          <input
            type="number"
            className="w-full border p-2"
            placeholder="Salary"
            value={salary}
            onChange={(e) => setSalary(Number(e.target.value))}
          />

          <textarea
            className="w-full border p-2"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {error && <p className="text-red-500">{error}</p>}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              className="px-4 py-2 bg-green-600 text-white"
            >
              {loading ? "Saving..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddJobOfferModal;