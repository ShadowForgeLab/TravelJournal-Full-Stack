import React,{useEffect, useState} from 'react';
import Marker from '../images/marker.png';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Entry(props) {
  const navigate=useNavigate()
  function formatDateRange(fromDate, toDate) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    
    const startDate = new Date(fromDate).toLocaleDateString('en-US', options);
    const endDate = new Date(toDate).toLocaleDateString('en-US', options);

    return `${startDate} - ${endDate}`;
}
const [alertMessage, setAlertMessage] = useState(null); 
const [alertType, setAlertType] = useState("success"); 


//to handle delete
  const handleDelete=async (id)=>{
    console.log(id);
    try{
      //gets the api request
      await axios.delete(`http://localhost:8080/api/journal/${id}`);
      //handles updated data
      props.setDataUpdated(prev=>!prev)
      setAlertMessage("Journal Deleted Successfully!");
      setAlertType("danger");
      setTimeout(() => {
        setAlertMessage("");
    }, 2000);

    }
    catch(e){
      console.log(e)
      setAlertMessage("Failed to delete journal. Please try again.");
      setAlertType("danger");
    }
  }


  const handleUpdate=(id)=>{
    navigate("/update",{state:{id}})
  }

  return (
    <>
    {alertMessage && (
  <div className={`alert alert-${alertType} alert-dismissible fade show alert-container`} role="alert">
    {alertMessage}
  </div>
)}
      {props.data.map((entry, index) => (
        <div className="card mb-3 m-3" key={index}>
          <div className="row g-0">
            <div className="col-md-8">
              <div className="card-body">
                <div className="location">
                  <img src={Marker} alt="Marker" />
                  <p>{entry.country}</p>
                  <a href={entry.mapLink} target="_blank" rel="noreferrer">
                    View on Google Maps
                  </a>
                </div>
                <h2 className="card-title">{entry.title}</h2>
                <p className="trip-dates">{formatDateRange(entry.fromDate, entry.toDate)}</p>
                <p className="card-text">{entry.text}</p>

                <button onClick={()=>handleUpdate(entry.id)} className="btn btn-warning m-2">
                  Update
                </button>
                <button className="btn btn-danger m-2" onClick={() => handleDelete(entry.id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
