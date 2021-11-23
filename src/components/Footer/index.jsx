import React from 'react';
import { Container } from './styles';
import { FiGithub, FiInfo } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <Container>
      <a
        href='https://github.com/costabeto/sustentabilissimo'
        target='_blank'
        rel='noreferrer'
      >
        <FiGithub /> Github
      </a>
      <Link to='/documento'>
        <FiInfo /> Documentação
      </Link>
    </Container>
  );
};

export default Footer;
