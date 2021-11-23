import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ResultCard from '../../components/ResultCard';
import gnvCalc, { defaultPrices } from '../../utils/gnvCalc';
import { Container, Inputs } from './styles';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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

  const pricesToCurrency = useCallback((data) => {
    return data.map((r) => {
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
  }, []);

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
      gnvCalc({ days: 730, data, prices }),
      gnvCalc({ days: 2965, data, prices }),
    ];

    return results;
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

    const [currencyFormatted] = pricesToCurrency([result]);

    return currencyFormatted;
  }, [data, days, gasolineValue, gnvValue, pricesToCurrency]);

  const costChartData = useMemo(() => {
    if (!simulation) return null;

    const options = {
      responsive: true,
      labels: {
        fontColor: '#fff',
        color: '#fff',
      },
      plugins: {
        legend: {
          display: true,
          fullWidth: false,
          labels: {
            color: '#000',
          },
        },
        title: {
          display: true,
          text: 'Gasto com combustível em Reais (na cidade)',
          font: {
            size: '20px',
          },
        },
      },
    };

    const labels = simulation.map(
      (s) => `${s.days} dia${s.days > 1 ? 's' : ''}`
    );

    const gasolineData = simulation.map((s) => {
      return s.gasoline.city.cost;
    });
    const gnvData = simulation.map((s) => {
      return s.gnv.city.cost;
    });

    const data = {
      labels,
      datasets: [
        {
          label: 'Gasolina',
          data: gasolineData,
          backgroundColor: ['rgba(255, 99, 132, 0.2)'],
          borderColor: ['rgba(255, 99, 132, 1)'],
          color: ['rgba(255, 99, 132, 1)'],
          borderWidth: 1,
        },
        {
          label: 'GNV',
          data: gnvData,
          backgroundColor: ['rgba(54, 162, 235, 0.2)'],
          borderColor: ['rgba(54, 162, 235, 1)'],
          color: ['rgba(54, 162, 235, 1)'],
          borderWidth: 1,
        },
      ],
    };

    return { data, options };
  }, [simulation]);

  const co2ChartData = useMemo(() => {
    if (!simulation) return null;

    const options = {
      responsive: true,
      labels: {
        fontColor: '#fff',
        color: '#fff',
      },
      plugins: {
        legend: {
          display: true,
          fullWidth: false,
          labels: {
            color: '#000',
          },
        },
        title: {
          display: true,
          text: 'Emissão de CO2 em KG (na cidade)',
          font: {
            size: '20px',
          },
        },
      },
    };

    const labels = simulation.map(
      (s) => `${s.days} dia${s.days > 1 ? 's' : ''}`
    );

    const gasolineData = simulation.map((s) => {
      return s.gasoline.city.co2;
    });
    const gnvData = simulation.map((s) => {
      return s.gnv.city.co2;
    });

    const data = {
      labels,
      datasets: [
        {
          label: 'Gasolina',
          data: gasolineData,
          backgroundColor: ['rgba(255, 99, 132, 0.2)'],
          borderColor: ['rgba(255, 99, 132, 1)'],
          color: ['rgba(255, 99, 132, 1)'],
          borderWidth: 1,
        },
        {
          label: 'GNV',
          data: gnvData,
          backgroundColor: ['rgba(54, 162, 235, 0.2)'],
          borderColor: ['rgba(54, 162, 235, 1)'],
          color: ['rgba(54, 162, 235, 1)'],
          borderWidth: 1,
        },
      ],
    };

    return { data, options };
  }, [simulation]);

  return (
    simulation && (
      <Container>
        <Header />
        <button className='good-button' onClick={() => history.goBack()}>
          Voltar
        </button>
        <section>
          <h1>Simulação de uso do GNV</h1>
          {data && <p>{data.avgKmDay} Km por dia</p>}
          <p>Veja a diferença que faz o uso do GNV!!</p>
          <p>Mude os valores da simulação e veja o resultado se adaptar!</p>

          <Inputs>
            <div>
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
            </div>
            <div>
              <label htmlFor='gnvValue'>Preço do GNV</label>
              <input
                type='number'
                id='gnvValue'
                name='gnvValue'
                placeholder='Preço GNV'
                value={gnvValue}
                onChange={(e) =>
                  handleChageValue({
                    value: e.target.value,
                    handler: setGnvValue,
                  })
                }
              />
            </div>
            <div>
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
            </div>
          </Inputs>

          <ResultCard data={variableSimulation} key={days} />
        </section>
        <section>
          <h1>Impacto ao longo do tempo</h1>

          {costChartData && (
            <Line options={costChartData.options} data={costChartData.data} />
          )}

          {co2ChartData && (
            <Line options={co2ChartData.options} data={co2ChartData.data} />
          )}
        </section>
        <Footer />
      </Container>
    )
  );
};

export default GNVResult;
