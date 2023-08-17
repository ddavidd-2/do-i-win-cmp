'use client';
import React from 'react';
import { styled, keyframes } from 'styled-components';
import { Menu } from 'react-feather';
import { QUERIES } from '@/constants';

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
        <>
          <MenuClose
            onClick={dismissMenu}
          >
          </MenuClose>
          <MenuContent>

          </MenuContent>
        </>
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

const Wrapper = styled.div`
  display: none;

  @media ${QUERIES.phoneAndSmaller} {
    display: revert;
  }
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
  background-color: white;
  animation: ${slideIn} 250ms ease;
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

export default MobileMenu;
