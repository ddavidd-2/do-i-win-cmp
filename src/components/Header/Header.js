'use client';
import { styled } from "styled-components";

function Header() {
  return (
    <HeaderWrapper>
      <Title>Do I Win CMP?</Title>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: var(--header-height);
  background-color: var(--color-primary);
  box-shadow: 0px 3px 2px var(--color-header-shadow);
`

const Title = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
`

export default Header;
