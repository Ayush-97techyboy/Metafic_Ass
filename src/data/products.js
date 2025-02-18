export const products = [
  {
    id: 1,
    title: "Classic Purple Hoodie",
    price: 237.20,
    rating: 4,
    reviews: 128,
    description: "Stay cozy and stylish with our signature purple hoodie. Made from premium cotton blend material for maximum comfort.",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    title: "Striped Sweater",
    price: 189.99,
    rating: 5,
    reviews: 95,
    description: "A timeless striped sweater that combines comfort with style. Perfect for any casual occasion.",
    image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    title: "Denim Jacket",
    price: 299.99,
    rating: 4,
    reviews: 76,
    description: "Classic denim jacket with a modern twist. Features premium stitching and comfortable fit.",
    image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    title: "Casual White T-Shirt",
    price: 49.99,
    rating: 4,
    reviews: 214,
    description: "Essential white t-shirt made from 100% organic cotton. A wardrobe staple.",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&auto=format&fit=crop&q=80"
  }
];

export const mockOrders = [
  {
    id: "ORD001",
    date: "2024-03-15",
    status: "delivered",
    items: [
      {
        ...products[0],
        quantity: 1
      },
      {
        ...products[1],
        quantity: 2
      }
    ]
  },
  {
    id: "ORD002",
    date: "2024-03-18",
    status: "shipped",
    items: [
      {
        ...products[2],
        quantity: 1
      }
    ]
  },
  {
    id: "ORD003",
    date: "2024-03-20",
    status: "processing",
    items: [
      {
        ...products[3],
        quantity: 3
      }
    ]
  }
];