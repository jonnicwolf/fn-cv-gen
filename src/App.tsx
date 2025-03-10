import { useState } from "react";
import { TextField, Button, Stack, Container, Typography } from "@mui/material";

const JobForm = () => {
  const [jobLink, setJobLink] = useState<string>("");
  const [techSkills, setSkills] = useState<string[]>([]);

  const skillHandler = (skill: string) => {
    // @ts-ignore
    setSkills(prev => [...prev, skill])
  }

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
        value={jobLink}
        onChange={(e) => setJobLink(e.target.value)}
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
          <Button key={index} variant="contained" onClick={() => skillHandler(skill)}>
            {skill}
          </Button>
        ))}
      </Stack>
    </Container>
  );
};

export default JobForm;