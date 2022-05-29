import React, { Fragment, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PaperClipIcon } from "@heroicons/react/solid";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

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

const base64ToFile = (dataurl: string) => {
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  const extension = mime.split("/")[1];
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], `test.${extension}`, { type: mime });
};

export default function Report() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [report, setReport] = useState<DetailedReport | null>(null);
  const [reportReady, setReportReady] = useState<boolean | undefined>(undefined);
  const [testPhotoURL, setTestPhotoURL] = useState<string | undefined>(undefined);
  if (id === null) {
    window.location.href = "/reportes";
  }

  useEffect(() => {
    displayLoadingMessage("Cargando");
    axios
      .post(
        "https://kanan.azurewebsites.net/api/GetReport?code=rmL7ba_gpcduqplYN302WZM6lmLSlVfYqhHwCpQiHkinAzFufHvLDw==",
        {
          id,
        }
      )
      .then((response) => {
        Swal.close();
        if (response.data === "Not found") {
          displayErrorMessage("No se pudo cargar el reporte");
          setReportReady(false);
        } else {
          response.data.date = new Date(response.data.date);
          response.data.sinceDay = new Date(response.data.sinceDay);
          if (response.data.hasTestPhoto) {
            response.data.testPhoto = base64ToFile(response.data.testPhoto);
            setTestPhotoURL(URL.createObjectURL(response.data.testPhoto));
          }
          setReport(response.data);
          setReportReady(true);
        }
      })
      .catch((error) => {
        displayErrorMessage("No se pudo cargar el reporte. Inténtelo más tarde");
        console.error(error);
        setReportReady(false);
      });
  }, []);

  if (reportReady === undefined) {
    return <Fragment />;
  }
  if (!reportReady) {
    return <Fragment />;
  }
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg mx-4 md:mx-8 my-4">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Reporte COVID</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Detalles del reporte e información del estudiante
        </p>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Fecha de creación del reporte</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {report?.date.toLocaleDateString()}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Nombre completo</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{report?.fullName}</dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Número de boleta</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{report?.studentID}</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Correo electrónico</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{report?.email}</dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Teléfono</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{report?.telephone}</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Día desde que presentó síntomas</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {report?.sinceDay.toLocaleDateString()}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Prueba COVID</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {report?.hasTestPhoto ? (
                <a href={testPhotoURL!} target="_blank" rel="noopener noreferrer">
                  <img
                    src={testPhotoURL}
                    className="w-40 sm:w-auto sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg"
                    alt="Foto de prueba"
                  />
                </a>
              ) : (
                "No"
              )}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Síntomas</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {report?.symptoms.join(", ")}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Asistió a clases</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {report?.attendedSchool ? "Sí" : "No"}
            </dd>
          </div>
          {/* <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Attachments</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <ul role="list" className="border border-gray-200 rounded-md divide-y divide-gray-200">
                <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                  <div className="w-0 flex-1 flex items-center">
                    <PaperClipIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                    <span className="ml-2 flex-1 w-0 truncate">resume_back_end_developer.pdf</span>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Download
                    </a>
                  </div>
                </li>
                <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                  <div className="w-0 flex-1 flex items-center">
                    <PaperClipIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                    <span className="ml-2 flex-1 w-0 truncate">coverletter_back_end_developer.pdf</span>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Download
                    </a>
                  </div>
                </li>
              </ul>
            </dd>
          </div> */}
        </dl>
      </div>
    </div>
  );
}
