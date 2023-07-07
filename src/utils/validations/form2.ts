import * as yup from 'yup';

const form2ValidationSchema = yup.object().shape({
  name: yup.string(),
  phone: yup.string(),
  id: yup.string(),
  correct1: yup.string(),
  correct2: yup.string(),
  correct3: yup.string(),
  correct4: yup.string(),
  correct5: yup.string(),
  correct6: yup.string(),
  correct7: yup.string(),
  correct8: yup.string(),
  correct9: yup.string(),
  correct10: yup.string(),
  sign: yup.string()
});

export default form2ValidationSchema;