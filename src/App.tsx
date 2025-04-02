import styled from "styled-components";

import JobForm from './JobForm';

const App = () => {
  return (
    <Container>
      {/* @ts-ignore */}
      <JobForm />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export default App;
