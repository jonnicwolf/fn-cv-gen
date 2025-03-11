import { useState } from "react";
import { TextField, Button, Stack, Container, Typography, MenuItem, Select } from "@mui/material";

import { Project, ResumeData } from "../aiScripts/types.ts";

import { filterSkills } from '../aiScripts/utils/preprocessResumeData';
import { getResume } from '../aiScripts/aiScript.ts';

import resumeTemplate from '../templates/resume/resume.md';
const resumeData = require('../templates/resume/resume_data.json')

const JobForm = () => {
  const [jobDescription, setDescription] = useState<string>("");
  const [techSkills, setSkills] = useState<string[]>([]);
  const [filteredSkills, setFilteredSkills] = useState<string[]>([]);
  const [project, setProject] = useState<Project>({
    name: '',
    tech: [],
    description: ''
  });
  const [projects, setProjects] = useState<Project[]>([]);
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);

  const handleProjectChange = (key: keyof Project, value: string | string[]) => {
    setProject((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddProject = () => {
    if (project.name && project.description && project.tech.length > 0) {
      setProjects((prev) => [...prev, project]);
      setProject({ name: "", tech: [], description: "" }); // Reset input fields
    } else {
      alert("Please fill all project fields before adding.");
    }
  };

  const handleSkills = (skill: string) => {
    // @ts-ignore
    setSkills(prev => [...prev, skill])
  };

  console.log(resumeData)
  console.log(filteredSkills)

  const handleSubmit = (jobDescription: string, techSkills: string[], resumeData: ResumeData | null) => {
    const data = filterSkills(jobDescription, techSkills);
    setFilteredSkills(data)
    getResume(jobDescription, resumeTemplate, resumeData)
  };

  const skills = [
    'JavaScript', 'TypeScript', 'Python', 'Swift', 'Go', 'React', 'Next.js', 
    'Redux', 'Uppy', 'Tanstack Query', 'HTML5', 'CSS3', 'Tailwind CSS', 
    'Material UI', 'Styled Components', 'p5.js', 'Bootstrap', 'React Three Fiber', 
    'Three.js', 'Node.js', 'SQL', 'Express', 'Joi', 'RESTful APIs', 'PostgreSQL', 
    'MongoDB', 'Jest', 'Mocha', 'Chai', 'DataDog', 'Sentry', 'Git', 'GitHub', 
    'GitLab', 'npm', 'Webpack', 'Babel', 'BeautifulSoup', 'Selenium', 'Atlassian', 
    'psql', 'Makefile', 'YAML', 'JSON', 'AWS', 'AWS Lambda', 'AWS S3', 
    'AWS CloudFormation & SAM', 'AWS RDS', 'Terraform', 'Docker', 'AWS IAM', 
    'OAuth', 'JWT', 'Agile', 'Scrum', 'TDD'
  ];

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
        Job Application Form
      </Typography>
      <TextField
        fullWidth
        label="Job Description Link"
        variant="outlined"
        value={jobDescription}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Stack 
        direction="row"
        spacing={1}
        flexWrap="wrap"
        sx={{ rowGap: 1, justifyContent: 'center', background: '#e0dede', borderRadius: '10px', mb: 2 }}>
        {techSkills.map((skill, index) => (
          <Button key={index} variant="text" disabled>
            {skill}
          </Button>
        ))}
      </Stack>
      <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ rowGap: 1, justifyContent: 'center' }}>
        {skills.map((skill, index) => (
          <Button key={index} variant="contained" onClick={() => handleSkills(skill)}>
            {skill}
          </Button>
        ))}
      </Stack>

      {/* Project Skills Dropdown */}
      <Select
        multiple
        fullWidth
        displayEmpty
        value={project.tech}
        onChange={(e) => handleProjectChange("tech", e.target.value as string[])}
        sx={{ mb: 2 }}
      >
        <MenuItem disabled value="">
          Select Skills
        </MenuItem>
        {skills.map((skill, index) => (
          <MenuItem key={index} value={skill}>
            {skill}
          </MenuItem>
        ))}
      </Select>

      {/* Project Description Input */}
      <TextField
        fullWidth
        label="Project Description"
        variant="outlined"
        multiline
        rows={3}
        value={project.description}
        onChange={(e) => handleProjectChange("description", e.target.value)}
        sx={{ mb: 2 }}
      />

      {/* Add Project Button */}
      <Button variant="contained" fullWidth sx={{ mb: 2 }} onClick={handleAddProject}>
        Add Project
      </Button>

      {/* Display Added Projects */}
      <Stack spacing={1}>
        {projects.map((proj, index) => (
          <Stack key={index} sx={{ p: 2, border: "1px solid #ccc", borderRadius: "8px" }}>
            <Typography variant="h6">{proj.name}</Typography>
            <Typography variant="body2"><strong>Skills:</strong> {proj.tech.join(", ")}</Typography>
            <Typography variant="body2">{proj.description}</Typography>
          </Stack>
        ))}
      </Stack>

       {/* @ts-ignore */}
      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleSubmit(jobDescription, techSkills, resumeData)}
      >
        Submit
      </Button>
    </Container>
  );
};

export default JobForm;
