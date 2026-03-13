import React from 'react';

const Returns = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 mt-20">
      <h1 className="text-4xl font-serif text-[#001F3F] mb-8">Returns & Exchanges</h1>
      
      <div className="space-y-6 text-slate-600 leading-relaxed">
        <section>
          <h2 className="text-2xl font-serif text-[#001F3F] mb-4">Our Return Policy</h2>
          <p>
            At Gozy Resources, we want you to be completely satisfied with your purchase. If you're not 
            happy with your item, we offer a 14-day return policy for eligible products.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-[#001F3F] mb-4">Eligibility for Returns</h2>
          <p className="mb-3">Items must meet the following conditions:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Returned within 14 days of delivery</li>
            <li>In original, unused condition with all tags attached</li>
            <li>Original packaging intact</li>
            <li>Accompanied by proof of purchase (receipt or order confirmation)</li>
            <li>No signs of wear, damage, or alteration</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-[#001F3F] mb-4">Non-Returnable Items</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Personalized or customized items</li>
            <li>Items on final sale or clearance</li>
            <li>Items damaged due to misuse or negligence</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-[#001F3F] mb-4">How to Return an Item</h2>
          <ol className="list-decimal pl-6 space-y-3">
            <li>
              <strong>Contact Us:</strong> Email{' '}
              <a href="mailto:gozymasterpiece@gmail.com" className="text-[#D4AF37] hover:underline">
                gozymasterpiece@gmail.com
              </a>
              {' '}with your tracking ID and reason for return
            </li>
            <li>
              <strong>Confirm Return:</strong> Our team will verify your tracking ID and approve your return request
            </li>
            <li>
              <strong>Package Item:</strong> Securely pack the item in its original packaging
            </li>
            <li>
              <strong>Ship Return:</strong> Send to our returns address (provided after approval)
            </li>
            <li>
              <strong>Receive Refund:</strong> Refund processed within 5-7 business days after we receive your return
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-[#001F3F] mb-4">Exchanges</h2>
          <p>
            We currently don't offer direct exchanges. If you need a different size, color, or product, 
            please return the original item for a refund and place a new order for the desired item.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-[#001F3F] mb-4">Refund Process</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Refunds are issued to the original payment method</li>
            <li>Processing time: 5-7 business days after item is received</li>
            <li>Bank processing may take additional 3-5 business days</li>
            <li>Original shipping costs are non-refundable</li>
            <li>Customer is responsible for return shipping costs unless item is defective</li>
          </ul>
        </section>

        <div className="mt-8 p-6 bg-slate-50 rounded-lg">
          <h3 className="font-serif text-[#001F3F] mb-3">Need Help?</h3>
          <p className="text-sm">
            Our customer service team is here to assist you with any return or exchange questions.
          </p>
          <p className="text-sm mt-2">
            Email:{' '}
            <a href="mailto:gozymasterpiece@gmail.com" className="text-[#D4AF37] hover:underline">
              gozymasterpiece@gmail.com
            </a>
          </p>
          <p className="text-sm">
            Phone:{' '}
            <a href="tel:+2348167823409" className="text-[#D4AF37] hover:underline">
              0816 782 3409 / 0706 371 8709
            </a>
          </p>
          <p className="text-sm">Hours: Monday - Friday, 9AM - 6PM WAT</p>
        </div>
      </div>
    </div>
  );
};

export default Returns;
