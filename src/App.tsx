import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Layout from "./Layout";
import City from "./Pages/City";
import Weather from "./Pages/Weather";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<City />} />
          <Route path="/weather/:city" element={<Weather />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
