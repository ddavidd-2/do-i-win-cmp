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
  border-radius: 8px;
  background-color: var(--color-purple-faded);
  min-height: 650px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${QUERIES.phoneAndSmaller} {
    max-width: min(360px, 95%);
    margin-top: 0;
    border-radius: 0;
    height: 100%;
  }
`;

export default ContentWrapper;
