'use client';
import { styled } from "styled-components";
import { QUERIES } from "@/constants";

function MainWrapper({ children }) {
  return (
    <Wrapper>
      {children}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding-top: var(--header-height);
  overflow: auto;
  background-color: var(--color-primary);
`;

export default MainWrapper;
