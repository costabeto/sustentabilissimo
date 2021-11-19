import React from 'react';
import { Cards } from '../../components';
import Header from '../../components/Header';
import Card from '../../components/Card';

const Home = () => {
  return (
    <>
      <Header />

      <section>
        <h1>Seja sustentável!</h1>
        <p>
          Fazer mais pelo meio ambiente é fácil, e aqui te mostramos como você
          pode fazer sua parte!!
        </p>
      </section>

      <Cards>
        <Card page='gnv' />
      </Cards>
    </>
  );
};

export default Home;
