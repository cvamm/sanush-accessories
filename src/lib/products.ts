export type Product = {
  id: string;
  title: string;
  category: string;
  image: string;
  alt: string;
  description: string;
};

export const products: Product[] = [
  {
    id: "everyday-hoops",
    title: "Everyday Huggies",
    category: "Earrings",
    image: "/images/hoops.jpg",
    alt: "Sculptural gold huggie hoops on a sunlit travertine display",
    description: "A little golden detail for every day.",
  },
  {
    id: "dewdrop-necklace",
    title: "Dewdrop Pendant",
    category: "Necklaces",
    image: "/images/necklace.jpg",
    alt: "Fine gold chain necklace with an organic oval charm",
    description: "An easy layer, finished with a tiny golden charm.",
  },
  {
    id: "sol-chain-bracelet",
    title: "Sol Chain Bracelet",
    category: "Bracelets",
    image: "/images/bracelet.jpg",
    alt: "Delicate gold chain bracelet arranged in a loop on ivory ceramic",
    description: "A subtle shimmer that goes with everything.",
  },
  {
    id: "stacking-rings",
    title: "Golden Hour Stacking Rings",
    category: "Rings",
    image: "/images/ring.jpg",
    alt: "Two minimal gold stacking rings on pale travertine",
    description: "Wear one on its own or stack them your way.",
  },
];
