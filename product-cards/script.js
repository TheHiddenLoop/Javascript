// Product data array with 50 products across 5 categories
const products = [
  // Electronics Category (10 products)
  {
    id: 1,
    title: "Smartphone X",
    price: 49999,
    description:
      "Latest smartphone with advanced camera and long battery life.",
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&h=350&fit=crop",
  },
  {
    id: 2,
    title: "Laptop Pro",
    price: 89999,
    description:
      "Powerful laptop for professionals with high-performance specs.",
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=350&fit=crop",
  },
  {
    id: 3,
    title: "Wireless Headphones",
    price: 9999,
    description: "Noise-cancelling headphones with premium sound quality.",
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=350&fit=crop",
  },
  {
    id: 4,
    title: "Smart Watch",
    price: 18999,
    description: "Track your fitness and stay connected with this smart watch.",
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=350&fit=crop",
  },
  {
    id: 5,
    title: "Bluetooth Speaker",
    price: 5999,
    description: "Portable speaker with rich sound and long battery life.",
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=350&fit=crop",
  },
  {
    id: 6,
    title: "Tablet Ultra",
    price: 29999,
    description: "Slim and powerful tablet for work and entertainment.",
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=350&fit=crop",
  },
  {
    id: 7,
    title: "Gaming Console",
    price: 39999,
    description: "Next-gen gaming console for immersive gaming experience.",
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?w=500&h=350&fit=crop",
  },
  {
    id: 8,
    title: "Wireless Earbuds",
    price: 8999,
    description: "True wireless earbuds with crystal clear sound.",
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&h=350&fit=crop",
  },
  {
    id: 9,
    title: "4K Smart TV",
    price: 59999,
    description: "Ultra HD smart TV with built-in streaming services.",
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&h=350&fit=crop",
  },
  {
    id: 10,
    title: "Digital Camera",
    price: 44999,
    description: "Professional digital camera for stunning photography.",
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&h=350&fit=crop",
  },

  // Clothing Category (10 products)
  {
    id: 11,
    title: "Men's T-Shirt",
    price: 1499,
    description: "Comfortable cotton t-shirt for everyday wear.",
    category: "clothing",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=350&fit=crop",
  },
  {
    id: 12,
    title: "Women's Jeans",
    price: 2999,
    description: "Stylish and comfortable jeans for women.",
    category: "clothing",
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&h=350&fit=crop",
  },
  {
    id: 13,
    title: "Winter Jacket",
    price: 5999,
    description: "Warm winter jacket with water-resistant material.",
    category: "clothing",
    image:
      "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=500&h=350&fit=crop",
  },
  {
    id: 14,
    title: "Running Shoes",
    price: 4999,
    description: "Lightweight running shoes for optimal performance.",
    category: "clothing",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=350&fit=crop",
  },
  {
    id: 15,
    title: "Summer Dress",
    price: 2499,
    description: "Floral summer dress perfect for warm weather.",
    category: "clothing",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500&h=350&fit=crop",
  },
  {
    id: 16,
    title: "Men's Formal Shirt",
    price: 1999,
    description: "Elegant formal shirt for professional settings.",
    category: "clothing",
    image:
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=500&h=350&fit=crop",
  },
  {
    id: 17,
    title: "Women's Sweater",
    price: 2799,
    description: "Cozy knit sweater for fall and winter seasons.",
    category: "clothing",
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&h=350&fit=crop",
  },
  {
    id: 18,
    title: "Casual Shorts",
    price: 1799,
    description: "Comfortable shorts for casual summer days.",
    category: "clothing",
    image:
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&h=350&fit=crop",
  },
  {
    id: 19,
    title: "Athletic Leggings",
    price: 2299,
    description: "High-performance leggings for workouts and yoga.",
    category: "clothing",
    image:
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500&h=350&fit=crop",
  },
  {
    id: 20,
    title: "Beanie Hat",
    price: 999,
    description: "Warm beanie hat for cold winter days.",
    category: "clothing",
    image:
      "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=500&h=350&fit=crop",
  },

  // Home & Kitchen Category (10 products)
  {
    id: 21,
    title: "Coffee Maker",
    price: 4999,
    description: "Programmable coffee maker for your morning brew.",
    category: "home",
    image:
      "https://images.unsplash.com/photo-1570486829859-74609252df39?w=500&h=350&fit=crop",
  },
  {
    id: 22,
    title: "Blender",
    price: 3499,
    description: "Powerful blender for smoothies and food preparation.",
    category: "home",
    image:
      "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=500&h=350&fit=crop",
  },
  {
    id: 23,
    title: "Bedding Set",
    price: 5999,
    description: "Soft and comfortable bedding set for a good night's sleep.",
    category: "home",
    image:
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500&h=350&fit=crop",
  },
  {
    id: 24,
    title: "Kitchen Knife Set",
    price: 4499,
    description: "Professional kitchen knife set for cooking enthusiasts.",
    category: "home",
    image:
      "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=500&h=350&fit=crop",
  },
  {
    id: 25,
    title: "Toaster",
    price: 2499,
    description: "2-slice toaster with multiple browning settings.",
    category: "home",
    image:
      "https://images.unsplash.com/photo-1583729897447-566e95e98d98?w=500&h=350&fit=crop",
  },
  {
    id: 26,
    title: "Throw Pillows",
    price: 1499,
    description: "Decorative throw pillows to enhance your living space.",
    category: "home",
    image:
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=500&h=350&fit=crop",
  },
  {
    id: 27,
    title: "Floor Lamp",
    price: 3999,
    description: "Modern floor lamp for ambient lighting.",
    category: "home",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=350&fit=crop",
  },
  {
    id: 28,
    title: "Cookware Set",
    price: 8999,
    description: "Complete cookware set for all your cooking needs.",
    category: "home",
    image:
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=500&h=350&fit=crop",
  },
  {
    id: 29,
    title: "Vacuum Cleaner",
    price: 10999,
    description: "Powerful vacuum cleaner for efficient cleaning.",
    category: "home",
    image:
      "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500&h=350&fit=crop",
  },
  {
    id: 30,
    title: "Dining Table Set",
    price: 24999,
    description: "Elegant dining table set for family meals.",
    category: "home",
    image:
      "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=500&h=350&fit=crop",
  },

  // Books Category (10 products)
  {
    id: 31,
    title: "Mystery Novel",
    price: 899,
    description: "Thrilling mystery novel that will keep you guessing.",
    category: "books",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&h=350&fit=crop",
  },
  {
    id: 32,
    title: "Cookbook",
    price: 1499,
    description: "Collection of delicious recipes for home cooking.",
    category: "books",
    image:
      "https://images.unsplash.com/photo-1589998059171-988d887df646?w=500&h=350&fit=crop",
  },
  {
    id: 33,
    title: "Science Fiction",
    price: 799,
    description: "Bestselling science fiction novel set in the future.",
    category: "books",
    image:
      "https://images.unsplash.com/photo-1518744386442-2d48ac47a7eb?w=500&h=350&fit=crop",
  },
  {
    id: 34,
    title: "Self-Help Book",
    price: 1199,
    description: "Guide to personal growth and development.",
    category: "books",
    image:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&h=350&fit=crop",
  },
  {
    id: 35,
    title: "History Book",
    price: 1399,
    description: "Comprehensive history book about world events.",
    category: "books",
    image:
      "https://images.unsplash.com/photo-1562232573-0305012a8818?w=500&h=350&fit=crop",
  },
  {
    id: 36,
    title: "Children's Book",
    price: 599,
    description: "Illustrated children's book for young readers.",
    category: "books",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&h=350&fit=crop",
  },
  {
    id: 37,
    title: "Biography",
    price: 1099,
    description: "Fascinating biography of an influential figure.",
    category: "books",
    image:
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=500&h=350&fit=crop",
  },
  {
    id: 38,
    title: "Fantasy Novel",
    price: 999,
    description: "Epic fantasy novel with magical adventures.",
    category: "books",
    image:
      "https://images.unsplash.com/photo-1531901599143-ab1f1dbfd440?w=500&h=350&fit=crop",
  },
  {
    id: 39,
    title: "Business Book",
    price: 1299,
    description: "Insightful book on business strategies and success.",
    category: "books",
    image:
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=500&h=350&fit=crop",
  },
  {
    id: 40,
    title: "Poetry Collection",
    price: 999,
    description: "Beautiful collection of contemporary poetry.",
    category: "books",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&h=350&fit=crop",
  },

  // Sports & Outdoors Category (10 products)
  {
    id: 41,
    title: "Yoga Mat",
    price: 1999,
    description: "Non-slip yoga mat for comfortable practice.",
    category: "sports",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500&h=350&fit=crop",
  },
  {
    id: 50,
    title: "Soccer Ball",
    price: 1999,
    description: "Professional soccer ball for training and matches.",
    category: "sports",
    image:
      "https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?w=500&h=350&fit=crop",
  },
  {
    id: 42,
    title: "Dumbbells Set",
    price: 3499,
    description: "Set of adjustable dumbbells for home workouts.",
    category: "sports",
    image:
      "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=500&h=350&fit=crop",
  },
  {
    id: 43,
    title: "Tennis Racket",
    price: 4499,
    description: "Professional tennis racket for players of all levels.",
    category: "sports",
    image:
      "https://images.unsplash.com/photo-1617083934555-ac7d9cda2b1a?w=500&h=350&fit=crop",
  },
  {
    id: 44,
    title: "Hiking Backpack",
    price: 4999,
    description: "Durable hiking backpack with multiple compartments.",
    category: "sports",
    image:
      "https://images.unsplash.com/photo-1501554728187-ce583db33af7?w=500&h=350&fit=crop",
  },
  {
    id: 45,
    title: "Basketball",
    price: 1799,
    description: "Official size basketball for indoor and outdoor play.",
    category: "sports",
    image:
      "https://images.unsplash.com/photo-1519861531473-9200262188bf?w=500&h=350&fit=crop",
  },
  {
    id: 46,
    title: "Camping Tent",
    price: 8999,
    description: "Waterproof camping tent for outdoor adventures.",
    category: "sports",
    image:
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=500&h=350&fit=crop",
  },
  {
    id: 47,
    title: "Fitness Tracker",
    price: 6999,
    description: "Advanced fitness tracker to monitor your workouts.",
    category: "sports",
    image:
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd6b0?w=500&h=350&fit=crop",
  },
  {
    id: 48,
    title: "Bicycle",
    price: 24999,
    description: "Mountain bike for off-road cycling adventures.",
    category: "sports",
    image:
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500&h=350&fit=crop",
  },
  {
    id: 49,
    title: "Swimming Goggles",
    price: 1299,
    description: "Anti-fog swimming goggles for clear underwater vision.",
    category: "sports",
    image:
      "https://images.unsplash.com/photo-1560090995-01632a28895b?w=500&h=350&fit=crop",
  },
  {
    id: 50,
    title: "Soccer Ball",
    price: 1999,
    description: "Professional soccer ball for training and matches.",
    category: "sports",
    image:
      "https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?w=500&h=350&fit=crop",
  },
  {
    id: 51,
    title: "Basketball",
    price: 2499,
    description: "Durable basketball suitable for indoor and outdoor play.",
    category: "sports",
    image: "https://images.unsplash.com/photo-1640576905072-8181534f83ae?w=500&h=350&fit=crop",
  },
  {
    id: 52,
    title: "Tennis Racket",
    price: 4599,
    description: "Lightweight tennis racket for professional gameplay.",
    category: "sports",
    image: "https://plus.unsplash.com/premium_photo-1661501222517-4e6972d2e080?w=500&h=350&fit=crop",
  },
  {
    id: 53,
    title: "Baseball Glove",
    price: 1799,
    description: "High-quality leather glove for baseball players.",
    category: "sports",
    image: "https://images.unsplash.com/photo-1652379641734-00ae9345076d?w=500&h=350&fit=crop",
  },
  {
    id: 54,
    title: "Cricket Bat",
    price: 3299,
    description: "Premium wooden bat suitable for all levels of play.",
    category: "sports",
    image: "https://plus.unsplash.com/premium_photo-1679690884144-1f43b8f3bf41?w=500&h=350&fit=crop",
  },
  {
    id: 55,
    title: "Sports Sneakers",
    price: 4000,
    description: "Premium comfirtable suitable for all levels of play.",
    category: "sports",
    image: "https://images.unsplash.com/photo-1621930997123-12b382615241?w=500&h=350&fit=crop",
  }
];

function generateProductCards(productsArray) {
  const productsContainer = document.getElementById("products-container");
  productsContainer.innerHTML = "";
  const select = document.getElementById("filter");

  productsArray.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";
    let categoryDisplayName;
    switch (product.category) {
      case "electronics":
        categoryDisplayName = "Electronics";
        break;
      case "clothing":
        categoryDisplayName = "Clothing";
        break;
      case "home":
        categoryDisplayName = "Home & Kitchen";
        break;
      case "books":
        categoryDisplayName = "Books";
        break;
      case "sports":
        categoryDisplayName = "Sports & Outdoors";
        break;
      default:
        categoryDisplayName = product.category;
    }
    card.innerHTML = `<img src="${
      product.image
    }" alt="img" class="product-image" >
        <div class="product-info">
                <span class="product-category category-${
                  product.category
                }">${categoryDisplayName}</span>
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">₹${product.price.toLocaleString(
                  "en-IN"
                )}</p>
                <p class="product-description">${product.description}</p>
                <button class="btn-add-to-cart">Add to Cart</button>
            </div>
        `;

    productsContainer.appendChild(card);
  });
}

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const dateFilter = document.getElementById("dateFilter");

function filterDocuments() {
  const searchTerm = searchInput.value.toLowerCase();
  const category = categoryFilter.value;
  const priceLimit = parseInt(dateFilter.value);

  const filtered = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm);
    const matchesCategory = category === "all" || product.category === category;
    const matchesPrice = isNaN(priceLimit) || product.price >= priceLimit;

    return matchesSearch && matchesCategory && matchesPrice;
  });
  generateProductCards(filtered);
}

searchInput.addEventListener("input", filterDocuments);
categoryFilter.addEventListener("change", filterDocuments);
dateFilter.addEventListener("change", filterDocuments);

document.addEventListener("DOMContentLoaded", () => {
  generateProductCards(products);
});
