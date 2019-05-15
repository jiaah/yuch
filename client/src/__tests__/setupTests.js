import React from 'react';
import 'jest-dom/extend-expect';
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
} from 'react-testing-library';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import requestAnimationFrame from './tempPolyfills';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter(), disableLifecycleMethods: true });

export { render, fireEvent, cleanup, waitForElement, shallow, mount, sinon };
export default React;

HTMLCanvasElement.prototype.getContext = () => {
  // return whatever getContext has to return
};
