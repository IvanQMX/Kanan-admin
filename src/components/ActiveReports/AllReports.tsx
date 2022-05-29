import React, { Fragment, useEffect, useState } from "react";
import "../../css/ReportCase.css";
import ReportPreview from "./ReportPreview";
import axios from "axios";
import Swal from "sweetalert2";

const displayErrorMessage = (message: string) => {
  Swal.fire({
    title: message,
    icon: "error",
    confirmButtonText: "Aceptar",
  });
};

const displayLoadingMessage = (message: string) => {
  Swal.fire({
    title: message,
    showConfirmButton: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};

export default function ReportCase() {
  //* States
  const [reports, setReports] = useState<Report[]>([]);
  const [reportsReady, setReportsReady] = useState<undefined | boolean>(undefined);

  useEffect(() => {
    displayLoadingMessage("Cargando");
    axios
      .get(
        "https://kanan.azurewebsites.net/api/GetReports?code=jHVrbwGlXQRnabBW51wfvt240ISqNKVC7DgvTTRZgodEAzFuOtBQZg=="
      )
      .then((response) => {
        Swal.close();
        if (response.data === "Not found") {
          displayErrorMessage("No se pudieron cargar los reportes");
          setReportsReady(false);
        } else {
          response.data.forEach((report) => {
            report.date = new Date(report.date);
            report.sinceDay = new Date(report.sinceDay);
          });
          setReports(response.data);
          setReportsReady(true);
        }
      })
      .catch((error) => {
        displayErrorMessage("No se pudieron cargar los reportes. Inténtelo más tarde");
        console.error(error);
        setReportsReady(false);
      });
  }, []);

  if (reportsReady === undefined) {
    return <Fragment />;
  } else if (reportsReady) {
    return (
      <div className="px-5 bg-gray-100 flex-auto">
        <h2 className="mt-6 text-3xl font-semibold text-center mb-3">Reportes activos</h2>
        <h2 className="mt-3 text-xl text-center mb-3">Reportes de alumnos infectados por COVID-19</h2>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          {reports
            .sort((a, b) => b.date.getTime() - a.date.getTime())
            .map(({ _id, date, studentID, hasTestPhoto, sinceDay, symptoms }, index) => (
              <ReportPreview
                key={index}
                _id={_id}
                date={date}
                studentID={studentID}
                hasTestPhoto={hasTestPhoto}
                sinceDay={sinceDay}
                symptoms={symptoms}
              />
            ))}
        </div>
        <div className="py-5" />
      </div>
    );
  } else {
    return (
      <div className="px-5 bg-gray-100 flex-auto">
        <h2 className="py-8 text-2xl font-semibold text-center">No se pudieron obtener los reportes</h2>
      </div>
    );
  }
}
