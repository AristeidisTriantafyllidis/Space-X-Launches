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

  const mockLaunches = [{
    "id": "5eb87d46ffd86e000604b3880",
    "name": "FalconSat",
    "date_local": "2006-03-24T22:30:00.000Z",
    "success": true,
    "details": "Engine failure at 33 seconds and loss of vehicle",
    "rocket": "5e9d0d95eda69955f709bf1c",
    "links": {
      "patch": {
        "small": "https://images2.imgbox.com/3c/0e/T8iJcSN3_o.png"
      },
      "webcast": "https://www.youtube.com/watch?v=0a_00nJ_Y88",
      "wikipedia": "https://en.wikipedia.org/wiki/DemoSat",
      "article": "https://www.space.com/2196-spacex-inaugural-falcon-1-702"
    },
    "crew": [],
    "payloads": ["5eb0e4b5b6c3bb0006eeb1e1"],
    "launchpad": "5e9e4502f5090995de566f86",
    "flight_number": 1,
    "upcoming": false
  }, {
    "id": "5eb87d46ffd86e000604b3882",
    "name": "aris",
    "date_local": "2006-03-24T22:30:00.000Z",
    "success": false,
    "details": "Engine failure at 33 seconds and loss of vehicle",
    "rocket": "5e9d0d95eda69955f709bf1c",
    "links": {
      "patch": {
        "small": "https://images2.imgbox.com/3c/0e/T8iJcSN3_o.png"
      },
      "webcast": "https://www.youtube.com/watch?v=0a_00nJ_Y88",
      "wikipedia": "https://en.wikipedia.org/wiki/DemoSat",
      "article": "https://www.space.com/2196-spacex-inaugural-falcon-1-702"
    },
    "crew": [],
    "payloads": ["5eb0e4b5b6c3bb0006eeb1e1"],
    "launchpad": "5e9e4502f5090995de566f86",
    "flight_number": 2,
    "upcoming": false
  }, {
    "id": "5eb87d46ffd86e000604b3883",
    "name": "alex",
    "date_local": "2006-03-24T22:30:00.000Z",
    "success": false,
    "details": "Engine failure at 33 seconds and loss of vehicle",
    "rocket": "5e9d0d95eda69955f709bf1c",
    "links": {
      "patch": {
        "small": "https://images2.imgbox.com/3c/0e/T8iJcSN3_o.png"
      },
      "webcast": "https://www.youtube.com/watch?v=0a_00nJ_Y88",
      "wikipedia": "https://en.wikipedia.org/wiki/DemoSat",
      "article": "https://www.space.com/2196-spacex-inaugural-falcon-1-702"
    },
    "crew": [],
    "payloads": ["5eb0e4b5b6c3bb0006eeb1e1"],
    "launchpad": "5e9e4502f5090995de566f86",
    "flight_number": 3,
    "upcoming": false
  }];

  const mockSpecificLaunch = {
    "id": "5eb87d46ffd86e000604b3880",
    "name": "FalconSat",
    "date_local": "2006-03-24T22:30:00.000Z",
    "success": true,
    "details": "Engine failure at 33 seconds and loss of vehicle.",
    "rocket": "5e9d0d95eda69955f709bf1c",
    "links": {
      "patch": { "small": "https://images2.imgbox.com/3c/0e/T8iJcSN3_o.png" },
      "webcast": "https://www.youtube.com/watch?v=0a_00nJ_Y88",
      "wikipedia": "https://en.wikipedia.org/wiki/DemoSat",
      "article": "https://www.space.com/2196-spacex-inaugural-falcon-1-702"
    },
    "flight_number": 1,
    "upcoming": false
  };
  const mockRocketDetail = { "name": "pyravlos" };

  React.useEffect(() => {
    async function getData() {
      try {
        const result = await fetchData();
        setLaunches(result)
      }
      catch (error) {
        // setError(1)
        setLaunches(mockLaunches)
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
          setSpecificLaunch(mockSpecificLaunch)
          // setError(1)
        }
      }
      async function getRocketData() {
        try {
          const result = await fetchRocketDetails(rocketId)
          setRocketDetails(result)
        }
        catch (error) {
          // setError(1)
          setRocketDetails(mockRocketDetail)

        }
      }
      getSpecificData()
      getRocketData()

    }
    return function () {
      setSpecificLaunch(null)
      setRocketDetails(null)
      setId(null)
      setRocketId(null)

      
    }
  }, [id, rocketId])

 const findIds = (id, rocketId)=> {
    setId(id)
    setRocketId(rocketId)
  }

  let homePage;
  let detailPage;

  if (error !== null) {
    homePage = <FailPage />
  }
  else if (launches === null) {
    homePage = <LoadingPage />
  }
  else {
    homePage = <MainPage
      data={launches}
      findIds={findIds}
    />
  }

  if (error !== null) {
    detailPage = <FailPage />
  }
  else if (specificLaunch === null || rocketDetails === null) {
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
