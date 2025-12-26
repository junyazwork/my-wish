import { Plus, Minus, Trash2 } from "lucide-react";
import { CartItem } from "@/types";

interface CartDrawerProps {
  isOpen: boolean;
  cartItems: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onContinueShopping: () => void;
  onConfirm: () => void;
}

const CartDrawer = ({
  isOpen,
  cartItems,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onContinueShopping,
  onConfirm,
}: CartDrawerProps) => {
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={onClose}
            className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <h1 className="text-lg font-semibold text-foreground">Wish List</h1>

          <div className="relative p-2 -mr-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-primary-foreground"
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            {cartItems.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[20px] h-5 px-1.5 bg-destructive text-destructive-foreground text-xs font-medium rounded-full flex items-center justify-center">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <p>購物車是空的</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {cartItems.map((item) => (
              <div key={item.id} className="p-4">
                <h3 className="text-foreground font-medium leading-relaxed mb-2">
                  {item.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    {item.price.toLocaleString()} x {item.quantity}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        onUpdateQuantity(item.id, item.quantity + 1)
                      }
                      className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                    >
                      <Plus size={18} />
                    </button>
                    <button
                      onClick={() =>
                        item.quantity > 1
                          ? onUpdateQuantity(item.id, item.quantity - 1)
                          : onRemoveItem(item.id)
                      }
                      className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                    >
                      <Minus size={18} />
                    </button>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="w-9 h-9 rounded-full bg-destructive/10 flex items-center justify-center text-destructive hover:bg-destructive/20 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Section */}
      <div className="sticky bottom-0 bg-background border-t border-border p-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-muted-foreground">總計</span>
          <span className="text-3xl font-bold text-foreground">
            ${totalAmount.toLocaleString()}
          </span>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onContinueShopping}
            className="flex-1 py-3.5 border border-border rounded-xl text-foreground font-medium transition-colors hover:bg-secondary"
          >
            繼續挑選
          </button>
          <button
            onClick={onConfirm}
            disabled={cartItems.length === 0}
            className="flex-1 py-3.5 bg-primary text-primary-foreground rounded-xl font-medium transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            確定
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
