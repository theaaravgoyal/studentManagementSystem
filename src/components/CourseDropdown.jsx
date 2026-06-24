function CourseDropdown({
  courses,
  selectedCourse,
  setSelectedCourse,
  open,
  setOpen,
  courseError,
  setCourseError,
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="font-semibold text-sm">Course</label>

      <div
        onClick={() => setOpen(!open)}
        className={`relative w-full border rounded-xl p-3 text-sm flex items-center justify-between cursor-pointer bg-(--bg-input) ${
          courseError ? "border-red-400" : "border-(--border)"
        }`}
      >
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-book-open text-[12px] text-(--text-secondary)" />
          <span
            className={
              selectedCourse
                ? "text-(--text-primary)"
                : "text-(--text-secondary)"
            }
          >
            {selectedCourse || "Select course"}
          </span>
        </div>

        <i
          className={`fa-solid fa-chevron-down text-xs text-(--text-secondary) transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />

        <div
          className="absolute top-full left-0 w-full z-50 mt-1"
          style={{
            maxHeight: open ? "300px" : "0px",
            overflow: "hidden",
            transition: "max-height 0.3s ease",
          }}
        >
          <div className="border border-(--border) rounded-xl bg-(--bg-card) overflow-hidden">
            {courses.map((course) => (
              <div
                key={course}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCourse(course);
                  setOpen(false);
                  setCourseError(false);
                }}
                className="p-3 text-sm cursor-pointer hover:bg-(--primary-light) hover:text-(--primary)"
                style={{
                  color:
                    selectedCourse === course
                      ? "var(--primary)"
                      : "var(--text-primary)",
                  background:
                    selectedCourse === course
                      ? "var(--primary-light)"
                      : "transparent",
                }}
              >
                {course}
              </div>
            ))}
          </div>
        </div>
      </div>

      {courseError && (
        <span className="text-red-400 text-xs">Please select a course</span>
      )}
    </div>
  );
}

export default CourseDropdown;
