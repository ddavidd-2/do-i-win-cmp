'use client';
import { styled } from "styled-components";

function BoldWrap({ children }) {
  return (
    <Bold>
      {children}
    </Bold>
  );
}

const Bold = styled.span`
  font-weight: bold;
`

export default BoldWrap;
