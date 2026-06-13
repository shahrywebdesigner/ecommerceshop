const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const dbconnect = require("./config/db");
const Product = require("./model/productSchema");
const User = require("./model/userSchema");
const Order = require("./model/orderSchema");

dotenv.config();

const products = [
  {
    name: "Wireless Bluetooth Headphones",
    description:
      "Comfortable over-ear headphones with clear sound, deep bass, and long battery life.",
    price: 4999,
    category: "Electronics",
    stock: 25,
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800"],
    rating: 4.5,
    numreviews: 18,
  },
  {
    name: "Smart Fitness Watch",
    description:
      "Track steps, heart rate, sleep, workouts, and notifications from your phone.",
    price: 7999,
    category: "Electronics",
    stock: 15,
    images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800"],
    rating: 4.3,
    numreviews: 22,
  },
  {
    name: "Cotton Casual T-Shirt",
    description:
      "Soft breathable cotton t-shirt for everyday wear with a clean modern fit.",
    price: 1499,
    category: "Clothing",
    stock: 60,
    images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800"],
    rating: 4.1,
    numreviews: 12,
  },
  {
    name: "Leather Running Shoes",
    description:
      "Lightweight shoes with cushioned soles for walking, running, and daily use.",
    price: 6499,
    category: "Footwear",
    stock: 30,
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800"],
    rating: 4.6,
    numreviews: 34,
  },
  {
    name: "Classic Denim Jacket",
    description:
      "Durable denim jacket with button closure and practical front pockets.",
    price: 5499,
    category: "Clothing",
    stock: 20,
    images: ["https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=800"],
    rating: 4.4,
    numreviews: 16,
  },
  {
    name: "Stainless Steel Water Bottle",
    description:
      "Reusable insulated bottle that keeps drinks cold or hot for hours.",
    price: 1999,
    category: "Accessories",
    stock: 45,
    images: ["https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800"],
    rating: 4.2,
    numreviews: 9,
  },
  {
    name: "Minimal Backpack",
    description:
      "Spacious backpack with laptop sleeve, durable zippers, and padded straps.",
    price: 3999,
    category: "Accessories",
    stock: 18,
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800"],
    rating: 4.7,
    numreviews: 27,
  },
  {
    name: "Ceramic Coffee Mug",
    description:
      "Simple ceramic mug with a smooth finish, perfect for coffee or tea.",
    price: 899,
    category: "Home",
    stock: 80,
    images: ["https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800"],
    rating: 4,
    numreviews: 7,
  },
  {
    name: "Gaming Mechanical Keyboard",
    description:
      "RGB mechanical keyboard with tactile switches and a compact layout.",
    price: 8999,
    category: "Electronics",
    stock: 22,
    images: ["https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=800"],
    rating: 4.8,
    numreviews: 41,
  },
  {
    name: "Desk Table Lamp",
    description:
      "Adjustable table lamp with warm light for reading, studying, and working.",
    price: 2499,
    category: "Home",
    stock: 35,
    images: ["https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800"],
    rating: 4.2,
    numreviews: 11,
  },
];

const seedData = async () => {
  try {
    await dbconnect();

    await Product.deleteMany({});
    await User.deleteMany({});
    await Order.deleteMany({});

    const hashedPassword = await bcrypt.hash("123456", 10);

    const users = await User.insertMany([
      {
        name: "Admin User",
        email: "admin@example.com",
        password: hashedPassword,
        role: "admin",
        verified: true,
      },
      {
        name: "Demo User",
        email: "user@example.com",
        password: hashedPassword,
        role: "user",
        verified: true,
      },
    ]);

    const createdProducts = await Product.insertMany(products);

    const orders = [
      {
        user: users[1]._id,
        items: [
          {
            productid: createdProducts[0]._id,
            qty: 1,
            price: createdProducts[0].price,
          },
          {
            productid: createdProducts[2]._id,
            qty: 2,
            price: createdProducts[2].price,
          },
        ],
        totalamount: createdProducts[0].price + createdProducts[2].price * 2,
        address: {
          fullname: "Demo User",
          street: "House 12, Main Street",
          city: "Lahore",
          postcode: "54000",
          country: "Pakistan",
        },
        paymentid: "demo_payment_001",
        status: "pending",
      },
      {
        user: users[1]._id,
        items: [
          {
            productid: createdProducts[3]._id,
            qty: 1,
            price: createdProducts[3].price,
          },
        ],
        totalamount: createdProducts[3].price,
        address: {
          fullname: "Demo User",
          street: "Apartment 8, Mall Road",
          city: "Islamabad",
          postcode: "44000",
          country: "Pakistan",
        },
        paymentid: "demo_payment_002",
        status: "shipped",
      },
      {
        user: users[0]._id,
        items: [
          {
            productid: createdProducts[6]._id,
            qty: 1,
            price: createdProducts[6].price,
          },
          {
            productid: createdProducts[9]._id,
            qty: 1,
            price: createdProducts[9].price,
          },
        ],
        totalamount: createdProducts[6].price + createdProducts[9].price,
        address: {
          fullname: "Admin User",
          street: "Office 21, Business Avenue",
          city: "Karachi",
          postcode: "75500",
          country: "Pakistan",
        },
        paymentid: "demo_payment_003",
        status: "delivered",
      },
    ];

    await Order.insertMany(orders);

    console.log("Dummy data inserted successfully");
    console.log(`Products: ${createdProducts.length}`);
    console.log(`Users: ${users.length}`);
    console.log(`Orders: ${orders.length}`);
    console.log("Login emails: admin@example.com, user@example.com");
    console.log("Password for both users: 123456");
  } catch (error) {
    console.error("Seed error:", error);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

seedData();
