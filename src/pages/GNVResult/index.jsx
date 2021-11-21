import React, { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import ResultCard from '../../components/ResultCard';
import gnvCalc from '../../utils/gnvCalc';
import { Container, Simulation } from './styles';

const GNVResult = () => {
  const history = useHistory();

  const [data, setData] = useState(null);

  useEffect(() => {
    const result = history.location.state;

    if (!result) {
      history.goBack();
    }

    const { avgKmDay, cityKmL, roadKmL } = result;

    if (!avgKmDay || !cityKmL || !roadKmL) {
      history.goBack();
    }

    setData({ avgKmDay, cityKmL, roadKmL });
  }, [history]);

  const simulation = useMemo(() => {
    if (!data) return null;

    const results = [
      gnvCalc({ days: 1, data }),
      gnvCalc({ days: 7, data }),
      gnvCalc({ days: 30, data }),
      gnvCalc({ days: 365, data }),
      gnvCalc({ days: 2965, data }),
    ];

    const formatted = results.map((r) => {
      r.gasoline.city.cost = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(r.gasoline.city.cost);

      r.gasoline.road.cost = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(r.gasoline.road.cost);

      r.gnv.city.cost = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(r.gnv.city.cost);

      r.gnv.road.cost = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(r.gnv.road.cost);

      return r;
    });

    return formatted;
  }, [data]);

  return (
    <Container>
      <Header />

      <section>
        <h1>Simulação de uso do GNV</h1>
        <p>Veja a diferença que faz o uso do GNV!!</p>

        {data && <p>{data.avgKmDay} Km por dia</p>}

        <Simulation>
          {simulation &&
            simulation.map((s) => <ResultCard data={s} key={s.days} />)}
        </Simulation>

        <p>Mude a quantidade de dias simulados para ver mais valores!</p>
        <label htmlFor='days'>Dias usando o carro</label>
        <input type='number' id='days' name='days' placeholder='Dias' />
      </section>
    </Container>
  );
};

export default GNVResult;
