import { PageLayout } from "@/components/layout/page-layout"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { API_CONFIG } from "@/config/api.config"
import { productService } from "@/services/product.service"
import { cartService } from "@/services/cart.service"
import type { Product } from "@/types/api.types"
import { isAuthenticated } from "@/lib/api-client"
import { useNavigate } from "react-router-dom"

export default function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [addingToCart, setAddingToCart] = useState<string | null>(null)
  const [cartMap, setCartMap] = useState<Record<string, number>>({})
  const [qtyMap, setQtyMap] = useState<Record<string, number>>({})
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getProducts({ limit: 12 })
        setProducts(data.products)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load products")
        console.error("Error fetching products:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
    fetchCart()

    // refresh cart map when cartUpdated events are dispatched
    const onCartUpdated = () => fetchCart()
    window.addEventListener('cartUpdated', onCartUpdated)
    return () => window.removeEventListener('cartUpdated', onCartUpdated)
  }, [])

  const fetchCart = async () => {
    try {
      const items = await cartService.getCart()
      const map: Record<string, number> = {}
      items.forEach((it: any) => {
        const prod = typeof it.product === 'object' ? it.product : null
        const id = prod?._id || (typeof it.product === 'string' ? it.product : null)
        if (id) map[id] = it.quantity || 0
      })
      setCartMap(map)
      // initialize qtyMap for products shown - keep existing qty if set
      setQtyMap((prev) => {
        const next = { ...prev }
        Object.keys(map).forEach((id) => {
          if (!next[id]) next[id] = map[id] || 1
        })
        return next
      })
    } catch (err) {
      console.error('Failed to fetch cart for products page', err)
    }
  }

  const handleAddToCart = async (productId: string, qty?: number) => {
    if (!isAuthenticated()) {
      navigate("/login")
      return
    }

    setAddingToCart(productId)
    try {
      const toAdd = typeof qty === 'number' && qty > 0 ? qty : 1
      await cartService.addToCart({ productId, quantity: toAdd })
      // Update local cart map immediately for quicker feedback
      setCartMap((prev) => ({ ...prev, [productId]: (prev[productId] || 0) + toAdd }))
      setQtyMap((prev) => ({ ...prev, [productId]: 1 }))

      // Show success message
      const productName = products.find(p => p._id === productId)?.name || 'Product'
      setError(null)
      // Use a temporary success state
      const successMsg = `✓ Added ${toAdd} x ${productName} to cart!`
      setError(successMsg)
      setTimeout(() => setError(null), 3000)

      // Trigger cart refresh in header by dispatching custom event
      window.dispatchEvent(new Event('cartUpdated'))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add to cart")
    } finally {
      setAddingToCart(null)
    }
  }

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

          {loading && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading products...</p>
            </div>
          )}

          {error && (
            <div className={`${error.startsWith('✓') ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'} border px-4 py-3 rounded-lg text-sm`}>
              {error}
            </div>
          )}
          
          {!loading && !error && products.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products available at the moment.</p>
            </div>
          )}

          {!loading && !error && products.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-card border border-border rounded-lg overflow-hidden group hover:shadow-lg transform hover:-translate-y-1 transition-all cursor-pointer"
                  onClick={() => navigate(`/products/${product._id}`)}
                >
                  {/* Image */}
                  <div className="relative h-48 bg-muted overflow-hidden">
                    {product.image ? (
                      <img
                        src={product.image.startsWith('http') ? product.image : `${API_CONFIG.BASE_URL}${product.image}`}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-6xl">🌿</div>
                    )}
                    {/* Quick view overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                      <div className="text-white">
                        <h4 className="font-semibold text-sm truncate max-w-xs">{product.name}</h4>
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-4 flex flex-col gap-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground text-base line-clamp-2">{product.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{product.description || 'Ayurvedic product'}</p>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-primary">₹{product.price}</span>
                        {cartMap[product._id] > 0 && (
                          <div className="text-xs bg-primary text-white px-2 py-1 rounded">In cart: {cartMap[product._id]}</div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center border border-border rounded-lg overflow-hidden">
                          <button
                            type="button"
                            onClick={() => setQtyMap((prev) => ({ ...prev, [product._id]: Math.max(1, (prev[product._id] || 1) - 1) }))}
                            className="px-3 py-1 bg-muted hover:bg-muted/80"
                          >
                            −
                          </button>
                          <input
                            type="number"
                            value={qtyMap[product._id] || 1}
                            onChange={(e) => {
                              const v = Math.max(1, parseInt(e.target.value || '1') || 1)
                              setQtyMap((prev) => ({ ...prev, [product._id]: v }))
                            }}
                            className="w-16 text-center py-1 bg-transparent outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => setQtyMap((prev) => ({ ...prev, [product._id]: (prev[product._id] || 1) + 1 }))}
                            className="px-3 py-1 bg-muted hover:bg-muted/80"
                          >
                            +
                          </button>
                        </div>

                        <Button
                          size="sm"
                          onClick={() => {
                            const qty = qtyMap[product._id] || 1
                            handleAddToCart(product._id, qty)
                          }}
                          disabled={addingToCart === product._id}
                        >
                          {addingToCart === product._id ? 'Adding...' : 'Add'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  )
}
