'use client';
import { styled } from "styled-components";

function ContentWrapper({ children }) {
  return (
    <Wrapper>
      {children}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 760px;
  padding: 0 20px;
`;

export default ContentWrapper;
