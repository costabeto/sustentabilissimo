import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > div {
    width: 300px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
`;
