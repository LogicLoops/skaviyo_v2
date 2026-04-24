import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'

const StatCard = ({ label, value, icon, color }) => (
  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex items-center gap-4">
    <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{value ?? '—'}</p>
    </div>
  </div>
)

export default function VendorDashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [profile, setProfile] = useState(null)
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.get('/vendors/profile'),
      api.get('/vendors/orders?limit=5'),
      api.get('/products?limit=5'),
    ])
      .then(([profileRes, ordersRes, productsRes]) => {
        setProfile(profileRes.data.data)
        setOrders(ordersRes.data.data || [])
        setProducts(productsRes.data.data?.products || [])
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const handleLogout = () => { logout(); navigate('/login') }

  const statusBadge = (status) => {
    const map = {
      PENDING: 'bg-yellow-100 text-yellow-700',
      SHIPPED: 'bg-indigo-100 text-indigo-700',
      DELIVERED: 'bg-green-100 text-green-700',
      CANCELLED: 'bg-red-100 text-red-700',
    }
    return (
      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${map[status] || 'bg-gray-100 text-gray-600'}`}>
        {status}
      </span>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Topbar */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl font-extrabold text-purple-600">Skaviyo</span>
          <span className="text-gray-300">|</span>
          <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Vendor Panel</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-800">{profile?.store_name || user?.name}</p>
            <p className="text-xs text-gray-400">{user?.email}</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-sm">
            {(profile?.store_name || user?.name)?.[0]?.toUpperCase()}
          </div>
          <button onClick={handleLogout} className="text-sm text-red-500 hover:text-red-700 font-medium transition">
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Vendor Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your store, products and orders</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Store info banner */}
            {profile && (
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 text-white flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">{profile.store_name}</h2>
                  <p className="text-purple-200 text-sm mt-1">
                    Status: <span className={`font-semibold ${profile.status === 'ACTIVE' ? 'text-green-300' : 'text-yellow-300'}`}>{profile.status}</span>
                  </p>
                  {profile.gst_number && <p className="text-purple-200 text-xs mt-1">GST: {profile.gst_number}</p>}
                </div>
                <div className="text-5xl opacity-30">🏪</div>
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard label="Total Orders" value={orders.length} icon="📦" color="bg-purple-50" />
              <StatCard label="My Products" value={products.length} icon="👗" color="bg-indigo-50" />
              <StatCard
                label="Pending Items"
                value={orders.filter((o) => o.item_status === 'PENDING').length}
                icon="⏳"
                color="bg-yellow-50"
              />
            </div>

            {/* Recent Orders */}
            <section className="bg-white rounded-xl border border-gray-100 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="font-semibold text-gray-800">Recent Order Items</h2>
                <span className="text-xs text-gray-400">Latest 5</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                    <tr>
                      <th className="px-6 py-3 text-left">Order #</th>
                      <th className="px-6 py-3 text-left">Product</th>
                      <th className="px-6 py-3 text-left">Customer</th>
                      <th className="px-6 py-3 text-left">Qty</th>
                      <th className="px-6 py-3 text-left">Price</th>
                      <th className="px-6 py-3 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {orders.length === 0 ? (
                      <tr><td colSpan={6} className="text-center py-8 text-gray-400">No orders yet</td></tr>
                    ) : orders.map((o) => (
                      <tr key={o.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-3 font-mono text-purple-600 font-medium">{o.order?.order_number}</td>
                        <td className="px-6 py-3 text-gray-700">{o.product_variant?.product?.title}</td>
                        <td className="px-6 py-3 text-gray-600">{o.order?.user?.name}</td>
                        <td className="px-6 py-3 text-gray-600">{o.quantity}</td>
                        <td className="px-6 py-3 font-semibold text-gray-800">₹{Number(o.price).toLocaleString('en-IN')}</td>
                        <td className="px-6 py-3">{statusBadge(o.item_status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* My Products */}
            <section className="bg-white rounded-xl border border-gray-100 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="font-semibold text-gray-800">My Products</h2>
                <button className="text-xs text-purple-600 hover:underline font-medium">+ Add Product</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                    <tr>
                      <th className="px-6 py-3 text-left">Title</th>
                      <th className="px-6 py-3 text-left">Brand</th>
                      <th className="px-6 py-3 text-left">Category</th>
                      <th className="px-6 py-3 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {products.length === 0 ? (
                      <tr><td colSpan={4} className="text-center py-8 text-gray-400">No products found</td></tr>
                    ) : products.map((p) => (
                      <tr key={p.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-3 font-medium text-gray-800">{p.title}</td>
                        <td className="px-6 py-3 text-gray-500">{p.brand || '—'}</td>
                        <td className="px-6 py-3 text-gray-500">{p.category?.name}</td>
                        <td className="px-6 py-3">
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${p.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {p.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  )
}
