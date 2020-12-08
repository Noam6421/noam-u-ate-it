import * as yup from 'yup';
import isIsraeliIdValid from 'israeli-id-validator';

const phoneRegExp = /^\+?(972|0)(\-)?0?(([23489]{1}\d{7})|[5]{1}\d{8})$/;
const alphaRegex = /^[a-z\u0590-\u05fe]+$/i;

const schema = yup.object().shape({
    name: yup.string()
        .matches(alphaRegex, 'Name is not valid')
        .max(50)
        .required(),
    lastName: yup.string()
        .matches(alphaRegex, 'Last Name is not valid')
        .max(50)
        .required(),
    birthDate: yup.date().required(),
    beer: yup.string(),
    idNum: yup.string()
        .test('israeliId', 'ID is not valid', function (value) {
            return isIsraeliIdValid(value)
        })
        .required(),
    phone: yup.string()
        .matches(phoneRegExp, 'Phone number is not valid')
        .required(),
});

export default schema;