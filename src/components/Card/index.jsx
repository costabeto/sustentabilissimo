import React from 'react';
import { Container } from './styles';

const Card = ({ page = '/' }) => {
  return (
    <Container to={page}>
      <h1>Use GNV</h1>

      <p>Conheça os benefícios para o meio ambiente e para você também!</p>
    </Container>
  );
};

export default Card;
