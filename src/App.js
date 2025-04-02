import { jsx as _jsx } from "react/jsx-runtime";
import styled from "styled-components";
import JobForm from './JobForm';
const App = () => {
    return (_jsx(Container, { children: _jsx(JobForm, {}) }));
};
const Container = styled.div `
  display: flex;
  justify-content: center;
`;
export default App;
