import {useEffect} from "react";
import {getData, setData} from "./Api";

//when using mock data always create a new file call mockData.tsx and store mock data there. Import when necessary
import mockUsers from "./mockData";
import {User} from "./Models";
mockUsers.map((user: User): string => user.name);

interface Props {
  passedValue: string;
}

const MockComponent = ({call}) => {
  call();
  return null;
};

//When declaring props,
const Convention: React.FC<Props> = (props) => {
  //declaring props using const and object destructuring
  const {passedValue} = props;
  //When declaring variable that depends on boolean in react functional components use
  const boolean = true;
  const componentA = boolean ? "a" : "b";
  console.log(componentA);

  //if it depends on 3 or more values: eg string values. Use if else
  let componentB = "a"; //initial value
  if (passedValue === "foo") componentB = "something";
  //2nd value
  else if (passedValue === "bar") componentB = "something else"; //3rd value

  //Do not use arrow functions in JSX element. Declare a handler every time
  const callHandler = () => {
    //do something
    addData("micky", "ngub");
  };
  const someCompThatCallFunctions = <MockComponent call={callHandler}></MockComponent>;

  //Do not use axios directly in react component!! always create api call functions in API folder and import them.
  const fetchData = async () => {
    const data = await getData();
    console.log(data);
    //do smth else
  };

  const addData = async (name: string, id: string) => {
    const res = await setData({name: name, id: id});
    return res;
    //do smth else
  };

  //fetch data to display in useEffect
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {someCompThatCallFunctions} {componentB}
    </div>
  );
};

export default Convention;
