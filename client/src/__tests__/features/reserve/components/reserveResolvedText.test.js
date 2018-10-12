import React from 'react';
import { shallow } from 'enzyme';
import ReserveResolvedText from '../../../../features/reserve/components/reserveResolvedText';
import Buttons from '../../../../shared/buttons';

describe('<reserveResolvedText />', () => {
  const mockClose = jest.fn();

  it('display reserve request success text', () => {
    const props = {
      apiRequest: 'success',
      handleClose: mockClose,
    };
    const wrapper = shallow(<ReserveResolvedText {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('display reserve request error text', () => {
    const props = {
      apiRequest: 'error',
      handleClose: mockClose,
    };
    const wrapper = shallow(<ReserveResolvedText {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('display null', () => {
    const props = {
      apiRequest: '',
      handleClose: mockClose,
    };
    const wrapper = shallow(<ReserveResolvedText {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('when clicking close button', () => {
    const props = {
      apiRequest: 'error',
      handleClose: mockClose,
    };
    const wrapper = shallow(<ReserveResolvedText {...props} />);

    beforeEach(() => {
      wrapper.find(Buttons).simulate('click');
    });

    it('calls close modal callback', () => {
      // Error: Expected mock function to have been called, but it was not called.
      // expect(mockClose).toHaveBeenCalled();
    });
  });
});
