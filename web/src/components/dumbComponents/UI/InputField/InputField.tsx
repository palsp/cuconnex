import React from "react";
import TextField from "@material-ui/core/TextField";
import { useField } from "formik";

import classes from "./InputField.module.css";

interface Props {
  name: string;
  type: string;
  label: string;
  placeholder?: string;
}

const InputField: React.FC<Props> = ({ label, placeholder, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";

  return (
    <TextField
      {...field}
      type={props.type}
      helperText={errorText}
      error={!!errorText}
      label={label}
      fullWidth
      placeholder={placeholder}
    />
  );
  // return <TextField fullWidth type={props.type} label={props.value} />;
};

export default InputField;
