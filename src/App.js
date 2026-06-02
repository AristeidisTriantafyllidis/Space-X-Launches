import React from "react";
import { fetchData } from "./Components/Data";
import MainPage from "./Components/MainPage";

function App() {
const [data,setData] = React.useState(null)

React.useEffect(()=>{
async function getData(){
  try{
    const result= await fetchData();
    setData(result)
 }
catch(error){
  console.error("Something went wrong",error)
}
}
getData()
},[])


  return (
    <div>
    
<MainPage
data={data}
/>
</div>
  );
}

export default App;
