import { useNavigate } from 'react-router-dom';
import Header from '../components/header/Header';
import AnnouncementBar from '../components/announcement/AnnouncementBar';
import HeroSection from '../components/hero/HeroSection';
import CategorySection from '../components/category/CategorySection';
import TrendingProducts from '../components/trending/TrendingProducts';
import LimitedEditionBanner from '../components/limited-edition/LimitedEditionBanner';
import CreateYourOwn from '../components/create-own/CreateYourOwn';
import WhySkaviyo from '../components/why-skaviyo/WhySkaviyo';
import Lookbook from '../components/lookbook/Lookbook';
import Reviews from '../components/reviews/Reviews';
import Newsletter from '../components/newsletter/Newsletter';
import Footer from '../components/footer/Footer';

const CATEGORY_ROUTES: { [key: string]: string } = {
  men: '/shop/collections/men',
  women: '/shop/collections/women',
  couples: '/shop/collections/couples',
  'group-team': '/shop/collections/group-team',
  sports: '/shop/collections/sports',
  animated: '/shop/collections/animated',
  'create-own': '/shop/create-your-own',
  'limited-edition': '/shop/collections/limited-edition',
};

const HomePage = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: string) => {
    const route = CATEGORY_ROUTES[categoryId];
    if (route) navigate(route);
  };

  const handleProductClick = (productId: string) => {
    navigate(`/shop/products/${productId}`);
  };

  const handleShopClick = () => {
    navigate('/shop/collections/men');
  };

  const handleCreateClick = () => {
    navigate('/shop/support');
  };

  const handleLimitedEditionClick = () => {
    navigate('/shop/collections/men');
  };

  const handleStartCreatingClick = () => {
    navigate('/shop/support');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        onCartClick={() => navigate('/shop/cart')}
        onWishlistClick={() => {}}
        onSignInClick={() => {}}
        onSearch={(q) => console.log('Search:', q)}
        onCustomerCareClick={() => navigate('/shop/support')}
      />

      <AnnouncementBar />

      <HeroSection
        onShopClick={handleShopClick}
        onCreateClick={handleCreateClick}
      />

      <CategorySection onCategoryClick={handleCategoryClick} />

      <TrendingProducts onProductClick={handleProductClick} />

      <LimitedEditionBanner onShopClick={handleLimitedEditionClick} />

      <CreateYourOwn onStartCreating={handleStartCreatingClick} />

      <WhySkaviyo />

      <Lookbook />

      <Reviews />

      <Newsletter />

      <Footer />
    </div>
  );
};

export default HomePage;
