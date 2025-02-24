import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {useNavigate,useLocation } from 'react-router-dom';


const initial={
    id:'',
    title:'',
    country:'',
    map_link:'',
    from_date:'',
    to_date:'',
    text:'',
}

export default function UpdateJournal({setDataUpdated}) {
    //used to get id from link parameter
    const location=useLocation();
    const [currId] = useState(location.state.id);
    //to store the form data andd updating in the form
    const [form,setForm]=useState(initial);
    //setting the alert 
    const [alertMessage, setAlertMessage] = useState(null); 
    const [alertType, setAlertType] = useState("success"); 
    const navigate = useNavigate();

    useEffect(()=>{
        //first getting the data to be updated
    const getJournal=async(id)=>{
    const response=await axios.get(`http://localhost:8080/api/journal/${id}`)
    setForm({
        ...response.data,
        from_date: response.data.fromDate ? response.data.fromDate : "", 
        to_date: response.data.toDate ? response.data.toDate : ""
    });
    console.log(response.data)
        }
        getJournal(currId)
},[currId])

const handleUpdate = async (e) => {
    //updating the changes
    e.preventDefault();
    try {
        //date handling
        const formattedForm = {
            ...form,
            from_date: form.from_date ? new Date(form.from_date).toISOString().split("T")[0] : "",
            to_date: form.to_date ? new Date(form.to_date).toISOString().split("T")[0] : "",
        };

        await axios.put(`http://localhost:8080/api/journal`, formattedForm, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        setDataUpdated(prev=>!prev)
        //setting alert meassages
        setAlertMessage("Journal updated successfully!");
        setAlertType("success");
        //setting form to blank
        setForm({id:"", title: "", country: "", map_link: "", from_date: "", to_date: "", text: "" });

        setTimeout(() => {
            setAlertMessage("")
        }, 1000);

        setTimeout(() => {
            navigate("/");
        }, 2000);
    }
    catch (e) {
        console.log(e);
        setAlertMessage("Failed to update journal. Please try again.");
        setAlertType("danger");
    }
};
//onChange handlling
const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "from_date" || name === "to_date") {
        setForm({ ...form, [name]: value });
    } else {
        setForm({ ...form, [name]: value });
    }
};

  return (
    <>
    {alertMessage && (
  <div className={`alert alert-${alertType} alert-dismissible fade show alert-container`} role="alert">
    {alertMessage}
  </div>
)}
    <div className='form-container'>
      <form  onSubmit={handleUpdate}>
        <label htmlFor="id">Id:</label>
        <input type="text" id="id" name="id" value={form.id} readOnly  />
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" value={form.title} name="title" onChange={handleChange} required/>
        <br/>
        <label htmlFor="country">Country:</label>
        <input type='text' id="country" name="country" value={form.country} onChange={handleChange} required></input>
        <br/>
        <label htmlFor="map_link">Map Link:</label>
        <input type='text' id="map_link" name="map_link" value={form.map_link} onChange={handleChange} required/>
        <br/>
        <label htmlFor="from_date">From Date:</label>
        <input type="date" id="from_date" name="from_date" value={form.from_date} onChange={handleChange} required/>
        <br/>
        <label htmlFor="to_date">To Date:</label>
        <input type="date" id="to_date" name="to_date" value={form.to_date} onChange={handleChange} required/>
        <br/>
        <label htmlFor="text">Description:</label>
        <textarea id="text" name="text" value={form.text} onChange={handleChange} required></textarea>
        <br/>
        <input type="submit" value="Submit"/>
      </form>
    </div>
    </>
  )
}
