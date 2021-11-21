import styled from 'styled-components';

export const Container = styled.div`
  width: fit-content;
  max-width: 100%;

  background-color: #fff;
  min-width: 350px;

  border-radius: 4px;

  padding: 16px;

  margin: 8px;

  & > table {
    width: fit-content;

    & > tr > td {
      width: fit-content;
      padding: 4px;
      min-width: 100px;
      border-top: 1px solid rgba(0, 0, 0, 0.2);
    }

    & > tr > td:not(:last-child) {
      border-right: 1px solid rgba(0, 0, 0, 0.2);
    }
  }
`;
