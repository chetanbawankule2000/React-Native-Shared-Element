export const minut_to_hours = (minutes) => {
  var hours = minutes / 60;
  var rhours = Math.floor(hours);
  var minute = (hours - rhours) * 60;
  var rminutes = Math.round(minute);

  return rhours + "h " + rminutes + "m";
};
