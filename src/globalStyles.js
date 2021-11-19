import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

    * {
      box-sizing: border-box;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      font-family: 'Roboto';
      color: ${(props) => props.theme.color};

    svg {
        color: ${(props) => props.theme.icon.color}
    }
}

    *:focus {
      outline: none;
    }

		&::-webkit-scrollbar {
      display: none;
		}

    body,
    html {
      width: 100vw;
      margin: 0px;
      padding: 0px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: ${(props) => props.theme.bg};
      font-size: 16px;;

      @media (max-width: 1080px){
        font-size: 93.75%;
      }

      @media (max-width: 720px){
        font-size: 87.5%;
      }
    }

    h1 {
      margin: 0px;
      padding: 0px;
    }

    input {
      -webkit-user-select: text;
      -moz-user-select: text;
      -ms-user-select: text;
      user-select: text;
    }

    button {
      -webkit-user-select: text;
      -moz-user-select: text;
      -ms-user-select: text;
      user-select: text;

    transition: opacity 0.2s;
    &:hover {
      opacity: 0.8;
    }
    &:active {
      opacity: 1;
    }
    }

    section {
      width: 100vw;
      padding: 16px;      
    }

`;

export default GlobalStyle;
