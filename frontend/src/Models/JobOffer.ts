export type JobOffer = {
    id:number,
    jobTitle:string,
    salary:number,
    description:string
}

export type AddJobOfferDto = {
  jobTitle: string;
  salary: number;
  description: string;
};