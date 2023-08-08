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
  padding: 0 60px;
  margin: 20px;
  margin-bottom: 0;
  border-radius: 8px 8px 0 0 ;
  background-color: var(--color-purple-faded);
  height: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${QUERIES.phoneAndSmaller} {
    max-width: min(360px, 95%);
    margin-top: 0;
    border-radius: 0;
  }
`;

export default ContentWrapper;
