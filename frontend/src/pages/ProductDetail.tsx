import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { API_CONFIG } from '@/config/api.config'
import { PageLayout } from "@/components/layout/page-layout"
import { Button } from "@/components/ui/button"
import { cartService } from '@/services/cart.service'
import { isAuthenticated } from '@/lib/api-client'
import { Star, ChevronLeft, ChevronRight, ShoppingCart, AlertCircle } from 'lucide-react'

interface Product {
  _id: string
  name: string
  price: number
  description?: string
  image?: string
  images?: string[]
  stock?: number
  category?: string
  tags?: string[]
  longDescription?: string
  benefits?: string[]
  usage?: string
  ingredients?: string[]
  avgRating?: number
  reviewCount?: number
}

interface Review {
  _id: string
  userId: string
  userName: string
  rating: number
  title: string
  comment: string
  verified: boolean
  createdAt: string
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [product, setProduct] = useState<Product | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [adding, setAdding] = useState(false)
  const [reviewPage, setReviewPage] = useState(1)
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    comment: ''
  })
  const [submittingReview, setSubmittingReview] = useState(false)

  useEffect(() => {
    fetchProductDetail()
    fetchReviews()
  }, [id])

  const fetchProductDetail = async () => {
    try {
      const response = await fetch(`http://localhost:5000/products/${id}`)
      if (!response.ok) throw new Error('Failed to fetch product')
      const data = await response.json()
      setProduct(data.product)
      setError(null)
    } catch (err) {
      setError('Failed to load product details')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const fetchReviews = async () => {
    try {
      const response = await fetch(`http://localhost:5000/reviews/${id}?page=${reviewPage}&limit=5`)
      if (!response.ok) throw new Error('Failed to fetch reviews')
      const data = await response.json()
      setReviews(data.reviews)
    } catch (err) {
      console.error('Failed to fetch reviews:', err)
    }
  }

  const handleAddToCart = async () => {
    if (!isAuthenticated()) {
      navigate('/login')
      return
    }

    setAdding(true)
    try {
      await cartService.addToCart({ productId: id!, quantity })
      alert(`✓ Added ${quantity} ${product?.name} to cart!`)
      setQuantity(1)
      window.dispatchEvent(new Event('cartUpdated'))
    } catch (err) {
      alert('Failed to add to cart')
      console.error(err)
    } finally {
      setAdding(false)
    }
  }

  const handleSubmitReview = async () => {
    if (!isAuthenticated()) {
      navigate('/login')
      return
    }

    if (!newReview.title || !newReview.comment) {
      alert('Please fill in all fields')
      return
    }

    setSubmittingReview(true)
    try {
      const token = localStorage.getItem('ayurveda_auth_token')
      const response = await fetch(`http://localhost:5000/reviews/${id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newReview)
      })

      if (!response.ok) throw new Error('Failed to submit review')
      
      alert('Review submitted successfully!')
      setNewReview({ rating: 5, title: '', comment: '' })
      fetchReviews()
      fetchProductDetail() // refresh to get updated rating
    } catch (err) {
      alert('Failed to submit review')
      console.error(err)
    } finally {
      setSubmittingReview(false)
    }
  }

  if (loading) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center min-h-[600px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading product...</p>
          </div>
        </div>
      </PageLayout>
    )
  }

  if (error || !product) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center min-h-[600px]">
          <div className="text-center">
            <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
            <p className="text-lg text-muted-foreground">{error || 'Product not found'}</p>
            <Button onClick={() => navigate('/products')} className="mt-4">
              Back to Products
            </Button>
          </div>
        </div>
      </PageLayout>
    )
  }

  const images = product.images && product.images.length > 0 ? product.images : [product.image]
  const currentImage = images[currentImageIndex]

  return (
    <PageLayout>
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="mx-auto max-w-6xl">
          {/* Breadcrumb */}
          <button 
            onClick={() => navigate('/products')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
          >
            ← Back to Products
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative bg-muted rounded-lg overflow-hidden aspect-square">
                {currentImage ? (
                  <img
                    src={currentImage.startsWith('http') ? currentImage : `${API_CONFIG.BASE_URL}${currentImage}`}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl">🌿</div>
                )}
              </div>

              {/* Image Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2">
                  {images.map((img, idx) => (
                    img && (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${
                        idx === currentImageIndex ? 'border-primary' : 'border-muted'
                      }`}
                    >
                      <img
                        src={img.startsWith('http') ? img : `${API_CONFIG.BASE_URL}${img}`}
                        alt="thumbnail"
                        className="w-full h-full object-cover"
                      />
                    </button>
                    )
                  ))}
                </div>
              )}

              {/* Image Navigation Arrows */}
              {images.length > 1 && (
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                    className="p-2 rounded-full bg-muted hover:bg-primary hover:text-white transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <span className="flex items-center px-4 text-sm text-muted-foreground">
                    {currentImageIndex + 1} / {images.length}
                  </span>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}
                    className="p-2 rounded-full bg-muted hover:bg-primary hover:text-white transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              {/* Rating */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={i < Math.floor(product.avgRating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{product.avgRating || 'No'} ({product.reviewCount || 0} reviews)</span>
                </div>
              </div>

              {/* Name & Price */}
              <div>
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                {product.category && (
                  <p className="text-sm text-muted-foreground mb-4">Category: {product.category}</p>
                )}
                <div className="text-3xl font-bold text-primary mb-4">₹{product.price}</div>
              </div>

              {/* Stock Status */}
              {product.stock !== undefined && (
                <div className={`p-3 rounded-lg ${product.stock > 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                  {product.stock > 0 ? `In Stock: ${product.stock} available` : 'Out of Stock'}
                </div>
              )}

              {/* Description */}
              {product.description && (
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground">{product.description}</p>
                </div>
              )}

              {/* Benefits */}
              {product.benefits && product.benefits.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Benefits</h3>
                  <ul className="space-y-1">
                    {product.benefits.map((benefit, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-1">✓</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Ingredients */}
              {product.ingredients && product.ingredients.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Key Ingredients</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.ingredients.map((ingredient, idx) => (
                      <span key={idx} className="px-3 py-1 bg-muted text-sm rounded-full">
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="border-t pt-6">
                <h3 className="font-semibold mb-4">Quantity</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-border rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 text-lg hover:bg-muted transition-colors"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-16 text-center border-x border-border py-2 focus:outline-none"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 text-lg hover:bg-muted transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Add to Cart Button */}
              <Button
                onClick={handleAddToCart}
                disabled={adding || (product.stock !== undefined && product.stock === 0)}
                className="w-full gap-2 py-6 text-lg"
              >
                <ShoppingCart size={20} />
                {adding ? 'Adding to Cart...' : 'Add to Cart'}
              </Button>
            </div>
          </div>

          {/* Additional Information */}
          {(product.longDescription || product.usage) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 pb-12 border-b">
              {product.longDescription && (
                <div>
                  <h2 className="text-xl font-bold mb-4">About This Product</h2>
                  <p className="text-muted-foreground leading-relaxed">{product.longDescription}</p>
                </div>
              )}
              {product.usage && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Usage Instructions</h2>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{product.usage}</p>
                </div>
              )}
            </div>
          )}

          {/* Reviews Section */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold">Customer Reviews</h2>

            {/* Add Review Form */}
            {isAuthenticated() && (
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <h3 className="font-semibold text-lg">Write a Review</h3>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className="p-1 transition-transform hover:scale-110"
                      >
                        <Star
                          size={28}
                          className={star <= newReview.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    placeholder="e.g., Great product!"
                    value={newReview.title}
                    onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Comment</label>
                  <textarea
                    placeholder="Share your experience with this product..."
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>

                <Button
                  onClick={handleSubmitReview}
                  disabled={submittingReview}
                  className="w-full"
                >
                  {submittingReview ? 'Submitting...' : 'Submit Review'}
                </Button>
              </div>
            )}

            {/* Existing Reviews */}
            <div className="space-y-4">
              {reviews.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No reviews yet. Be the first to review!</p>
              ) : (
                <>
                  {reviews.map((review) => (
                    <div key={review._id} className="bg-card border border-border rounded-lg p-6">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">{review.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            by {review.userName}
                            {review.verified && <span className="ml-2 px-2 py-1 bg-green-50 text-green-700 text-xs rounded">Verified Purchase</span>}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <p className="text-muted-foreground">{review.comment}</p>
                    </div>
                  ))}

                  {/* Review Pagination */}
                  <div className="flex justify-center gap-4 mt-6 pt-4 border-t">
                    <Button
                      variant="outline"
                      onClick={() => setReviewPage(Math.max(1, reviewPage - 1))}
                      disabled={reviewPage === 1}
                    >
                      Previous
                    </Button>
                    <span className="flex items-center text-sm text-muted-foreground">
                      Page {reviewPage}
                    </span>
                    <Button
                      variant="outline"
                      onClick={() => setReviewPage(reviewPage + 1)}
                    >
                      Next
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
