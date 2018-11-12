import React from 'react';
import { shallow } from 'enzyme';
import App from './app';
import Loader from './src/shared/loader';

describe('<App />', () => {
  const Nav = Loader({
    loader: () => import('./src/components/nav' /* webpackChunkName: 'Nav' */),
  });
  const NavWrapper = shallow(<Nav />);

  it('renders correctly with Nav on index page', () => {
    const props = {
      history: { location: { pathname: '/' } },
      Nav: NavWrapper,
    };
    const wrapper = shallow(<App {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('on sub pages', () => {
    const props = {
      history: { location: { pathname: '/login' } },
      Nav: NavWrapper,
    };
    const wrapper = shallow(<App {...props} />);

    it('contains Loadable Component', () => {
      expect(wrapper.find('LoadableComponent').exists()).toBe(true);
    });

    it('renders correctly with Nav', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
