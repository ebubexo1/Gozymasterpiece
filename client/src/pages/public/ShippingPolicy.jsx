import React from 'react';

const ShippingPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 mt-20">
      <h1 className="text-4xl font-serif text-[#001F3F] mb-8">Shipping Policy</h1>
      
      <div className="space-y-6 text-slate-600 leading-relaxed">
        <section>
          <h2 className="text-2xl font-serif text-[#001F3F] mb-4">Delivery Information</h2>
          <p>
            At Gozy Resources, we are committed to delivering your premium products safely and efficiently 
            across Nigeria. We partner with trusted courier services to ensure your luxury items reach you 
            in perfect condition.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-[#001F3F] mb-4">Delivery Timeline</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Within Lagos:</strong> 1-2 business days (Free Delivery)</li>
            <li><strong>South West (Ogun, Oyo, Osun, Ondo, Ekiti):</strong> 2-3 business days - ₦2,500</li>
            <li><strong>South South (Rivers, Delta, Edo, Bayelsa, Cross River, Akwa Ibom):</strong> 3-4 business days - ₦3,000</li>
            <li><strong>South East (Anambra, Enugu, Imo, Abia, Ebonyi):</strong> 3-5 business days - ₦4,000</li>
          </ul>
          <p className="mt-4">
            Orders are processed within 24 hours. You will receive a tracking number via email once 
            your order ships.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-[#001F3F] mb-4">Shipping Costs</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Lagos:</strong> Free Delivery</li>
            <li><strong>Other States:</strong> south East ₦4000, South South ₦3,000 South West ₦2,500</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-[#001F3F] mb-4">Order Tracking</h2>
          <p>
            Once your order ships, you'll receive a tracking number. You can track your package through 
            our courier partner's website or contact our support team for assistance.
          </p>
        </section>

        {/* <section>
          <h2 className="text-2xl font-serif text-[#001F3F] mb-4">Delivery Procedures</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Signature required upon delivery for high-value items (₦50,000+)</li>
            <li>Please inspect your package before signing</li>
            <li>Report any damage or missing items immediately to our support team</li>
          </ul>
        </section> */}

        <section>
          <h2 className="text-2xl font-serif text-[#001F3F] mb-4">International Shipping</h2>
          <p>
            Currently, we only ship within Nigeria. International shipping will be available soon. 
            Subscribe to our newsletter to be notified when we expand our delivery areas.
          </p>
        </section>

        <div className="mt-8 p-6 bg-slate-50 rounded-lg">
          <p className="text-sm">
            For any shipping inquiries, please contact us at{' '}
            <a href="mailto:gozymasterpiece@gmail.com" className="text-[#D4AF37] hover:underline">
              support@gozymasterpiece.com
            </a>
            {' '}or call{' '}
            <a href="tel:+2348167823409" className="text-[#D4AF37] hover:underline">
              0816 782 3409 / 0706 371 8709
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
