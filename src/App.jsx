
import "./App.css";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import AllShows from "./pages/AllShows";
import ShowDetails from "./pages/showDetails/ShowDetails";

function App() {
    return (
        <Routes>
            <Route path="/" element={<AllShows />} />
            <Route path="/show-details/:id" element={<ShowDetails />} />
        </Routes>
    );
}

export default App;
