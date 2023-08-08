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
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding-top: var(--header-height);

  @media ${QUERIES.phoneAndSmaller} {
    background-color: var(--color-purple-faded);
  }
`;

export default MainWrapper;
