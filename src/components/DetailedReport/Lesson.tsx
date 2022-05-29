import React from "react";

export default function Lesson({ lesson, days }: Lesson) {
  return (
    <div>
      <div className="mt-5 md:mt-0 md:col-span-2 h-full">
        <div className="shadow sm:rounded-md sm:overflow-hidden h-full">
          <div className="px-3 py-4 bg-white space-y-1 sm:p-6 h-full">
            <div className="space-y-0.5">
              <p className="text-base text-center font-semibold text-gray-900">{lesson.subject}</p>
              <p className="text-sm text-center font-medium text-gray-700">{lesson.group}</p>
            </div>
            <div className="border-t border-gray-200 py-1" />
            {days.map((day, index) => (
              <p key={index} className="text-sm text-gray-500">{new Date(day).toLocaleDateString()}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
