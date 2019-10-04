import * as Yup from 'yup';

// 한글만 가능, 띄어쓰기 불가능
const hangulRegExp = /^[가-힣]+$/;
// 2~20 영문, 한글, 숫자 입력 가능. 특수문자는 !@#())*_로 한정. 띄어쓰기 가능.
const nameRegExp = /^[a-zA-Z가-힣0-9@#()*_-\s]{2,20}$/;
// 영.숫자 조합
const engNumRegExp = /^[a-zA-Z0-9_]+$/;
const phoneRegExp = /^([0-9]{2}|[0-9]{3})-([0-9]{3}|[0-9]{4})-[0-9]{4}$/;
const bankRegExp = /^([0-9]{3}|[0-9]{4})-([0-9]{3}|[0-9]{2}|[0-9]{4})-([0-9]{4}|[0-9]{6}|[0-9]{7})$/;
const businessRegExp = /^([0-9]{3})-([0-9]{2})-([0-9]{5})$/;

export const userAccountValidation = Yup.object({
  companyName: Yup.string('')
    .matches(
      nameRegExp,
      '특수문자는 @#())*_- 만 입력가능합니다 (띄어쓰기 가능)',
    )
    .max(20, '20글자 아래로 입력해주세요.')
    .required('업체명을 입력해주세요.'),
  username: Yup.string('')
    .lowercase('소문자로 입력해주세요.')
    .matches(/^\S+$/, '글자를 붙여쓰세요.')
    .matches(engNumRegExp, '특수문자는 _ 만 사용 가능합니다.')
    .max(12, '12글자 아래로 입력해주세요.')
    .required('고객 로그인 아이디를 입력하세요.'),
  password: Yup.string('')
    .lowercase('소문자로 입력해주세요.')
    .matches(/^\S+$/, '글자를 붙여쓰세요.')
    .matches(engNumRegExp, '숫자 혹은 영숫자 조합만 사용하세요.')
    .min(8, '숫자를 포함한 최소 8자 이상이어야 합니다.')
    .required('비밀번호를 입력하세요.'),
  confirmPassword: Yup.string('')
    .lowercase('소문자로 입력해주세요.')
    .required('비밀번호를 입력하세요.')
    .oneOf([Yup.ref('password')], '비밀번호가 일치하지 않습니다.'),
  contactNo: Yup.string()
    .matches(phoneRegExp, "' - '를 포함한 숫자를 입력해주세요.")
    .required('연락처를 입력하세요.'),
  mealPrice: Yup.number()
    .typeError('숫자만 입력하세요.')
    .integer('1이상의 숫자를 입력해 주세요.')
    .positive('1이상의 숫자를 입력해 주세요.'),
  email: Yup.string().email('이메일 주소가 유효하지 않습니다.'),
  address: Yup.string(''),
  lunchQty: Yup.number()
    .nullable()
    .typeError('숫자만 입력하세요.')
    .integer('1이상의 숫자를 입력해 주세요.')
    .positive('1이상의 숫자를 입력해 주세요.'),
  dinnerQty: Yup.number()
    .nullable()
    .typeError('숫자만 입력하세요.')
    .integer('1이상의 숫자를 입력해 주세요.')
    .positive('1이상의 숫자를 입력해 주세요.'),
  lateNightSnackQty: Yup.number()
    .nullable()
    .typeError('숫자만 입력하세요.')
    .integer('1이상의 숫자를 입력해 주세요.')
    .positive('1이상의 숫자를 입력해 주세요.'),
  businessNo: Yup.string()
    .matches(businessRegExp, "' - '를 포함한 숫자를 입력해주세요.")
    .required('사업자번호를 입력하세요.'),
});

export const editUserAccountValidation = Yup.object({
  companyName: Yup.string('')
    .matches(
      nameRegExp,
      '특수문자는 @#())*_- 만 입력가능합니다 (띄어쓰기 가능)',
    )
    .max(20, '20글자 아래로 입력해주세요.')
    .required('업체명을 입력해주세요.'),
  username: Yup.string('')
    .lowercase('소문자로 입력해주세요.')
    .matches(/^\S+$/, '글자를 붙여쓰세요.')
    .matches(engNumRegExp, '특수문자는 _ 만 사용 가능합니다.')
    .max(12, '12글자 아래로 입력해주세요.')
    .required('고객 로그인 아이디를 입력하세요.'),
  contactNo: Yup.string()
    .matches(phoneRegExp, "' - '를 포함한 숫자를 입력해주세요.")
    .required('연락처를 입력하세요.'),
  email: Yup.string().email('이메일 주소가 유효하지 않습니다.'),
  address: Yup.string(''),
  lunchQty: Yup.number()
    .nullable()
    .typeError('숫자만 입력하세요.')
    .integer('1이상의 숫자를 입력해 주세요.')
    .positive('1이상의 숫자를 입력해 주세요.'),
  dinnerQty: Yup.number()
    .nullable()
    .typeError('숫자만 입력하세요.')
    .integer('1이상의 숫자를 입력해 주세요.')
    .positive('1이상의 숫자를 입력해 주세요.'),
  lateNightSnackQty: Yup.number()
    .nullable()
    .typeError('숫자만 입력하세요.')
    .integer('1이상의 숫자를 입력해 주세요.')
    .positive('1이상의 숫자를 입력해 주세요.'),
  businessNo: Yup.string()
    .matches(businessRegExp, "' - '를 포함한 숫자를 입력해주세요.")
    .required('사업자번호를 입력하세요.'),
});

export const loginValidation = Yup.object({
  username: Yup.string('')
    .trim()
    .lowercase('소문자로 입력하세요.')
    .required('아이디를 입력하세요.'),
  password: Yup.string('')
    .lowercase('소문자로 입력하세요.')
    .required('비밀번호를 입력하세요.'),
});

export const forgotUsernameValidation = Yup.object({
  email: Yup.string().email('이메일 주소가 유효하지 않습니다.'),
  contactNo: Yup.string().matches(
    phoneRegExp,
    "' - '를 포함해서 번호를 입력해주세요.",
  ),
});

export const forgotPasswordValidation = Yup.object({
  username: Yup.string('')
    .trim()
    .lowercase('소문자로 입력하세요.')
    .required('아이디를 입력하세요.'),
  email: Yup.string()
    .email('이메일 주소가 유효하지 않습니다.')
    .required('이메일 주소를 입력하세요.'),
});

export const changePasswordValidation = Yup.object({
  password: Yup.string('')
    .lowercase('소문자로 입력해주세요.')
    .matches(/^\S+$/, '글자를 붙여쓰세요.')
    .required('비밀번호를 입력하세요.'),
  newPassword: Yup.string('')
    .lowercase('소문자로 입력해주세요.')
    .matches(/^\S+$/, '글자를 붙여쓰세요.')
    .matches(engNumRegExp, '숫자 혹은 영숫자 조합만 사용하세요.')
    .min(8, '숫자를 포함한 최소 8자 이상이어야 합니다.')
    .required('비밀번호를 입력하세요.'),
  confirmPassword: Yup.string('')
    .required('비밀번호를 입력하세요.')
    .oneOf([Yup.ref('newPassword')], '비밀번호가 일치하지 않습니다.'),
});

export const resetPasswordValidation = Yup.object({
  newPassword: Yup.string('')
    .lowercase('소문자로 입력해주세요.')
    .matches(/^\S+$/, '글자를 붙여쓰세요.')
    .matches(engNumRegExp, '숫자 혹은 영숫자 조합만 사용하세요.')
    .min(8, '숫자를 포함한 최소 8자 이상이어야 합니다.')
    .required('비밀번호를 입력하세요.'),
  confirmPassword: Yup.string('')
    .lowercase('소문자로 입력해주세요.')
    .required('비밀번호를 입력하세요.')
    .oneOf([Yup.ref('newPassword')], '비밀번호가 일치하지 않습니다.'),
});

export const passwordValidation = Yup.object({
  password: Yup.string('')
    .lowercase('소문자로 입력해주세요.')
    .required('비밀번호를 입력하세요.'),
});

export const bankAccountValidation = Yup.object({
  accountHolder: Yup.string('')
    .matches(
      nameRegExp,
      '한글, 숫자, 특수문자 !@#)(* 만 입력하세요 (띄어쓰기 가능)',
    )
    .required('예금주를 입력하세요.'),
  bankName: Yup.string('')
    .matches(hangulRegExp, '한글만 입력하세요.')
    .matches(/^\S+$/, '글자를 붙여쓰세요.')
    .required('은행명을 입력하세요.'),
  accountNo: Yup.string('')
    .matches(bankRegExp, '유효한 계좌번호 형식이 아닙니다.')
    .required('' - '를 포함해서 계좌번호를 입력하세요.'),
});

export const adminAccountValidation = Yup.object({
  companyName: Yup.string('')
    .matches(nameRegExp, '특수문자는 !@#)(* 만 입력가능합니다 (띄어쓰기 가능)')
    .max(20, '20글자 아래로 입력해주세요.')
    .required('업체명을 입력해주세요.'),
  username: Yup.string('')
    .lowercase('소문자로 입력해주세요.')
    .matches(/^\S+$/, '글자를 붙여쓰세요.')
    .matches(engNumRegExp, "ID는 영숫자와 '_'조합만 사용하세요.")
    .max(12, '12글자 아래로 입력해주세요.')
    .required('고객 로그인 아이디를 입력하세요.'),
  contactNo: Yup.string()
    .matches(phoneRegExp, "' - '를 포함해서 번호를 입력해주세요.")
    .required('연락처를 입력하세요.'),
  email: Yup.string().email('이메일 주소가 유효하지 않습니다.'),
});

export const reservePriceValidation = Yup.object({
  reservePrice: Yup.number()
    .typeError('숫자만 입력하세요.')
    .min(1, '0이상의 숫자를 입력해 주세요.')
    .max(100000, '10만원 이하만 입력 가능합니다.')
    .positive('1이상의 숫자를 입력해 주세요.')
    .integer('1이상의 숫자를 입력해 주세요.')
    .required('식수가격을 입력하세요.'),
});

export const restoSalesValidation = Yup.object({
  lunch: Yup.number()
    .nullable()
    .typeError('숫자만 입력하세요.')
    .min(0, '1이상의 숫자를 입력해 주세요.')
    .positive('1이상의 숫자를 입력해 주세요.')
    .integer('1이상의 숫자를 입력해 주세요.'),
  dinner: Yup.number()
    .nullable()
    .typeError('숫자만 입력하세요.')
    .min(0, '1이상의 숫자를 입력해 주세요.')
    .positive('1이상의 숫자를 입력해 주세요.')
    .integer('1이상의 숫자를 입력해 주세요.'),
});

export const cateringValidation = Yup.object({
  lunchQty: Yup.number()
    .nullable()
    .typeError('숫자만 입력하세요.')
    .min(1, '1이상의 숫자를 입력해 주세요.')
    .positive('1이상의 숫자를 입력해 주세요.')
    .integer('1이상의 숫자를 입력해 주세요.'),
  dinnerQty: Yup.number()
    .nullable()
    .typeError('숫자만 입력하세요.')
    .min(1, '1이상의 숫자를 입력해 주세요.')
    .positive('1이상의 숫자를 입력해 주세요.')
    .integer('1이상의 숫자를 입력해 주세요.'),
  lateNightSnackQty: Yup.number()
    .nullable()
    .typeError('숫자만 입력하세요.')
    .min(1, '1이상의 숫자를 입력해 주세요.')
    .positive('1이상의 숫자를 입력해 주세요.')
    .integer('1이상의 숫자를 입력해 주세요.'),
});

export const specialMealValidation = Yup.object({
  companyName: Yup.string('')
    .matches(nameRegExp, '특수문자는 !@#)(* 만 입력가능합니다 (띄어쓰기 가능)')
    .max(20, '20글자 아래로 입력해주세요.')
    .required('고객명을 입력해주세요.'),
  contactNo: Yup.string()
    .matches(phoneRegExp, "' - '를 포함해서 번호를 입력해주세요.")
    .required('연락처를 입력하세요.'),
  date: Yup.date(),
  time: Yup.string().required('시간을 입력해주세요.'),
  mealPrice: Yup.number()
    .typeError('숫자를 입력하세요.')
    .integer('1이상의 숫자를 입력해 주세요.')
    .positive('1이상의 숫자를 입력해 주세요.')
    .required('입력해 주세요.'),
  quantity: Yup.number()
    .typeError('숫자를 입력하세요.')
    .integer('1이상의 숫자를 입력해 주세요.')
    .positive('1이상의 숫자를 입력해 주세요.')
    .required('입력해 주세요.'),
  sideDish: Yup.number()
    .typeError('숫자를 입력하세요.')
    .integer('1이상의 숫자를 입력해 주세요.')
    .positive('1이상의 숫자를 입력해 주세요.')
    .required('입력해 주세요.'),
  address: Yup.string('').nullable(),
  note: Yup.string('').nullable(),
});

export const employeeValidation = Yup.object({
  name: Yup.string('')
    .matches(nameRegExp, '특수문자는 !@#)(* 만 입력가능합니다 (띄어쓰기 가능)')
    .max(20, '20글자 아래로 입력해주세요.')
    .required('고객명을 입력해주세요.'),
  contactNo: Yup.string()
    .matches(phoneRegExp, "' - '를 포함한 숫자를 입력해주세요.")
    .required('연락처를 입력하세요.'),
  address: Yup.string(''),
  accountHolder: Yup.string('').matches(
    nameRegExp,
    '한글, 숫자, 특수문자 !@#)(* 만 입력하세요 (띄어쓰기 가능)',
  ),
  bankName: Yup.string('')
    .matches(hangulRegExp, '한글만 입력하세요.')
    .matches(/^\S+$/, '글자를 붙여쓰세요.'),
  accountNo: Yup.string('' - '를 포함해서 계좌번호를 입력하세요.').matches(
    bankRegExp,
    '유효한 계좌번호 형식이 아닙니다.',
  ),
});
