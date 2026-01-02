import { Instagram, Facebook } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#8B7B74] text-white mt-8">
      <div className="px-6 py-8">
        {/* Links Section */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {/* 關於 Column */}
          <div>
            <h3 className="font-semibold text-base mb-3">關於</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:underline">關於我們</Link>
              </li>
              <li>
                <Link to="/sponsor-policy" className="hover:underline">贊助保障規範</Link>
              </li>
              <li>
                <Link to="/service-guide" className="hover:underline">提案服務說明</Link>
              </li>
            </ul>
          </div>
          
          {/* 支援 Column */}
          <div>
            <h3 className="font-semibold text-base mb-3">支援</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/terms" className="hover:underline">使用條款</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:underline">隱私權政策</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:underline">常見問題</Link>
              </li>
            </ul>
          </div>
          
          {/* 聯繫 Column */}
          <div>
            <h3 className="font-semibold text-base mb-3">聯繫</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/contact" className="hover:underline">聯絡我們</Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Brand Section */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold tracking-wide">
            <span className="font-black">MY WISH</span> ONLINE
          </h2>
          <p className="text-sm mt-1">願望實現股份有限公司</p>
        </div>
        
        {/* Social Icons */}
        <div className="flex justify-center gap-4 mb-6">
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <Instagram className="w-6 h-6" />
          </a>
          <a 
            href="https://facebook.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <Facebook className="w-6 h-6" />
          </a>
        </div>
        
        {/* Copyright */}
        <p className="text-center text-sm">
          Copyright ©2025 MY WISH ONLINE All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
