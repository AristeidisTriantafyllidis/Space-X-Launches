import React from "react";
import { useNavigate } from "react-router-dom";



export default function MainPage(props) {

    const [star, setStar] = React.useState(false)
    const navigate = useNavigate();
    function handleClick(data) {
        props.findIds(data.id, data.rocket)
        navigate('/DetailPage')
    }
    const mock=[{id:1},{id:2}]
    const star={st}
const [uniqueLaunch,setUniqueLaunch]=React.useState(mock)
console.log(uniqueLaunch)

//   {"id": "5eb87d46ffd86e000604b388",
//   "name": "FalconSat"}
//   {"id": "5eb87d46ffd86e000604b388",
//   "name": "aris"}
    function starHandle() {
        setStar(!star)
    }

    const backgroundStyle = star ? { backgroundColor: 'gold' } : {};

    const page = props.data?.map((data) => {

        const [date, hour] = data?.date_local?.replace("Z", "").split("T")
        let text = "";
        let styletext = {};
        if (data.upcoming) { text = " is Upcoming"; styletext = { color: 'grey', marginRight: '60px' }; }
        else if (data.success) { text = " was succesfull"; styletext = { color: 'green', marginRight: '60px' }; }
        else if (!data.success) { text = "Failed"; styletext = { color: 'red', marginRight: '60px' } }

        return (

            <div className="displayInfo" key={data.id} style={backgroundStyle}>

                <button className="btnMain" onClick={() => { handleClick(data) }} >
                    < img style={{ marginRight: '60px', marginLeft: '15px' }} className="imgMain" src={data.links?.patch?.small ? data.links?.patch?.small : "./placeholder.jpeg"} />
                    <p style={{ marginRight: '60px' }}>{data.name}</p>
                    <p style={{ marginRight: '60px' }}>{date.split('-').reverse().join('-')}</p>
                    <p className="mission" style={styletext}> Mission{text}</p>
                    <p style={{ marginRight: '60px' }}> Flight number :  {data.flight_number}</p>
                </button>
                <button className="starbtn" onClick={starHandle}><img src="star.png" /></button>
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