'use client'
import getFormName from "@/utils/pokemonFormName"

function CMPWinner({ pokemonOne, attackOne, pokemonTwo, attackTwo }) {

  const nameOne = getFormName(pokemonOne.name, pokemonOne.form);
  const nameTwo = getFormName(pokemonTwo.name, pokemonTwo.form);


  if (attackOne > attackTwo) {
    return (
      <div>
        {nameOne} wins CMP over {nameTwo}
      </div>
    )
  } else if (attackOne > attackTwo) {
    return (
      <div>
        {nameOne} loses CMP to {nameTwo}
      </div>
    )
  } else {
    return (
      <div>
        {nameOne} and {nameTwo} result in a CMP Tie. The winner is chosen randomly
      </div>
    )
  }


  return <div></div>;
}

export default CMPWinner;
