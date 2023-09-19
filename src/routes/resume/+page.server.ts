import type { PageServerLoad } from "./$types";

import allWorkExperiences from "../../data/resume/work.yml";
import allOpenSourceProjects from "../../data/resume/open-source.yml";

export const load: PageServerLoad = () => {
  return {
    workExperiences: allWorkExperiences.filter((work) => !work.hide),
    openSourceProjects: allOpenSourceProjects.filter((project) => !project.hide),
  };
};
