'use client';
import React from 'react';
import { styled, keyframes } from 'styled-components';
import { Menu } from 'react-feather';
import { QUERIES } from '@/constants';
import Link from 'next/link';

function MobileMenu() {

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  function openMenu() {
    setIsMenuOpen(true);
  }

  function dismissMenu() {
    setIsMenuOpen(false);
  }

  return (
    <Wrapper>
      <IconWrapper
        onClick={openMenu}
      >
        <Menu size={36} />
      </IconWrapper>
      {isMenuOpen &&
        <Backdrop>
          <MenuClose
            onClick={dismissMenu}
          >
          </MenuClose>
          <MenuContent>
            <Links>
              <PageLink
                href="/"
                onClick={dismissMenu}
              >
                CMP Calculator
              </PageLink>
              <PageLink
                href="/ranking"
                onClick={dismissMenu}
              >
                IV Rankings
              </PageLink>
            </Links> 
          </MenuContent>
        </Backdrop>
      }
    </Wrapper>
  )
}

const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0%);
  }
`

const fadeIn = keyframes`
  from {
    background-color: transparent;
  }
  to {
    background-color: var(--backdrop);
  }
`

const Wrapper = styled.div`
  display: none;

  @media ${QUERIES.phoneAndSmaller} {
    display: revert;
  }
`
const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  animation: ${fadeIn} 200ms;
  animation-fill-mode: forwards;
`

const MenuClose = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 30%;
`

const MenuContent = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: 70%;
  background-color: var(--color-primary);
  animation: ${slideIn} 250ms ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const IconWrapper = styled.a`
  position: absolute;
  right: 8px;
  height: 36px;
  width: 36px;
  top: 0;
  bottom: 0;
  margin: auto;
`

const Links = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-left: 10px;
  padding-bottom: 100px;
`

const PageLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  font-size: 2rem;
  font-weight: bold;

  &:hover {
    color: white;
  }
`

export default MobileMenu;
