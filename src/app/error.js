'use client'
import React from "react"
import Link from "next/link";
import styled from "styled-components";

export default function Error({ error, reset }) {

  React.useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <div>
        <Home
          href="/"
        >
          Click here to return Home
        </Home>
      </div>
      <br />
      <div>
        <Retry
          onClick={() => retry()}
        >
          Click here to retry
        </Retry>
      </div>
    </div>
  );
}

const Home = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover {
    text-decoration: underline;
  }
`;

const Retry = styled.a`
  color: inherit;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`