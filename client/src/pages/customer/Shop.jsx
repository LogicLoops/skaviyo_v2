import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'

export default function Shop() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.get('/categories'),
      api.get('/products?limit=12'),
    ])
      .then(([catRes, prodRes]) => {
        setCategories(catRes.data.data || [])
        setProducts(prodRes.data.data?.products || [])
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const fetchProducts = () => {
    setLoading(true)
    const params = new URLSearchParams({ limit: 12 })
    if (selectedCategory) params.append('categoryId', selectedCategory)
    if (search) params.append('search', search)
    api.get(`/products?${params}`)
      .then((res) => setProducts(res.data.data?.products || []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }

  const handleLogout = () => { logout(); navigate('/login') }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Topbar */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl font-extrabold text-pink-600">Skaviyo</span>
          <span className="text-gray-300">|</span>
          <span className="text-sm font-semibold text-gray-500">Shop</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Hi, <strong>{user?.name}</strong></span>
          <button onClick={handleLogout} className="text-sm text-red-500 hover:text-red-700 font-medium transition">
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Discover Fashion</h1>
          <p className="text-gray-500 text-sm mt-1">Browse our curated collection</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <input
            type="text"
            placeholder="Search products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 w-64"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <button
            onClick={fetchProducts}
            className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white text-sm rounded-lg font-medium transition"
          >
            Search
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-4xl mb-4">👗</p>
            <p className="text-lg font-medium">No products found</p>
            <p className="text-sm">Try a different search or category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition group">
                <div className="aspect-square bg-gradient-to-br from-pink-50 to-indigo-50 flex items-center justify-center text-5xl">
                  👗
                </div>
                <div className="p-4">
                  <p className="text-xs text-pink-500 font-medium uppercase tracking-wide mb-1">
                    {product.category?.name} • {product.vendor?.store_name}
                  </p>
                  <h3 className="font-semibold text-gray-800 text-sm leading-tight mb-1 truncate">{product.title}</h3>
                  {product.brand && <p className="text-xs text-gray-400 mb-2">{product.brand}</p>}
                  {product.variants?.length > 0 && (
                    <p className="text-base font-bold text-gray-900">
                      ₹{Number(product.variants[0].price).toLocaleString('en-IN')}
                      {product.variants[0].discount_price && (
                        <span className="ml-2 text-xs text-gray-400 line-through">
                          ₹{Number(product.variants[0].discount_price).toLocaleString('en-IN')}
                        </span>
                      )}
                    </p>
                  )}
                  <button className="mt-3 w-full py-2 bg-pink-600 hover:bg-pink-700 text-white text-xs font-semibold rounded-lg transition">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
