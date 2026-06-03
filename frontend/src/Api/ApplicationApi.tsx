import type { Application, GroupedApplications } from "../Models/Application";
import api from "./api";

export const getUserApplications = async (): Promise<Application[]> => {
  const res = await api.get<Application[]>(
    "/application/GetUsersApplications"
  );
  return res.data;
};



export const applyToJob = async (jobOfferId: number, cv: File) => {
  const formData = new FormData();

  formData.append("JobOfferId", jobOfferId.toString());
  formData.append("CV", cv);

  const res = await api.post("/application", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const getGroupedApplications = async (): Promise<GroupedApplications[]> => {
  const res = await api.get<GroupedApplications[]>(
    "/application/GetGroupedApplications"
  );
  return res.data;
};

export const acceptApplication = async (id: string) => {
  await api.put(`/application/AcceptApp?id=${id}`);
};

export const rejectApplication = async (id: string) => {
  await api.put(`/application/RejectApp?id=${id}`);
};