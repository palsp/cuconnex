import React, { useState } from "react";
import classes from "./ErrorModal.module.css";
interface IErrorContext {
  error: string;
  setErrorHandler: (updatedError: any) => void;
}

interface IErrorMsg {
  errorMessage: string;
}
export const ErrorModal: React.FC<IErrorMsg> = (props) => {
  const [showError] = useState<boolean>(false);
  return (
    <>
      {showError && (
        <>
          <div className={classes.modal} />
          kuay
          <div>{props.errorMessage}</div>
        </>
      )}
    </>
  );
};
export const ErrorContext = React.createContext<IErrorContext>(
  {} as IErrorContext
);

export const ErrorContextProvider = (props: any) => {
  const [error, setError] = useState<string>("");
  const setErrorHandler = (updatedError: any) => {
    setError((prevState) => prevState || updatedError);
    console.log("updating error...", updatedError);
  };
  return (
    <ErrorContext.Provider value={{ error, setErrorHandler }}>
      <ErrorModal errorMessage={error} />
      {props.children}
    </ErrorContext.Provider>
  );
};

export default ErrorContextProvider;
