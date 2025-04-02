export function extractKeywords(jobDescription) {
    return jobDescription
        .toLowerCase()
        .match(/\b(JavaScript|TypeScript|Python|Swift|Go|React|Next\.js|Redux|Uppy|Tanstack Query|HTML5|CSS3|Tailwind CSS|Material UI|Styled Components|p5\.js|Bootstrap|React Three Fiber|Three\.js|Node\.js|SQL|Express|Joi|RESTful APIs|PostgreSQL|MongoDB|Jest|Mocha|Chai|DataDog|Sentry|Git|GitHub|GitLab|npm|Webpack|Babel|BeautifulSoup|Selenium|Atlassian|psql|Makefile|YAML|JSON|AWS|AWS Lambda|AWS S3|AWS CloudFormation & SAM|AWS RDS|Terraform|Docker|AWS IAM|OAuth|JWT|Agile|Scrum|TDD)\b/g) || [];
}
;
export function filterSkills(jobDescription, skills) {
    const keywords = extractKeywords(jobDescription);
    return skills.filter(skill => keywords.includes(skill.toLowerCase()));
}
;
function filterProjects(jobDescription, projects) {
    const keywords = extractKeywords(jobDescription);
    return projects.filter(project => project.tech.some(tech => keywords.includes(tech.toLowerCase())));
}
;
export function preprocessResumeData(jobDescription, resumeData) {
    return {
        skills: filterSkills(jobDescription, resumeData.skills),
        projects: filterProjects(jobDescription, resumeData.projects),
        experience: resumeData.experience,
    };
}
;
