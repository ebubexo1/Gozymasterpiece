import React from 'react';
import useForm from '../../hooks/useForm';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const ManageProducts = () => {
  // Use the custom form hook for the "Add Product" form
  const { values, handleChange, resetForm } = useForm({
    name: '',
    price: '',
    category: 'Apparel',
    image: ''
  });

  const handleAddProduct = (e) => {
    e.preventDefault();
    // 🚨 REAL REPLACEMENT: axios.post('/api/products', values)
    console.log("Adding product to database:", values);
    alert("Product added successfully!");
    resetForm();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-serif text-[#001F3F] mb-8 text-center">Manage Inventory</h2>
      
      <div className="bg-white p-8 border border-slate-100 shadow-xl mb-12">
        <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#D4AF37] mb-6">Add New Product</h4>
        <form onSubmit={handleAddProduct} className="space-y-4">
          <Input label="Product Name" name="name" value={values.name} onChange={handleChange} required />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Price (NGN)" name="price" type="number" value={values.price} onChange={handleChange} required />
            <div className="flex flex-col">
              <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-2">Category</label>
              <select 
                name="category" 
                value={values.category} 
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-200 outline-none focus:border-[#D4AF37] text-sm"
              >
                <option>Apparel</option>
                <option>Accessories</option>
                <option>Footwear</option>
              </select>
            </div>
          </div>
          <Input label="Image URL" name="image" value={values.image} onChange={handleChange} placeholder="https://..." required />
          <Button type="submit" variant="primary" className="w-full">Upload to Store</Button>
        </form>
      </div>
    </div>
  );
};

export default ManageProducts;