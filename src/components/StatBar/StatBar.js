'use client';
import { styled } from 'styled-components';
import React from 'react';
import { QUERIES } from '@/constants';

/* add max stat breakpoints for UL and ML in the future */
function StatBar({ stat }) {

  return (
    <BarWrapper>
      <Stat $stat={stat} />
    </BarWrapper>
  )
}

const BarWrapper = styled.div`
  display: inline-block;
  width: 85px;
  display: flex;
  align-items: center;
`

const Stat = styled.div`
  display: inline-block;
  height: 5px;
  width: ${p => `${p.$stat / 300 * 85}px`};
  background-color: gray;
  border-radius: 4px;
  transition: width 200ms;

  @media ${QUERIES.phoneAndSmaller} {
    width: ${p => `${p.$stat / 400 * 85}px`};
  }
`

export default StatBar;
