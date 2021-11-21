import React, { useCallback, useRef } from 'react';
import Header from '../../components/Header';
import { Container } from './styles';
import Input from '../../components/Form/Input';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

const GNV = () => {
  const formRef = useRef(null);
  const history = useHistory();

  const calc = useCallback(
    async (data) => {
      try {
        formRef.current.setErrors({});
        const schema = Yup.object().shape({
          avgKmDay: Yup.number('Este campo aceita apenas números').required(
            'Campo obrigatório'
          ),
          cityKmL: Yup.number('Este campo aceita apenas números').required(
            'Campo obrigatório'
          ),
          roadKmL: Yup.number('Este campo aceita apenas números').required(
            'Campo obrigatório'
          ),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        const ensureNumber = {
          avgKmDay: Number(data.avgKmDay),
          cityKmL: Number(data.cityKmL),
          roadKmL: Number(data.roadKmL),
        };
        history.push('/gnv/result', ensureNumber);
      } catch (err) {
        const validationErrors = {};
        if (err instanceof Yup.ValidationError) {
          err.inner.forEach((error) => {
            validationErrors[error.path] = error.message;
          });
          formRef.current.setErrors(validationErrors);
        }
      }
    },
    [history]
  );

  return (
    <Container ref={formRef} onSubmit={(e) => calc(e)}>
      <Header />

      <section>
        <h1>
          Descubra como o GNV beneficia o motorista e o meio ambiente ao mesmo
          tempo!!
        </h1>

        <p>
          Preencha os campos a seguir e veja quais os impactos que seu veículo
          exerce no meio ambiente e como você pode reduzir isso usando o GNV!!
        </p>
      </section>
      <ul>
        <li>
          <label htmlFor='avgKmDay'>
            Quantos Km você percorre com seu carro por dia?
          </label>
          <Input
            type='number'
            id='avgKmDay'
            name='avgKmDay'
            placeholder='Km/dia'
          />
        </li>

        <li>
          <label htmlFor='cityKmL'>
            Quantos Km por dia seu carro faz na cidade?
          </label>
          <Input
            type='number'
            id='cityKmL'
            name='cityKmL'
            placeholder='Km/L na cidade'
          />
        </li>
        <li>
          <label htmlFor='roadKmL'>
            Quantos Km por dia seu carro faz na estrada?
          </label>
          <Input
            type='number'
            id='roadKmL'
            name='roadKmL'
            placeholder='Km/L na estrada'
          />
        </li>
      </ul>

      <section>
        <button type='submit'>Descobrir</button>
      </section>
    </Container>
  );
};

export default GNV;
