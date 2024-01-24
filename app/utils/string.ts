export const gretting = () => {
  const currentHour = new Date().getHours();
  let greeting = "";

  const isMorning = currentHour > 5 && currentHour <= 12;
  const isAfternoon = currentHour > 12 && currentHour <= 18;
  const isEvening = currentHour > 18 && currentHour <= 22;
  const isNight = currentHour > 22 || currentHour <= 5;

  if (isMorning) greeting = "Good morning";
  if (isAfternoon) greeting = "Good afternoon";
  if (isEvening) greeting = "Good evening";
  if (isNight) greeting = "Good night";

  return greeting;
};

/* export const greetMissingMeal = (lastMeal: string) => {

};
 */
