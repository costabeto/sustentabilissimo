import React, { useState } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import doc from '../../assets/document.pdf';
import { Container } from './styles';
import { useHistory } from 'react-router-dom';

function PDF() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const history = useHistory();

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function handleChangePage(newNumber) {
    if (!newNumber) return;

    const number = Number(newNumber);

    if (isNaN(number)) return;

    if (number <= 1) {
      setPageNumber(1);
      return;
    }

    if (number >= numPages) {
      setPageNumber(numPages);
      return;
    }

    setPageNumber(number);
  }

  return (
    <Container>
      <button className='good-button' onClick={() => history.goBack()}>
        Voltar
      </button>
      <div>
        <button
          className='good-button'
          onClick={() => handleChangePage(pageNumber - 1)}
        >
          Anterior
        </button>
        <p>
          Página {pageNumber} de {numPages}
        </p>
        <button
          className='good-button'
          onClick={() => handleChangePage(pageNumber + 1)}
        >
          Próxima
        </button>
      </div>
      <Document file={doc} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} width={window.innerWidth} />
      </Document>
    </Container>
  );
}

export default PDF;
