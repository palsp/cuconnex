import React, { useEffect } from "react";
import axios from "axios";
const TestPage = () => {
  useEffect(() => {
    // const getUsers = async () => {
    //   return await axios.get("https://connex.dev/api/users");
    // };
    // (async () => {
    //   const result = await getUsers();
    //   console.log(result);
    // })();
    const getUsers = async () => {
      const result = await axios.get("https://connex.dev/api/users");
      console.log(result);
    };
    getUsers();

    console.log("testpage is working!");
  }, []);
  return <div>This is testpage</div>;
};

export default TestPage;
