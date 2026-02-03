import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onClick: () => void;
  onAddToWishlist?: (product: Product) => void;
}

const ProductCard = ({
  product,
  onClick,
  onAddToWishlist
}: ProductCardProps) => {
  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToWishlist?.(product);
  };

  const handleCardClick = () => {
    if (product.provider === "Yahoo" && product.externalUrl) {
      window.open(product.externalUrl, "_blank", "noopener,noreferrer");
    } else {
      onClick();
    }
  };

  const providerLabel = product.provider === "My Wish" ? "My Wish 提供" : "Yahoo!購物 提供";

  return (
    <div className="bg-card rounded-xl shadow-card overflow-hidden text-left transition-all duration-200 hover:shadow-elevated border border-border">
      <button onClick={handleCardClick} className="w-full text-left active:scale-[0.98] transition-transform">
        <div className="aspect-square bg-secondary/30 overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div className="p-3 pb-2">
          <h3 className="text-sm text-foreground line-clamp-2 leading-snug min-h-[2.5rem]">
            {product.name}
          </h3>
          <p className="text-primary font-semibold text-sm mt-1">
            ${product.price.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {providerLabel}
          </p>
        </div>
      </button>
      <div className="px-3 pb-3">
        <Button variant="outline" size="sm" className="w-full text-xs gap-1.5" onClick={handleAddToWishlist}>
          <Plus className="h-3.5 w-3.5" />
          加入願望清單
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;