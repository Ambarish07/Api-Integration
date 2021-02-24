import React from 'react'
import "./mobileview.css";
function Mobileview({data,setdata}) {
    const Card = (row) => {
        return(
            
            <div className = "card" key = {row.flight_number}>
                <div className="top-m" style = {{backgroundColor : "a4ebf3"}}>
                <div className = "img-card" style = {{backgroundColor : "a4ebf3"}}>
                    <img src = {row.links.mission_patch} width= "100" height = "100" />
                </div>
                <div className = "data" style = {{backgroundColor : "a4ebf3"}}>
                   Flight No : {row.flight_number}<br/>
                   Mission Name : {row.mission_name}<br/>
                   Launch Year :  {row.launch_year}<br/>
                   Rocket Name :  {row.rocket.rocket_name}<br/>
                </div>
                </div>
                <div className="details" style = {{backgroundColor : "a4ebf3"}}>
                    {row.details}
                </div>
            </div>
        )
    }
    
    return (
        <div className = "mobileview">
         
            {data.map(Card)}
            {!data.length && setdata([{
           flight_number : "no items" ,
          launch_year: "no items",
          links:{
            mission_patch:"no item"
          },
          details:"no items",
          mission_name:"no items",
          } ])}
        </div>
    )
}

export default Mobileview
