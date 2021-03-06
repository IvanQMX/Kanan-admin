import React, { Fragment, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Lesson from "./Lesson";

const displaySuccessMessage = (message: string) => {
  Swal.fire({
    title: message,
    icon: "success",
    confirmButtonText: "Aceptar",
    allowOutsideClick: false,
    allowEscapeKey: false,
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "/reportes";
    }
  });
};

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
        displayErrorMessage("No se pudo cargar el reporte. Int??ntelo m??s tarde");
        console.error(error);
        setReportReady(false);
      });
  }, []);

  const approveReport = () => {
    displayLoadingMessage("Cargando");
    axios
      .put(
        "https://kanan.azurewebsites.net/api/ApproveReport?code=G6YfKS0kRKLvYUfSlpaBTo6NVmDc3emsvCMMH9M1DJOnAzFuOf8tFg==",
        {
          id,
          studentID: report?.studentID,
        }
      )
      .then((response) => {
        Swal.close();
        displaySuccessMessage("Reporte aprobado y notificado");
      })
      .catch((error) => {
        displayErrorMessage("No se pudo aprobar y notificar el reporte. Int??ntelo m??s tarde");
        console.error(error);
      });
  };

  const removeReport = () => {
    displayLoadingMessage("Cargando");
    axios
      .delete(
        "https://kanan.azurewebsites.net/api/DeleteReport?code=TEiPWLD7rE4YJd9nJxqpxLcQZAo7-aBn2UxGqeCToIYBAzFuYNEZpQ==",
        {
          data: {
            id,
          },
        }
      )
      .then((response) => {
        Swal.close();
        displaySuccessMessage("Reporte descartado y eliminado");
      })
      .catch((error) => {
        displayErrorMessage("No se pudo descartar y eliminar el reporte. Int??ntelo m??s tarde");
        console.error(error);
      });
  };

  if (reportReady === undefined) {
    return <Fragment />;
  }
  if (!reportReady) {
    return <Fragment />;
  }
  return (
    <div className="bg-white border border-gray-200 overflow-hidden sm:rounded-lg mx-4 md:mx-8 my-4">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Reporte COVID</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Detalles del reporte e informaci??n del estudiante
        </p>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Fecha de creaci??n del reporte</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {report?.date.toLocaleDateString()}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Nombre completo</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{report?.fullName}</dd>
          </div>
          <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">N??mero de boleta</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{report?.studentID}</dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Correo electr??nico</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{report?.email}</dd>
          </div>
          <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Tel??fono</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{report?.telephone}</dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">D??a desde que present?? s??ntomas</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {report?.sinceDay.toLocaleDateString()}
            </dd>
          </div>
          <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
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
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">S??ntomas</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {report?.symptoms.join(", ")}
            </dd>
          </div>
          {report?.attendedSchool ? (
            <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Clases a las que asisti??</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 mb-4">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
                  {report.lessonsAttended.map(({ lesson, days }, index) => (
                    <Lesson key={index} lesson={lesson} days={days} />
                  ))}
                </div>
              </dd>
            </div>
          ) : (
            <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Asisti?? a clases</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">No</dd>
            </div>
          )}
        </dl>
      </div>
      <div className="flex px-4 py-5 sm:px-6 justify-center">
        <button
          className="text-white font-medium rounded bg-green-600 hover:bg-green-700 px-4 py-2 mx-2 md:mx-4 lg:mx-6"
          onClick={approveReport}
        >
          Aprobar y notificar
        </button>
        <button
          className="text-white font-medium rounded bg-red-600 hover:bg-red-700 px-4 py-2 mx-2 md:mx-4 lg:mx-6"
          onClick={removeReport}
        >
          Descartar y eliminar
        </button>
      </div>
    </div>
  );
}
