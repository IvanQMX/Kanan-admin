import React from "react";
import { Link } from "react-router-dom";

export default function ReportPreview({ _id, date, studentID, hasTestPhoto, sinceDay, symptoms }: ReportPreview) {
  return (
    <div>
      <div className="mt-5 md:mt-0 md:col-span-2 h-full">
        <div className="shadow sm:rounded-md sm:overflow-hidden h-full">
          <div className="px-4 py-5 bg-white space-y-3 sm:p-6 h-full">
            <p className="text-xl text-center font-semibold text-gray-900">Reporte de {studentID}</p>
            <div className="border-t border-gray-200" />
            <div className="space-y-0.5">
              <p className="text-base font-medium text-gray-900">Fecha de creación</p>
              <p className="text-sm text-gray-500">{date.toLocaleDateString()}</p>
            </div>
            <div className="space-y-0.5">
              <p className="text-base font-medium text-gray-900">¿Tiene prueba COVID?</p>
              <p className="text-sm text-gray-500">{hasTestPhoto ? "Sí" : "No"}</p>
            </div>
            <div className="space-y-0.5">
              <p className="text-base font-medium text-gray-900">Presentó síntomas desde</p>
              <p className="text-sm text-gray-500">{sinceDay.toLocaleDateString()}</p>
            </div>
            <div className="space-y-0.5">
              <p className="text-base font-medium text-gray-900">Síntomas</p>
              <p className="text-sm text-gray-500">{symptoms.join(", ")}</p>
            </div>
            <div className="text-center">
              <Link
                to={`/reporte?id=${_id}`}
                type="button"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Ver más
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
