import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./component/login";
import Dashboard from "./component/dashboard";
import AddEmployee from "./component/addemproyee";
import EmployeeList from "./component/emproyelist";
import Navbar from "./component/navbar";
import SearchEmployee from "./component/empsearch";
import UpdateEmployee from "./component/empupdate";
import AttendanceForm from "./component/attendencemark";
import AttendanceList from "./component/attendencerecord";
import EmpRecord from "./component/recordbyemp";
import ApplyLeave from "./component/leaveapply";
import EmpLeaveRecord from "./component/empleave";
import LeaveList from "./component/leavelist";
import Applyjob from "./component/addjob";
import Joblist from "./component/joblisting";
import Jobapply from "./component/applyjob";
import Applicationlist from "./component/applicationlist";
import ProtecteXd from "./auth/varify";

function AppContent() {
  const location = useLocation();

  // Hide navbar only on login page
  const hideNavbar = location.pathname === "/login";

  return (
    <>
      {!hideNavbar && <Navbar />}
    
      <Routes>
         <Route path="/" element={<Login />} />   
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtecteXd><Dashboard /></ProtecteXd>    } />
        <Route path="/addemproyee" element={<ProtecteXd><AddEmployee /></ProtecteXd>} />
        <Route path="/emproyeelist" element={<ProtecteXd><EmployeeList /></ProtecteXd>} />
         <Route path="/searchemproyee" element={<ProtecteXd><SearchEmployee/></ProtecteXd> } />
         <Route path="/updateemproyee" element={<ProtecteXd><UpdateEmployee/></ProtecteXd> } />
         <Route path="/mark" element={<ProtecteXd><AttendanceForm/></ProtecteXd> } />
          <Route path="/record" element={<ProtecteXd><AttendanceList/></ProtecteXd> } />
          <Route path="/byemp" element={<ProtecteXd><EmpRecord/></ProtecteXd> } />
          <Route path="/applyleave" element={<ProtecteXd><ApplyLeave/></ProtecteXd> } />
          <Route path="/empleave" element={<ProtecteXd><EmpLeaveRecord/></ProtecteXd> } />
           <Route path="/leavelist" element={<ProtecteXd><LeaveList/></ProtecteXd> } />
           <Route path="/addjob" element={<ProtecteXd><Applyjob/></ProtecteXd>} />
            <Route path="/listjob" element={<ProtecteXd><Joblist/></ProtecteXd>} />
              <Route path="/jobapply" element={<ProtecteXd><Jobapply/></ProtecteXd>} />
               <Route path="/applicationlist" element={<ProtecteXd><Applicationlist/></ProtecteXd>} />
              



      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
