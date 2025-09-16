const customTheme = (theme) => {
  theme.typography = theme.typography || {};
  theme.typography.fontFamily = theme.typography.fontFamily || 'Arial, sans-serif';
  return theme;
};

const theme = customTheme({
  typography: {
    fontFamily: '"Poppins", sans-serif', // Set Poppins as the default font
  },
  colorSchemes: {
    light: false,
    dark: true,
  },
});


export default theme;