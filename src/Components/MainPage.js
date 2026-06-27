import React from "react";
import { useNavigate } from "react-router";
import Dropdown from "react-bootstrap/Dropdown";

export default function MainPage(props) {
  const [launchesStar, setLaunchesStar] = React.useState(() => {
    const savedIds = localStorage.getItem("id");
    return savedIds ? JSON.parse(savedIds) : [];
  });
  const [diplayLaunches, setDisplayLaunches] = React.useState([]);
  const [styleStatusFilter, setStyleStatusFilter] = React.useState("All");
  const [styleSortFilter, setStyleSortFilter] = React.useState("NoSort");
  const navigate = useNavigate();

  React.useEffect(() => {
    if (props.data) {
      setDisplayLaunches(props.data);
    }
  }, [props.data]);

  React.useEffect(() => {
    localStorage.setItem("id", JSON.stringify(launchesStar));
  }, [launchesStar]);

  const handleClick = (data) => {
    props.findIds(data.id, data.rocket);
    navigate("/DetailPage");
  };

  const starHandle = (id) => {
    if (launchesStar.includes(id)) {
      setLaunchesStar(launchesStar.filter((existingIds) => existingIds !== id));
    } else {
      setLaunchesStar([...launchesStar, id]);
    }
  };

  const isFavourite = (id) => {
    if (launchesStar.includes(id)) {
      return true;
    } else {
      return false;
    }
  };

  const filterLaunces = (filter) => {
    setStyleStatusFilter(filter);
    const filteredLaunches = props.data.filter((launch) => {
      if (filter === "All") {
        return true;
      } else if (filter === "Failed" && !launch.success) {
        return true;
      } else if (filter === "Success" && launch.success) {
        return true;
      }
      return false;
    });
    setDisplayLaunches(filteredLaunches);
  };
  const filterByName = (value) => {
    const filteredLaunch = props.data.filter((launch) => {
      if (value.length <= launch.name.length) {
        for (let i = 0; i < value.length; i++) {
          if (value[i].toUpperCase() !== launch.name[i].toUpperCase()) {
            return false;
          }
        }
        return true;
      }
      return false;
    });
    setDisplayLaunches(filteredLaunch);
  };

  const sortLaunches = (order) => {
    setStyleSortFilter(order);
    const sortedLaunches = [...diplayLaunches];
    if (order === "asc") {
      sortedLaunches.sort(
        (a, b) => new Date(a.date_local) - new Date(b.date_local),
      );
    } else if (order === "desc") {
      sortedLaunches.sort(
        (a, b) => new Date(b.date_local) - new Date(a.date_local),
      );
    }
    setDisplayLaunches(sortedLaunches);
  };

  let page;
  if (diplayLaunches.length === 0) {
    page = <h1>No launches found</h1>;
  } else {
    page = diplayLaunches.map((launch) => {
      const date = launch?.date_local?.replace("Z", "").split("T");
      let text = "";
      let styletext = {};
      if (launch.upcoming) {
        text = " is Upcoming";
        styletext = { color: "grey", marginRight: "60px" };
      } else if (launch.success) {
        text = " was succesfull";
        styletext = { color: "green", marginRight: "60px" };
      } else if (!launch.success) {
        text = " Failed";
        styletext = { color: "red", marginRight: "60px" };
      }

      let favStyle = {};
      if (isFavourite(launch.id)) {
        favStyle = { border: "6px solid gold" };
      } else {
        favStyle = { border: "2px solid white" };
      }

      return (
        <div className="displayInfo" key={launch.id}>
          <button
            style={favStyle}
            className="btnMain"
            onClick={() => {
              handleClick(launch);
            }}
          >
            <img
              alt="the badge of mission"
              style={{ marginRight: "60px", marginLeft: "15px" }}
              className="imgMain"
              src={
                launch.links?.patch?.small
                  ? launch.links?.patch?.small
                  : "./placeholder.jpeg"
              }
            />
            <p style={{ marginRight: "60px" }}>{launch.name}</p>
            <p style={{ marginRight: "60px" }}>
              {date[0].split("-").reverse().join("-")}
            </p>
            <p className="mission" style={styletext}>
              {" "}
              Mission{text}
            </p>
            <p style={{ marginRight: "60px" }}>
              {" "}
              Flight number : {launch.flight_number}
            </p>
          </button>
          <button
            aria-label="Button that adds a launch in Favorite"
            className="starbtn"
            onClick={() => starHandle(launch.id)}
          >
            <img src="star.png" alt="Star" />
          </button>
        </div>
      );
    });
  }

  return (
    <div>
      <div className="DropDownForStatus">
        <Dropdown data-bs-theme="dark">
          <Dropdown.Toggle
            variant="secondary"
            id="dropdown-basic"
            style={{ marginTop: "30px" }}
          >
            Filter By Status
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => filterLaunces("Success")}
              style={
                styleStatusFilter === "Success"
                  ? { marginRight: "10px", color: "red" }
                  : { marginRight: "10px" }
              }
            >
              Succesfull
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => filterLaunces("Failed")}
              style={
                styleStatusFilter === "Failed"
                  ? { marginRight: "10px", color: "red" }
                  : { marginRight: "10px" }
              }
            >
              Failed
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => filterLaunces("UpComing")}
              style={
                styleStatusFilter === "UpComing"
                  ? { marginRight: "10px", color: "red" }
                  : { marginRight: "10px" }
              }
            >
              Upcoming
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => filterLaunces("All")}
              style={
                styleStatusFilter === "All"
                  ? { marginRight: "10px", color: "red" }
                  : { marginRight: "10px" }
              }
            >
              No filter
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="DropDownForSorting">
        <Dropdown data-bs-theme="dark" style={{ marginTop: "30px" }}>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Sort By Year
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              style={
                styleSortFilter === "asc"
                  ? { marginRight: "10px", color: "red" }
                  : { marginRight: "10px" }
              }
              onClick={() => sortLaunches("asc")}
            >
              Ascending
            </Dropdown.Item>
            <Dropdown.Item
              style={
                styleSortFilter === "desc"
                  ? { marginRight: "10px", color: "red" }
                  : { marginRight: "10px" }
              }
              onClick={() => sortLaunches("desc")}
            >
              Descending
            </Dropdown.Item>
            <Dropdown.Item
              style={
                styleSortFilter === "NoSort"
                  ? { marginRight: "10px", color: "red" }
                  : { marginRight: "10px" }
              }
              onClick={() => sortLaunches(null)}
            >
              No Sort
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="mainPage">
        <h2 className="headerMain">All launches</h2>
        <input
          type="text"
          placeholder="Search launch by name"
          onChange={(e) => filterByName(e.target.value)}
        ></input>
        <div className="topPage">
          <p style={{ marginRight: "80px", marginLeft: "15px" }}>Badge</p>
          <p style={{ marginRight: "100px" }}>Name</p>
          <p style={{ marginRight: "120px" }}>Date</p>
          <p style={{ marginRight: "100px" }}>Status</p>
          <p style={{ marginRight: "15px" }}>Flight number</p>
        </div>
        {page}
      </div>
    </div>
  );
}
