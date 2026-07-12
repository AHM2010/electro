const products = {
  phones: [
    {
      id: 1,
      slug: "iphone-17-pro",
      title: "iPhone 17 Pro",
      price: 4999,
      images: [
        new URL(
          "../assets/images/iphone_17_pro_max_white.webp",
          import.meta.url,
        ).href,
        new URL(
          "../assets/images/iphone_17_pro_max_white-2.webp",
          import.meta.url,
        ).href,
        new URL(
          "../assets/images/iphone_17_pro_max_white-3.webp",
          import.meta.url,
        ).href,
      ],
      description: `A premium flagship built for speed, clarity, and elegant design.
Packed with advanced camera tech and all-day battery life for every moment.`,
      specs: {
        storage: "512GB",
        ram: "8GB",
        battery: "4,400 mAh",
        frontCamera: "12MP",
        backCamera: "48MP + 12MP + 12MP",
      },
    },
    {
      id: 2,
      slug: "samsung-galaxy-s25-ultra",
      title: "Samsung Galaxy S25 Ultra",
      price: 3999,
      images: [
        new URL(
          "../assets/images/Samsung-Galaxy-S25-Ultra.avif",
          import.meta.url,
        ).href,
        new URL(
          "../assets/images/Samsung-Galaxy-S25-Ultra-2.webp",
          import.meta.url,
        ).href,
        new URL(
          "../assets/images/Samsung-Galaxy-S25-Ultra-3.webp",
          import.meta.url,
        ).href,
      ],
      description: `A powerful Galaxy flagship with a brilliant display and pro-grade camera setup.
Designed for smooth multitasking and immersive mobile experiences.`,
      specs: {
        storage: "512GB",
        ram: "12GB",
        battery: "5,000 mAh",
        frontCamera: "12MP",
        backCamera: "200MP + 12MP + 10MP + 10MP",
      },
    },
    {
      id: 3,
      slug: "honor-magic7-pro",
      title: "Honor Magic7 Pro",
      price: 2999,
      images: [
        new URL("../assets/images/Honor-Magic-7-Pro.webp", import.meta.url)
          .href,
        new URL("../assets/images/Honor-Magic-7-Pro-2.jpg", import.meta.url)
          .href,
        new URL("../assets/images/Honor-Magic-7-Pro-3.jpg", import.meta.url)
          .href,
      ],
      description: `A sleek high-performance smartphone with a strong camera system and elegant build.
Perfect for fast browsing, vibrant media, and everyday productivity.`,
      specs: {
        storage: "256GB",
        ram: "12GB",
        battery: "4,600 mAh",
        frontCamera: "16MP",
        backCamera: "50MP + 50MP + 20MP",
      },
    },
    {
      id: 4,
      slug: "oppo-find-x8-pro",
      title: "Oppo Find X8 Pro",
      price: 3499,
      images: [
        new URL("../assets/images/oppo-find-x8-pro.png", import.meta.url).href,
        new URL("../assets/images/oppo-find-x8-pro-2.jpg", import.meta.url)
          .href,
        new URL("../assets/images/oppo-find-x8-pro-3.jpg", import.meta.url)
          .href,
      ],
      description: `A premium Android device with a stunning display and powerful chipset.
Engineered for smooth performance, crisp photos, and modern style.`,
      specs: {
        storage: "512GB",
        ram: "12GB",
        battery: "5,000 mAh",
        frontCamera: "32MP",
        backCamera: "50MP + 50MP + 64MP",
      },
    },
  ],
  tablets: [
    {
      id: 5,
      slug: "samsung-galaxy-tab-s10-ultra",
      title: "Samsung Galaxy Tab S10 Ultra",
      price: 4599,
      images: [
        new URL(
          "../assets/images/Samsung-Galaxy-Tab-S10-Ultra.png",
          import.meta.url,
        ).href,
        new URL(
          "../assets/images/Samsung-Galaxy-Tab-S10-Ultra-2.jpg",
          import.meta.url,
        ).href,
        new URL(
          "../assets/images/Samsung-Galaxy-Tab-S10-Ultra-3.jpg",
          import.meta.url,
        ).href,
      ],
      description: `A spacious tablet made for creativity, entertainment, and productivity on the go.
Features a vivid screen and responsive performance for every task.`,
      specs: {
        storage: "512GB",
        ram: "12GB",
        battery: "11,200 mAh",
        frontCamera: "12MP",
        backCamera: "13MP + 6MP",
      },
    },
    {
      id: 6,
      slug: "ipad-pro-m4",
      title: "iPad Pro M4",
      price: 5999,
      images: [
        new URL("../assets/images/ipad-pro-m4.webp", import.meta.url).href,
        new URL("../assets/images/ipad-pro-m4-2.webp", import.meta.url).href,
        new URL("../assets/images/ipad-pro-m4-3.webp", import.meta.url).href,
      ],
      description: `Apple's latest tablet with exceptional performance and a gorgeous Liquid Retina display.
Ideal for work, art, and immersive streaming in a premium package.`,
      specs: {
        storage: "1TB",
        ram: "16GB",
        battery: "10,758 mAh",
        frontCamera: "12MP Ultra Wide",
        backCamera: "12MP Wide + 10MP Ultra Wide",
      },
    },
    {
      id: 7,
      slug: "lenovo-idea-tab-k11-gen2",
      title: "Lenovo Idea Tab K11 Gen2",
      price: 3499,
      images: [
        new URL(
          "../assets/images/Lenovo-Idea-Tab-K11-Gen2.webp",
          import.meta.url,
        ).href,
        new URL(
          "../assets/images/Lenovo-Idea-Tab-K11-Gen2-2.webp",
          import.meta.url,
        ).href,
        new URL(
          "../assets/images/Lenovo-Idea-Tab-K11-Gen2-3.webp",
          import.meta.url,
        ).href,
      ],
      description: `A versatile tablet designed for entertainment, web browsing, and everyday use.
Balanced performance and a clean design for reliable daily productivity.`,
      specs: {
        storage: "256GB",
        ram: "8GB",
        battery: "10,200 mAh",
        frontCamera: "8MP",
        backCamera: "13MP",
      },
    },
    {
      id: 8,
      slug: "xiaomi-pad-5-pearl-white",
      title: "Xiaomi Pad 5 Pearl White",
      price: 2999,
      images: [
        new URL(
          "../assets/images/Xiaomi-Pad-5-Pearl-White.jpg",
          import.meta.url,
        ).href,
        new URL(
          "../assets/images/Xiaomi-Pad-5-Pearl-White-2.jpg",
          import.meta.url,
        ).href,
        new URL(
          "../assets/images/Xiaomi-Pad-5-Pearl-White-3.jpg",
          import.meta.url,
        ).href,
      ],
      description: `A stylish tablet with a sharp display and efficient performance for media and study.
Offers a smooth experience for streaming, reading, and light multitasking.`,
      specs: {
        storage: "256GB",
        ram: "6GB",
        battery: "8,720 mAh",
        frontCamera: "8MP",
        backCamera: "13MP",
      },
    },
  ],
  laptops: [
    {
      id: 9,
      slug: "macbook-pro-retina-14-inch",
      title: "MacBook Pro Retina 14-inch",
      price: 7999,
      images: [
        new URL(
          "../assets/images/MacBook-Pro-Retina-14-Inch.jpg",
          import.meta.url,
        ).href,
        new URL(
          "../assets/images/MacBook-Pro-Retina-14-Inch-2.jpg",
          import.meta.url,
        ).href,
        new URL(
          "../assets/images/MacBook-Pro-Retina-14-Inch-3.jpg",
          import.meta.url,
        ).href,
      ],
      description: `A high-end laptop with a brilliant Retina display and powerful performance.
Built for creative workflows, fast apps, and premium portability.`,
      specs: {
        storage: "1TB SSD",
        ram: "16GB",
        battery: "70Wh",
        frontCamera: "12MP FaceTime HD",
        backCamera: "None",
      },
    },
    {
      id: 10,
      slug: "hp-spectre-x360-14-inch",
      title: "HP Spectre x360 14-inch",
      price: 6999,
      images: [
        new URL("../assets/images/hp-spectre-x360-black.jpg", import.meta.url)
          .href,
        new URL("../assets/images/hp-spectre-x360-black-2.jpg", import.meta.url)
          .href,
        new URL("../assets/images/hp-spectre-x360-black-3.jpg", import.meta.url)
          .href,
      ],
      description: `A premium convertible laptop with sleek design and flexible use modes.
Delivers strong performance and elegant styling for work and play`,
      specs: {
        storage: "1TB SSD",
        ram: "16GB",
        battery: "66Wh",
        frontCamera: "720p HD",
        backCamera: "None",
      },
    },
    {
      id: 11,
      slug: "lenovo-thinkpad-x9-aura-edition",
      title: "Lenovo ThinkPad X9 Aura Edition",
      price: 5999,
      images: [
        new URL(
          "../assets/images/lenovo-thinkPad-x9-aura-edition.webp",
          import.meta.url,
        ).href,
        new URL(
          "../assets/images/lenovo-thinkPad-x9-aura-edition-2.jpg",
          import.meta.url,
        ).href,
        new URL(
          "../assets/images/lenovo-thinkPad-x9-aura-edition-3.jpg",
          import.meta.url,
        ).href,
      ],
      description: `A durable business laptop with responsive performance and refined craftsmanship.
Perfect for productivity, secure work sessions, and everyday portability.`,
      specs: {
        storage: "512GB SSD",
        ram: "16GB",
        battery: "57Wh",
        frontCamera: "1080p HD",
        backCamera: "None",
      },
    },
  ],
};

const allProducts = [
  ...products.phones,
  ...products.tablets,
  ...products.laptops,
];

export default products;
export { allProducts };
