import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../../services/api';
import ProductCard from '../../components/shop/ProductCard';
import Button from '../../components/common/Button';
import { useCart } from '../../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await api.getProduct(id);
        setProduct(data);
        const all = await api.getProducts();
        setRelated(all.filter(p => p.category === data.category && p._id !== id));
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return (
    <div className="h-screen flex items-center justify-center text-[#D4AF37] animate-pulse">
      Loading...
    </div>
  );

  if (!product) return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <h2 className="text-2xl font-serif text-[#001F3F]">Product not found</h2>
      <Link to="/shop" className="text-[#D4AF37] mt-4 inline-block">Back to Shop</Link>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 mt-20">
      {/* Breadcrumb */}
      <div className="flex gap-2 text-xs text-slate-400 uppercase tracking-widest mb-10">
        <Link to="/shop" className="hover:text-[#D4AF37]">Shop</Link>
        <span>/</span>
        <Link to={`/shop?category=${product.category}`} className="hover:text-[#D4AF37]">{product.category}</Link>
        <span>/</span>
        <span className="text-[#001F3F]">{product.name}</span>
      </div>

      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        <div className="aspect-square bg-gray-100">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col justify-center space-y-6">
          <div>
            <p className="text-[#D4AF37] text-xs uppercase tracking-[0.4em] mb-2">{product.category}</p>
            <h1 className="text-4xl font-serif text-[#001F3F] mb-4">{product.name}</h1>
            <p className="text-2xl text-slate-600">₦{Number(product.price).toLocaleString()}</p>
          </div>
          <p className="text-slate-600 leading-relaxed">{product.description}</p>
          <div className="pt-4">
            <Button onClick={() => addToCart(product)} variant="primary">Add to Cart</Button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div>
          <div className="mb-8 border-b border-slate-100 pb-4">
            <h2 className="text-2xl font-serif text-[#001F3F]">More {product.category}</h2>
            <p className="text-sm text-slate-400 mt-2">{related.length} similar products</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map(item => (
              <ProductCard key={item._id} product={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
