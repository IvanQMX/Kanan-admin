import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import ReportCase from "./ActiveReports/AllReports";
import Report from "./Report";

function App() {
  const [session, setSession] = useState(sessionStorage.getItem("studentID"));

  useEffect(() => {
    const key = "studentID";
    if (session) {
      sessionStorage.setItem(key, session);
    } else {
      sessionStorage.removeItem(key);
    }
  }, [session]);

  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reporte" element={<Report />} />
          <Route path="reportes/*" element={<ReportCase />} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
