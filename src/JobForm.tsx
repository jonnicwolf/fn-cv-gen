import { useState, useEffect, SetStateAction } from 'react'
import { Project, ResumeData } from "../aiScripts/types.ts";
import styled from 'styled-components';

import { filterSkills } from '../aiScripts/utils/preprocessResumeData';
import { getResume } from '../aiScripts/aiScript.ts';

import resumeTemplate from '../templates/resume/resume.md?raw';



const JobForm = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [generalSkills,setGeneralSkills] = useState<string[]>([])
  const [projectList, setProjectList] = useState<Project[]>([{name: '', tech: [''], description: ''}]);
  const [project, setProject] = useState<Project>({name: '', tech: [''], description: ''})

  const handleJobDescription = (e: { target: { value: SetStateAction<string>; }; }) => {
    console.log(e.target.value)
    setJobDescription(e.target.value);
  }

  return (
    <Container>
      yoyoyoyo
      <input type="text" onChange={handleJobDescription} />
      <div>
        {jobDescription}
      </div>
    </Container>
  );
};

const Container = styled.form`
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  align-items: center;
  
`
export default JobForm;