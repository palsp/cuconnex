import { SearchBar } from "@smartComponents/index";
import WaveCanvasBg from "@src/canvas/WaveCanvasBg";
import React, { useState, useEffect } from "react";
const TestPage = () => {
  const [interestArray, setInterestArray] = useState<any>({
    Technology: [""],
    Business: [""],
    Design: [""],
  });
  useEffect(() => {
    // const getUsers = async () => {
    //   return await axios.get("https://connex.dev/api/users");
    // };
    // (async () => {
    //   const result = await getUsers();
    //   console.log(result);
    // })();
    // const getUsers = async () => {
    //   const result = await axios.get("https://connex.dev/api/users");
    //   console.log(result);
    // };
    // getUsers();

    // let newwe = { Tech: [...testarrayobject.Tech] };
    // newwe.Tech.splice(1, 1);
    // console.log("this is original", testarrayobject);
    // console.log("this is splice", newwe);
    console.log("testpage is working!");
  }, []);
  return (
    <div>
      <SearchBar value="test" />
      This is testpage
      <WaveCanvasBg
        height={window.innerHeight - 80}
        width={window.innerWidth}
      />
    </div>
  );
};

export default TestPage;
