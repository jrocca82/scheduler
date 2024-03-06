import "./fonts/fonts.css"; // Imports local fonts from "./fonts/fonts.css"

import { ThemeConfig, extendTheme } from "@chakra-ui/react";

import { colors } from "./colors";
import { fonts } from "./fonts";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

export const theme = extendTheme({
  config,
  colors,
  fonts,
  styles: {
    global: {
      body: {
        bg: "black",
        color: "white.500",
        fontFamily: fonts.body
      },
      h4: {
        fontFamily: fonts.heading,
        fontSize: "20px",
        fontWeight: "bold"
      },
      a: {
        textDecoration: "underline"
      }
    },
  },
  components: {
    Button: {
      baseStyle: {
        width: "300px",
        height: "50px",
        boxShadow: "3px 3px black",
        borderRadius: "20px",
        my: "10px",
        _disabled: {
          opacity: 0.8
        }
      },
      sizes: {
        sm: {},
        md: {},
        lg: {},
        xl: {},
      },
      // styles for different visual variants ("outline", "solid")
      variants: {
        red: {
          color: "white.500",
          bg: "red.500",
        },
        green: {
          color: "white.500",
          bg: "green.500",
        },
        blue: {
          color: "white.500",
          bg: "blue.500",
        },
        icon: {
          bg: "transparent",
          boxShadow: "none",
          width: "30px"
        },
      },
      // default values for 'size', 'variant' and 'colorScheme'
      defaultProps: {
        size: "md",
        variant: "red",
      },
    },
    Text: {
      baseStyle: {
        fontSize: "18px"
      },
      defaultProps: {

      }
    },
    MenuItem: {
      baseStyle: {
        backgroundColor: "white"
      },
      defaultProps: {

      }
    },
    Input: {
      baseStyle: {
        bgColor: "white.500",
        color: "black",
        w: "300px"
      }
    }
  },
});
