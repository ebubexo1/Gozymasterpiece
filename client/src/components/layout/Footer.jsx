import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#001F3F] text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-serif font-bold mb-4">
              GOZY<span className="text-[#D4AF37]">RESOURCES</span>
            </h3>
            <p className="text-slate-300 text-sm">
              Premium luxury accessories - Watches, Bags, Wallets & More
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm uppercase tracking-wider font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/shop" className="text-slate-300 hover:text-[#D4AF37] transition-colors">
                  Shop All
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-300 hover:text-[#D4AF37] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-300 hover:text-[#D4AF37] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm uppercase tracking-wider font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/shipping-policy" className="text-slate-300 hover:text-[#D4AF37] transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-slate-300 hover:text-[#D4AF37] transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-300 hover:text-[#D4AF37] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm uppercase tracking-wider font-bold mb-4">Get In Touch</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <a href="mailto:support@gozyresources.com" className="hover:text-[#D4AF37] transition-colors">
                  support@gozyresources.com
                </a>
              </li>
              <li>
                <a href="tel:+2348012345678" className="hover:text-[#D4AF37] transition-colors">
                  +234 801 234 5678
                </a>
              </li>
              <li>Lagos, Nigeria</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 mt-8 pt-8 text-center text-sm text-slate-400">
          <p>&copy; {new Date().getFullYear()} Gozy Resources. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
