import "./App.css";
import React from "react";
import { fetchData,fetchSpecificData,fetchRocketDetails } from "./Components/services/api.js";
import MainPage from "./Components/MainPage";
import LoadingPage from "./Components/LoadingPage";
import DetailPage from "./Components/DetailPage.js";

function App() {

  const [launches, setLaunches] = React.useState(null)
  const [id, setId] = React.useState(null)
  const [rocketId,seRocketId] = React.useState(null)
  const [specificLaunch,setSpecificLaunch] = React.useState(null)
  const [rocketDetails,setRocketDetails] = React.useState(null)

  React.useEffect(() => {
    async function getData() {
      try {
        const result = await fetchData();
        setLaunches(result)
      }
      catch (error) {
        console.error("Something went wrong", error)
      }
    }
    getData()
  }, [])
  React.useEffect(()=>{
    if(id!==null){
    async function getSpecificData(){
      try{
        const result = await fetchSpecificData(id)
        setSpecificLaunch(result)
      }
     catch (error) {
        console.error("Something went wrong", error)
      }
}
async function getRocketData(){
 try{
        const result = await fetchRocketDetails(rocketId)
        setRocketDetails(result)
      }
     catch (error) {
        console.error("Something went wrong", error)
      }
}
getSpecificData()
getRocketData()
  }},[id,rocketId])
 
  function findIds(id,rocketId) {
    setId(id)
    seRocketId(rocketId)
  
  }
console.log(launches)
  return (
    <div>

      {/* <MainPage
        data={launches}
        findIds={findIds}
      /> */}
   <DetailPage
   data={specificLaunch}
   rocketDetails={rocketDetails}/>
    </div>
  );
}

export default App;
