import { useState } from "react";
import StudentForm from "./components/StudentForm";
import StudentCard from "./components/StudentCard";
const initialStudents = [
  {
    id: 1,
    name: "Rahul Sharma",
    course: "Full Stack Web Development",
    email: "rahul@example.com",
    status: "Active",
  },
  {
    id: 2,
    name: "Priya Verma",
    course: "UI/UX Designing",
    email: "priya@example.com",
    status: "Active",
  },
  {
    id: 3,
    name: "Amit Kumar",
    course: "Digital Marketing",
    email: "amit@example.com",
    status: "Active",
  },
  {
    id: 4,
    name: "Sneha Patel",
    course: "Video Editing",
    email: "sneha@example.com",
    status: "Inactive",
  },
];

let nextId = initialStudents.length + 1;
function App() {
  const [students, setStudents] = useState(initialStudents);
  const numberOfStudents = students.length;

  const handleAddStudent = (data) => {
    setStudents((prev) => [...prev, { id: nextId++, ...data }]);
  };

  return (
    <>
      <header className="px-5 lg:px-20 flex flex-col lg:flex-row justify-center lg:justify-between items-center gap-3 py-10 bg-(--primary-dark)">
        <div className="flex flex-row justify-center items-center gap-4 lg:gap-6 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-center text-(--text-light)">
          <div className="hidden sm:inline-block w-fit h-fit">
            <i className="fa-solid fa-graduation-cap"></i>
          </div>
          <h1>Student Management System</h1>
        </div>
        <div className="flex flex-row flex-nowrap justify-center items-center gap-2 bg-(--primary-light) text-(--text-light) w-fit h-fit px-2 py-1 text-[10px] sm:text-sm rounded-xl">
          <i className="fa-solid fa-user-group"></i>
          <h6>
            Total Students :{" "}
            <span className="font-bold">{numberOfStudents}</span>
          </h6>
        </div>
      </header>
      <main
        className="flex-col flex lg:flex-row justify-center items-center gap-5 px-5 lg:px-10 my-10"
        style={{ background: "var(--bg-page)", minHeight: "80vh" }}
      >
        <StudentForm onAddStudent={handleAddStudent} />
        <StudentCard students={students} setStudents={setStudents} />
      </main>
    </>
  );
}

export default App;
