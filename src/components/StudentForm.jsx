import { useState } from "react";
import CourseDropdown from "./CourseDropdown";
import { courses } from "../data/Courses";

function StudentForm({ onAddStudent }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: "",
  });

  const [open, setOpen] = useState(false);
  const [courseError, setCourseError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.course) {
      setCourseError(true);
      return;
    }

    onAddStudent({
      ...formData,
      status: "Active",
    });

    setFormData({
      name: "",
      email: "",
      course: "",
    });
  };

  return (
    <div className="h-[95vh] justify-center w-full flex flex-col gap-5">
      <div
        className="bg-(--bg-card) h-full py-10 px-5 flex flex-col justify-center items-center gap-7 border border-(--border) rounded-xl"
        style={{ boxShadow: "0 2px 12px var(--shadow)" }}
      >
        <div className="flex flex-col justify-center items-start gap-3">
          <div className="flex flex-row flex-nowrap justify-center items-center gap-2">
            <div className="flex items-center justify-center rounded-full text-(--text-light) w-8 h-8 text-sm bg-(--primary-light)">
              <i className="fa-solid fa-user-plus"></i>
            </div>
            <h3 className="text-(--text-primary) font-semibold">
              Add New Student
            </h3>
          </div>
          <div className="bg-(--underline) w-20 h-px rounded-full"></div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-start gap-6 w-full"
        >
          {/* Name */}
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold text-sm">Name</label>
            <div className="relative w-full">
              <i className="fa-regular fa-user text-[12px] absolute left-3 top-1/2 -translate-y-1/2 text-(--text-secondary)" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                placeholder="Enter student name"
                className="w-full border border-(--border) rounded-xl p-3 pl-9 text-sm outline-none bg-(--bg-input)"
              />
            </div>
          </div>

          <CourseDropdown
            courses={courses}
            selectedCourse={formData.course}
            setSelectedCourse={(course) => setFormData({ ...formData, course })}
            open={open}
            setOpen={setOpen}
            courseError={courseError}
            setCourseError={setCourseError}
          />

          {/* Email */}
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold text-sm">Email</label>
            <div className="relative w-full">
              <i className="fa-regular fa-envelope text-[12px] absolute left-3 top-1/2 -translate-y-1/2 text-(--text-secondary)" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                placeholder="Enter email address"
                className="w-full border border-(--border) rounded-xl p-3 pl-9 text-sm outline-none bg-(--bg-input)"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-(--primary) text-(--text-light) mt-2 text-sm py-2 px-3 rounded-lg w-full"
          >
            Add Student
          </button>
        </form>
      </div>
    </div>
  );
}

export default StudentForm;
