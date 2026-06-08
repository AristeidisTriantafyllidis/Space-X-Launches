import "./App.css";
import React from "react";
import { fetchData, fetchSpecificData, fetchRocketDetails } from "./Components/services/api.js";
import MainPage from "./Components/MainPage.js"
import DetailPage from "./Components/DetailPage.js";
import LoadingPage from "./Components/Loading-Fail-pages/LoadingPage.js";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import FailPage from "./Components/Loading-Fail-pages/FailPage.js";

function App() {

  const [launches, setLaunches] = React.useState(null)
  const [id, setId] = React.useState(null)
  const [rocketId, setRocketId] = React.useState(null)
  const [specificLaunch, setSpecificLaunch] = React.useState(null)
  const [rocketDetails, setRocketDetails] = React.useState(null)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    async function getData() {
      try {
        const result = await fetchData();
        setLaunches(result)
      }
      catch (error) {
        setError(1)
       }
    }
    getData()
  }, [])

  React.useEffect(() => {
    if (id !== null) {
      async function getSpecificData() {
        try {
          const result = await fetchSpecificData(id)
          setSpecificLaunch(result)
        }
        catch (error) {
          setError(1)
        }
      }
      async function getRocketData() {
        try {
          const result = await fetchRocketDetails(rocketId)
          setRocketDetails(result)
        }
        catch (error) {
          setError(1)
        }
      }
      getSpecificData()
      getRocketData()
    }
  }, [id, rocketId])

  function findIds(id, rocketId) {
    setId(id)
    setRocketId(rocketId)
  }

  let homePage;
  let detailPage;

  if (error !== null) {
    homePage = <FailPage />
  }
  // else if (launches === null) {
  //   homePage = <LoadingPage />
  // }
  else {
    homePage = <MainPage
      data={launches}
      findIds={findIds}
    />
  }
  
  if (error !== null) {
    detailPage = <FailPage />
  }
  else if (specificLaunch && rocketDetails === null) {
    detailPage = <LoadingPage />
  }
  else {
    detailPage = <DetailPage
      data={specificLaunch}
      rocketDetails={rocketDetails} />
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={homePage} />
          <Route path='/DetailPage' element={detailPage} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
