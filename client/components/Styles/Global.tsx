import Styled, { css, injectGlobal } from 'styled-components'
import { MAIN_THEME } from './themes'

const global = css`
  body {
    background-color: ${MAIN_THEME.BACKGROUND_COLOR};
    color: ${MAIN_THEME.FONT_COLOR};
    font-family: 'Roboto', sans-serif;
    font-family: 'Open Sans', sans-serif;

    section {
      margin: 0;
      padding: 0;
      border: 2px solid white;
    }

    div {
      margin: 0;
      padding: 0;
      border 1px solid white;
    }

    * {
      box-sizing: border-box;
    }
  }
`
export default global
