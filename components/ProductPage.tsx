
import React from 'react';

interface ProductPageProps {
  onPurchase: () => void;
}

const ProductPage: React.FC<ProductPageProps> = ({ onPurchase }) => {
  return (
    <div className="p-4">
      <div className="flex gap-4 mb-6">
        <img 
          src="https://picsum.photos/id/1/200/200" 
          alt="App Icon" 
          className="w-20 h-20 rounded-2xl shadow-md"
        />
        <div className="flex-1">
          <h1 className="text-xl font-bold text-gray-900">Pixel Master Pro</h1>
          <p className="text-sm text-green-700 font-medium">Lumi Creative Labs</p>
          <p className="text-xs text-gray-500 mt-1">Contains ads · In-app purchases</p>
        </div>
      </div>

      <div className="flex items-center justify-between text-center border-b pb-4 mb-4">
        <div>
          <p className="text-sm font-bold">4.8 ★</p>
          <p className="text-[10px] text-gray-500 uppercase">12K reviews</p>
        </div>
        <div className="w-[1px] h-8 bg-gray-200" />
        <div>
          <p className="text-sm font-bold">500K+</p>
          <p className="text-[10px] text-gray-500 uppercase">Downloads</p>
        </div>
        <div className="w-[1px] h-8 bg-gray-200" />
        <div>
          <span className="inline-block px-1 border border-gray-900 text-[10px] font-bold rounded">E</span>
          <p className="text-[10px] text-gray-500 uppercase">Rated for E</p>
        </div>
      </div>

      <button 
        onClick={onPurchase}
        className="w-full py-2 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-full mb-6 transition-colors"
      >
        Buy
      </button>

      <div className="space-y-4">
        <div>
          <h2 className="font-semibold text-gray-800 flex items-center justify-between">
            About this app
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </h2>
          <p className="text-sm text-gray-600 mt-2 leading-relaxed">
            Unleash your creativity with Pixel Master Pro, the ultimate photo editing and design tool.
            Professional grade features at your fingertips.
          </p>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-4">
          {[10, 11, 12, 13].map(id => (
            <img 
              key={id}
              src={`https://picsum.photos/id/${id}/400/800`} 
              alt="Screenshot" 
              className="h-60 rounded-lg shadow-sm"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
