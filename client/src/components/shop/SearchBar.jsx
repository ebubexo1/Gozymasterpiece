import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';

const SearchBar = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query)}`);
      onClose();
      setQuery('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20">
      <div className="bg-white w-full max-w-2xl mx-4 p-6 rounded-lg shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-serif text-[#001F3F]">Search Products</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-[#001F3F]">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for bags, watches, wallets..."
            className="w-full px-4 py-3 pr-12 border border-slate-200 focus:border-[#D4AF37] outline-none text-sm"
            autoFocus
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#D4AF37] hover:text-[#001F3F]"
          >
            <Search size={20} />
          </button>
        </form>
        
        <p className="text-xs text-slate-400 mt-4">
          Press Enter or click the search icon to search
        </p>
      </div>
    </div>
  );
};

export default SearchBar;
