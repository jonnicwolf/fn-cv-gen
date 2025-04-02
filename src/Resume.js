import { jsx as _jsx } from "react/jsx-runtime";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styled from 'styled-components';
const Resume = ({ markdownString }) => {
    console.log(markdownString);
    return (_jsx(Container, { children: _jsx(Test, { children: _jsx(Markdown, { remarkPlugins: [remarkGfm], children: `${markdownString}` }) }) }));
};
const Container = styled.div `
  width: 90vw;
`;
const Test = styled.div `
  white-space: pre-line;
`;
export default Resume;
