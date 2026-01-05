import { Search } from "lucide-react";
import { Product } from "@/types";
import ProductCard from "./ProductCard";

interface SearchResultsProps {
  query: string;
  results: Product[];
  onProductClick: (product: Product) => void;
  onAddToWishlist: (product: Product) => void;
  onClearSearch: () => void;
}

const SearchResults = ({
  query,
  results,
  onProductClick,
  onAddToWishlist,
  onClearSearch,
}: SearchResultsProps) => {
  return (
    <div className="px-4 py-4">
      {/* Search Info Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Search size={18} className="text-muted-foreground" />
          <span className="text-foreground">
            搜尋「<span className="font-medium text-primary">{query}</span>」
          </span>
        </div>
        <span className="text-sm text-muted-foreground">
          {results.length} 個結果
        </span>
      </div>

      {/* Results */}
      {results.length > 0 ? (
        <div className="grid grid-cols-2 gap-3">
          {results.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => onProductClick(product)}
              onAddToWishlist={() => onAddToWishlist(product)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Search size={28} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">
            找不到相關商品
          </h3>
          <p className="text-muted-foreground text-sm mb-4">
            試試其他關鍵字或瀏覽商品分類
          </p>
          <button
            onClick={onClearSearch}
            className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium transition-all hover:opacity-90"
          >
            清除搜尋
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
