import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import store from "./store";
import { Provider } from "react-redux";
import "normalize.css";
import "./assets/guerilla-font/stylesheet.css";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root {
        --color-robinegg-blue: #2ACBD3;
        --color-african-violet: #B084CC;
        --color-spacecadet-purple: #2E294E;
        --color-imperial-red: #F02D3A;
        --color-carrot-orange: #F49D37;
        --color-champagne-pink: #EAD7D1;

        --color-page-background: var(--color-champagne-pink);
        --color-copy: var(--color-spacecadet-purple);

        --font-family-guerilla: "guerrillanormal", sans-serif;
        --font-family-mulish: 'Mulish', sans-serif;
    }

    html {
        color: var(--color-copy);
        background-color: var(--color-page-background);
    }

    h1, h2, h3, h4, h5, h6 {
        font-family: var(--font-family-guerilla);
        letter-spacing: -0.05em;
    }

    html {
        font-family: var(--font-family-mulish);
        display: flex;
        flex-direction: row;
    }

    body {
        max-width: 768px;
        margin: 0 auto;
    }
`;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalStyle />
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
