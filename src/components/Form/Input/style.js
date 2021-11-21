import styled, { css } from 'styled-components';
import Tooltip from '../../Tooltip';

export const Container = styled.div`
  width: 300px;
  max-width: 100%;
  background: #fff;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  color: #666360;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;

  transition: border-color 0.2s;
  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}
  ${(props) =>
    props.isFocused &&
    css`
      color: #5292ba;
      border-color: #5292ba;
    `}
  ${(props) =>
    props.isFilled &&
    css`
      color: #5292ba;
    `}
  input {
    color: ${({ theme }) => theme.gray};
    background: #fff;
    width: 100%;

    border-radius: 4px;
    padding: 8px;
    border: none;
    margin: 8px 0px;
    font-size: 1.2rem;

    &::placeholder {
      color: ${({ theme }) => theme.gray};
    }
  }
  svg {
    margin: 0px 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  svg {
    margin: 0;
  }
  span {
    background: #c53030;
    color: ${({ theme }) => theme.white};
    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
