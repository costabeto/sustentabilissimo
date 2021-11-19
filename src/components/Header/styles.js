import styled from 'styled-components';

export const Container = styled.header`
  width: 100vw;
  max-width: 100vw;
  height: fit-content;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  padding: 16px;
  background-color: #f8f8f8;

  & > h1 {
    margin: 8px;
  }

  & > img {
    width: 100px;
    margin-right: 16px;
  }
`;
