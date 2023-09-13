'use client';
import { QUERIES } from '@/constants';
import React from 'react';
import { styled } from 'styled-components';
import Link from 'next/link';
import getFormName from '@/utils/pokemonFormName';
import { ArrowLeft } from 'react-feather';
import TypeIcon from '../TypeIcon';
import pokedex from '../../../public/pokedex.json';

function IVTable({ name, form, list40, list41, list50, list51 }) {

  const [start, setStart] = React.useState(0);
  const [end, setEnd] = React.useState(30);
  const [useBestBuddy, setUseBestBuddy] = React.useState(false);
  const [useXL, setUseXL] = React.useState(false);
  const [currRank, setCurrRank] = React.useState(0);
  const [rankInput, setRankInput] = React.useState("");
  const [ivInput, setIvInput] = React.useState("");

  const entry = pokedex.find((p) => p.pokemon_name === name && p.form === form);

  let rankings = useXL ?
    useBestBuddy ? list51 : list50
    :
    useBestBuddy ? list41 : list40;

  const topSP = rankings[0].sp;

  function getRelativeSP(sp) {
    const relPercent = sp / topSP * 100
    return relPercent.toFixed(2)
  }

  function updateRank(rank) {
    if (rank < 1 || rank > 4096) {
      return;
    }
    let newStart = rank - 15;
    let newEnd = rank + 15;
    if (newStart < 0) {
      const offset = 0 - newStart;
      newStart += offset;
      newEnd += offset;
    } else if (newEnd > 4096) {
      const offset = newEnd - 4096;
      newStart -= offset;
      newEnd += offset;
    }
    setCurrRank(rank);
    setStart(newStart);
    setEnd(newEnd);
  }

  function handleRankSearch(event) {
    setRankInput(event.target.value);
    const rank = Number(event.target.value);
    updateRank(rank);
  }

  const validIVInput = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '/'];

  function handleIvSearch(event) {
    const ivStr = event.target.value;
    const last = ivStr.length - 1;
    if ((!validIVInput.includes(ivStr[last]) && ivStr.length > 0) || ivStr.length > 8) {
      return;
    }
    setIvInput(ivStr);
    if (ivStr.length >= 5 || ivStr.length <= 8) {
      const ivs = ivStr.split('/');
      if (ivs.length !== 3 || ivs[0].length > 2 || ivs[1].length > 2 || ivs[2].length > 2) {
        return;
      }
      const atk = Number(ivs[0]);
      const def = Number(ivs[1]);
      const sta = Number(ivs[2]);

      const rank = rankings.findIndex((pkm) => pkm.atkIV === atk && pkm.defIV === def && pkm.staIV === sta) + 1;
      updateRank(rank);
    }
  }

  function isValidRank(rankStr) {
    const rank = Number(rankStr);
    return rank >= 1 && rank <= 4096;
  }

  return (
    <Wrapper>
      <span>
        <ArrowLeft size={12} />
        <Home href="/ranking">Back to IV Rankings</Home>
      </span>
      <Title>{getFormName(name, form)}</Title>
      <Types>
        {entry.type.map(t => {
          return <TypeIcon key={t} type={t} />
        })}
      </Types>
      <Configurations>
        <Toggles>
          <Setting>
            <Checkbox
              type="checkbox"
              id="best-buddy"
              name="best-buddy"
              checked={useBestBuddy}
              onChange={() => setUseBestBuddy(checked => !checked)}
            />
            <label htmlFor="best-buddy">
              with Best Buddy
            </label>
          </Setting>
          <Setting>
            <Checkbox
              type="checkbox"
              id="xl"
              name="xl"
              checked={useXL}
              onChange={() => setUseXL(checked => !checked)}
            />
            <label htmlFor="xl">
              with XL Candy
            </label>
          </Setting>
        </Toggles>
        <Searching>
          <Setting>
            <label htmlFor="ivSearch">
              Search IV
            </label>
            <IVInput
              type="text"
              id="ivSearch"
              name="ivSearch"
              value={ivInput}
              onChange={handleIvSearch}
            />
          </Setting>
          <Setting>
            <label htmlFor="rankSearch">
              Search Rank
            </label>
            <RankInput
              type="number"
              id="rankSearch"
              name="rankSearch"
              min="1"
              max="4096"
              value={rankInput}
              onChange={handleRankSearch}
              $valid={isValidRank(rankInput)}
            />
          </Setting>
          <input
            type="reset"
            value="Reset"
          />
        </Searching>
      </Configurations>
      <TableWrapper>
        <Table>
          <TableHeader>
            <HeaderRow>
              <HeaderElement>Rank</HeaderElement>
              <HeaderElement>IV</HeaderElement>
              <HeaderElement>CP</HeaderElement>
              <HeaderElement>Level</HeaderElement>
              <HeaderElement>Atk</HeaderElement>
              <HeaderElement>Def</HeaderElement>
              <HeaderElement>HP</HeaderElement>
              <HeaderElement>Total Stat</HeaderElement>
              <HeaderElement>Rel. Stat</HeaderElement>
            </HeaderRow>
          </TableHeader>
          <TableBody>
            {rankings.slice(start, end).map((iv, index) => {
              const ivStr = `${iv.atkIV} / ${iv.defIV} / ${iv.staIV}`;
              const rank = index + start + 1;
              return (
                <BodyRow
                  key={ivStr}
                  $highlight={rank === currRank ? 'var(--color-purple-faded)' : 'transparent'}
                  $fontWeight={rank === currRank ? 'bold' : 'normal'}
                >
                  <BodyElement>{rank}</BodyElement>
                  <BodyElement>{ivStr}</BodyElement>
                  <BodyElement>{iv.cp}</BodyElement>
                  <BodyElement>{iv.level}</BodyElement>
                  <BodyElement>{iv.atk}</BodyElement>
                  <BodyElement>{iv.def}</BodyElement>
                  <BodyElement>{iv.sta}</BodyElement>
                  <BodyElement>{iv.sp}</BodyElement>
                  <BodyElement>{getRelativeSP(iv.sp)}%</BodyElement>
                </BodyRow>
              )
            })}
          </TableBody>
        </Table>
      </TableWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media ${QUERIES.phoneAndSmaller} {
    width: 100%;
  }
`

const Home = styled(Link)`
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  text-decoration: none;
  color: inherit;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`

const Configurations = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  margin: 0 auto;
  width: 400px;

  @media ${QUERIES.phoneAndSmaller} {
    width: 100%;
    max-width: 400px;
  }
`

const Toggles = styled.div`
  display: flex;
  justify-content: space-around;
  font-size: var(--font-small);

  @media ${QUERIES.phoneAndSmaller} {
    justify-content: center;
    gap: 8px;
  }
`

const Searching = styled.div`
  display: flex;
  justify-content: space-between;;

  @media ${QUERIES.phoneAndSmaller} {
    font-size: 0.9rem;
  }
`

const Checkbox = styled.input`
  margin: 0;
  margin-top: 2px;

`
const IVInput = styled.input`
  width: 60px;
  font-weight: bold;

`

const RankInput = styled.input`
  width: 50px;
  color: ${props => props.$valid ? 'green' : 'red'};
  font-weight: bold;
`

const Setting = styled.div`
  display: flex;
  gap: 4px;
`

const TableWrapper = styled.div`
  width: 100%;
  overflow: auto;
  white-space: nowrap;
`

const Table = styled.table`
  margin: 10px;
  border-spacing: 0;
  width: 620px;

  @media ${QUERIES.tabletAndSmaller} {
    width: 550px;
  }
`

const TableHeader = styled.thead`
  & tr {
    border-spacing: 4px;
  }

  @media ${QUERIES.tabletAndSmaller} {
    font-size: 1rem;

    & tr {
      border-spacing: 2px;
    }
  }
`

const TableBody = styled.tbody`
  font-size: 0.8rem;

  @media ${QUERIES.tabletAndSmaller} {
    font-size: 0.7rem;
  }
`

const HeaderElement = styled.th`
  font-weight: 600;
  min-width: 55px;
  max-width: 90px;
  border-bottom: 1px solid black;

  @media ${QUERIES.tabletAndSmaller} {
    min-width: 40px;
    max-width: 70px;
    font-weight: 500;
    font-size: 0.9rem;
  }

  &:first-of-type, &:nth-of-type(4), &:nth-of-type(7) {
    border-right: 1px solid black;
  }
`

const TableRow = styled.tr`
  border: 1px solid black;
`

const HeaderRow = styled(TableRow)`
`

const BodyRow = styled(TableRow)`
  background-color: ${props => props.$highlight};
  font-weight: ${props => props.$fontWeight};

  &:hover {
    background-color: white;
  }
`

const BodyElement = styled.td`
  padding: 0 4px;
  margin: 0;

  &:first-of-type, &:nth-of-type(4), &:nth-of-type(7) {
    border-right: 1px solid black;
  }
`

const Title = styled.div`
  margin: 4px 0;
  font-size: var(--font-large);
  font-weight: bold;
`

const Types = styled.div`
  display: flex;
  padding-bottom: 8px;
  justify-content: center;
  gap: 2px;
`

export default IVTable;