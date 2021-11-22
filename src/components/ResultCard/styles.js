import styled from 'styled-components';

export const Container = styled.div`
  width: fit-content;
  max-width: 100%;
  min-width: 350px;

  background-color: #fff;

  border-radius: 4px;

  padding: 16px;

  margin: 8px;

  & > table {
    width: 100%;
    max-width: 100%;

    margin: 0px;
    padding: 0px;

    & tbody > tr > td {
      width: fit-content;
      padding: 4px;
      min-width: 50px;
      border-top: 1px solid rgba(0, 0, 0, 0.2);
    }

    & > tbody > tr > td:not(:last-child) {
      border-right: 1px solid rgba(0, 0, 0, 0.2);
    }
  }
`;
