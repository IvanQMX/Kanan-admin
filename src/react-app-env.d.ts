/// <reference types="react-scripts" />

interface Report {
  _id: string;
  date: Date;
  studentID: string;
  hasTestPhoto: boolean;
  sinceDay: Date;
  symptoms: string[];
  approved: boolean;
}

interface lessonReference {
  lesson: string;
  days: Date[];
}

interface ReportPreview {
  _id: string;
  date: Date;
  studentID: string;
  hasTestPhoto: boolean;
  sinceDay: Date;
  symptoms: string[];
}

type Session = [null | string, React.Dispatch<React.SetStateAction<null | string>>];

interface DetailedReport {
  date: Date;
  studentID: string;
  fullName: string;
  email: string;
  telephone: string;
  hasTestPhoto: boolean;
  testPhoto: File;
  sinceDay: Date;
  symptoms: string[];
  attendedSchool: boolean;
  lessonsAttended: lessonReference[];
}
