import React from 'react';
import { shallow } from 'enzyme';
import HomeMain from './homeMain';

describe('<HomeMain />', () => {
  const wrapper = shallow(<HomeMain />);

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(
      wrapper
        .find('p')
        .at(0)
        .text(),
    ).toBe('OUR RESTAURANT');
    expect(
      wrapper
        .find('h3')
        .at(0)
        .text(),
    ).toBe('당신의 위한 유청 서비스');
    expect(
      wrapper
        .find('h3')
        .at(1)
        .text(),
    ).toBe('신선한 지역 농산물');
    expect(
      wrapper
        .find('p')
        .at(1)
        .text(),
    ).toBe('기업계, 각종 행사 모임연중 중식, 석식, 야식 배달');
    expect(
      wrapper
        .find('h3')
        .at(2)
        .text(),
    ).toBe('경주시 지원사업 장려100% 통참깨 참기름 사용');
    expect(
      wrapper
        .find('p')
        .at(2)
        .text(),
    ).toBe('중식, 석식 뷔폐 서비스');
    expect(
      wrapper
        .find('h3')
        .at(3)
        .text(),
    ).toBe('여성이 일하기 좋은 기업');
    expect(
      wrapper
        .find('p')
        .at(3)
        .text(),
    ).toBe('HEALTHY FOOD');
  });

  it('contains images', () => {
    expect(wrapper.find('img').props().src).toBe('text-file-stub');
  });

  it('contains link', () => {
    expect(wrapper.find('a').props().href).toBe(
      'http://www.xn--0z2bz4lsqjfrj.com/',
    );
  });
});
