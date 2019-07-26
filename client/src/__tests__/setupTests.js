import React from 'react';
import 'jest-dom/extend-expect';
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
} from 'react-testing-library';
import { jsdom } from 'jsdom';

export { render, fireEvent, cleanup, waitForElement };
export default React;

// Get rid off HTMLCanvasElement.prototype.getContext, and canvas errors.
HTMLCanvasElement.prototype.getContext = jest.fn();

// const { document } = new JSDOM().window;
// global.document = document;

// const documentHTML =
//   '<!doctype html><html><body><div id="root"></div></body></html>';
// global.document = jsdom(documentHTML);
// global.window = document.parentWindow;
