import styled from 'styled-components';

import { Form as Unform } from '@unform/web';

export const Container = styled(Unform)`
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
