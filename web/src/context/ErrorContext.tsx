import React, { useState } from "react";
import classes from "./ErrorModal.module.css";
import { Card, CardContent, Button } from "@material-ui/core";
import { Heading } from "@dumbComponents/UI/index";
interface IErrorContext {
  error: string;
  setErrorHandler: (updatedError: any) => void;
}

interface IErrorMsg {
  errorMessage: string;
  clearErrorHandler: () => void;
}
export const ErrorModal: React.FC<IErrorMsg> = ({
  errorMessage,
  clearErrorHandler,
}) => {
  return (
    <div
      className={classes.error}
      onClick={() => {
        clearErrorHandler();
      }}
    >
      <div className={classes.card}>
        <Card>
          <CardContent>
            <Heading bold size="small-medium" value={`${errorMessage}`} />
            <Button variant="contained" color="secondary">
              Okay
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export const ErrorContext = React.createContext<IErrorContext>(
  {} as IErrorContext
);

export const ErrorContextProvider = (props: any) => {
  const [error, setError] = useState<string>("");
  const setErrorHandler = (updatedError: any) => {
    setError(updatedError);
    console.log("updating error...", updatedError);
  };
  const clearErrorHandler = () => {
    setError("");
  };
  return (
    <ErrorContext.Provider value={{ error, setErrorHandler }}>
      {error && (
        <ErrorModal
          errorMessage={error}
          clearErrorHandler={clearErrorHandler}
        />
      )}
      {props.children}
    </ErrorContext.Provider>
  );
};

export default ErrorContextProvider;
