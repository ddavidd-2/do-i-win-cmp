'use client';
import { QUERIES } from "@/constants";
import { styled } from "styled-components";
import Link from "next/link";
import MobileMenu from "../MobileMenu";

function Header() {
  return (
    <HeaderWrapper>
      <Navigation>
        <Title>Do I Win CMP?</Title>
        <NavBar>
          <NavLink
            href="/"
          >
            CMP Calculator
          </NavLink>
          <NavLink
            href="/ranking"
          >
            IV Rankings
          </NavLink>
        </NavBar>
        <MobileMenu />
      </Navigation>
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
  background-color: var(--color-header);
  box-shadow: 0px 3px 2px var(--color-header-shadow);
`

const Navigation = styled.div`
  width: min(800px, 100%);
  position: relative;
  height: 100%;
`

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  position: absolute;
  left: 8px;
  top: 0;
  bottom: 0;
  margin: auto;
  height: 30px;
  width: fit-content;

  @media ${QUERIES.phoneAndSmaller} {

  }
`

const NavBar = styled.nav`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 16px;

  @media ${QUERIES.phoneAndSmaller} {
    display: none;
  }
`

const NavLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  font-size: 1.2rem;
  margin-bottom: 4px;

  &:hover, &:focus {

  }

`


export default Header;
