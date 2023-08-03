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
  max-width: 680px;
  padding: 0 60px;
  margin-top: 20px;
  border-radius: 8px 8px 0 0 ;
  background-color: var(--color-primary);
  height: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default ContentWrapper;
