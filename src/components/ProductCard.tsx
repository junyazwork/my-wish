import { Product } from "@/types";
interface ProductCardProps {
  product: Product;
  onClick: () => void;
}
const ProductCard = ({
  product,
  onClick
}: ProductCardProps) => {
  return <button onClick={onClick} className="bg-card rounded-xl shadow-card overflow-hidden text-left transition-all duration-200 hover:shadow-elevated active:scale-[0.98] border border-border">
      <div className="aspect-square bg-secondary/30 overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
      </div>
      <div className="p-3">
        <h3 className="text-sm text-foreground line-clamp-2 leading-snug">
          {product.name}
        </h3>
      </div>
    </button>;
};
export default ProductCard;