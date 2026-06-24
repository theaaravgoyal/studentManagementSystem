import { useState } from "react";

const CARDS_PER_PAGE = 4;

const avatarIcons = [
  "fa-solid fa-user-graduate",
  "fa-solid fa-user-tie",
  "fa-solid fa-user-astronaut",
  "fa-solid fa-user-ninja",
  "fa-solid fa-user-secret",
];

const avatarColors = [
  { bg: "#dbe4ff", color: "#3b5bdb" },
  { bg: "#d3f9d8", color: "#40c057" },
  { bg: "#ffe8cc", color: "#fd7e14" },
  { bg: "#ffd6e0", color: "#e64980" },
  { bg: "#e3fafc", color: "#1098ad" },
];

function getAvatar(index) {
  return {
    icon: avatarIcons[index % avatarIcons.length],
    ...avatarColors[index % avatarColors.length],
  };
}

// ─── Edit Popup ───────────────────────────────────────────────────────────────
function EditPopup({ student, onClose, onSave, courses }) {
  const [form, setForm] = useState({ ...student });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [courseError, setCourseError] = useState(false);

  const handleSave = () => {
    if (!form.course) {
      setCourseError(true);
      return;
    }
    onSave(form);
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
            <div
              className="flex items-center justify-center rounded-full w-8 h-8 text-sm bg-(--primary-light)"
              style={{ color: "var(--text-light)" }}
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </div>
            <h3 className="font-semibold text-(--text-primary)">
              Edit Student
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-(--text-secondary) hover:text-(--text-primary) text-lg transition-colors"
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
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full border border-(--border) focus:border-(--border-focus) rounded-xl p-3 pl-9 text-sm outline-none bg-(--bg-input) text-(--text-primary)"
            />
          </div>
        </div>

        {/* Course Dropdown */}
        <div className="flex flex-col gap-1 w-full">
          <label className="font-semibold text-sm">Course</label>
          <div
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className={`relative w-full border rounded-xl p-3 text-sm flex items-center justify-between cursor-pointer bg-(--bg-input) ${courseError ? "border-red-400" : "border-(--border)"}`}
          >
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-book-open text-[12px] text-(--text-secondary)" />
              <span
                className={
                  form.course
                    ? "text-(--text-primary)"
                    : "text-(--text-secondary)"
                }
              >
                {form.course || "Select course"}
              </span>
            </div>
            <i
              className={`fa-solid fa-chevron-down text-xs text-(--text-secondary) transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`}
            />

            {dropdownOpen && (
              <div className="absolute top-full left-0 w-full z-50 mt-1">
                <div
                  className="border border-(--border) rounded-xl bg-(--bg-card) shadow-xl overflow-y-auto"
                  style={{ maxHeight: "180px" }}
                >
                  {courses.map((c) => (
                    <div
                      key={c}
                      onClick={(e) => {
                        e.stopPropagation();
                        setForm({ ...form, course: c });
                        setDropdownOpen(false);
                        setCourseError(false);
                      }}
                      className="p-3 text-sm cursor-pointer hover:bg-(--primary-light) hover:text-(--primary)"
                      style={{
                        color:
                          form.course === c
                            ? "var(--primary)"
                            : "var(--text-primary)",
                        background:
                          form.course === c
                            ? "var(--primary-light)"
                            : "transparent",
                      }}
                    >
                      {c}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          {courseError && (
            <span className="text-red-400 text-xs">Please select a course</span>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1 w-full">
          <label className="font-semibold text-sm">Email</label>
          <div className="relative w-full">
            <i className="fa-regular fa-envelope text-[12px] absolute left-3 top-1/2 -translate-y-1/2 text-(--text-secondary)" />
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="w-full border border-(--border) focus:border-(--border-focus) rounded-xl p-3 pl-9 text-sm outline-none bg-(--bg-input) text-(--text-primary)"
            />
          </div>
        </div>

        {/* Status Toggle */}
        <div className="flex flex-col gap-1 w-full">
          <label className="font-semibold text-sm">Status</label>
          <div className="flex gap-2">
            {["Active", "Inactive"].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setForm({ ...form, status: s })}
                className="flex-1 py-2 rounded-xl text-sm font-medium border transition-all duration-200"
                style={{
                  background:
                    form.status === s
                      ? s === "Active"
                        ? "var(--active-bg)"
                        : "var(--inactive-bg)"
                      : "var(--bg-input)",
                  color:
                    form.status === s
                      ? s === "Active"
                        ? "var(--active)"
                        : "var(--inactive)"
                      : "var(--text-secondary)",
                  borderColor:
                    form.status === s
                      ? s === "Active"
                        ? "var(--active)"
                        : "var(--inactive)"
                      : "var(--border)",
                }}
              >
                <i className={`fa-solid fa-circle text-[8px] mr-1`} />
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-1">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-xl text-sm font-medium border border-(--border) text-(--text-secondary) hover:bg-(--bg-page) transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-2 rounded-xl text-sm font-medium text-(--text-light) bg-(--primary) hover:opacity-90 transition-opacity"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Single Card ──────────────────────────────────────────────────────────────
function Card({ student, index, onDelete, onEdit }) {
  const avatar = getAvatar(index);
  const isActive = student.status === "Active";

  return (
    <div
      className="flex flex-col sm:flex-row items-center sm:items-center gap-5 sm:gap-3 p-4 border border-(--border) rounded-2xl bg-(--bg-card) w-full"
      style={{ boxShadow: "0 2px 8px var(--shadow)" }}
    >
      {/* Avatar */}
      <div
        className="flex items-center justify-center rounded-full w-12 h-12 shrink-0 text-lg"
        style={{ background: avatar.bg, color: avatar.color }}
      >
        <i className={avatar.icon}></i>
      </div>

      {/* Info */}
      <div className="flex items-center sm:items-start flex-col gap-2 sm:gap-1 flex-1 min-w-0">
        <p className="font-semibold text-sm text-(--text-primary) truncate">
          {student.name}
        </p>
        <p className="text-xs text-(--primary) flex items-center gap-1 truncate">
          <i className="fa-solid fa-book-open text-[10px]" />
          {student.course}
        </p>
        <p className="text-xs text-(--text-secondary) flex items-center gap-1 truncate">
          <i className="fa-regular fa-envelope text-[10px]" />
          {student.email}
        </p>
      </div>

      {/* Right side: status + actions */}
      <div className="flex items-center gap-2 sm:self-auto shrink-0">
        {/* Status Badge */}
        <span
          className="text-[11px] font-medium px-2 py-1 rounded-full flex items-center gap-1"
          style={{
            background: isActive ? "var(--active-bg)" : "var(--inactive-bg)",
            color: isActive ? "var(--active)" : "var(--inactive)",
          }}
        >
          <i className="fa-solid fa-circle text-[6px]" />
          {student.status}
        </span>

        {/* Edit */}
        <button
          onClick={() => onEdit(student)}
          className="w-8 h-8 flex items-center justify-center rounded-lg border transition-colors hover:bg-(--primary-light)"
          style={{
            borderColor: "var(--btn-edit-border)",
            color: "var(--btn-edit-icon)",
          }}
        >
          <i className="fa-regular fa-pen-to-square text-xs"></i>
        </button>

        {/* Delete */}
        <button
          onClick={() => onDelete(student.id)}
          className="w-8 h-8 flex items-center justify-center rounded-lg border transition-colors hover:bg-red-50"
          style={{
            borderColor: "var(--btn-delete-border)",
            color: "var(--btn-delete-icon)",
          }}
        >
          <i className="fa-regular fa-trash-can text-xs"></i>
        </button>
      </div>
    </div>
  );
}

// ─── Main StudentCard Component ───────────────────────────────────────────────
function StudentCard({ students, setStudents }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [editingStudent, setEditingStudent] = useState(null);

  const courses = [
    "Video Editing",
    "Graphic Designing",
    "Full Stack Web Development",
    "UI/UX Designing",
    "Digital Marketing",
  ];

  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / CARDS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (safePage - 1) * CARDS_PER_PAGE,
    safePage * CARDS_PER_PAGE,
  );

  const handleDelete = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  const handleSave = (updated) => {
    setStudents((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
  };

  const handlePageChange = (dir) => {
    setPage((p) => Math.min(Math.max(1, p + dir), totalPages));
  };

  return (
    <div
      className="bg-(--bg-card) justify-between py-10 px-5 flex flex-col gap-7 border border-(--border) rounded-xl min-h-[95vh] w-full"
      style={{ boxShadow: "0 2px 12px var(--shadow)" }}
    >
      {/* Header */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-row flex-nowrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center rounded-full text-(--text-light) w-8 h-8 text-sm bg-(--primary-light)">
              <i className="fa-solid fa-users"></i>
            </div>
            <h3 className="text-(--text-primary) font-semibold">
              Student List
            </h3>
          </div>

          {/* Search */}
          <div className="relative hidden sm:inline-block">
            <i className="fa-solid fa-magnifying-glass text-[11px] absolute left-3 top-1/2 -translate-y-1/2 text-(--text-secondary)" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search students..."
              className="border border-(--border) rounded-xl pl-8 pr-3 py-2 text-xs outline-none focus:border-(--border-focus) bg-(--bg-input) text-(--text-primary) w-36 sm:w-48"
            />
          </div>
        </div>
        <div className="bg-(--underline) w-20 h-px rounded-full"></div>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-3">
        {paginated.length === 0 ? (
          <div className="text-center py-10 text-(--text-secondary) text-sm">
            <i className="fa-solid fa-user-slash text-2xl mb-2 block opacity-40" />
            No students found
          </div>
        ) : (
          paginated.map((student, i) => (
            <Card
              key={student.id}
              student={student}
              index={students.indexOf(student)}
              onDelete={handleDelete}
              onEdit={setEditingStudent}
            />
          ))
        )}
      </div>

      {/* Footer: counter + pagination */}
      <div className="flex items-center justify-between mt-1">
        <p className="text-xs text-(--text-secondary)">
          Showing{" "}
          {filtered.length === 0 ? 0 : (safePage - 1) * CARDS_PER_PAGE + 1}–
          {Math.min(safePage * CARDS_PER_PAGE, filtered.length)} of{" "}
          {filtered.length} student{filtered.length !== 1 ? "s" : ""}
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(-1)}
            disabled={safePage === 1}
            className="w-7 h-7 flex items-center justify-center rounded-lg border border-(--border) text-(--text-secondary) disabled:opacity-30 hover:border-(--border-focus) hover:text-(--primary) transition-colors"
          >
            <i className="fa-solid fa-chevron-left text-[10px]"></i>
          </button>
          <span className="text-xs text-(--text-secondary) font-medium">
            {safePage} / {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(1)}
            disabled={safePage === totalPages}
            className="w-7 h-7 flex items-center justify-center rounded-lg border border-(--border) text-(--text-secondary) disabled:opacity-30 hover:border-(--border-focus) hover:text-(--primary) transition-colors"
          >
            <i className="fa-solid fa-chevron-right text-[10px]"></i>
          </button>
        </div>
      </div>

      {/* Edit Popup */}
      {editingStudent && (
        <EditPopup
          student={editingStudent}
          onClose={() => setEditingStudent(null)}
          onSave={handleSave}
          courses={courses}
        />
      )}
    </div>
  );
}

export default StudentCard;
