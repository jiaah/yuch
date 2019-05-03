import React from 'react';
import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import requestAnimationFrame from './tempPolyfills';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter(), disableLifecycleMethods: true });

export { shallow, mount, render, sinon };
export default React;

HTMLCanvasElement.prototype.getContext = () => {
  // return whatever getContext has to return
};
