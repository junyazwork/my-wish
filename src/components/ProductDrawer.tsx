import { Product } from "@/types";
import { Minus, Plus, X } from "lucide-react";
import { useState } from "react";

interface ProductDrawerProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

const ProductDrawer = ({ product, isOpen, onClose, onAddToCart }: ProductDrawerProps) => {
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setQuantity(1);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-foreground/40 z-50 animate-fade-in"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-card rounded-t-3xl shadow-drawer animate-slide-in-bottom max-h-[85vh] overflow-hidden">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-muted-foreground hover:text-foreground z-10"
        >
          <X size={24} />
        </button>

        {/* Product Image */}
        <div className="aspect-[4/3] bg-secondary/30 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Product Info */}
        <div className="p-5 pb-8">
          <p className="text-xl font-bold text-primary mb-2">
            ${product.price.toLocaleString()}
          </p>
          <h2 className="text-base font-semibold text-foreground mb-6 leading-relaxed">
            {product.name}
          </h2>

          {/* Quantity Selector */}
          <div className="flex items-center justify-center gap-6 mb-6">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-secondary transition-colors"
            >
              <Minus size={18} />
            </button>
            <span className="text-xl font-medium text-foreground w-12 text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-secondary transition-colors"
            >
              <Plus size={18} />
            </button>
          </div>

          {/* Add to Wishlist Button */}
          <button
            onClick={handleAddToCart}
            className="w-full py-4 bg-primary text-primary-foreground font-semibold rounded-xl transition-all hover:opacity-90 active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <Plus size={20} />
            放入許願池
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductDrawer;
