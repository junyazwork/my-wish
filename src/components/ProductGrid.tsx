import ProductCard from "./ProductCard";
import { Product } from "@/types";

interface ProductGridProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  onAddToWishlist: (product: Product) => void;
}

const ProductGrid = ({ products, onProductClick, onAddToWishlist }: ProductGridProps) => {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <p className="text-muted-foreground text-center">此分類暫無商品</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 p-4">
      {products.map((product) => (
        <ProductCard
          key={product.product_id}
          product={product}
          onClick={() => onProductClick(product)}
          onAddToWishlist={onAddToWishlist}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
