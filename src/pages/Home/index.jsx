import React from 'react';
import { Container, Cards } from '../../components';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Card from '../../components/Card';

const Home = () => {
  return (
    <Container>
      <Header />

      <section style={{ flex: 1 }}>
        <h1>Seja sustentável!</h1>
        <p>
          Fazer mais pelo meio ambiente é fácil, e aqui te mostramos como você
          pode fazer sua parte!!
        </p>
        <Cards>
          <Card page='gnv' />
        </Cards>
      </section>

      <Footer />
    </Container>
  );
};

export default Home;
