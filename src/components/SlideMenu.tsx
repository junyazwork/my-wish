import { X, Home, Globe, FileText, Heart, LogOut } from "lucide-react";
interface SlideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
  currentPage?: string;
}
const SlideMenu = ({
  isOpen,
  onClose,
  onNavigate,
  currentPage = "home"
}: SlideMenuProps) => {
  const menuItems = [{
    id: "home",
    label: "首頁",
    icon: Home
  }, {
    id: "proposals",
    label: "提案紀錄",
    icon: FileText
  }, {
    id: "donations",
    label: "贊助紀錄",
    icon: Heart
  }, {
    id: "logout",
    label: "登出",
    icon: LogOut
  }];
  if (!isOpen) return null;
  return <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50 animate-fade-in" onClick={onClose} />
      
      {/* Menu Panel */}
      <div className="fixed inset-0 z-50 bg-background animate-slide-in-left">
        <div className="flex flex-col h-full">
          {/* Close Button */}
          <div className="flex justify-end p-4">
            <button onClick={onClose} className="p-2 text-muted-foreground hover:text-foreground transition-colors">
              <X size={28} />
            </button>
          </div>
          
          {/* Menu Items */}
          <nav className="flex-1 flex flex-col items-center justify-start pt-12 gap-6">
            {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return <button key={item.id} onClick={() => {
              onNavigate(item.id);
              onClose();
            }} className={`flex items-center gap-3 text-xl transition-colors py-3 px-8 rounded-full ${isActive ? "text-primary bg-primary/10 font-semibold" : "text-foreground/80 hover:text-foreground"}`}>
                  <Icon size={24} />
                  <span className="text-lg">{item.label}</span>
                </button>;
          })}
          </nav>
        </div>
      </div>
    </>;
};
export default SlideMenu;