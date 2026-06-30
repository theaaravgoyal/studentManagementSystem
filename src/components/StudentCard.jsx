import { useState } from "react";
import StudentItem from "./StudentItem";
import EditPopup from "./EditPopup";

function StudentCard({ students, setStudents }) {
  const [search, setSearch] = useState("");
  const [editingStudent, setEditingStudent] = useState(null);

  const filtered = students.filter((student) => {
    const query = search.toLowerCase();

    return (
      student.name.toLowerCase().includes(query) ||
      student.email.toLowerCase().includes(query) ||
      student.course.toLowerCase().includes(query)
    );
  });

  const handleDelete = (id) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
  };

  const handleSave = (updatedStudent) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === updatedStudent.id ? updatedStudent : student,
      ),
    );
  };

  const filteredStudents = students.filter((student) => {
    const query = search.toLowerCase();

    return (
      student.name.toLowerCase().includes(query) ||
      student.email.toLowerCase().includes(query) ||
      student.course.toLowerCase().includes(query)
    );
  });

  return (
    <div
      className="bg-(--bg-card) justify-between py-10 px-5 flex flex-col gap-7 border border-(--border) rounded-xl min-h-[95vh] w-full"
      style={{ boxShadow: "0 2px 12px var(--shadow)" }}
    >
      {/* Header */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-row flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center rounded-full text-(--text-light) w-8 h-8 text-sm bg-(--primary-light)">
              <i className="fa-solid fa-users"></i>
            </div>
            <h3 className="text-(--text-primary) font-semibold">
              Student List
            </h3>
          </div>

          <div className="relative inline-block">
            <i className="fa-solid fa-magnifying-glass text-[11px] absolute left-3 top-1/2 -translate-y-1/2 text-(--text-secondary)" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search students..."
              className="border border-(--border) rounded-xl pl-8 pr-3 py-2 text-xs outline-none bg-(--bg-input) text-(--text-primary) w-36 sm:w-48"
            />
          </div>
        </div>

        <div className="bg-(--underline) w-20 h-px rounded-full"></div>
      </div>

      {/* Students */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3 overflow-y-auto max-h-[70vh] pr-2">
          {filteredStudents.length === 0 ? (
            <div className="text-center py-10 text-(--text-secondary) text-sm">
              No students found
            </div>
          ) : (
            filteredStudents.map((student, index) => (
              <StudentItem
                key={student.id}
                student={student}
                index={students.findIndex((s) => s.id === student.id)}
                onDelete={handleDelete}
                onEdit={setEditingStudent}
              />
            ))
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="text-xs text-(--text-secondary)">
        Showing {filteredStudents.length} student
        {filteredStudents.length !== 1 ? "s" : ""}
      </div>

      {editingStudent && (
        <EditPopup
          student={editingStudent}
          onClose={() => setEditingStudent(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default StudentCard;
