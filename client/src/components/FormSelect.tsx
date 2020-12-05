import React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { useFormContext, Controller } from "react-hook-form";

type MuiSelectProps = {
    name: string;
    label: number;
    options: [];
};

type FormSelectProps = {
    name: string;
    label: number;
    options: [];
};

type Item = {
    id: number;
    label: string;
};

const MuiSelect : React.FC<MuiSelectProps> = (props) => {
  const { label, name, options } = props;

  return (
    <FormControl fullWidth={true}>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Select id={name} {...props}>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options.map((item: Item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

// const FormSelect : React.FC<FormSelectProps> = (props) => {
//   const { control } = useFormContext();
//   const { name, label } = props;
//   return (
//     <React.Fragment>
//       <Controller
//         as={MuiSelect}
//         control={control}
//         name={name}
//         label={label}
//         defaultValue=""
//       />
//     </React.Fragment>
//   );
// }

// export default FormSelect;