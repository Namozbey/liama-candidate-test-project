import React from "react";
import imageUrl from "../../assets/images/404.png";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  > img {
    width: 300px;
  }
`;

export default function NotFound(): JSX.Element {
  return (
    <Wrapper>
      <img src={imageUrl} alt="not found image (404)" />
    </Wrapper>
  );
}
