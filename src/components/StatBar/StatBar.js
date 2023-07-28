'use client';
import { styled } from 'styled-components';
import React from 'react';

/* add max stat breakpoints for UL and ML in the future */
function StatBar({ stat }) {
  const width = `${stat / 300 * 85}px`;

  return (
    <BarWrapper>
      <Stat width={width} />
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
  width: ${p => p.width};
  background-color: gray;
  border-radius: 4px;
`

export default StatBar;
