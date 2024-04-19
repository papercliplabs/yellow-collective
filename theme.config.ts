import { ThemeConfig } from "types/ThemeConfig";
import { lightTheme } from "theme/default";
import merge from "lodash.merge";

export const theme: ThemeConfig = merge(lightTheme, {
  styles: {
    fonts: {
      heading: "Roboto",
    },
    colors: {
      backdrop: "251, 203, 7",
    },
  },
  nav: {
    primary: [
      // { label: "DAO", href: "/vote" },
      // { label: "About", href: "/about" },
    ],
    secondary: [],
  },
  brand: {
    logo: "/noggles.svg",
    title: null,
  },
} as Partial<ThemeConfig>);
