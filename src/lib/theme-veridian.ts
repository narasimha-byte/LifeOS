/**
 * Veridian Flow Design System Theme
 * Generated from Stitch Automations Screen
 * Digital Fluidity & Resource Intelligence
 */

export const veridianTheme = {
  colors: {
    // Primary - Energy Flow
    primary: "#006d32",
    "primary-container": "#00d166",
    "on-primary": "#ffffff",
    "on-primary-fixed": "#00210b",
    "on-primary-fixed-variant": "#005224",
    "on-primary-container": "#005324",
    "primary-fixed": "#64ff92",
    "primary-fixed-dim": "#30e375",
    "inverse-primary": "#30e375",
    "surface-tint": "#006d32",

    // Secondary - Water Flow
    secondary: "#0059bb",
    "secondary-container": "#0070ea",
    "on-secondary": "#ffffff",
    "on-secondary-fixed": "#001a41",
    "on-secondary-fixed-variant": "#004493",
    "on-secondary-container": "#fefcff",
    "secondary-fixed": "#d8e2ff",
    "secondary-fixed-dim": "#adc7ff",

    // Tertiary
    tertiary: "#565e74",
    "tertiary-container": "#aeb5cf",
    "on-tertiary": "#ffffff",
    "on-tertiary-fixed": "#131b2e",
    "on-tertiary-fixed-variant": "#3f465c",
    "on-tertiary-container": "#3f475c",
    "tertiary-fixed": "#dae2fd",
    "tertiary-fixed-dim": "#bec6e0",

    // Error
    error: "#ba1a1a",
    "error-container": "#ffdad6",
    "on-error": "#ffffff",
    "on-error-container": "#93000a",

    // Surface - The "No-Line" Rule Foundation
    surface: "#f8f9ff", // Base
    "surface-bright": "#f8f9ff",
    "surface-dim": "#cbdbf5",
    "surface-container-lowest": "#ffffff",
    "surface-container-low": "#eff4ff", // Level 1
    "surface-container": "#e5eeff", // Level 2
    "surface-container-high": "#dce9ff",
    "surface-container-highest": "#d3e4fe", // Level 3
    "on-surface": "#0b1c30",
    "on-surface-variant": "#3c4a3d",
    "inverse-surface": "#213145",
    "inverse-on-surface": "#eaf1ff",

    // Neutrals
    background: "#f8f9ff",
    "on-background": "#0b1c30",
    outline: "#6c7b6c",
    "outline-variant": "#bbcbb9",
    "surface-variant": "#d3e4fe",
  },

  fonts: {
    headline: "Space Grotesk",
    body: "Inter",
    label: "Inter",
  },

  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.5rem",
    "2xl": "2rem",
    "3xl": "3rem",
  },

  borderRadius: {
    sm: "0.25rem",
    md: "0.5rem",
    lg: "0.75rem",
    full: "9999px",
  },

  shadows: {
    editorial: "0 24px 40px -12px rgba(11, 28, 48, 0.06)",
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  },
};

// Design system principles
export const designPrinciples = {
  title: "The Luminous Engine",
  description:
    "A high-end editorial experience where smart home resource tracking feels less like a chore and more like a curated command center.",

  rules: [
    {
      name: "No-Line Rule",
      description:
        "Prohibited from using 1px solid borders to define sections. Layout boundaries established through background color shifts and tonal transitions.",
      implementation: [
        "Use surface-container-low against surface background",
        "Utilize surface-container hierarchy for separation",
      ],
    },

    {
      name: "Glass & Gradient Rule",
      description:
        "Use Glassmorphism for floating elements to escape flat look.",
      implementation: [
        "backdrop-filter: blur(20px)",
        "rgba backgrounds with alpha transparency",
        "Linear gradients for depth",
      ],
    },

    {
      name: "Intentional Asymmetry",
      description:
        "Break template look using intentional asymmetry and tonal depth.",
      implementation: [
        "Featured content spans more grid columns",
        "Offset positioning for visual interest",
        "White space as structural element",
      ],
    },

    {
      name: "Floating Layers",
      description:
        "Elements feel like they are floating in a clean, pressurized environment.",
      implementation: [
        "Overlapping layers and high-contrast typography",
        "Box shadows for depth perception",
        "Gradient overlays and blur effects",
      ],
    },
  ],
};
