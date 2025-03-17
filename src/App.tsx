import styled from "styled-components";

import JobForm from './JobForm.tsx';

const App = () => {
  return (
    <Container>
      <JobForm />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export default App;
