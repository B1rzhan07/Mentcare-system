import Home from "./Pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import RegisterPatient from "./Pages/Registration/RegisterPatient";
import RegisterDoctor from "./Pages/Registration/RegisterDoctor";
import PersonalAdmin from "./Pages/Personal/PersonalAdmin/PersonalAdmin";
import PersonalPatient from "./Pages/Personal/PersonalPatient/PersonalPatient";
import PersonalDoctor from "./Pages/Personal/PersonalDoctor/PersonalDoctor";

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/registerPatient"
          exact
          element={<RegisterPatient />}
        />
        fwfw
        <Route
          path="/personalAdmin"
          exact
          element={<PersonalAdmin />}
        />
        <Route
          path="/registerDoctor"
          exact
          element={<RegisterDoctor />}
        />
        <Route path="/" exact element={<Home />} />
        <Route
          path="/Patient/:id"
          element={<PersonalPatient />}
        />
        <Route
          path="/Doctor/:id"
          element={<PersonalDoctor />}
        />
      </Routes>
    </div>
  );
}

export default App;
