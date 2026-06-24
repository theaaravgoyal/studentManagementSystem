import { useState } from "react";

function StudentForm({ onAddStudent }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [open, setOpen] = useState(false);
  const [courseError, setCourseError] = useState(false);

  const courses = [
    "Video Editing",
    "Graphic Designing",
    "Full Stack Web Development",
    "UI/UX Designing",
    "Digital Marketing",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!course) {
      setCourseError(true);
      return;
    }
    setCourseError(false);
    onAddStudent({ name, email, course, status: "Active" });
    setName("");
    setEmail("");
    setCourse("");
  };

  return (
    <div className="h-[95vh] justify-center w-full flex flex-col gap-5">
      <div className="bg-(--bg-card) h-full py-10 px-5 flex flex-col justify-center items-center gap-7 border border-(--border) rounded-xl" style={{ boxShadow: "0 2px 12px var(--shadow)" }}>
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
              {!name && (
                <span className="absolute left-9 top-1/2 -translate-y-1/2 text-(--text-secondary) text-sm pointer-events-none">
                  Enter student name
                </span>
              )}
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border border-(--border) focus:border-(--border-focus) rounded-xl p-3 pl-9 text-sm outline-none bg-(--bg-input) text-(--text-primary)"
              />
            </div>
          </div>

          {/* Course */}
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold text-sm">Course</label>
            <div
              onClick={() => setOpen(!open)}
              className={`relative w-full border rounded-xl p-3 text-sm flex items-center justify-between cursor-pointer bg-(--bg-input) ${courseError ? "border-red-400" : "border-(--border)"}`}
            >
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-book-open text-[12px] text-(--text-secondary)" />
                <span
                  className={
                    course ? "text-(--text-primary)" : "text-(--text-secondary)"
                  }
                >
                  {course || "Select course"}
                </span>
              </div>
              <i
                className={`fa-solid fa-chevron-down text-xs text-(--text-secondary) transition-transform duration-300 ${open ? "rotate-180" : ""}`}
              />

              {/* Dropdown */}
              <div
                className="absolute top-full left-0 w-full z-10 mt-1"
                style={{
                  maxHeight: open ? "300px" : "0px",
                  overflow: "hidden",
                  transition: "max-height 0.3s ease",
                }}
              >
                <div className="border border-(--border) rounded-xl bg-(--bg-card) shadow-md overflow-hidden">
                  {courses.map((c) => (
                    <div
                      key={c}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCourse(c);
                        setOpen(false);
                        setCourseError(false);
                      }}
                      className="p-3 text-sm cursor-pointer hover:bg-(--primary-light) hover:text-(--primary)"
                      style={{
                        color:
                          course === c
                            ? "var(--primary)"
                            : "var(--text-primary)",
                        background:
                          course === c ? "var(--primary-light)" : "transparent",
                      }}
                    >
                      {c}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {courseError && (
              <span className="text-red-400 text-xs -mt-1">
                Please select a course
              </span>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold text-sm">Email</label>
            <div className="relative w-full">
              <i className="fa-regular fa-envelope text-[12px] absolute left-3 top-1/2 -translate-y-1/2 text-(--text-secondary)" />
              {!email && (
                <span className="absolute left-9 top-1/2 -translate-y-1/2 text-(--text-secondary) text-sm pointer-events-none">
                  Enter email address
                </span>
              )}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-(--border) focus:border-(--border-focus) rounded-xl p-3 pl-9 text-sm outline-none bg-(--bg-input) text-(--text-primary)"
              />
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="bg-(--primary) text-(--text-light) mt-2 text-sm py-2 px-3 rounded-lg w-full"
          >
            <span className="flex justify-center items-center gap-1">
              <span className="text-[12px]">
                <i className="fa-solid fa-plus"></i>
              </span>
              Add Student
            </span>
          </button>
        </form>
      </div>
      {/*tip-box*/}
      <div
        className="rounded-2xl p-5 flex flex-row items-start gap-3 w-full border border-(--border) h-fit"
        style={{ boxShadow: "0 2px 12px var(--shadow)", background: "var(--tip-bg)" }}
      >
        <i
          className="fa-regular fa-lightbulb text-base mt-0.5"
          style={{ color: "var(--tip-icon)" }}
        />
        <div className="flex flex-col gap-1">
          <p
            className="font-semibold text-sm"
            style={{ color: "var(--tip-icon)" }}
          >
            Tip
          </p>
          <p
            className="text-xs leading-5"
            style={{ color: "var(--text-secondary)" }}
          >
            Fill in the details and click on{" "}
            <span
              className="font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              "Add Student"
            </span>{" "}
            to add a new student.
          </p>
        </div>
      </div>
    </div>
  );
}

export default StudentForm;
