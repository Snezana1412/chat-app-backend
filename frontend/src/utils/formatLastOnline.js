import { formatDistanceToNow, format } from "date-fns";

export const formatLastOnline = (lastOnline) => {
  console.log("🚀 ~ useFormatLastOnline ~ lastOnline:", lastOnline);

  const lastOnlineDate = new Date(lastOnline);
  const isRecent = new Date() - lastOnlineDate < 7 * 24 * 60 * 60 * 1000; // Within 7 days
  console.log(
    "🚀 ~ formatLastOnline ~ formatDistanceToNow(lastOnlineDate, { addSuffix: true }):",
    formatDistanceToNow(lastOnlineDate, { addSuffix: true })
  );
  console.log(
    "🚀 ~ formatLastOnline ~ format(lastOnlineDate,",
    format(lastOnlineDate, "MMMM d, yyyy")
  );
  return {
    lastSeen: isRecent
      ? formatDistanceToNow(lastOnlineDate, { addSuffix: true })
      : format(lastOnlineDate, "MMMM d, yyyy"), // Example: September 8, 2024
  };
};
// Usage
// const { lastSeen } = useFormatLastOnline(lastOnline);
// console.log(lastSeen); // Example: 5 minutes ago
// console.log(lastSeen); // Example: September 8, 2024
