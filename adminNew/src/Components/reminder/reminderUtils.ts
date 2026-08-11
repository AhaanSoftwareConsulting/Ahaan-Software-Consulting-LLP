// ==============================
// Format Date
// ==============================
export const formatDate = (
  date: string | Date | null | undefined
): string => {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// ==============================
// Days Left
// ==============================
export const getDaysLeft = (
  dateString: string | Date | null | undefined
): number | null => {
  if (!dateString) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const event = new Date(dateString);
  event.setFullYear(today.getFullYear());
  event.setHours(0, 0, 0, 0);

  // If this year's event has already passed
  if (event.getTime() < today.getTime()) {
    event.setFullYear(today.getFullYear() + 1);
  }

  const diff = Math.round(
    (event.getTime() - today.getTime()) /
      (1000 * 60 * 60 * 24)
  );

  return diff;
};

// ==============================
// Is Within Next 7 Days
// ==============================
export const isWithin7Days = (
  dateString: string | Date | null | undefined
): boolean => {
  const days = getDaysLeft(dateString);

  return days !== null && days >= 0 && days <= 7;
};

// ==============================
// Completed Years (Anniversary)
// ==============================
export const getCompletedYears = (
  joiningDate: string | Date | null | undefined
): number => {
  if (!joiningDate) return 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const joining = new Date(joiningDate);
  joining.setHours(0, 0, 0, 0);

  let years =
    today.getFullYear() - joining.getFullYear();

  const anniversaryThisYear = new Date(joining);
  anniversaryThisYear.setFullYear(today.getFullYear());

  if (today.getTime() < anniversaryThisYear.getTime()) {
    years--;
  }

  return years;
};