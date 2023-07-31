'use client'
import getFormName from "@/utils/pokemonFormName"
import { styled } from "styled-components";

function CMPWinner({ pokemonOne, attackOne, pokemonTwo, attackTwo }) {

  const nameOne = getFormName(pokemonOne.name, pokemonOne.form);
  const nameTwo = getFormName(pokemonTwo.name, pokemonTwo.form);


  if (attackOne > attackTwo) {
    return (
      <Win>
        {nameOne} wins CMP over {nameTwo}
      </Win>
    )
  } else if (attackOne < attackTwo) {
    return (
      <Loss>
        {nameOne} loses CMP to {nameTwo}
      </Loss>
    )
  } else {
    return (
      <Tie>
        {nameOne} and {nameTwo} result in a CMP Tie. The winner is chosen randomly
      </Tie>
    )
  }
}

const Result = styled.div`
  padding: 8px;
  border-radius: 2px;
  color: var(--text-color-primary);
  border: 1px solid gray;
`;

const Win = styled(Result)`
  background-color: var(--color-win);
`

const Loss = styled(Result)`
  background-color: var(--color-loss);
`

const Tie = styled(Result)`
  background-color: var(--color-tie);
`
export default CMPWinner;
