import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'

const StatCard = ({ label, value, icon, color }) => (
  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex items-center gap-4">
    <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{value ?? '—'}</p>
    </div>
  </div>
)

export default function AdminDashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [stats, setStats] = useState(null)
  const [users, setUsers] = useState([])
  const [vendors, setVendors] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.get('/admin/stats'),
      api.get('/admin/users?limit=5'),
      api.get('/admin/vendors?limit=5'),
      api.get('/admin/orders?limit=5'),
    ])
      .then(([statsRes, usersRes, vendorsRes, ordersRes]) => {
        setStats(statsRes.data.data)
        setUsers(usersRes.data.data.users || [])
        setVendors(vendorsRes.data.data || [])
        setOrders(ordersRes.data.data.orders || [])
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const handleLogout = () => { logout(); navigate('/login') }

  const statusBadge = (status) => {
    const map = {
      PENDING: 'bg-yellow-100 text-yellow-700',
      ACTIVE: 'bg-green-100 text-green-700',
      CONFIRMED: 'bg-blue-100 text-blue-700',
      SHIPPED: 'bg-indigo-100 text-indigo-700',
      DELIVERED: 'bg-green-100 text-green-700',
      CANCELLED: 'bg-red-100 text-red-700',
      SUSPENDED: 'bg-red-100 text-red-700',
      BLOCKED: 'bg-red-100 text-red-700',
      CUSTOMER: 'bg-gray-100 text-gray-700',
      VENDOR: 'bg-purple-100 text-purple-700',
      ADMIN: 'bg-indigo-100 text-indigo-700',
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
          <span className="text-xl font-extrabold text-indigo-600">Skaviyo</span>
          <span className="text-gray-300">|</span>
          <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Admin Panel</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-800">{user?.name}</p>
            <p className="text-xs text-gray-400">{user?.email}</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-red-500 hover:text-red-700 font-medium transition"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-500 text-sm mt-1">
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Stat cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard label="Total Users" value={stats?.totalUsers} icon="👥" color="bg-indigo-500" />
              <StatCard label="Total Products" value={stats?.totalProducts} icon="👗" color="bg-purple-500" />
              <StatCard label="Total Orders" value={stats?.totalOrders} icon="📦" color="bg-pink-500" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Users */}
              <section className="bg-white rounded-xl border border-gray-100 shadow-sm">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="font-semibold text-gray-800">Recent Users</h2>
                  <span className="text-xs text-gray-400">Latest 5</span>
                </div>
                <div className="divide-y divide-gray-50">
                  {users.length === 0 ? (
                    <p className="text-sm text-gray-400 text-center py-6">No users found</p>
                  ) : users.map((u) => (
                    <div key={u.id} className="px-6 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold text-sm">
                          {u.name?.[0]?.toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">{u.name}</p>
                          <p className="text-xs text-gray-400">{u.email}</p>
                        </div>
                      </div>
                      {statusBadge(u.role)}
                    </div>
                  ))}
                </div>
              </section>

              {/* Recent Vendors */}
              <section className="bg-white rounded-xl border border-gray-100 shadow-sm">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="font-semibold text-gray-800">Recent Vendors</h2>
                  <span className="text-xs text-gray-400">Latest 5</span>
                </div>
                <div className="divide-y divide-gray-50">
                  {vendors.length === 0 ? (
                    <p className="text-sm text-gray-400 text-center py-6">No vendors found</p>
                  ) : vendors.map((v) => (
                    <div key={v.id} className="px-6 py-3 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-800">{v.store_name}</p>
                        <p className="text-xs text-gray-400">{v.user?.email}</p>
                      </div>
                      {statusBadge(v.status)}
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Recent Orders */}
            <section className="bg-white rounded-xl border border-gray-100 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="font-semibold text-gray-800">Recent Orders</h2>
                <span className="text-xs text-gray-400">Latest 5</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                    <tr>
                      <th className="px-6 py-3 text-left">Order #</th>
                      <th className="px-6 py-3 text-left">Customer</th>
                      <th className="px-6 py-3 text-left">Amount</th>
                      <th className="px-6 py-3 text-left">Status</th>
                      <th className="px-6 py-3 text-left">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {orders.length === 0 ? (
                      <tr><td colSpan={5} className="text-center py-6 text-gray-400">No orders yet</td></tr>
                    ) : orders.map((o) => (
                      <tr key={o.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-3 font-mono text-indigo-600 font-medium">{o.order_number}</td>
                        <td className="px-6 py-3 text-gray-700">{o.user?.name || o.customer_name}</td>
                        <td className="px-6 py-3 font-semibold text-gray-800">₹{Number(o.total_amount).toLocaleString('en-IN')}</td>
                        <td className="px-6 py-3">{statusBadge(o.order_status)}</td>
                        <td className="px-6 py-3 text-gray-400">{new Date(o.created_at).toLocaleDateString('en-IN')}</td>
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
