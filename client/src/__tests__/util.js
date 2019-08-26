import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from './setupTests';

export const findByTestAttr = (component, attr) => {
  const wrapper = component.find(`[data-test]='${attr}']`);
  return wrapper;
};

export const renderWithRouter = (
  ui,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {},
) => ({
  ...render(<Router history={history}>{ui}</Router>),
  history,
});
