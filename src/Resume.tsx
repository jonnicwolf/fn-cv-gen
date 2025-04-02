import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styled from 'styled-components';

const Resume = ({ markdownString }: { markdownString: string }) => {
  console.log(markdownString)
  return (
    <Test>
      <Markdown remarkPlugins={[remarkGfm]}>
        {`${markdownString}`}
      </Markdown>
    </Test>
  );
};

const Test  = styled.div`
  white-space: pre-line;
`

export default Resume;
