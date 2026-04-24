import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// ── Auth ─────────────────────────────────────────────────────────────────────
import LoginPage from './auth/login/Loginpage';

// ── Guards ───────────────────────────────────────────────────────────────────
import ProtectedRoute from './guards/ProtectedRoute';

// ── Layouts ──────────────────────────────────────────────────────────────────
import AdminLayout    from './layouts/AdminLayout';
import VendorLayout   from './layouts/VendorLayout';
import CustomerLayout from './layouts/CustomerLayout';

// ── Admin Pages ──────────────────────────────────────────────────────────────
import Dashboard      from './admin/pages/Dashboard';
import Users          from './admin/pages/Users';
import Vendors        from './admin/pages/Vendors';
import Products       from './admin/pages/Products';
import Categories     from './admin/pages/Categories';
import Orders         from './admin/pages/Orders';
import Reports        from './admin/pages/Reports';
import LimitedEdition from './admin/pages/LimitedEdition';
import Settings       from './admin/pages/Settings';

// ── Vendor Pages ─────────────────────────────────────────────────────────────
import VendorDashboard from './vendor/pages/dashboard';
import VendorProducts  from './vendor/pages/products';
import VendorOrders    from './vendor/pages/orders';
import VendorEarnings  from './vendor/pages/earnings';
import VendorReviews   from './vendor/pages/reviews';
import VendorSettings  from './vendor/pages/settings';

// ── Customer Pages ───────────────────────────────────────────────────────────
import { CartProvider }        from './customer/context/CartContext';
import HomePage                from './customer/pages/HomePage';
import RoyalGentlemenPage      from './customer/pages/RoyalGentlemenPage';
import WomenPage                from './customer/pages/WomenPage';
import CouplesPage              from './customer/pages/CouplesPage';
import GroupTeamPage            from './customer/pages/GroupTeamPage';
import SportsPage               from './customer/pages/SportsPage';
import AnimatedPage             from './customer/pages/AnimatedPage';
import LimitedEditionPage       from './customer/pages/LimitedEditionPage';
import CreateYourOwnPage        from './customer/pages/CreateYourOwnPage';
import ProductDetailPage        from './customer/pages/ProductDetailPage';
import CartPage                 from './customer/pages/CartPage';
import CheckoutPage             from './customer/pages/CheckoutPage';
import OrderConfirmationPage    from './customer/pages/OrderConfirmationPage';
import SupportPage              from './customer/pages/SupportPage';
import AboutPage                from './customer/pages/AboutPage';
import TermsOfServicePage       from './customer/pages/TermsOfServicePage';
import PrivacyPolicyPage        from './customer/pages/PrivacyPolicyPage';
import RefundPolicyPage         from './customer/pages/RefundPolicyPage';
import ShippingPolicyPage       from './customer/pages/ShippingPolicyPage';
import CookiePolicyPage         from './customer/pages/CookiePolicyPage';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* ── Public: Login ────────────────────────────────────────── */}
          <Route path="/" element={<LoginPage />} />

          {/* ── Admin (role: ADMIN) ──────────────────────────────────── */}
          <Route
            element={
              <ProtectedRoute allowedRole="ADMIN">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/admin"                   element={<Dashboard />} />
            <Route path="/admin/users"             element={<Users />} />
            <Route path="/admin/vendors"           element={<Vendors />} />
            <Route path="/admin/products"          element={<Products />} />
            <Route path="/admin/categories"        element={<Categories />} />
            <Route path="/admin/orders"            element={<Orders />} />
            <Route path="/admin/reports"           element={<Reports />} />
            <Route path="/admin/limited-edition"   element={<LimitedEdition />} />
            <Route path="/admin/settings"          element={<Settings />} />
          </Route>

          {/* ── Vendor (role: VENDOR) ────────────────────────────────── */}
          <Route
            element={
              <ProtectedRoute allowedRole="VENDOR">
                <VendorLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/vendor"              element={<VendorDashboard />} />
            <Route path="/vendor/products"     element={<VendorProducts />} />
            <Route path="/vendor/orders"       element={<VendorOrders />} />
            <Route path="/vendor/earnings"     element={<VendorEarnings />} />
            <Route path="/vendor/reviews"      element={<VendorReviews />} />
            <Route path="/vendor/settings"     element={<VendorSettings />} />
          </Route>

          {/* ── Customer (role: CUSTOMER) ────────────────────────────── */}
          <Route
            element={
              <ProtectedRoute allowedRole="CUSTOMER">
                <CustomerLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/shop"                                   element={<HomePage />} />
            <Route path="/shop/collections/men"                   element={<RoyalGentlemenPage />} />
            <Route path="/shop/collections/royal-gentlemen"       element={<RoyalGentlemenPage />} />
            <Route path="/shop/collections/women"                 element={<WomenPage />} />
            <Route path="/shop/collections/couples"               element={<CouplesPage />} />
            <Route path="/shop/collections/group-team"            element={<GroupTeamPage />} />
            <Route path="/shop/collections/sports"                element={<SportsPage />} />
            <Route path="/shop/collections/animated"              element={<AnimatedPage />} />
            <Route path="/shop/collections/limited-edition"       element={<LimitedEditionPage />} />
            <Route path="/shop/create-your-own"                   element={<CreateYourOwnPage />} />
            <Route path="/shop/products/:productId"               element={<ProductDetailPage />} />
            <Route path="/shop/cart"                              element={<CartPage />} />
            <Route path="/shop/checkout"                          element={<CheckoutPage />} />
            <Route path="/shop/order-confirmation"                element={<OrderConfirmationPage />} />
            <Route path="/shop/support"                           element={<SupportPage />} />
            <Route path="/shop/about"                             element={<AboutPage />} />
            <Route path="/shop/terms-of-service"                  element={<TermsOfServicePage />} />
            <Route path="/shop/privacy-policy"                    element={<PrivacyPolicyPage />} />
            <Route path="/shop/refund-policy"                     element={<RefundPolicyPage />} />
            <Route path="/shop/shipping-policy"                   element={<ShippingPolicyPage />} />
            <Route path="/shop/cookie-policy"                     element={<CookiePolicyPage />} />
          </Route>

          {/* ── Catch-all ────────────────────────────────────────────── */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
