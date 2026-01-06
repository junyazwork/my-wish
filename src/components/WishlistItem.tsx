import { CartItem } from "@/types";

interface WishlistItemProps {
  item: CartItem;
}

const WishlistItem = ({ item }: WishlistItemProps) => {
  return (
    <div className="flex items-center gap-3 p-3 bg-card border border-border rounded-xl">
      <img
        src={item.product_image}
        alt={item.product_name}
        className="w-16 h-16 object-cover rounded-lg"
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{item.product_name}</p>
        <p className="text-sm text-muted-foreground">數量: {item.quantity}</p>
        <p className="text-sm font-medium text-primary">${item.product_price.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default WishlistItem;
