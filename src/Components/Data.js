import React from "react";



 export async  function fetchData (){

    const url = "https://api.spacexdata.com/v4/launches"
    const response = await fetch(url)

    if(!response.ok){
        throw new Error(`Respsone status: ${response.status}`)
    }
return await response.json()
}


