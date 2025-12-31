import { Share2, Menu, ShoppingBag } from "lucide-react";
interface HeaderProps {
  cartCount?: number;
  onMenuClick?: () => void;
  onCartClick?: () => void;
  onShareClick?: () => void;
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  showShare?: boolean;
}
const Header = ({
  cartCount = 0,
  onMenuClick,
  onCartClick,
  onShareClick,
  title,
  showBack,
  onBack,
  showShare
}: HeaderProps) => {
  return <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between px-4 py-3">
        {showBack ? <button onClick={onBack} className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button> : <button onClick={onMenuClick} className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors">
            <Menu size={22} />
          </button>}
        
        {title ? <h1 className="text-lg font-semibold text-foreground">{title}</h1> : <div className="flex-1 mx-3">
            <div className="relative">
              <input type="text" placeholder="輸入關鍵字" className="w-full px-4 py-2.5 bg-secondary rounded-full text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
          </div>}
        
        {showShare ? <button onClick={onShareClick} className="relative p-2 -mr-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Share2 size={20} className="text-primary-foreground" />
            </div>
          </button> : <button onClick={onCartClick} className="relative p-2 -mr-2">
            <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-full">
              <ShoppingBag size={20} className="text-primary-foreground" />
            </div>
            {cartCount > 0 && <span className="absolute -top-0.5 -right-0.5 min-w-[20px] h-5 px-1.5 bg-destructive text-destructive-foreground text-xs font-medium rounded-full flex items-center justify-center">
                {cartCount}
              </span>}
          </button>}
      </div>
    </header>;
};
export default Header;