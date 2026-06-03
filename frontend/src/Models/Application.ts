export type Application = {
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

export type ApplicationGr = {
  id: string;
  name: string;
  surname: string;
  date: string;
  cvId: number;
  cvFileName: string;
  status: string;
  score: number | null;
  evaluation: string | null;
};

export type GroupedApplications = {
  jobOfferTitle: string;
  applications: ApplicationGr[];
};