import React from "react";
import TextField from "@material-ui/core/TextField";

import classes from "./InputField.module.css";

interface Props {
  value: string;
  type?: string;
}

const InputField: React.FC<Props> = (props) => {
  return <TextField fullWidth type={props.type} label={props.value} />;
};

export default InputField;
