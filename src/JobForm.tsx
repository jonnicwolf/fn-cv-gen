import { useState, SetStateAction, } from 'react'
// import { Project, Experience, } from "../functions/aiScripts/aiScripts/types.ts";
import { Project, Experience, } from "../functions/aiScripts/types/types";
import styled from 'styled-components';
import axios from 'axios';

import resumeTemplate from '../templates/resume/resume.md?raw';
import resumeData from '../templates/resume/resume_data.json';
// import { getResume } from '../functions/aiScripts/aiScript';
const jobDesc = `I’m working with one of the most impressive & exciting startups in New York who're tackling a major challenge in API development. They’ve recently raised a $12M Series A, have a 5-year runway, and are planning to double their team size this year. They have a world-class team that consists of ex-Palantir, Microsoft, Uber, AWS, Ramp, founders and founding engineers.



The company is building an open-source platform that enables businesses to offer “Stripe-level” SDKs and Docs for their REST APIs—solving pain points around untyped, unstandardized, and out-of-sync APIs. Their approach is inspired by internal tooling from AWS and Palantir, and they’re already working with the most reputable and well-known technology companies in the industry.



What we're looking for:



Proven experience working in a startup environment with a demonstrable background working with React, TypeScript, JavaScript and building/managing frontend infrastructure.'`

const JobForm = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [generalSkills,setGeneralSkills] = useState<string[]>([]);
  const [generalSkill,setGeneralSkill] = useState<string>('');

  const [projectList, setProjectList] = useState<Project[]>([]);
  const [project, setProject] = useState<Project>({name: '', tech: [''], description: ''});
  const [experience, setExperience] = useState<Experience>({
    role: '',
    company: '',
    dates: {
      start: '',
      end: '',
    },
    responsibilities: [],
    tech: []
  });
  const [experienceList, setExperienceList] = useState<Experience[]>([]);

  const handleJobDescription = (e: { target: { value: SetStateAction<string>; }}) => {
    setJobDescription(e.target.value);
  };
  const handleGeneralSkill = (e: { target: { value: SetStateAction<string>}}) => {
    setGeneralSkill(e.target.value);
  };
  const handleGeneralSkills = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (generalSkill) setGeneralSkills(prev => [...prev, generalSkill]);
    setGeneralSkill('');
  };
  const handleProject = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    //@ts-ignore
    setProject(prevProject => ({
      ...prevProject,
      [name]: name === 'tech' ? value.split(',').map(tech => tech.trim()) : value,
    }));
  };
  const handleProjectList = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const {name, tech, description} = project;
    const [nameLength, techLength, descriptionLength] = [name.length, tech.length, description.length];
    if (nameLength && techLength && descriptionLength) setProjectList(prev => [...prev, project]);
    setProject({name: '', tech: [], description: ''});
  };
  const handleExperience = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    //@ts-ignore
    setExperience(prev => {
      if (['start', 'end'].includes(name)) {
        return {
          ...prev,
          dates: {
            ...prev.dates,
            [name]: value,
          },
        };
      } else if (['responsibilities'].includes(name)) {
        return {
          ...prev,
          [name]: value.split('.').map(item => item.trim()),
        };
      } else if (['tech'].includes(name)) {
        return {
          ...prev, 
          [name]: value.split(',').map(item => item.trim()),
        };
      }
      else {
        return {
          ...prev,
          [name]: value,
        };
      }
    });
  };
  const handleExperienceList = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setExperienceList(prev => [...prev, experience])
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(
      {
        jobDesc,
        resumeTemplate,
        resumeData: {
          skills: resumeData.skills,
          projects: resumeData.projects,
          experience: resumeData.experience,
        }})

    const response = await axios.post('http://localhost:3000/openai', {
      params : {
        jobDesc,
        resumeTemplate,
        resumeData: {
          skills: resumeData.skills,
          projects: resumeData.projects,
          experience: resumeData.experience
        }
      }
    })
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    })
  };

  return (
    <Container onSubmit={handleSubmit}>
      <JobDescription>
        <h3>Job Description & General Skills</h3>
        <label htmlFor="jobDescription">Job Description</label>
        <InputLg name='jobDescription' onChange={handleJobDescription} />
      </JobDescription>

      <GeneralSkills>
        <label htmlFor="generalSkills">General Skills</label>
        <Input type="text" name='generalSkills' value={generalSkill} onChange={handleGeneralSkill} />
        <Button onClick={handleGeneralSkills}>add skill</Button>

        <Display style={{ flexDirection: 'row'}}>
          {generalSkills.map((val, id) => {
            return (
              <DisplayItem key={id}>
                {val}
              </DisplayItem>
            )
          })}
        </Display>

      </GeneralSkills>

      <Section>
        <h3>Projects</h3>
        <ProjectItem>
          <label htmlFor="projectName">Project Name</label>
          <Input type="text" name='name' onChange={handleProject} />
        </ProjectItem>
        <ProjectItem>
          <label htmlFor="projectTech">Project Tech</label>
          <Input type="text" name='tech' onChange={handleProject} />
        </ProjectItem>
        <ProjectItem>
          <label htmlFor="projectDescription">Project Description</label>
          <InputLg name='description' onChange={handleProject} />
        </ProjectItem>

        <button onClick={handleProjectList}>Add Project +</button>

        <Display>
          {projectList.length && projectList.map((project, id) => {
            return (
              <DisplayItem key={id}>
                <h4>{project.name}</h4>
                {/* @ts-ignore */}
                {project.tech.length && project.tech.map((tech, id) => {
                  return (
                    <span key={id}>{tech}</span>
                  )
                })}
                <p>{project.description}</p>
              </DisplayItem>
            )
          })}
        </Display>
      </Section>

      <Section>
        <h3>Experience</h3>
        <label htmlFor='company'>Company Name</label>
        <Input type="text" name='company' value={experience.company} onChange={handleExperience}/>

        <label htmlFor='company'>Role</label>
        <Input type="text" name='role' value={experience.role} onChange={handleExperience}/>

        <label htmlFor='start'>Start Date</label>
        <Input type="text" name='start' value={experience.dates.start} onChange={handleExperience}/>
        <label htmlFor='end'>End Date</label>
        <Input type="text" name='end' value={experience.dates.end} onChange={handleExperience}/>
        <label htmlFor='responsibilities'>Breakdown of responsibilities</label>
        <InputLg name='responsibilities' value={experience.responsibilities} onChange={handleExperience}/>
        <label htmlFor='tech'>Tech used</label>
        <Input type="text" name='tech' value={experience.tech} onChange={handleExperience}/>

        <button onClick={handleExperienceList}>Add Experience +</button>

        <Display>
          {experienceList.map((exp, i) => {
            return (
              <DisplayItem key={i}>
                <h4>{exp.company}</h4>
                <p>{exp.role}</p>
                <p>{exp.dates.start}</p>
                <p>{exp.dates.end}</p>
                <p>
                {/* @ts-ignore */}
                  {exp.responsibilities.map( (point, i) => {
                    return (
                      <span key={i}>{point}</span>
                    )
                  })}
                </p>
                <p>{exp.tech}</p>
              </DisplayItem>
            )
          })}
        </Display>
      </Section>
      <Button type="submit">Get Resume</Button>
    </Container>
  );
};

const Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const Section = styled.div`
  padding: 5%;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;
const JobDescription = styled.div`
  padding: 5%;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;
const GeneralSkills = styled(Section)`
  gap: 0.5rem;
`;
const ProjectItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Display = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1vh;
`;
const DisplayItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1vh;
  border: 1px solid black;
  border-radius: 5px;
  padding: 1%;
`;
const Input = styled.input`
  height: 2rem;
  border-radius: 5px;
  text-overflow: wrap;
`;
const InputLg = styled.textarea`
  height: 20vh;
  border-radius: 5px;
  width: 100%;
`;
const Button = styled.button`
  width: 20%;
`;
export default JobForm;
