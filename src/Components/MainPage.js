import React from "react";
import { useNavigate } from "react-router-dom";

export default function MainPage(props) {

  const [launchesStar, setLaunchesStar] = React.useState([])
  
    const navigate = useNavigate();
    
    const handleClick = (data)=> {
        props.findIds(data.id, data.rocket)
        navigate('/DetailPage')
    }

   const starHandle = (id)=> {
        if (launchesStar.includes(id)) {
            setLaunchesStar(launchesStar.filter(element => element !== id))
        }
        else {
            setLaunchesStar([...launchesStar, id])
        }
    }
   
    const isFavourite = (id) => {
        if (launchesStar.includes(id)) {
            return true
        }
        else {
            return false
        }
    }

    const page = props.data?.map((launch) => {

        const [date, hour] = launch?.date_local?.replace("Z", "").split("T")
        let text = "";
        let styletext = {};
        if (launch.upcoming) { text = " is Upcoming"; styletext = { color: 'grey', marginRight: '60px' }; }
        else if (launch.success) { text = " was succesfull"; styletext = { color: 'green', marginRight: '60px' }; }
        else if (!launch.success) { text = " Failed"; styletext = { color: 'red', marginRight: '60px' } }

        let favStyle = {}
        if (isFavourite(launch.id)) {
            favStyle = { border: '6px solid gold' }
        }
        else {
            favStyle = { border: '2px solid white' }
        }

        return (

            <div className="displayInfo" key={launch.id}>

                <button style={favStyle} className="btnMain" onClick={() => { handleClick(launch) }} >
                    < img alt="the badge of mission" style={{ marginRight: '60px', marginLeft: '15px' }} className="imgMain" src={launch.links?.patch?.small ? launch.links?.patch?.small : "./placeholder.jpeg"} />
                    <p style={{ marginRight: '60px' }}>{launch.name}</p>
                    <p style={{ marginRight: '60px' }}>{date.split('-').reverse().join('-')}</p>
                    <p className="mission" style={styletext}> Mission{text}</p>
                    <p style={{ marginRight: '60px' }}> Flight number :  {launch.flight_number}</p>
                </button>
                <button className="starbtn" onClick={() => starHandle(launch.id)}><img src="star.png" alt="Star" /></button>
            </div>)
    })

    return (
        <div className="mainPage">
            <h2 className="headerMain" >All launches</h2>
            <div className="topPage">

                <p style={{ marginRight: '80px', marginLeft: '15px' }}>Badge</p>
                <p style={{ marginRight: '100px' }}>Name</p>
                <p style={{ marginRight: '120px' }}>Date</p>
                <p style={{ marginRight: '100px' }}>Status</p>
                <p style={{ marginRight: '15px' }}>Flight number</p>
            </div>
            {page}
        </div>
    )

}