import React, { useEffect,useState } from "react";
import {ToggleButton} from "@material-ui/lab";
import { TextField } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import './App.css';

function App() {
  const [url,seturl] = useState("https://api.spaceXdata.com/v3/launches?limit=100");
  const [data, setdata] = useState([]);
  const [launchYr, setlaunchYr] = useState(); 
const [successLaunch, setsuccessLaunch] = useState(false);
const [successLand, setsuccessLand] = useState(false);

  const createDiv = (row) => {
    return(
      <TableRow key = {row.flight_number}>
        <TableCell>{row.flight_number}</TableCell>
        <TableCell>{row.launch_year}</TableCell>
        <TableCell>{row.mission_name}</TableCell>
        <TableCell>{row.details}</TableCell>
      </TableRow>
    );
  }
useEffect(() => {
  // console.log(url);
  fetch(url).then(data => data.json())
  .then((data) => {
    console.log(data);
    setdata(data);
  })
}, [url]);

  const formControlYear = (e) => {
    e.preventDefault();
    // console.log(launchYr);

    if(launchYr){ 
    // console.log(launchYr);
      seturl(`https://api.spacexdata.com/v3/launches?limit=100&launch_success=true&land_success=true&launch_year=${launchYr}`);
    }
    else{
      seturl("https://api.spaceXdata.com/v3/launches?limit=100");
    }
  }

useEffect(() => {
  if(successLand){
    // setsuccessLaunch(false);
    seturl("https://api.spacexdata.com/v3/launches?limit=100&launch_success=true&land_success=true")}

  else if(successLaunch){
    seturl("https://api.spacexdata.com/v3/launches?limit=100&launch_success=true");
  }

  else if(!successLaunch && !successLand){seturl('https://api.spacexdata.com/v3/launches?limit=100')}
}, [successLaunch,successLand])

  return (
    <div className="App">
      <div className = "top">
     <form onSubmit = {formControlYear}> 
        <TextField className = "year" id="outlined-basic" label="Launch Year" variant="outlined"  onChange = {(e)=> {setlaunchYr(e.target.value);}} />
     </form>
    <ToggleButton value="Success Land" selected={successLand} onChange={() => {setsuccessLand(!successLand)}} > Success Land </ToggleButton> 
   <ToggleButton value="Success Launch" selected={successLaunch} onChange={() => {setsuccessLaunch(!successLaunch)}} > Success Launch </ToggleButton> 
     </div>
     <Table>
       <TableHead>
       <TableRow>
         <TableCell>FLIGHT NO</TableCell> 
         <TableCell>LAUNCH YEAR</TableCell>
         <TableCell>MISSION NAME</TableCell>
         <TableCell>MISSION DETAILS</TableCell>

        </TableRow>
        </TableHead>
        <TableBody>
         {data.map(createDiv)}
         {!data.length && setdata([{flight_number : "no items" , launch_year: "no items",rocket:{rocket_name: "no items"},launch_date_utc: "no items"}])}
        </TableBody>
      </Table>
    </div>
  );
}

export default App;
