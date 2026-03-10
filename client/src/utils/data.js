const products = [
  // Bags
  {
    id: "1",
    name: "Premium Leather Bag",
    price: 65000,
    category: "Bags",
    image: "/images/products/bags/Bag1.jpg",
    description: "Handcrafted premium leather bag with multiple compartments."
  },
  {
    id: "1a",
    name: "Designer Leather Bag",
    price: 68000,
    category: "Bags",
    image: "/images/products/bags/Bag2.jpg",
    description: "Elegant designer leather bag for professionals."
  },
  {
    id: "1b",
    name: "Classic Handbag - Brown",
    price: 62000,
    category: "Bags",
    image: "/images/products/bags/Crossbag.jpg",
    description: "Classic brown handbag with timeless design."
  },
  {
    id: "1c",
    name: "Luxury Tote Bag",
    price: 70000,
    category: "Bags",
    image: "/images/products/bags/Crossbag.jpg",
    description: "Spacious luxury tote bag for everyday use."
  },
  {
    id: "1d",
    name: "Designer Crossbody Bag",
    price: 58000,
    category: "Bags",
    image: "/images/products/bags/Crossbag1.jpg",
    description: "Compact crossbody bag with elegant design."
  },
  {
    id: "1e",
    name: "Executive Briefcase",
    price: 75000,
    category: "Bags",
    image: "/images/products/bags/Crossbag2.jpg",
    description: "Professional briefcase for business executives."
  },
  {
    id: "1f",
    name: "Premium Backpack",
    price: 55000,
    category: "Bags",
    image: "/images/products/bags/Crossbag3.jpg",
    description: "Stylish and functional premium backpack."
  },

  // Belts
  {
    id: "2",
    name: "Classic Leather Belt",
    price: 15000,
    category: "Belts",
    image: "/images/products/belts/Belt1.jpg",
    description: "Classic leather belt with gold buckle."
  },
  {
    id: "2a",
    name: "Designer Belt - Black",
    price: 18000,
    category: "Belts",
    image: "/images/products/belts/Belt2.jpg",
    description: "Sophisticated black designer belt."
  },
  {
    id: "2b",
    name: "Premium Leather Belt",
    price: 16000,
    category: "Belts",
    image: "/images/products/belts/Belt3.jpg",
    description: "Premium quality leather belt."
  },
  {
    id: "2c",
    name: "Casual Belt - Brown",
    price: 14000,
    category: "Belts",
    image: "/images/products/belts/Belt4.jpg",
    description: "Casual brown belt for everyday wear."
  },
  {
    id: "2d",
    name: "Executive Belt",
    price: 20000,
    category: "Belts",
    image: "/images/products/belts/Belt5.jpg",
    description: "Executive belt with premium buckle."
  },
  {
    id: "2e",
    name: "Designer Belt - Tan",
    price: 17000,
    category: "Belts",
    image: "/images/products/belts/Belt6.jpg",
    description: "Designer tan leather belt."
  },
  {
    id: "2f",
    name: "Formal Belt - Black",
    price: 19000,
    category: "Belts",
    image: "/images/products/belts/Belt7.jpg",
    description: "Formal black belt for special occasions."
  },
  {
    id: "2g",
    name: "Reversible Belt",
    price: 21000,
    category: "Belts",
    image: "/images/products/belts/Belt8.jpg",
    description: "Versatile reversible belt."
  },

  // Boxes
  {
    id: "3",
    name: "Luxury Gift Box",
    price: 25000,
    category: "Boxes",
    image: "/images/products/boxes/Box.jpg",
    description: "Elegant luxury gift box."
  },
  {
    id: "3a",
    name: "Watch Storage Box",
    price: 28000,
    category: "Boxes",
    image: "/images/products/boxes/Box1.jpg",
    description: "Premium watch storage box with velvet interior."
  },
  {
    id: "3b",
    name: "Jewelry Box - Wooden",
    price: 22000,
    category: "Boxes",
    image: "/images/products/boxes/Box2.jpg",
    description: "Handcrafted wooden jewelry box."
  },
  {
    id: "3c",
    name: "Gift Box Set",
    price: 30000,
    category: "Boxes",
    image: "/images/products/boxes/Box3.jpg",
    description: "Premium gift box set for luxury items."
  },
  {
    id: "3d",
    name: "Display Box",
    price: 26000,
    category: "Boxes",
    image: "/images/products/boxes/Box4.jpg",
    description: "Elegant display box for collectibles."
  },
  {
    id: "3e",
    name: "Storage Box - Premium",
    price: 24000,
    category: "Boxes",
    image: "/images/products/boxes/Box5.jpg",
    description: "Premium storage box with compartments."
  },

  // Sunglasses
  {
    id: "4",
    name: "Classic Aviator Sunglasses",
    price: 35000,
    category: "Sunglasses",
    image: "/images/products/sunglasses/Glass3.jpg",
    description: "Timeless aviator sunglasses with UV protection."
  },
  {
    id: "4a",
    name: "Designer Wayfarer",
    price: 38000,
    category: "Sunglasses",
    image: "/images/products/sunglasses/Glass4.jpg",
    description: "Modern wayfarer style with polarized lenses."
  },
  {
    id: "4b",
    name: "Sport Sunglasses",
    price: 32000,
    category: "Sunglasses",
    image: "/images/products/sunglasses/Glass5.jpg",
    description: "High-performance sport sunglasses."
  },
  {
    id: "4c",
    name: "Luxury Sunglasses",
    price: 42000,
    category: "Sunglasses",
    image: "/images/products/sunglasses/Glass6.jpg",
    description: "Premium luxury sunglasses."
  },
  {
    id: "4d",
    name: "Fashion Sunglasses",
    price: 36000,
    category: "Sunglasses",
    image: "/images/products/sunglasses/Glass7.jpg",
    description: "Trendy fashion sunglasses."
  },
  {
    id: "4e",
    name: "Designer Sunglasses",
    price: 40000,
    category: "Sunglasses",
    image: "/images/products/sunglasses/Glass8.jpg",
    description: "Elegant designer sunglasses."
  },

  // Wallets
  {
    id: "5",
    name: "Leather Wallet - Brown",
    price: 28000,
    category: "Wallets",
    image: "/images/products/wallets/Wallet1.jpg",
    description: "Genuine leather wallet with multiple card slots."
  },
  {
    id: "5a",
    name: "Leather Wallet - Black",
    price: 28000,
    category: "Wallets",
    image: "/images/products/wallets/Wallet2.jpg",
    description: "Sleek black leather wallet with RFID protection."
  },
  {
    id: "5b",
    name: "Minimalist Wallet",
    price: 22000,
    category: "Wallets",
    image: "/images/products/wallets/Wallet3.jpg",
    description: "Compact minimalist wallet for essentials."
  },
  {
    id: "5c",
    name: "Premium Wallet",
    price: 30000,
    category: "Wallets",
    image: "/images/products/wallets/Wallet4.jpg",
    description: "Premium quality leather wallet."
  },
  {
    id: "5d",
    name: "Designer Wallet",
    price: 32000,
    category: "Wallets",
    image: "/images/products/wallets/Wallet5.jpg",
    description: "Designer wallet with signature style."
  },
  {
    id: "5e",
    name: "Executive Wallet",
    price: 35000,
    category: "Wallets",
    image: "/images/products/wallets/Wallet6.jpg",
    description: "Executive wallet for professionals."
  },
  {
    id: "5f",
    name: "Bifold Wallet",
    price: 26000,
    category: "Wallets",
    image: "/images/products/wallets/Wallet7.jpg",
    description: "Classic bifold wallet design."
  },
  {
    id: "5g",
    name: "Cardholder Wallet",
    price: 24000,
    category: "Wallets",
    image: "/images/products/wallets/Wallet8.jpg",
    description: "Slim cardholder wallet."
  },
  {
    id: "5h",
    name: "Travel Wallet",
    price: 38000,
    category: "Wallets",
    image: "/images/products/wallets/Wallet9.jpg",
    description: "Spacious travel wallet with passport slot."
  },

  // Watches
  {
    id: "6",
    name: "Luxury Watch - Gold",
    price: 85000,
    category: "Watches",
    image: "/images/products/watches/lux.jpg",
    description: "Timeless luxury watch in gold finish."
  },
  {
    id: "6a",
    name: "Premium Watch - Silver",
    price: 95000,
    category: "Watches",
    image: "/images/products/watches/lux1.jpg",
    description: "Sophisticated premium watch with silver finish."
  },
  {
    id: "6b",
    name: "Designer Watch",
    price: 88000,
    category: "Watches",
    image: "/images/products/watches/lux3.jpg",
    description: "Elegant designer watch."
  },
  {
    id: "6c",
    name: "Sport Chronograph",
    price: 75000,
    category: "Watches",
    image: "/images/products/watches/lux4.jpg",
    description: "Sporty chronograph watch with multiple functions."
  },
  {
    id: "6d",
    name: "Executive Watch",
    price: 92000,
    category: "Watches",
    image: "/images/products/watches/lux5.jpg",
    description: "Executive watch for professionals."
  },
  {
    id: "6e",
    name: "Automatic Watch",
    price: 98000,
    category: "Watches",
    image: "/images/products/watches/lux6.jpg",
    description: "Premium automatic watch."
  },
  {
    id: "6f",
    name: "Classic Watch",
    price: 80000,
    category: "Watches",
    image: "/images/products/watches/lux7.jpg",
    description: "Classic timepiece with timeless design."
  },
  {
    id: "6g",
    name: "Modern Watch",
    price: 82000,
    category: "Watches",
    image: "/images/products/watches/lux8.jpg",
    description: "Modern watch with contemporary style."
  },

  // Plated Items
  {
    id: "7",
    name: "Gold Plated Chain",
    price: 45000,
    category: "Plated",
    image: "/images/products/plated/Plated1.jpg",
    description: "18k gold plated chain necklace."
  },
  {
    id: "7a",
    name: "Silver Plated Bracelet",
    price: 35000,
    category: "Plated",
    image: "/images/products/plated/Plated2.jpg",
    description: "Elegant silver plated bracelet."
  },
  {
    id: "7b",
    name: "Gold Plated Set",
    price: 52000,
    category: "Plated",
    image: "/images/products/plated/Plated4.jpg",
    description: "Premium gold plated jewelry set."
  },
  {
    id: "7c",
    name: "Designer Plated Jewelry",
    price: 48000,
    category: "Plated",
    image: "/images/products/plated/Plated5.jpg",
    description: "Designer plated jewelry collection."
  },
  {
    id: "7d",
    name: "Luxury Plated Accessories",
    price: 55000,
    category: "Plated",
    image: "/images/products/plated/Plated6.jpg",
    description: "Luxury plated accessories set."
  },
  {
    id: "7d",
    name: "Luxury Plated Accessories",
    price: 55000,
    category: "Plated",
    image: "/images/products/plated/Plated6.jpg",
    description: "Luxury plated accessories set."
  },
  {
    id: "7d",
    name: "Luxury Plated Accessories",
    price: 55000,
    category: "Plated",
    image: "/images/products/plated/Plated6.jpg",
    description: "Luxury plated accessories set."
  },
  {
    id: "7d",
    name: "Luxury Plated Accessories",
    price: 55000,
    category: "Plated",
    image: "/images/products/plated/Plated6.jpg",
    description: "Luxury plated accessories set."
  },
  {
    id: "7d",
    name: "Luxury Plated Accessories",
    price: 55000,
    category: "Plated",
    image: "/images/products/plated/Plated6.jpg",
    description: "Luxury plated accessories set."
  },
  {
    id: "7d",
    name: "Luxury Plated Accessories",
    price: 55000,
    category: "Plated",
    image: "/images/products/plated/Plated6.jpg",
    description: "Luxury plated accessories set."
  },
];

const categories = [
  "All",
  "Bags",
  "Belts",
  "Boxes",
  "Sunglasses",
  "Wallets",
  "Watches",
];

export { products, categories };
