import * as Yup from 'yup';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const addUserAccountValidation = Yup.object({
  companyName: Yup.string('')
    .lowercase('소문자로 입력해주세요.')
    .matches(/^\S+$/, '글자를 붙여쓰세요.')
    .matches(/^[a-zA-Z0-9]+$/, '특수문자는 사용할 수 없습니다.')
    .max(12, '12글자 아래로 입력해주세요.')
    .required('업체 상호명을 한글로 입력하세요.'),
  username: Yup.string('')
    .lowercase('소문자로 입력해주세요.')
    .matches(/^\S+$/, '글자를 붙여쓰세요.')
    .matches(/^[a-zA-Z0-9]+$/, '특수문자는 사용할 수 없습니다.')
    .max(12, '12글자 아래로 입력해주세요.')
    .required('고객 로그인 아이디를 입력하세요.'),
  password: Yup.string('')
    .lowercase('소문자로 입력해주세요.')
    .matches(/^\S+$/, '글자를 붙여쓰세요.')
    .min(8, '비밀번호는 숫자를 포함한 최소 8자 이상이어야 합니다.')
    .matches(/(?=.*[0-9])/, '숫자를 포함하여야 합니다.')
    .required('비밀번호를 입력하세요.'),
  confirmPassword: Yup.string('')
    .lowercase('소문자로 입력해주세요.')
    .required('비밀번호를 입력하세요.')
    .oneOf([Yup.ref('password')], '비밀번호가 일치하지 않습니다.'),
  contactNo: Yup.string()
    .matches(
      phoneRegExp,
      '전화 번호에 잘못된 문자를 입력하거나 잘못된 형식의 전화 번호입니다.',
    )
    .required('연락처를 입력하세요.'),
  email: Yup.string().email('이메일 주소가 유효하지 않습니다.'),
  mealPrice: Yup.number()
    .typeError('숫자만 입력하세요.')
    .min(1, '0이상의 숫자를 입력해 주세요.')
    .max(30000, '3만원 이하만 입력 가능합니다.')
    .positive('1이상의 자연수만 입력하세요.')
    .integer('1이상의 자연수만 입력하세요.')
    .required('식수가격을 입력하세요.'),
  lunchQty: Yup.number()
    .nullable()
    .typeError('숫자만 입력하세요.')
    .integer('1이상의 자연수만 입력하세요.')
    .positive('1이상의 자연수만 입력하세요.'),
  dinnerQty: Yup.number()
    .nullable()
    .typeError('숫자만 입력하세요.')
    .integer('1이상의 자연수만 입력하세요.')
    .positive('1이상의 자연수만 입력하세요.'),
});

export const editUserAccountValidation = Yup.object({
  companyName: Yup.string('')
    .lowercase('소문자로 입력해주세요.')
    .matches(/^\S+$/, '글자를 붙여쓰세요.')
    .matches(/^[a-zA-Z0-9]+$/, '특수문자는 사용할 수 없습니다.')
    .max(12, '12글자 아래로 입력해주세요.')
    .required('업체 상호명을 한글로 입력하세요.'),
  username: Yup.string('')
    .lowercase('소문자로 입력해주세요.')
    .matches(/^\S+$/, '글자를 붙여쓰세요.')
    .matches(/^[a-zA-Z0-9]+$/, '특수문자는 사용할 수 없습니다.')
    .max(12, '12글자 아래로 입력해주세요.')
    .required('고객 로그인 아이디를 입력하세요.'),
  contactNo: Yup.string()
    .matches(
      phoneRegExp,
      '전화 번호에 잘못된 문자를 입력하거나 잘못된 형식의 전화 번호입니다.',
    )
    .required('연락처를 입력하세요.'),
  email: Yup.string().email('이메일 주소가 유효하지 않습니다.'),
  mealPrice: Yup.number()
    .typeError('숫자만 입력하세요.')
    .min(1, '0이상의 숫자를 입력해 주세요.')
    .max(30000, '3만원 이하만 입력 가능합니다.')
    .positive('1이상의 자연수만 입력하세요.')
    .integer('1이상의 자연수만 입력하세요.')
    .required('식수가격을 입력하세요.'),
  lunchQty: Yup.number()
    .nullable()
    .typeError('숫자만 입력하세요.')
    .integer('1이상의 자연수만 입력하세요.')
    .positive('1이상의 자연수만 입력하세요.'),
  dinnerQty: Yup.number()
    .nullable()
    .typeError('숫자만 입력하세요.')
    .integer('1이상의 자연수만 입력하세요.')
    .positive('1이상의 자연수만 입력하세요.'),
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

export const changePasswordValidation = Yup.object({
  password: Yup.string('')
    .lowercase('소문자로 입력해주세요.')
    .matches(/^\S+$/, '글자를 붙여쓰세요.')
    .required('비밀번호를 입력하세요.'),
  newPassword: Yup.string('')
    .lowercase('소문자로 입력해주세요.')
    .matches(/^\S+$/, '글자를 붙여쓰세요.')
    .min(8, '비밀번호는 숫자를 포함한 최소 8자 이상이어야 합니다.')
    .matches(/(?=.*[0-9])/, '숫자를 포함하여야 합니다.')
    .required('비밀번호를 입력하세요.'),
  confirmPassword: Yup.string('')
    .required('비밀번호를 입력하세요.')
    .oneOf([Yup.ref('newPassword')], '비밀번호가 일치하지 않습니다.'),
});

export const changePasswordByAdminValidation = Yup.object({
  newPassword: Yup.string('')
    .lowercase('소문자로 입력해주세요.')
    .matches(/^\S+$/, '글자를 붙여쓰세요.')
    .min(8, '비밀번호는 숫자를 포함한 최소 8자 이상이어야 합니다.')
    .matches(/(?=.*[0-9])/, '숫자를 포함하여야 합니다.')
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
