function formatTenthsToTime(tenths: number) {
  const minutes = Math.floor(tenths / 600);
  const seconds = Math.floor((tenths % 600) / 10);
  const remainingTenths = tenths % 10;

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}.${remainingTenths}`;
}

export default formatTenthsToTime;
