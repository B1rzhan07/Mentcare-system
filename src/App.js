import Home from "./Pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import RegisterPatient from "./Pages/Registration/RegisterPatient";
import RegisterDoctor from "./Pages/Registration/RegisterDoctor";
import PersonalAdmin from "./Pages/Personal/PersonalAdmin/PersonalAdmin";
import PersonalPatient from "./Pages/Personal/PersonalPatient/PersonalPatient";
import PersonalDoctor from "./Pages/Personal/PersonalDoctor/PersonalDoctor";
import Department from "./Pages/Departments/Department";
import Services from "./Pages/Services/Services";
import Messenger from "./Pages/Messanger/Messenger";
import DoctorId from "./Pages/Doctors/DoctorId";
import History from "./Pages/History/History";
import HistoryDoctor from "./Pages/History/HistoryDoctor";

function App() {
  return (
    <div className="wrapper-main">
      <Routes>
        <Route
          path="/registerPatient"
          exact
          element={<RegisterPatient />}
        />{" "}
        <Route
          path="/personalAdmin"
          exact
          element={<PersonalAdmin />}
        />{" "}
        <Route
          path="/registerDoctor"
          exact
          element={<RegisterDoctor />}
        />{" "}
        <Route path="/" exact element={<Home />} />{" "}
        <Route
          path="/Patient/:id"
          element={<PersonalPatient />}
        />{" "}
        <Route
          path="/Department/:id"
          element={<Department />}
        />{" "}
        <Route
          path="/Doctor/:id"
          element={<PersonalDoctor />}
        />{" "}
        <Route
          path="/services/:id"
          element={<Services />}
        />{" "}
        <Route path="/messeges" element={<Messenger />} />{" "}
        <Route path="/doctors/:id" element={<DoctorId />} />{" "}
        <Route path="/history" element={<History />} />{" "}
        <Route
          path="/appoinments"
          element={<HistoryDoctor />}
        />{" "}
      </Routes>{" "}
    </div>
  );
}

export default App;
