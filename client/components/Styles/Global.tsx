import Styled, { css, injectGlobal } from 'styled-components'
import { MAIN_THEME } from './themes'

const global = css`
  body {
    background-color: ${MAIN_THEME.BACKGROUND_COLOR};
    color: ${MAIN_THEME.FONT_COLOR};
    font-family: 'Roboto', sans-serif;
    font-family: 'Open Sans', sans-serif;
    font-size: 0.9em;
    overflow-X: hidden;

    section {
      margin: 0;
      padding: 0;
      border: 1px solid white;
    }

    div {
      margin: 0;
      padding: 0;
      border 0px solid white;
    }

    a {
      text-decoration: none;
      font-size: 20px;
      color: white;
    }

    h1 {
      font-size: 3em;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
  }
`
export default global
