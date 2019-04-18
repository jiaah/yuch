import Enzyme, { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import requestAnimationFrame from './tempPolyfills';

configure({ adapter: new Adapter(), disableLifecycleMethods: true });
export { shallow, mount, render };
export default Enzyme;

HTMLCanvasElement.prototype.getContext = () => {
  // return whatever getContext has to return
};
