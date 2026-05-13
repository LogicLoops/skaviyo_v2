// Example: How to link to Customization Page from any component

import { useNavigate } from 'react-router-dom';
import { Palette } from 'lucide-react';

export function CustomizeButton() {
  const navigate = useNavigate();

  const handleCustomize = () => {
    navigate('/customization');
  };

  return (
    <button
      onClick={handleCustomize}
      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      <Palette size={20} />
      Customize
    </button>
  );
}

// Usage in ProductDetailPage:
// import { CustomizeButton } from '../components/customization/CustomizeButton';
// 
// function ProductDetailPage() {
//   return (
//     <div>
//       <h1>Product Details</h1>
//       <CustomizeButton />
//     </div>
//   );
// }

// Or inline in any component:
// const navigate = useNavigate();
// <button onClick={() => navigate('/customization')}>
//   Start Customizing
// </button>
