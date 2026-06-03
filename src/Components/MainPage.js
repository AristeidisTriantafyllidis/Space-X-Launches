import React from "react";

export default function MainPage(props) {
  
  
    
   
   const page = props.data?.map((data)=>{
    const [date,hour] =data?.date_local?.replace("Z", "").split("T")

    return(
    
    <div className="mainPage" key={data.id}>
        <button className="btnMain" onClick={()=>props.findIds(data.id,data.rocket)} >
     < img style={{ marginRight: '60px',marginLeft:'15px' }} className="imgMain" src={data.links?.patch?.small?data.links?.patch?.small:"./placeholder.jpeg"}/>
        <p style={{ marginRight: '60px' }}>{data.name}</p>
        <p style={{ marginRight: '60px' }}>{date.split('-').reverse().join('-')}</p>
        <p className={data.success?'success' :'failed'} style={{ marginRight: '60px' }}>{data.success?"Mision Successfull":"Mission Failed"}</p>
        <p style={{ marginRight: '60px' }}> Flight number :  {data.flight_number}</p>
          </button>
        <button>Star</button>
      
    </div>)


   
   })
    return (
        <div>
             <h2 className="headerMain" >All launches</h2>
            <div className="topPage">
           
           <p  style= {{ marginRight: '80px',marginLeft:'15px' }}>Badge</p>
           <p style= {{ marginRight: '100px' }}>Name</p>
           <p style= {{ marginRight: '120px' }}>Date</p>
           <p style ={{ marginRight: '100px' }}>Status</p>
           <p style ={{ marginRight: '15px' }}>Flight number</p>
           </div>
{page}
        </div>
    )

}