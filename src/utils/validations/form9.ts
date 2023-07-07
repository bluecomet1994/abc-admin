import * as yup from 'yup';

const form9ValidationSchema = yup.object().shape({
  name: yup.string(),
  id: yup.string(),
  date: yup.string(),
  dname: yup.string(),
  ddate: yup.string(),
  wname: yup.string(),
  wdate: yup.string()
});

export default form9ValidationSchema;