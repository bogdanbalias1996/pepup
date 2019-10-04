import {
  colorGreenEnd,
  colorGreenStart,
  colorBlueEnd,
  colorBlueStart,
  colorPinkEnd,
  colorPinkStart
} from "../variables";

export const getColorsByScore = (score: number = 0): string[] => {
  switch (true) {
    case score > 0 && score <= 500:
      return [colorGreenEnd, colorGreenStart];

    case score > 500 && score <= 1000:
      return [colorBlueEnd, colorBlueStart];

    case score > 1000:
      return [colorPinkEnd, colorPinkStart];

    default:
      return ["white", "white"];
  }
};

export const getSkillLevel = (score: number = 0): string => {
  switch (true) {
    case score > 0 && score <= 500:
      return "BEGINNER";

    case score > 500 && score <= 1000:
      return "INTERMEDIATE";

    case score > 1000:
      return "ADVANCED";
  }
};
