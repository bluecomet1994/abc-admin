import * as yup from 'yup';

const form3ValidationSchema = yup.object().shape({
  name: yup.string(),
  id: yup.string(),
  area: yup.string(),
  trainer: yup.string(),
  qa1: yup.string(),
  qa2: yup.string(),
  qa3: yup.string(),
  qa4: yup.string(),
  qa5: yup.string(),
  qa6: yup.string(),
});

export default form3ValidationSchema;