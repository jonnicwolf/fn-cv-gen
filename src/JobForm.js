import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, } from 'react';
import Resume from './Resume';
// @ts-ignore
import { getResumeGemini } from './aiScripts/geminiResumeScript';
import styled from 'styled-components';
import resumeTemplate from '../templates/resume/resume.md?raw';
export default function JobForm() {
    const [geminiResponse, setGeminiResponse] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [generalSkills, setGeneralSkills] = useState([]);
    const [generalSkill, setGeneralSkill] = useState('');
    const [projectList, setProjectList] = useState([]);
    const [project, setProject] = useState({ name: '', tech: [''], description: '' });
    const [experience, setExperience] = useState({
        role: '',
        company: '',
        dates: {
            start: '',
            end: '',
        },
        responsibilities: [],
        tech: []
    });
    const [experienceList, setExperienceList] = useState([]);
    const handleJobDescription = (e) => {
        setJobDescription(e.target.value);
    };
    const handleGeneralSkill = (e) => {
        setGeneralSkill(e.target.value);
    };
    const handleGeneralSkills = (e) => {
        e.preventDefault();
        if (generalSkill)
            setGeneralSkills(prev => [...prev, generalSkill]);
        setGeneralSkill('');
    };
    const handleProject = (e) => {
        const { name, value } = e.target;
        //@ts-ignore
        setProject(prevProject => ({
            ...prevProject,
            [name]: name === 'tech' ? value.split(',').map(tech => tech.trim()) : value,
        }));
    };
    const handleProjectList = (e) => {
        e.preventDefault();
        const { name, tech, description } = project;
        const [nameLength, techLength, descriptionLength] = [name.length, tech.length, description.length];
        if (nameLength && techLength && descriptionLength) {
            setProjectList(prev => [...prev, project]);
        }
        setProject({ name: '', tech: [], description: '' });
    };
    const handleExperience = (e) => {
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
            }
            else if (['responsibilities'].includes(name)) {
                return {
                    ...prev,
                    [name]: value.split('.').map(item => item.trim()),
                };
            }
            else if (['tech'].includes(name)) {
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
    const handleExperienceList = (e) => {
        e.preventDefault();
        setExperienceList(prev => [...prev, experience]);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await getResumeGemini(jobDescription, resumeTemplate, {
                skills: generalSkills || [],
                projects: projectList || [],
                experience: experienceList || [],
            });
            if (typeof response === 'string') {
                setGeminiResponse(response);
            }
            else {
                console.error("Unexpected response type:", response);
                setGeminiResponse('Error: Invalid response from AI script.');
            }
        }
        catch (error) {
            console.error("Error fetching resume:", error);
            setGeminiResponse('Error: Failed to generate resume.');
        }
        ;
    };
    return (_jsx(_Fragment, { children: !geminiResponse ?
            _jsxs(Container, { onSubmit: handleSubmit, children: [_jsxs(JobDescription, { children: [_jsx("h3", { children: "Job Description & General Skills" }), _jsx("label", { htmlFor: "jobDescription", children: "Job Description" }), _jsx(InputLg, { name: 'jobDescription', onChange: handleJobDescription })] }), _jsxs(GeneralSkills, { children: [_jsx("label", { htmlFor: "generalSkills", children: "General Skills" }), _jsx(Input, { type: "text", name: 'generalSkills', value: generalSkill, onChange: handleGeneralSkill }), _jsx(Button, { onClick: handleGeneralSkills, children: "Add Skill" }), _jsx(Display, { direction: 'row', children: generalSkills.map((val, id) => {
                                    return (_jsx(DisplayItem, { children: val }, id));
                                }) })] }), _jsxs(Section, { children: [_jsx("h3", { children: "Projects" }), _jsxs(ProjectItem, { children: [_jsx("label", { htmlFor: "projectName", children: "Project Name" }), _jsx(Input, { type: "text", name: 'name', onChange: handleProject })] }), _jsxs(ProjectItem, { children: [_jsx("label", { htmlFor: "projectTech", children: "Project Tech" }), _jsx(Input, { type: "text", name: 'tech', onChange: handleProject })] }), _jsxs(ProjectItem, { children: [_jsx("label", { htmlFor: "projectDescription", children: "Project Description" }), _jsx(InputLg, { name: 'description', onChange: handleProject })] }), _jsx("button", { onClick: handleProjectList, children: "Add Project +" }), _jsx(Display, { children: projectList.length && projectList.map((project, id) => {
                                    return (_jsxs(DisplayItem, { children: [_jsx("h4", { children: project.name }), project.tech.length && project.tech.map((tech, id) => {
                                                return (_jsx("span", { children: tech }, id));
                                            }), _jsx("p", { children: project.description })] }, id));
                                }) })] }), _jsxs(Section, { children: [_jsx("h3", { children: "Experience" }), _jsx("label", { htmlFor: 'company', children: "Company Name" }), _jsx(Input, { type: "text", name: 'company', value: experience.company, onChange: handleExperience }), _jsx("label", { htmlFor: 'company', children: "Role" }), _jsx(Input, { type: "text", name: 'role', value: experience.role, onChange: handleExperience }), _jsxs("div", { style: { display: 'flex', flexDirection: 'row', gap: '1vw' }, children: [_jsxs("div", { style: { display: 'flex', flexDirection: 'column', alignItems: 'center' }, children: [_jsx("label", { htmlFor: 'start', children: "Start Date" }), _jsx(Input, { type: "text", name: 'start', value: experience.dates.start, onChange: handleExperience })] }), _jsxs("div", { style: { display: 'flex', flexDirection: 'column', alignItems: 'center' }, children: [_jsx("label", { htmlFor: 'end', children: "End Date" }), _jsx(Input, { type: "text", name: 'end', value: experience.dates.end, onChange: handleExperience })] })] }), _jsx("label", { htmlFor: 'responsibilities', children: "Breakdown of responsibilities" }), _jsx(InputLg, { name: 'responsibilities', value: experience.responsibilities, onChange: handleExperience }), _jsx("label", { htmlFor: 'tech', children: "Tech used" }), _jsx(Input, { type: "text", name: 'tech', value: experience.tech, onChange: handleExperience }), _jsx("button", { onClick: handleExperienceList, children: "Add Experience +" }), _jsx(Display, { children: experienceList.map((exp, i) => {
                                    return (_jsxs(DisplayItem, { children: [_jsx("h4", { children: exp.company }), _jsx("p", { children: exp.role }), _jsx("p", { children: exp.dates.start }), _jsx("p", { children: exp.dates.end }), _jsx("p", { children: exp.responsibilities.map((point, i) => {
                                                    return (_jsx("span", { children: point }, i));
                                                }) }), _jsx("p", { children: exp.tech })] }, i));
                                }) })] }), _jsx(Button, { type: "submit", children: "Get Resume" })] })
            : _jsx(Resume, { markdownString: geminiResponse }) }));
}
;
const Container = styled.form `
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90vw;
`;
const Section = styled.div `
  padding: 5%;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  gap: 1vw;
`;
const JobDescription = styled.div `
  padding: 5%;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;
const GeneralSkills = styled(Section) `
  gap: 0.5rem;
`;
const ProjectItem = styled.div `
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Display = styled.div `
  display: flex;
  flex-direction: ${({ direction }) => direction || 'column'};
  flex-wrap: wrap;
  gap: 1vh;
`;
const DisplayItem = styled.div `
  display: flex;
  flex-direction: column;
  gap: 1vh;
  border: 1px solid black;
  border-radius: 5px;
  padding: 1%;
`;
const Input = styled.input `
  height: 2rem;
  border-radius: 5px;
  text-overflow: wrap;
`;
const InputLg = styled.textarea `
  height: 20vh;
  border-radius: 5px;
  width: 100%;
`;
const Button = styled.button `
  width: fit-content;
`;
