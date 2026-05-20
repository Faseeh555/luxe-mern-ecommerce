const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const products = [
  {
    name: "Sony WH-1000XM5 Headphones",
    description: "Industry-leading noise canceling with Dual Noise Sensor technology. Up to 30-hour battery life with quick charging.",
    price: 349.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    stock: 25,
    rating: 4.8,
    reviews: 2341,
    badge: "Hot"
  },
  {
    name: "Apple MacBook Air M3",
    description: "Supercharged by M3 chip. Up to 18 hours battery life. 13.6-inch Liquid Retina display with 8GB RAM.",
    price: 1299.00,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80",
    stock: 12,
    rating: 4.9,
    reviews: 876,
    badge: "New"
  },
  {
    name: "Nike Air Max 270",
    description: "The Nike Air Max 270 delivers visible cushioning under every step. Engineered mesh upper with foam midsole.",
    price: 129.99,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
    stock: 50,
    rating: 4.6,
    reviews: 3210,
    badge: "Sale"
  },
  {
    name: "Atomic Habits - James Clear",
    description: "Transform your habits with tiny changes. No. 1 New York Times bestseller with over 10 million copies sold.",
    price: 18.99,
    category: "Books",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&q=80",
    stock: 100,
    rating: 4.9,
    reviews: 15420,
    badge: "Hot"
  },
  {
    name: "Samsung 4K QLED Smart TV 55\"",
    description: "Quantum HDR technology with 100% Color Volume. Alexa built-in. Object Tracking Sound for immersive audio.",
    price: 899.00,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=500&q=80",
    stock: 8,
    rating: 4.7,
    reviews: 562,
    badge: "Sale"
  },
  {
    name: "Levi's 511 Slim Fit Jeans",
    description: "Classic slim fit from hip to ankle. Made with stretch denim for all-day comfort. Available in multiple washes.",
    price: 59.99,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&q=80",
    stock: 75,
    rating: 4.5,
    reviews: 4890,
    badge: null
  },
  {
    name: "Instant Pot Duo 7-in-1",
    description: "7-in-1 electric pressure cooker: pressure cooker, slow cooker, rice cooker, steamer, sauté, yogurt maker & warmer.",
    price: 89.99,
    category: "Home",
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=500&q=80",
    stock: 35,
    rating: 4.7,
    reviews: 8765,
    badge: "Hot"
  },
  {
    name: "Adidas Ultraboost 22",
    description: "Our most cushioned running shoe. Responsive BOOST midsole returns energy with every stride. Primeknit upper.",
    price: 189.99,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&q=80",
    stock: 30,
    rating: 4.8,
    reviews: 2103,
    badge: "New"
  },
  {
    name: "The Psychology of Money",
    description: "Timeless lessons on wealth, greed, and happiness. Morgan Housel shares 19 short stories exploring people's relationship with money.",
    price: 16.99,
    category: "Books",
    image: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=500&q=80",
    stock: 80,
    rating: 4.8,
    reviews: 9870,
    badge: null
  },
  {
    name: "Dyson V15 Detect Cordless",
    description: "Laser reveals microscopic dust. Automatically adapts suction and reports what it captures. 60-minute runtime.",
    price: 749.99,
    category: "Home",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80",
    stock: 15,
    rating: 4.6,
    reviews: 1203,
    badge: "Limited"
  },
  {
    name: "The Ordinary Skincare Set",
    description: "Complete skincare routine: Niacinamide, Hyaluronic Acid, AHA BHA Peeling. Science-backed formulas for radiant skin.",
    price: 45.00,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=500&q=80",
    stock: 60,
    rating: 4.5,
    reviews: 5640,
    badge: "Sale"
  },
  {
    name: "Canon EOS R50 Mirrorless Camera",
    description: "32.5MP APS-C sensor. 4K video. Eye-tracking AF. Lightweight & compact body perfect for content creators.",
    price: 679.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80",
    stock: 10,
    rating: 4.7,
    reviews: 432,
    badge: "New"
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');
    
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');
    
    const created = await Product.insertMany(products);
    console.log(`✅ Seeded ${created.length} products successfully!`);
    
    mongoose.disconnect();
    console.log('👋 Disconnected from MongoDB');
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
}

seed();
