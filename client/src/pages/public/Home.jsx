import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import SectionTitle from '../../components/common/SectionTitle';

const Home = () => {
  const categoryShowcase = [
    { category: 'Wrist Watches', image: '/images/products/watches/lux.jpg', description: 'Premium timepieces' },
    { category: 'Sunshades', image: '/images/products/sunglasses/Glass3.jpg', description: 'Stylish sunshades' },
    { category: 'Waist Belt', image: '/images/products/belts/Belt1.jpg', description: 'Designer waist belts' },
    { category: 'Wrist Bangles', image: '/images/products/wallets/Wallet1.jpg', description: 'Elegant wrist bangles' },
    { category: 'Cufflinks Pen', image: '/images/products/watches/lux.jpg', description: 'Luxury cufflinks pen' },
    { category: 'Traveling Luggage', image: '/images/products/bags/Bag1.jpg', description: 'Premium travel luggage' },
    { category: 'Duffel Traveling Bag', image: '/images/products/bags/Bag1.jpg', description: 'Stylish duffel bags' },
    { category: 'Bag Pack', image: '/images/products/bags/Bag1.jpg', description: 'Premium backpacks' },
    { category: 'Laptop Bag', image: '/images/products/bags/Bag1.jpg', description: 'Professional laptop bags' }
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-slate-900">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/products/watches/lux.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="text-center z-10 px-4 max-w-4xl">
          <p className="text-[#D4AF37] uppercase tracking-[0.5em] text-sm mb-4">
            Premium Accessories Collection
          </p>
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">
            Luxury Accessories & More
          </h1>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            Discover our curated collection of Wrist Watches, Sunshades, Waist Belts, Wrist Bangles, Cufflinks Pen, Traveling Luggage, Duffel Bags, Bag Packs and Laptop Bags
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/shop">
              <Button variant="primary">Shop Collection</Button>
            </Link>
            <Link to="/shop?category=Wrist Watches">
              <Button variant="outline">View Watches</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Category Showcase */}
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle title="Explore Our Collections" subtitle="Premium Quality Products" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categoryShowcase.map((item) => (
            <Link
              key={item.category}
              to={`/shop?category=${item.category}`}
              className="group relative aspect-square bg-gray-100 overflow-hidden cursor-pointer rounded-lg"
            >
              <img src={item.image} alt={item.category}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 transition-all flex flex-col items-center justify-end text-white p-6">
                <h3 className="text-xl md:text-2xl font-serif mb-1">{item.category}</h3>
                <p className="text-xs uppercase tracking-wider opacity-90">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Benefits */}
      <div className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle title="Why Choose Gozy Resources" subtitle="Premium Shopping Experience" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">âœ“</span>
              </div>
              <h3 className="text-lg font-serif text-[#001F3F] mb-3">100% Authentic</h3>
              <p className="text-slate-600 text-sm">All products are genuine and carefully sourced from trusted suppliers</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">í´’</span>
              </div>
              <h3 className="text-lg font-serif text-[#001F3F] mb-3">Secure Payment</h3>
              <p className="text-slate-600 text-sm">Safe transactions with Paystack - Nigeria's trusted payment platform</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">íºš</span>
              </div>
              <h3 className="text-lg font-serif text-[#001F3F] mb-3">Fast Delivery</h3>
              <p className="text-slate-600 text-sm">Quick and reliable nationwide delivery to your doorstep</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
