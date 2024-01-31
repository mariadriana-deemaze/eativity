export const pallete = {
  green: {
    primary: "#598325",
    secondary: "#365E04",
  },
  red: {
    primary: "#C26262",
  },
  purple: {
    primary: "#A362C2",
  },
  blue: {
    primary: "#628EC2",
  },
  gray: {
    primary: "#565656",
  },
  white: {
    100: "#FFFFFF",
    200: "#F3F3ED",
  },
  black: {
    100: "#000000",
    200: "#0F0F0F",
    300: "#1E1E1E",
    400: "#272727",
  },
};

export const lightTheme = {
  ...pallete,
  background: {
    primary: pallete.white[100],
    secondary: pallete.white[200],
  },
  text: {
    display: {
      primary: pallete.green.primary,
    },
    paragraph: {
      primary: "#0F0F0F",
      secondary: "#1E1E1E",
      tertiary: "#272727",
      inverted: "#FFFFFF",
    },
  },
};

export const darkTheme = {
  ...pallete,
  background: {
    primary: pallete.black[200],
    secondary: pallete.black[400],
  },
  text: {
    display: {
      primary: pallete.green.primary,
    },
    paragraph: {
      primary: "#FFFFFF",
      secondary: "#F9F9F9",
      tertiary: "#EEEEEE",
    },
  },
};
