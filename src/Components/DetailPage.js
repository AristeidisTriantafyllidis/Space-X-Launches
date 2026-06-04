import React from "react";
import { Link,useNavigate } from "react-router-dom";

export default function DetailPage(props){
    const navigate = useNavigate();
  
   const [date,hour] =props.data?.date_local?.replace("Z", "").split("T") ||[" "," "]
    let text="";
        let styletext ={};
if (props.data?.upcoming){text =" is Upcoming"; styletext = {color:'grey',marginRight:'60px'}; }
else if(props.data?.success){text=" was succesfull"; styletext={color:'green',marginRight:'60px'};}
else if(!props.data?.success){text= "Failed"; styletext={color:'red',marginRight:'60px'}}
    
   

return(
    <div className="detailPage" >

        
        <button style={{marginTop : '15px'}} onClick={()=>navigate('/')}>Go back</button>
     < img  alt="Rocket"className="imgDetail" src={props.data?.links?.patch?.small?props.data.links?.patch?.small:"./placeholder.jpeg"}/>
        <p>Rocket name: {props.rocketDetails?.name}</p>
        <p>Mision name : {props.data?.name}</p>
        <p >Date :{date.split('-').reverse().join('-')}</p>
        <p style={styletext}>Mission {text}</p>
        <p> Flight number :  {props.data?.flight_number}</p>
        <p>{props.data?.details}</p>
        <p>Links aricle <a target=".blank" href={props.data?.links?.article}>{props.data?.links?.article}</a> </p>
  <p>Webcast: <a target=".blank" href={props.data?.links?.webcast}>{props.data?.links?.webcast}</a></p>

        <p>wikipedia<a target=".blank" href={props.data?.links?.wikipedia}>{props.data?.links?.wikipedia}</a></p>
    </div>
)
}
