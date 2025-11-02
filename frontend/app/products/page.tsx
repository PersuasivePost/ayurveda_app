"use client"

import { PageLayout } from "@/components/layout/page-layout"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"
import { ShoppingCart } from "lucide-react"

// Mock products data
const PRODUCTS = [
  {
    id: 1,
    name: "Ashwagandha Capsules",
    category: "Adaptogens",
    price: 24.99,
    rating: 4.8,
    image: "🌿",
    description: "Premium quality ashwagandha for stress relief and vitality",
    stock: 150,
  },
  {
    id: 2,
    name: "Turmeric with Black Pepper",
    category: "Anti-inflammatory",
    price: 18.99,
    rating: 4.9,
    image: "🌱",
    description: "Golden turmeric for joint health and immunity",
    stock: 200,
  },
  {
    id: 3,
    name: "Brahmi Oil",
    category: "Topical",
    price: 22.99,
    rating: 4.7,
    image: "🧴",
    description: "Traditional brahmi oil for hair and scalp health",
    stock: 89,
  },
  {
    id: 4,
    name: "Triphala Powder",
    category: "Digestive",
    price: 16.99,
    rating: 4.6,
    image: "🌾",
    description: "Classic ayurvedic blend for digestive wellness",
    stock: 120,
  },
  {
    id: 5,
    name: "Sesame Oil (Organic)",
    category: "Oils",
    price: 19.99,
    rating: 4.8,
    image: "🫒",
    description: "Pure organic sesame oil for massage and cooking",
    stock: 180,
  },
  {
    id: 6,
    name: "Neem Leaf Powder",
    category: "Detox",
    price: 20.99,
    rating: 4.5,
    image: "🍃",
    description: "Natural purification and skin wellness support",
    stock: 95,
  },
  {
    id: 7,
    name: "Amla (Indian Gooseberry)",
    category: "Immunity",
    price: 23.99,
    rating: 4.9,
    image: "🫐",
    description: "Vitamin C powerhouse for immunity and vitality",
    stock: 140,
  },
  {
    id: 8,
    name: "Ginger Tea Mix",
    category: "Beverages",
    price: 14.99,
    rating: 4.7,
    image: "☕",
    description: "Warming spiced tea blend for circulation and digestion",
    stock: 160,
  },
]

export default function Products() {
  const [cart, setCart] = useState<number[]>([])
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", ...new Set(PRODUCTS.map((p) => p.category))]
  const filtered = selectedCategory === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === selectedCategory)

  const addToCart = (productId: number) => {
    setCart([...cart, productId])
  }

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 md:py-20 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Authentic Ayurvedic Products</h1>
          <p className="text-lg text-muted-foreground">
            Premium quality herbs, oils, and supplements for your wellness journey
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-8 border-b border-border/40">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <div
                key={product.id}
                className="rounded-lg border border-border/40 bg-card overflow-hidden hover:shadow-lg transition flex flex-col"
              >
                {/* Image */}
                <div className="bg-muted/20 p-8 text-center text-5xl">{product.image}</div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col space-y-3">
                  <div>
                    <p className="text-xs text-primary font-medium uppercase">{product.category}</p>
                    <h3 className="font-semibold text-foreground">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-border/40">
                    <div>
                      <p className="text-lg font-bold text-foreground">${product.price}</p>
                      <p className="text-xs text-muted-foreground">Rating: {product.rating}⭐</p>
                    </div>
                  </div>

                  <Button
                    onClick={() => addToCart(product.id)}
                    className="w-full bg-primary hover:bg-primary/90"
                    size="sm"
                  >
                    <ShoppingCart size={16} className="mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Info */}
      {cart.length > 0 && (
        <section className="w-full px-4 sm:px-6 lg:px-8 py-8 bg-primary/10 sticky bottom-0 border-t border-primary/20">
          <div className="mx-auto max-w-6xl flex items-center justify-between">
            <p className="text-foreground font-semibold">
              {cart.length} item{cart.length > 1 ? "s" : ""} in cart - ${(cart.length * 20).toFixed(2)} (approx)
            </p>
            <Link href="/checkout">
              <Button className="bg-primary hover:bg-primary/90">Proceed to Checkout</Button>
            </Link>
          </div>
        </section>
      )}
    </PageLayout>
  )
}
