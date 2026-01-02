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
  return <div className="bg-card rounded-xl shadow-card overflow-hidden text-left transition-all duration-200 hover:shadow-elevated border border-border">
      <button onClick={onClick} className="w-full text-left active:scale-[0.98] transition-transform">
        <div className="aspect-square bg-secondary/30 overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div className="p-3 pb-2">
          <h3 className="text-sm text-foreground line-clamp-2 leading-snug">
            {product.name}
          </h3>
        </div>
      </button>
      <div className="px-3 pb-3">
        <Button variant="outline" size="sm" className="w-full text-xs gap-1.5" onClick={handleAddToWishlist}>
          <Plus className="h-3.5 w-3.5" />
          放入許願池
        </Button>
      </div>
    </div>;
};
export default ProductCard;