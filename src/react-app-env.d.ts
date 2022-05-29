/// <reference types="react-scripts" />

interface Report {
  date: Date;
  studentID: string;
  hasTestPhoto: boolean;
  testPhoto: string;
  sinceDay: Date;
  symptoms: string[];
  attendedSchool: boolean;
  lessonsAttended: lessonReference[];
  approved: boolean;
}

interface lessonReference {
  lesson: string;
  days: Date[];
}

interface ReportPreview {
  date: Date;
  studentID: string;
  hasTestPhoto: boolean;
  sinceDay: Date;
  symptoms: string[];
}

type Session = [
  null|string, React.Dispatch<React.SetStateAction<null|string>>
]

interface Login {
  sessionState: Session
}