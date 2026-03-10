import { useState, useEffect } from 'react';
import { api } from '../services/api';

const useProducts = (category = 'All') => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // REAL API CALL
        const data = await api.getProducts();
        
        const filtered = category === 'All' 
          ? data 
          : data.filter(p => p.category === category);
        
        setProducts(filtered);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  return { products, loading, error };
};

export default useProducts;
