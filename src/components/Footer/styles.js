import styled from 'styled-components';

export const Container = styled.footer`
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

  & > a {
    margin: 8px;
    padding: 8px;
    border-radius: 4px;
    font-size: 2rem;

    transition: background 0.2s, color 0.2s;

    &:hover {
      background-color: #f8f8f8;
      color: #dbdbdb;

      & > svg {
        color: #dbdbdb;
      }
    }
    &:active {
      background-color: #dbdbdb;
      color: #f8f8f8;

      & > svg {
        color: #f8f8f8;
      }
    }

    background-color: #dbdbdb;
    color: #f8f8f8;

    & > svg {
      color: #f8f8f8;
    }
  }
`;
