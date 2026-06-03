import React from "react";

export default function DetailPage(props){
    console.log(props.rocketDetails)

    
    const [date,hour] =props.data?.date_local?.replace("Z", "").split("T")
return(
    <div className="detailPage" >
        
        <button style={{marginTop : '15px'}}>Go back</button>
     < img  alt="Rocket"className="imgDetail" src={props.data.links?.patch?.small?props.data.links?.patch?.small:"./placeholder.jpeg"}/>
        <p>Rocket name: {props.rocketDetails.name}</p>
        <p>Mision name : {props.data.name}</p>
        <p >Date :{date.split('-').reverse().join('-')}</p>
        <p className={props.data.success?'success' :'failed'} style={{ marginRight: '60px' }}>{props.data.success?"Mision Successfull":"Mission Failed"}</p>
        <p> Flight number :  {props.data.flight_number}</p>
        <p>{props.data.details}</p>
        <p>Links aricle <a target=".blank" href={props.data?.links?.article}>{props.data?.links?.article}</a> </p>
  <p>Webcast: <a target=".blank" href={props.data?.links?.webcast}>{props.data?.links?.webcast}</a></p>

        <p>wikipedia<a target=".blank" href={props.data.links.wikipedia}>{props.data.links.wikipedia}</a></p>
    </div>
)
}
