export const getTemp = (kelvin: number, type: string) => {
  switch (type) {
    case "celsius":
      return Math.round(kelvin - 273.15);
      break;

    case "fahrenheit":
      return Math.round((kelvin * 9) / 5 - 459.67);
      break;

    default:
      return Math.round(kelvin);
      break;
  }
};
