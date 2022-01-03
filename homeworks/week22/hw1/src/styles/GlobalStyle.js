import { css } from '@emotion/react'


const GlobalStyles = css`
  @font-face {
    font-family: Cyber;
    src: url("https://assets.codepen.io/605876/Blender-Pro-Bold.otf");
    font-display: swap;
  }
  * {
    margin: 0;
    padding: 0;
    list-style: none;
    /* font-family: "Cyber", Futura, sans-serif; */
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    box-sizing: border-box;
    color: #333;
    letter-spacing: 1px;
    line-height: 1.4;
  }
  
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    -webkit-border-radius: 10px;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    -webkit-border-radius: 4px;
    border-radius: 4px;
    background: rgb(219,219,219);
  }

  html {
    font-size: 20px;
    background: whitesmoke;
  }

  body {
    margin: .5rem 0 0;
  }

  a {
    text-decoration: none;
  }

  input, textarea {
    font-family: "Cyber", -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue';
  }
`

export default GlobalStyles
