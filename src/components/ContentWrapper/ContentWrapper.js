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
  margin-top: 20px;
  border-radius: 8px 8px 0 0 ;
  background-color: var(--color-primary);
  height: 100%;
`;

export default ContentWrapper;
