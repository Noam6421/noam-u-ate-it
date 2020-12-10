import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField } from '@material-ui/core';

import PersonalInfoFormProps from '../models/PersonalInfoFormProps';

const GenericTextField = (props: PersonalInfoFormProps) => {
    const { register, errors } = useForm();
    return (
        <>
            <TextField
                name={props.name}
                error={Boolean(errors[props.name])}
                label={props.label}
                InputLabelProps={{
                    shrink: true,
                }}
                inputRef={register}
                variant='outlined'
            />
            <p>{errors[props.name]?.message}</p>
        </>
    );
};

export default GenericTextField;


