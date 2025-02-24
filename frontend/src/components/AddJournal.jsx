import axios from 'axios';
import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

export default function AddJournal({setDataUpdated}) {

    const [journal, setJournal] = useState({
         title: "",
          country: "",
           from_date: "",
            to_date: "",
            map_link:"", 
            text: "" });

            const [alertMessage, setAlertMessage] = useState(null); 
            const [alertType, setAlertType] = useState("success"); 
            const navigate = useNavigate();
            const handleChange = (e) => {
                const { name, value } = e.target;
            
                // Ensure correct format for date fields
                if (name === "from_date" || name === "to_date") {
                    setJournal({ ...journal, [name]: value });
                } else {
                    setJournal({ ...journal, [name]: value });
                }
            };

    const handleSubmit=async (e)=>{
        try {
            //correct date fields
            const formattedForm = {
                ...journal,
                fromDate: journal.from_date ? new Date(journal.from_date).toISOString().split("T")[0] : "",
                toDate: journal.to_date ? new Date(journal.to_date).toISOString().split("T")[0] : "",
            };
            await axios.post(`http://localhost:8080/api/journal`, formattedForm, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            setDataUpdated(prev=>!prev)
            setAlertMessage("Journal added successfully!");
            setAlertType("success");
            setJournal({ title: "", country: "", from_date: "", to_date: "", text: "" });
            setTimeout(() => {
                setAlertMessage("")
                }, 1000);
            setTimeout(() => {
                navigate("/");
              }, 2000);
        }catch(e){
            console.log(e);
            setAlertMessage("Failed to add journal. Please try again.");
            setAlertType("danger");
        }
    }
    console.log(alertMessage);

  return (
    <>
    {alertMessage && (
  <div className={`alert alert-${alertType} alert-dismissible fade show alert-container`} role="alert">
    {alertMessage}
  </div>
)}
    <div className='form-container'>
      <form  onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" onChange={handleChange} required/>
        <br/>
        <label htmlFor="country">Country:</label>
        <input type='text' id="country" name="country" onChange={handleChange} required></input>
        <br/>
        <label htmlFor="map_link">Map Link:</label>
        <input type='text' id="map_link" name="map_link" onChange={handleChange} required/>
        <label htmlFor="from_date">From Date:</label>
        <input type="date" id="from_date" name="from_date" onChange={handleChange} required/>
        <br/>
        <label htmlFor="to_date">To Date:</label>
        <input type="date" id="to_date" name="to_date" onChange={handleChange} required/>
        <br/>
        <label htmlFor="text">Description:</label>
        <textarea id="text" name="text" onChange={handleChange} required></textarea>
        <br/>
        <input type="submit" value="Submit" />
      </form>
    </div>
    </>
  )
}
