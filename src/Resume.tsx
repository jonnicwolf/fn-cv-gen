import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styled from 'styled-components';

const Resume = ({ markdownString }: { markdownString: string }) => {
  console.log(markdownString)
  return (
    <Container>
      <Test>
        <Markdown remarkPlugins={[remarkGfm]}>
          {`${markdownString}`}
        </Markdown>
      </Test>
    </Container>
  );
};

const Container = styled.div`
  width: 90vw;
`
const Test  = styled.div`
  white-space: pre-line;
`

export default Resume;
