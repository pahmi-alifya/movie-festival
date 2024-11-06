const vuetifyTheme = {
  theme: {
    defaultTheme: "dark",
    themes: {
      dark: {
        colors: {
          background: "#121212", // Dark background
          surface: "#1e1e1e", // Slightly lighter dark grey for surfaces
          primary: "#64B5F6", // Light blue primary
          "primary-darken-1": "#3788D3", // Darker shade of light blue
          "primary-darken-2": "#216DBD", // Even darker shade of light blue
          secondary: "#2196F3", // Another shade of light blue (optional)
          accent: "#81D4FA", // Lighter blue accent
          error: "#FF5252", // Red for errors
          info: "#2196F3", // Light blue for info (can reuse primary)
          success: "#4CAF50", // Green for success
          warning: "#FFC107", // Yellow for warnings
          text: "#EEEEEE", // Light grey for text
          "on-surface": "#EEEEEE", // Text color on surfaces
        },
      },
    },
  },
};

export default vuetifyTheme;
