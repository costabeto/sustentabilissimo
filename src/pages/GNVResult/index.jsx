import React, { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import ResultCard from '../../components/ResultCard';
import gnvCalc from '../../utils/gnvCalc';
import { Container, Simulation } from './styles';

const GNVResult = () => {
  const history = useHistory();
  const [days, setDays] = useState(1);

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

  function resetDays() {
    setDays(0);
  }

  function handleChageDays(newDays) {
    const number = Number(newDays);

    if (!newDays || isNaN(newDays)) return resetDays();

    if (newDays === days) return resetDays();

    if (newDays < 1) return resetDays();

    if (String(newDays).length > 10) return resetDays();

    setDays(number);
  }

  const variableSimulation = useMemo(() => {
    if (!data) return null;

    const result = gnvCalc({ days, data });

    result.gasoline.city.cost = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(result.gasoline.city.cost);

    result.gasoline.road.cost = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(result.gasoline.road.cost);

    result.gnv.city.cost = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(result.gnv.city.cost);

    result.gnv.road.cost = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(result.gnv.road.cost);

    return result;
  }, [data, days]);

  return (
    simulation && (
      <Container>
        <Header />
        <section
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            display: 'flex',
          }}
        >
          <h1>Simulação de uso do GNV</h1>
          {data && <p>{data.avgKmDay} Km por dia</p>}
          <p>Veja a diferença que faz o uso do GNV!!</p>
          <p>Mude a quantidade de dias simulados para ver mais valores!</p>
          <label htmlFor='days'>Dias usando o carro</label>
          <input
            type='number'
            id='days'
            name='days'
            placeholder='Dias'
            value={days}
            onChange={(e) => handleChageDays(e.target.value)}
          />

          <ResultCard data={variableSimulation} key={days} />
        </section>

        <section>
          <h1>Exemplos de simulações</h1>

          <p>Confira algumas sugestões de simulação.</p>

          <Simulation>
            {simulation.map((s) => (
              <ResultCard data={s} key={s.days} />
            ))}
          </Simulation>
        </section>
      </Container>
    )
  );
};

export default GNVResult;
