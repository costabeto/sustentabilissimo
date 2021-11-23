import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  & > section {
    padding-bottom: 0px;

    & > button {
      padding: 16px;
      border: none;
      background-color: #4bc47d;

      color: #fff;

      font-weight: 600;

      font-size: 1.5rem;

      border-radius: 4px;
    }

    & > input {
      color: ${({ theme }) => theme.gray};
      background: #fff;
      width: 100px;

      border-radius: 4px;
      padding: 8px;
      border: none;
      margin: 8px 0px;
      font-size: 1.2rem;

      &::placeholder {
        color: ${({ theme }) => theme.gray};
      }
    }
  }

  & > section:nth-child(3) {
    padding: 8px;
  }

  & > ul {
    width: 100%;
    padding: 16px;
    margin: 0px;

    list-style: none;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    & > li {
      margin: 8px 0px;

      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;

      & > label {
        font-size: 1.2rem;
        font-weight: 300;
      }

      & > input {
        margin: 4px 0px;

        border: none;
        border-radius: 4px;

        padding: 8px;
      }
    }
  }
`;

export const Inputs = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;

  & > div {
    width: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    margin: 0px 16px;
  }

  & > div > input {
    color: ${({ theme }) => theme.gray};
    background: #fff;
    width: 100px;

    border-radius: 4px;
    padding: 8px;
    border: none;
    margin: 8px 0px;
    font-size: 1.2rem;

    &::placeholder {
      color: ${({ theme }) => theme.gray};
    }
  }

  & > div > label {
    font-size: 1.2rem;
    font-weight: 300;
  }
`;

export const Simulation = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-start;
  flex-wrap: wrap;
`;
