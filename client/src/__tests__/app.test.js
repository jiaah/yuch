// import React from 'react';
// import { render } from './setupTests';
// import App from '../../app';
// import Loader from '../shared/loader';

// describe('<App />', () => {
//   const Nav = Loader({
//     loader: () => import('../components/nav' /* webpackChunkName: 'Nav' */),
//   });
//   const NavWrapper = render(<Nav />);

//   it('renders correctly with Nav on index page', () => {
//     const props = {
//       history: { location: { pathname: '/' } },
//       Nav: NavWrapper,
//     };
//     const wrapper = render(<App {...props} />);
//     expect(wrapper).toMatchSnapshot();
//   });

//   describe('on sub pages', () => {
//     const props = {
//       history: { location: { pathname: '/login' } },
//       Nav: NavWrapper,
//     };
//     const wrapper = render(<App {...props} />);

//     it('contains Loadable Component', () => {
//       expect(wrapper.find('LoadableComponent').exists()).toBe(true);
//     });

//     it('renders correctly with Nav', () => {
//       expect(wrapper).toMatchSnapshot();
//     });
//   });
// });
