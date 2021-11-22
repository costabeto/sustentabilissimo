import React, { useMemo } from 'react';
import { Container } from './styles';

const ResultCard = ({ data }) => {
  const simulation = useMemo(() => data, [data]);

  return (
    <Container>
      <h1>Dias simulados: {simulation.days}</h1>
      <table>
        <thead>
          <tr>
            <th>Parâmetro</th>
            <th>Gasolina</th>
            <th>GNV</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Uso</td>
            <td>{data.gasoline.city.liters} litros</td>
            <td>{data.gnv.city.m3} m³</td>
          </tr>
          <tr>
            <td>Gasto</td>
            <td>{data.gasoline.city.cost}</td>
            <td>{data.gnv.city.cost}</td>
          </tr>
          <tr>
            <td>KgCO2</td>
            <td>{data.gasoline.city.co2} KgCO2</td>
            <td>{data.gnv.city.co2} KgCO2</td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
};

export default ResultCard;
