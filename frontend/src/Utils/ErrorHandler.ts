import axios from "axios";

export const getApiErrorMessage = (err: unknown): string => {
  if (axios.isAxiosError(err)) {
    const data = err.response?.data;

    return (
      data?.detail ||
      data?.title ||
      "Unknown server error"
    );
  }

  return "Network error";
};