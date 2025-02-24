import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import Entry from "./components/Entry";
import UpdateJournal from "./components/UpdateJournal";
import AddJournal from "./components/AddJournal";

function App() {
  const [data, setData] = useState([]);
const [dataUpdated, setDataUpdated] = useState(false); // ✅ Tracks updates
const fetchData = async () => {
    try {
        const response = await axios.get("http://localhost:8080/api/journal");
        setData(response.data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};
useEffect(() => {
    fetchData();
}, [dataUpdated]);  // ✅ Fetch data whenever `dataUpdated` changes

  return (
    <Router>
      <Header />
      <Routes>
        {/* Home Page (Journal Entries) */}
        <Route path="/" element={<Entry data={data} setDataUpdated={setDataUpdated} />} />
        {/* Update Journal Page */}
        <Route path={`/update`} element={<UpdateJournal dataUpdated={setDataUpdated} />} />
        {/* Add Journal Page */}
        <Route path="/add"  element={<AddJournal setDataUpdated={setDataUpdated} />} />
      </Routes>
    </Router>
  );
}

export default App;
