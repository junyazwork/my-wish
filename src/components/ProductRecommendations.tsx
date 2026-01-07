import { useState, useMemo } from "react";
import { products } from "@/data/products";
import { Product } from "@/types";
import { ChevronRight } from "lucide-react";
interface ProductRecommendationsProps {
  onProductClick: (product: Product) => void;
}
const tabs = [{
  id: "popular",
  name: "熱門商品"
}, {
  id: "monthly",
  name: "本月主打"
}, {
  id: "bestseller",
  name: "銷售排行"
}, {
  id: "birthday",
  name: "生日首選"
}];
const ProductRecommendations = ({
  onProductClick
}: ProductRecommendationsProps) => {
  const [activeTab, setActiveTab] = useState("popular");

  // Get different product sets for each tab (simulated with shuffling)
  const recommendedProducts = useMemo(() => {
    const shuffled = [...products].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 4);
  }, [activeTab]);
  return <div className="px-0 py-0 pb-[16px]">
      {/* Tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide pl-[16px] pt-[16px]">
        {tabs.map(tab => <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeTab === tab.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
            {tab.name}
          </button>)}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 gap-3 px-[16px] py-0">
        {recommendedProducts.map(product => <div key={product.id} className="bg-card rounded-xl shadow-card border border-border cursor-pointer overflow-hidden" onClick={() => onProductClick(product)}>
            <div className="aspect-square overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-3">
              <h3 className="font-medium text-sm text-foreground line-clamp-2 min-h-[2.5rem]">
                {product.name}
              </h3>
              <p className="text-primary font-semibold text-sm mt-1">
                ${product.price.toLocaleString()}
              </p>
            </div>
          </div>)}
      </div>
    </div>;
};
export default ProductRecommendations;