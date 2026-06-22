import React from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";

export default function MainPage(props) {
  const [launchesStar, setLaunchesStar] = React.useState([]);
  const [filter, setFilter] = React.useState("All");
  const [order, setOrder] = React.useState(null);
  const [filterName, setFilterName] = React.useState("");

  const navigate = useNavigate();

  const handleClick = (data) => {
    props.findIds(data.id, data.rocket);
    navigate("/DetailPage");
  };

  const starHandle = (id) => {
    if (launchesStar.includes(id)) {
      setLaunchesStar(launchesStar.filter((element) => element !== id));
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

  let filterLaunches = props.data?.filter((launch) => {
    if (filter === "All") {
      return true;
    } else if (filter === "Failed" && !launch.success) {
      return true;
    } else if (filter === "Success" && launch.success) {
      return true;
    }
  });

  if (filterName.length > 0) {
    filterLaunches = filterLaunches.filter((launch) => {
      if (filterName.length <= launch.name.length) {
        for (let i = 0; i < filterName.length; i++) {
          if (filterName[i].toUpperCase() !== launch.name[i].toUpperCase()) {
            return false;
          }
        }
        return true;
      }
    });
  }

  const sortedLaunches = [...filterLaunches];

  if (order === "asc") {
    sortedLaunches.sort(
      (a, b) => new Date(a.date_local) - new Date(b.date_local),
    );
  } else if (order === "desc") {
    sortedLaunches.sort(
      (a, b) => new Date(b.date_local) - new Date(a.date_local),
    );
  }

  const page = sortedLaunches.map((launch) => {
    const [date, hour] = launch?.date_local?.replace("Z", "").split("T");
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
            {date.split("-").reverse().join("-")}
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
  const filterByName = (value) => {
    setFilterName(value);
  };
  return (
    <div>
      <div className="DropDownForStatus">
        <Dropdown>
          <Dropdown.Toggle
            variant="success"
            id="dropdown-basic"
            style={{ marginTop: "30px" }}
          >
            Filter By Status
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              style={{ marginRight: "10px", color: "white" }}
              onClick={() => setFilter("Success")}
            >
              Succesfull
            </Dropdown.Item>
            <Dropdown.Item
              style={{ marginRight: "10px", color: "white" }}
              onClick={() => setFilter("Failed")}
            >
              Failed
            </Dropdown.Item>
            <Dropdown.Item
              style={{ marginRight: "10px", color: "white" }}
              onClick={() => setFilter("UpComing")}
            >
              Upcoming
            </Dropdown.Item>
            <Dropdown.Item
              style={{ marginRight: "10px", color: "white" }}
              onClick={() => setFilter("All")}
            >
              No filter
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="DropDownForSorting">
        <Dropdown style={{ marginTop: "30px", color: "white" }}>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Sort By Year
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              style={{ marginRight: "10px", color: "white" }}
              onClick={() => setOrder("asc")}
            >
              Ascending
            </Dropdown.Item>
            <Dropdown.Item
              style={{ marginRight: "10px", color: "white" }}
              onClick={() => setOrder("desc")}
            >
              Descending
            </Dropdown.Item>
            <Dropdown.Item
              style={{ marginRight: "10px", color: "white" }}
              onClick={() => setOrder(null)}
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
