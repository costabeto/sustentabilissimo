import React, { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import ResultCard from '../../components/ResultCard';
import gnvCalc, { defaultPrices } from '../../utils/gnvCalc';
import { Container, Simulation } from './styles';

const GNVResult = () => {
  const history = useHistory();
  const [days, setDays] = useState(1);
  const [gasolineValue, setGasolineValue] = useState(defaultPrices.gasoline);
  const [gnvValue, setGnvValue] = useState(defaultPrices.gnv);

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

    const prices = {
      gasoline: gasolineValue,
      gnv: gnvValue,
    };

    const results = [
      gnvCalc({ days: 1, data, prices }),
      gnvCalc({ days: 7, data, prices }),
      gnvCalc({ days: 30, data, prices }),
      gnvCalc({ days: 365, data, prices }),
      gnvCalc({ days: 2965, data, prices }),
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
  }, [data, gasolineValue, gnvValue]);

  function resetValue(handler) {
    handler(0);
  }

  function handleChageValue({ value, handler }) {
    const number = Number(value);

    if (!value || isNaN(value)) return resetValue(handler);

    if (value === days) return resetValue(handler);

    if (value < 1) return resetValue(handler);

    if (String(value).length > 10) return resetValue(handler);

    handler(number);
  }

  const variableSimulation = useMemo(() => {
    if (!data) return null;

    const prices = {
      gasoline: gasolineValue,
      gnv: gnvValue,
    };

    const result = gnvCalc({ days, data, prices });

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
  }, [data, days, gasolineValue, gnvValue]);

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
          <label htmlFor='gasolineValue'>Preço da gasolina</label>
          <input
            type='number'
            id='gasolineValue'
            name='gasolineValue'
            placeholder='Preço gasolina'
            value={gasolineValue}
            onChange={(e) =>
              handleChageValue({
                value: e.target.value,
                handler: setGasolineValue,
              })
            }
          />
          <label htmlFor='gnvValue'>Preço do GNV</label>
          <input
            type='number'
            id='gnvValue'
            name='gnvValue'
            placeholder='Preço GNV'
            value={gnvValue}
            onChange={(e) =>
              handleChageValue({ value: e.target.value, handler: setGnvValue })
            }
          />
          <label htmlFor='days'>Dias usando o carro</label>
          <input
            type='number'
            id='days'
            name='days'
            placeholder='Dias'
            value={days}
            onChange={(e) =>
              handleChageValue({ value: e.target.value, handler: setDays })
            }
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
