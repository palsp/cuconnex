import React, { useState } from "react";

interface IErrorContext {
  error: string;
  setErrorHandler: (updatedError: any) => void;
}

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
      {props.children}
    </ErrorContext.Provider>
  );
};
