import type { AddJobOfferDto, JobOffer } from "../Models/JobOffer";
import api from "./api"

export const getJobOffers = async (): Promise<JobOffer[]> => {
    const res = await api.get("/joboffer");
    return res.data;
}

export const addJobOffer = async (dto: AddJobOfferDto) => {
  const res = await api.post("/joboffer", dto);
  return res.data;
};