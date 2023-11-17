/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { HomePage } from './pages/HomePage/Loadable';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';

import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, ThemeProvider } from 'baseui';
import { DetailPage } from './pages/DetailPage/Loadable';

import Header from './components/Header';

const engine = new Styletron();

export function App() {
  const { i18n } = useTranslation();

  return (
    <StyletronProvider value={engine}>
      <ThemeProvider theme={LightTheme}>
        <BrowserRouter>
          <Helmet
            titleTemplate="Silkroad - %s"
            defaultTitle="Silkroad"
            htmlAttributes={{ lang: i18n.language }}
          >
            <meta name="description" content="Silkroad" />
          </Helmet>

          <Header />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/detail" element={<DetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <GlobalStyle />
        </BrowserRouter>
      </ThemeProvider>
    </StyletronProvider>
  );
}
