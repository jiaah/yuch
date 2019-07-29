import React from 'react';
import 'jest-dom/extend-expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
} from 'react-testing-library';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

export { render, fireEvent, cleanup, waitForElement, mockStore };
export default React;

// Get rid off HTMLCanvasElement.prototype.getContext, and canvas errors.
HTMLCanvasElement.prototype.getContext = jest.fn();
