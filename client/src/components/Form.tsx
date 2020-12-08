import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Checkbox } from "@material-ui/core";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

interface IFormInputs {
    TextField: string
    firstName: string
    age: number
}

const schema = yup.object().shape({
    firstName: yup.string().required(),
    age: yup.number().positive().integer().required(),
});
  
const Form = () => {
    const { register, handleSubmit, errors, control, reset } = useForm<IFormInputs>({
        resolver: yupResolver(schema)
    });
    const onSubmit = (data: IFormInputs) => console.log(data);
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="firstName"
                control={control}
                defaultValue={false}
                rules={{ required: true }}
                ref={register}
                render={props =>
                <TextField
                    onChange={e => props.onChange(e.target.value)}
                    value={props.value}
                />
                }
            />
            <p>{errors.firstName?.message}</p>
            <input type="submit" />
        </form>
    );
}

export default Form;