import React from 'react';
import 'jest-dom/extend-expect';
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
} from 'react-testing-library';

export { render, fireEvent, cleanup, waitForElement };
export default React;

// Get rid off HTMLCanvasElement.prototype.getContext, and canvas errors.
HTMLCanvasElement.prototype.getContext = jest.fn();
