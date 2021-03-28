import { pink } from "@material-ui/core/colors";
import * as React from "react";
import { SyntheticEvent } from "react";
import Toggle, { ToggleIcons } from "react-toggle";
import classes from "./Toggles.module.css"

class Toggles extends React.Component {

  
  handleEvent = (e: SyntheticEvent<HTMLInputElement>) => {};
  render() {
    const icons: ToggleIcons = {
      checked: <div />,
      unchecked: <div />,
    };
    return (
      <label>
        <Toggle
        icons={false}
        defaultChecked={true}
        onChange={this.handleEvent}
        />
      </label>

    );
  }
}
export default Toggles;
