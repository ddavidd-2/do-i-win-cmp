'use client';
import { styled } from "styled-components";
import { QUERIES } from "@/constants";

function ContentWrapper({ children }) {
  return (
    <Wrapper>
      {children}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 680px;
  width: fit-content;
  padding: 0 60px;
  margin: 20px;
  margin-bottom: 0;
  min-height: 650px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--color-island);
  border-radius: 10px;

  @media ${QUERIES.phoneAndSmaller} {
    width: 95%;
    border-radius: 0;
    height: 100%;
    padding: 0 8px;
    background-color: transparent;
  }
`;

export default ContentWrapper;
