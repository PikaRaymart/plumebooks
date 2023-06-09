import { createGlobalStyle } from "styled-components";


const globalStyle = createGlobalStyle`
  html,
  body {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    margin: 0;
    padding: 0;
  }
  html {
    box-sizing: border-box;
    font-size: 100%;
  }
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
  a {
    color: inherit;
    outline: none;
    text-decoration: none;
  }
  
  ul,
  ol,
  ul {
    list-style: none;
    padding: 0;
  }
  body,
  h1,
  h2,
  h3,
  h4,
  p,
  ul,
  ol{
    margin: 0;
  }
  img {
    display: block;
    max-width: 100%;
  }
  input,
  button,
  textarea {
    background: none;
    border: none;
    font: inherit;
    outline: none;
  }
  fieldset {
    border: none;
    margin: 0;
    padding: 0;
  }
  button {
    color: inherit;
    padding: 0;
  }
  /* Font Families */
  body {
    font-family: 'Noto Sans', sans-serif;
    min-height: 100vh;
    max-width: 100rem;
    margin: 0 auto;
    outline: none;
  }
  /* Custom for the site */
  body.no-scroll {
    overflow: hidden;
  }
  
  a,
  button,
  input,
  textarea {
    &:focus-visible {
      outline: 2px dashed rgb(0, 36, 58);
      outline-offset: 1px;
    }
  }
  .sr-only {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
  
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  @media(min-width: 1000px) {
    a,
    input,
    button,
    textarea:hover {
      cursor: pointer;
    }
  }
`


export default globalStyle;