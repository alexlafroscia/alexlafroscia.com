type WorkExperience = {
  company: string;
  role: string;
  time: string;
  hide: boolean | undefined;
  details: string[];
};

declare const workExperiences: WorkExperience[];

export default workExperiences;
