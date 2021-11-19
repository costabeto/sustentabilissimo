import React from 'react';
import { Container } from './styles';
import logo from '../../assets/img/logo.svg';

const Header = () => {
  return (
    <Container>
      <img src={logo} alt='logo' />
      <h1>Sustentabilíssimo</h1>
    </Container>
  );
};

export default Header;
