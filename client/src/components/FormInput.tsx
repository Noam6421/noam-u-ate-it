import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";

type Props = {
    name: string;
    label: number;
};

const FormInput : React.FC<Props> = (props) => {
    const { control } = useFormContext();
    const { name, label } = props;
    return (
        <Controller
            as={TextField}
            name={name}
            control={control}
            defaultValue=""
            label={label}
            fullWidth={true}
        />
    );
}

export default FormInput;