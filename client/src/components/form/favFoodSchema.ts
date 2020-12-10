import * as yup from 'yup';

const schema = yup.object().shape({
    other: yup.string()
        .max(50)
});

export default schema;