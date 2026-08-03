export const formatDate = (date) => {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// কতদিন বাকি
export const getDaysLeft = (dateString) => {
  if (!dateString) return null;

  const today = new Date();

  // সময় বাদ দিচ্ছি
  today.setHours(0, 0, 0, 0);

  const event = new Date(dateString);

  event.setFullYear(today.getFullYear());
  event.setHours(0, 0, 0, 0);

  // যদি এই বছরের birthday চলে যায়
  if (event < today) {
    event.setFullYear(today.getFullYear() + 1);
  }

  const diff = Math.round(
    (event - today) / (1000 * 60 * 60 * 24)
  );

  return diff;
};

// আগামী ৭ দিনের মধ্যে?
export const isWithin7Days = (dateString) => {
  const days = getDaysLeft(dateString);

  return days !== null && days >= 0 && days <= 7;
};

// Anniversary Years
export const getCompletedYears = (joiningDate) => {
  if (!joiningDate) return 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const joining = new Date(joiningDate);
  joining.setHours(0, 0, 0, 0);

  let years = today.getFullYear() - joining.getFullYear();

  const anniversaryThisYear = new Date(joining);
  anniversaryThisYear.setFullYear(today.getFullYear());

  // যদি এই বছরের anniversary এখনও না আসে
  if (today < anniversaryThisYear) {
    years--;
  }

  return years;
};