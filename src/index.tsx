import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';

import { App } from './App';

const root = document.getElementById('root');

if (!root) {
  throw new Error('root not found');
}

const container = createRoot(root);

container.render(
    <App />
);
