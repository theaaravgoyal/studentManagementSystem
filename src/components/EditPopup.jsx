import { useState } from "react";
import CourseDropdown from "./CourseDropdown";
import { courses } from "../data/Courses";

function EditPopup({ student, onClose, onSave }) {
  const [formData, setFormData] = useState({ ...student });
  const [open, setOpen] = useState(false);
  const [courseError, setCourseError] = useState(false);

  const handleSave = () => {
    if (!formData.course) {
      setCourseError(true);
      return;
    }

    onSave(formData);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.35)" }}
      onClick={onClose}
    >
      <div
        className="bg-(--bg-card) rounded-2xl p-6 w-full max-w-sm flex flex-col gap-4 shadow-xl overflow-visible"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center rounded-full w-8 h-8 text-sm bg-(--primary-light)">
              <i className="fa-solid fa-pen-to-square"></i>
            </div>
            <h3 className="font-semibold text-(--text-primary)">
              Edit Student
            </h3>
          </div>

          <button
            onClick={onClose}
            className="text-(--text-secondary) hover:text-(--text-primary)"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="bg-(--underline) w-16 h-px rounded-full"></div>

        {/* Name */}
        <div className="flex flex-col gap-1 w-full">
          <label className="font-semibold text-sm">Name</label>
          <div className="relative w-full">
            <i className="fa-regular fa-user text-[12px] absolute left-3 top-1/2 -translate-y-1/2 text-(--text-secondary)" />
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full border border-(--border) rounded-xl p-3 pl-9 text-sm outline-none bg-(--bg-input)"
            />
          </div>
        </div>

        {/* Course */}
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
        <div className="flex flex-col gap-1 w-full">
          <label className="font-semibold text-sm">Email</label>
          <div className="relative w-full">
            <i className="fa-regular fa-envelope text-[12px] absolute left-3 top-1/2 -translate-y-1/2 text-(--text-secondary)" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full border border-(--border) rounded-xl p-3 pl-9 text-sm outline-none bg-(--bg-input)"
            />
          </div>
        </div>

        {/* Status */}
        <div className="flex flex-col gap-1 w-full">
          <label className="font-semibold text-sm">Status</label>

          <div className="flex gap-2">
            {["Active", "Inactive"].map((status) => (
              <button
                key={status}
                onClick={() => setFormData({ ...formData, status })}
                className="flex-1 py-2 rounded-xl text-sm font-medium border"
                style={{
                  background:
                    formData.status === status
                      ? status === "Active"
                        ? "var(--active-bg)"
                        : "var(--inactive-bg)"
                      : "var(--bg-input)",
                  color:
                    formData.status === status
                      ? status === "Active"
                        ? "var(--active)"
                        : "var(--inactive)"
                      : "var(--text-secondary)",
                  borderColor:
                    formData.status === status
                      ? status === "Active"
                        ? "var(--active)"
                        : "var(--inactive)"
                      : "var(--border)",
                }}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-2">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-xl text-sm font-medium border border-(--border)"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="flex-1 py-2 rounded-xl text-sm font-medium text-(--text-light) bg-(--primary)"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditPopup;
