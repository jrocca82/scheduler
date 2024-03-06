import { Exo_2, Alegreya_Sans } from "next/font/google";

export const exo2 = Exo_2({
  subsets: ["latin", "latin-ext"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const alegreya = Alegreya_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ['100', '300', '400', '500', '700', '800', '900'],
});

export const fonts = {
  heading: exo2.style.fontFamily,
  body: alegreya.style.fontFamily,
};
