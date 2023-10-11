
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './global.css'
import { ConfigProvider }from 'antd'

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <BrowserRouter basename={baseUrl}>
    <ConfigProvider
    theme={{
      token: {
        // Seed Token，影响范围大
        colorPrimary: 'rgb(15, 23, 42)',
      },
    }}>
    <App />
    </ConfigProvider>
  </BrowserRouter>);



