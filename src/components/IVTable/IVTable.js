'use client';
import { QUERIES } from '@/constants';
import React from 'react';
import { styled } from 'styled-components';
import { getIVs } from '@/utils/pokeMath';

function IVTable({ name, form }) {

  const [list40, list41, list50, list51] = React.useMemo(() => getIVs(name, form), [name, form]);

  const [start, setStart] = React.useState(0);
  const [end, setEnd] = React.useState(30);
  const [useBestBuddy, setUseBestBuddy] = React.useState(false);
  const [useXL, setUseXL] = React.useState(false);
  const [currRank, setCurrRank] = React.useState(0);
  const [rankInput, setRankInput] = React.useState("");
  const [ivInput, setIvInput] = React.useState("");

  let rankings = useXL ?
    useBestBuddy ? list51 : list50
    :
    useBestBuddy ? list41 : list40;

  const topSP = rankings[0].stat_product;

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

      const rank = rankings.findIndex((pkm) => pkm.atk_iv === atk && pkm.def_iv === def && pkm.sta_iv === sta) + 1;
      updateRank(rank);
    }
  }

  function isValidRank(rankStr) {
    const rank = Number(rankStr);
    return rank >= 1 && rank <= 4096;
  }

  return (
    <Wrapper>
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
        </Searching>
      </Configurations>
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
          {rankings.slice(start, end).map((pkm) => {
            const ivStr = `${pkm.atk_iv} / ${pkm.def_iv} / ${pkm.sta_iv}`;
            return (
              <BodyRow
                key={ivStr}
                $highlight={pkm.ranking === currRank ? 'var(--color-purple-faded)' : 'transparent'}
                $fontWeight={pkm.ranking === currRank ? 'bold' : 'normal'}
              >
                <BodyElement>{pkm.ranking}</BodyElement>
                <BodyElement>{ivStr}</BodyElement>
                <BodyElement>{pkm.cp}</BodyElement>
                <BodyElement>{pkm.lvl}</BodyElement>
                <BodyElement>{pkm.attack}</BodyElement>
                <BodyElement>{pkm.defense}</BodyElement>
                <BodyElement>{pkm.stamina}</BodyElement>
                <BodyElement>{pkm.stat_product}</BodyElement>
                <BodyElement>{getRelativeSP(pkm.stat_product)}%</BodyElement>
              </BodyRow>
            )
          })}
        </TableBody>
      </Table>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: min(100%, 620px);
  
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

const Configurations = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  margin-left: auto;
  margin-right: auto;
  width: 400px;
`

const Toggles = styled.div`
  display: flex;
  justify-content: space-around;
  font-size: var(--font-small);
`

const Searching = styled.div`
  display: flex;
  justify-content: space-between;
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

const Table = styled.table`
  margin: 10px;
  border-spacing: 0;
  width: 620px;
  overflow-x: scroll;

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

export default IVTable;
