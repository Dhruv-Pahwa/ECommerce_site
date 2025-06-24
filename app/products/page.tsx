"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Heart } from "lucide-react"

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  category: string
  inStock: boolean
  isNew?: boolean
  isSale?: boolean
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 2000,
    image: "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Rockerz_551_ANC_Pro.347_1.jpg?v=1737546044",
    rating: 4.5,
    reviews: 128,
    category: "Electronics",
    inStock: true,
  },
  {
    id: 2,
    name: "Premium Cotton T-Shirt",
    price: 150,
    image: "https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/22112292/2024/11/8/313a36ea-386e-4e0d-93d6-da3055198f851731084492415-Arrow-Slim-Fit-Cotton-Formal-Shirt-7841731084491903-1.jpg",
    rating: 4.2,
    reviews: 89,
    category: "Clothing",
    inStock: true,
  },
  {
    id: 3,
    name: "Smart Fitness Watch",
    price: 3000,
    image: "https://cdn.thewirecutter.com/wp-content/media/2023/06/fitnesstrackers-2048px-09819-2x1-1.jpg",
    rating: 4.7,
    reviews: 256,
    category: "Electronics",
    inStock: true,
  },
  {
    id: 4,
    name: "Leather Crossbody Bag",
    price: 5000,
    image: "https://rukminim2.flixcart.com/image/750/900/xif0q/backpack/7/9/o/7-for-men-and-women-vegan-leather-school-college-bag-15-bp-right-original-imah9a59skvhyqhy.jpeg",
    rating: 4.4,
    reviews: 67,
    category: "Accessories",
    inStock: true,
  }
]

export default function ProductsPage() {
  const [products] = useState<Product[]>(mockProducts)

  const handleAddToCart = (productId: number) => {
    console.log("Added to cart:", productId)
    // Add to cart logic here
  }

  const handleAddToWishlist = (productId: number) => {
    console.log("Added to wishlist:", productId)
    // Add to wishlist logic here
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : i < rating
              ? "text-yellow-400 fill-current opacity-50"
              : "text-gray-300"
        }`}
      />
    ))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Products</h1>
        <p className="text-gray-600">Discover our amazing collection of products</p>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {products.length} products
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-200">
            <div className="relative overflow-hidden rounded-t-lg">
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={300}
                className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-200"
              />

              {/* Badges */}
              <div className="absolute top-2 left-2 flex flex-col gap-1">
                {product.isNew && <Badge className="bg-green-500 text-white">New</Badge>}
                {product.isSale && <Badge className="bg-red-500 text-white">Sale</Badge>}
                {!product.inStock && <Badge variant="secondary">Out of Stock</Badge>}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => handleAddToWishlist(product.id)}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-gray-50"
              >
                <Heart className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">{renderStars(product.rating)}</div>
                <span className="text-sm text-gray-600">({product.reviews})</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                )}
              </div>

              {/* Category */}
              <Badge variant="outline" className="text-xs">
                {product.category}
              </Badge>
            </CardContent>

            <CardFooter className="p-4 pt-0">
              <Button
                onClick={() => handleAddToCart(product.id)}
                disabled={!product.inStock}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}