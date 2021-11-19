import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled(Link)`
  background-color: #f8f8f8;
  width: 250px;
  padding: 16px;

  border-radius: 4px;

  border: 1px inset rgba(0, 0, 0, 0.1);

  -webkit-box-shadow: 6px 8px 8px 2px rgba(0, 0, 0, 0.31);
  box-shadow: 6px 8px 8px 2px rgba(0, 0, 0, 0.31);

  cursor: pointer;
  transition: transform 0.2s;
  &:hover {
    transform: translate(-5px, -5px);
  }

  text-decoration: none;
`;
