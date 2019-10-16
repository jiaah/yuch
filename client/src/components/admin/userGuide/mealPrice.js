import React from 'react';
import TextField from '@material-ui/core/TextField';
import Icon from '../../../../assets/icons/index';
import { admin } from '../../../data/data';

const MealPrice = ({
  handleChange,
  adminCompanyName,
  state,
  textFieldB,
  textFieldC,
}) => {
  const { mealPrice, newMealPrice, month, day } = state;
  return (
    <React.Fragment>
      <p className="guide--margin">
        물가와 인건비 상승으로 부득이하게{' '}
        <span className="b c-blue">식수가격을 인상</span>
        하게 <br />
        됨을 알려드립니다.
      </p>
      <div className="guide--margin flex justify-center">
        <p>고객님의 식수가격은</p>
        <TextField
          name="mealPrice"
          value={mealPrice || ''}
          onChange={e => handleChange(e, 'mealPrice')}
          className={textFieldB}
        />
        <p>원 에서</p>

        <TextField
          name="newMealPrice"
          value={newMealPrice || ''}
          onChange={e => handleChange(e, 'newMealPrice')}
          className={textFieldB}
        />
        <p>원 으로</p>
      </div>
      <div className="guide--margin flex justify-center">
        <TextField
          name="month"
          value={month || ''}
          onChange={e => handleChange(e, 'month')}
          className={textFieldC}
        />
        <p>월</p>
        <TextField
          name="day"
          value={day || ''}
          onChange={e => handleChange(e, 'day')}
          className={textFieldC}
        />
        <p>일 부터 인상됩니다.</p>
      </div>
      <p className="guide--margin">
        고객님께 언제나 따뜻하고 포근한 집밥을 전해드리기위해 <br />
        최선을 다하겠습니다.
      </p>
      <p className="mt3">
        문의 사항이 있으시면 언제든지 {adminCompanyName}
        으로 문의주세요.
      </p>
      <div className="flex justify-center pt2">
        <Icon name="contact" width="30" height="30" viewBox="0 0 35 35" />
        <a
          className="td-none c-point2"
          href={`tel:${admin.contactNo3Link}`}
          aria-label="dial a phone call"
        >
          {admin.contactNo2}
          &#8199; | | &#8199;
          {admin.contactNo3}
        </a>
      </div>
    </React.Fragment>
  );
};

export default MealPrice;
