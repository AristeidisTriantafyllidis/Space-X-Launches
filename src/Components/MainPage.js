import React from "react";

export default function MainPage(props) {

    console.log(props.data)
   const page = props.data?.map((data)=>{
    const [date,hour] =data?.date_local?.replace("Z", "").split("T")

    return(
    
    <div key={data.id}>
     < img src={data.links?.patch?.small?data.links?.patch?.small:"./placeholder.jpeg"}/>
        <p>{data.name}</p>
        <p>{date}</p>
        <p>{data.success?"Mision was successfull":"Mision Failed"}</p>
        <p>{data.flight_number}</p>
    </div>)


   
   })
    return (
        <div>
{page}
        </div>
    )

}