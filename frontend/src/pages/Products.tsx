import { PageLayout } from "@/components/layout/page-layout"
import { Button } from "@/components/ui/button"

export default function Products() {
  const products = [
    { id: "1", name: "Ashwagandha Capsules", price: "₹24.99", category: "Supplements" },
    { id: "2", name: "Triphala Powder", price: "₹19.99", category: "Digestion" },
    { id: "3", name: "Brahmi Oil", price: "₹29.99", category: "Hair Care" },
    { id: "4", name: "Turmeric Curcumin", price: "₹22.99", category: "Immunity" },
  ]

  return (
    <PageLayout>
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="mx-auto max-w-6xl space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Ayurvedic Products</h1>
            <p className="text-lg text-muted-foreground">
              Authentic herbs, supplements, and remedies from trusted sources
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="w-full h-40 bg-muted rounded-md flex items-center justify-center text-4xl">
                  🌿
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{product.name}</h3>
                  <p className="text-xs text-muted-foreground">{product.category}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">{product.price}</span>
                  <Button size="sm">Add to Cart</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
