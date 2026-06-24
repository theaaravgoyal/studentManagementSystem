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

function StudentItem({ student, index, onDelete, onEdit }) {
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

      {/* Right */}
      <div className="flex items-center gap-2 shrink-0">
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

export default StudentItem;
