import * as yup from 'yup';

const form4ValidationSchema = yup.object().shape({
  name: yup.string(),
  id: yup.string(),
  area: yup.string(),
  trainer: yup.string(),
  qa1: yup.string(),
  qa2: yup.string(),
  qa3: yup.string()
});

export default form4ValidationSchema;