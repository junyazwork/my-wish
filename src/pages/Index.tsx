import { useState, useMemo } from "react";
import Header from "@/components/Header";
import SlideMenu from "@/components/SlideMenu";
import CategoryTabs from "@/components/CategoryTabs";
import ProductGrid from "@/components/ProductGrid";
import ProductDrawer from "@/components/ProductDrawer";
import FundingSelection from "@/components/FundingSelection";
import InvitationSettings from "@/components/InvitationSettings";
import InvitationConfirm from "@/components/InvitationConfirm";
import InvitationShare from "@/components/InvitationShare";
import AttendFundraising from "@/components/AttendFundraising";
import PaymentForm from "@/components/PaymentForm";
import PaymentComplete from "@/components/PaymentComplete";
import PublicHostSettings from "@/components/PublicHostSettings";
import PublicInvitationSettings from "@/components/PublicInvitationSettings";
import PublicInvitationConfirm from "@/components/PublicInvitationConfirm";
import PublicInvitationShare from "@/components/PublicInvitationShare";
import PublicAttendFundraising from "@/components/PublicAttendFundraising";
import PublicPaymentForm from "@/components/PublicPaymentForm";
import PublicPaymentComplete from "@/components/PublicPaymentComplete";
import ProposalsLog from "@/components/ProposalsLog";
import DonationsLog from "@/components/DonationsLog";
import { products, categories } from "@/data/products";
import { Product, CartItem, FundingType, InvitationData, PublicHostData, PublicInvitationData, AppView } from "@/types";
import { toast } from "sonner";

const Index = () => {
  const [currentView, setCurrentView] = useState<AppView>("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  
  // Personal fundraising state
  const [invitationData, setInvitationData] = useState<InvitationData | null>(null);
  const [donationAmount, setDonationAmount] = useState(0);

  // Public fundraising state
  const [publicHostData, setPublicHostData] = useState<PublicHostData | null>(null);
  const [publicInvitationData, setPublicInvitationData] = useState<PublicInvitationData | null>(null);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (product.category !== activeCategory) return false;
      if (activeSubcategory && product.subcategory !== activeSubcategory) return false;
      return true;
    });
  }, [activeCategory, activeSubcategory]);

  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const totalGoal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDrawerOpen(true);
  };

  const handleAddToCart = (product: Product, quantity: number) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === product.id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { ...product, quantity }];
    });
    toast.success(`已加入 ${quantity} 件商品到清單`);
  };

  const handleCartClick = () => {
    if (cart.length > 0) {
      setCurrentView("funding");
    } else {
      toast.info("請先選擇商品");
    }
  };

  const handleNavigate = (page: string) => {
    if (page === "home") {
      setCurrentView("home");
    } else if (page === "proposals") {
      setCurrentView("proposals");
    } else if (page === "donations") {
      setCurrentView("donations");
    }
  };

  const handleFundingConfirm = (fundingType: FundingType) => {
    if (fundingType === "personal") {
      setCurrentView("invitation-settings");
    } else if (fundingType === "public") {
      setCurrentView("public-host-settings");
    }
  };

  // Personal fundraising handlers
  const handleInvitationConfirm = (data: InvitationData) => {
    setInvitationData(data);
    setCurrentView("invitation-confirm");
  };

  const handleInvitationContentConfirm = () => {
    setCurrentView("invitation-share");
  };

  const handlePreviewAttend = () => {
    setCurrentView("attend-fundraising");
  };

  const handleDonate = (amount: number) => {
    setDonationAmount(amount);
    setCurrentView("payment-form");
  };

  const handlePayment = (method: "credit" | "linepay") => {
    toast.success(`使用 ${method === "credit" ? "信用卡" : "LinePay"} 支付`);
    setCurrentView("payment-complete");
  };

  const handlePaymentFinish = () => {
    // Reset state and go home
    setCart([]);
    setInvitationData(null);
    setDonationAmount(0);
    setCurrentView("home");
    toast.success("感謝您的贊助！");
  };

  // Public fundraising handlers
  const handlePublicHostConfirm = (data: PublicHostData) => {
    setPublicHostData(data);
    setCurrentView("public-invitation-settings");
  };

  const handlePublicInvitationConfirm = (data: PublicInvitationData) => {
    setPublicInvitationData(data);
    setCurrentView("public-invitation-confirm");
  };

  const handlePublicInvitationContentConfirm = () => {
    setCurrentView("public-invitation-share");
  };

  const handlePublicPreviewAttend = () => {
    setCurrentView("public-attend-fundraising");
  };

  const handlePublicConfirmContent = () => {
    toast.success("公益募資已確認！");
    setCart([]);
    setPublicHostData(null);
    setPublicInvitationData(null);
    setCurrentView("home");
  };

  const handlePublicDonate = (amount: number) => {
    setDonationAmount(amount);
    setCurrentView("public-payment-form");
  };

  const handlePublicPayment = (method: "credit" | "linepay") => {
    toast.success(`使用 ${method === "credit" ? "信用卡" : "LinePay"} 支付`);
    setCurrentView("public-payment-complete");
  };

  const handlePublicPaymentFinish = () => {
    setCart([]);
    setPublicHostData(null);
    setPublicInvitationData(null);
    setDonationAmount(0);
    setCurrentView("home");
    toast.success("感謝您的贊助！");
  };

  // Render proposals page
  if (currentView === "proposals") {
    return (
      <ProposalsLog
        onBack={() => setCurrentView("home")}
        onMenuClick={() => setIsMenuOpen(true)}
        onCartClick={handleCartClick}
        cartCount={cartCount}
      />
    );
  }

  // Render donations page
  if (currentView === "donations") {
    return (
      <DonationsLog
        onBack={() => setCurrentView("home")}
        onMenuClick={() => setIsMenuOpen(true)}
        onCartClick={handleCartClick}
        cartCount={cartCount}
      />
    );
  }

  // Render funding selection
  if (currentView === "funding") {
    return (
      <FundingSelection
        onBack={() => setCurrentView("home")}
        onContinueShopping={() => setCurrentView("home")}
        onConfirm={handleFundingConfirm}
        cartCount={cartCount}
      />
    );
  }

  // ========== Personal Fundraising Flow ==========
  if (currentView === "invitation-settings") {
    return (
      <InvitationSettings
        cartItems={cart}
        cartCount={cartCount}
        onBack={() => setCurrentView("funding")}
        onConfirm={handleInvitationConfirm}
      />
    );
  }

  if (currentView === "invitation-confirm" && invitationData) {
    return (
      <InvitationConfirm
        invitation={invitationData}
        cartCount={cartCount}
        onBack={() => setCurrentView("invitation-settings")}
        onPreview={handlePreviewAttend}
        onConfirm={handleInvitationContentConfirm}
      />
    );
  }

  if (currentView === "invitation-share" && invitationData) {
    return (
      <InvitationShare
        invitation={invitationData}
        cartCount={cartCount}
        onBack={() => setCurrentView("invitation-confirm")}
        onPreview={handlePreviewAttend}
      />
    );
  }

  if (currentView === "attend-fundraising" && invitationData) {
    return (
      <AttendFundraising
        invitation={invitationData}
        onBack={() => setCurrentView("invitation-share")}
        onDonate={handleDonate}
      />
    );
  }

  if (currentView === "payment-form" && invitationData) {
    return (
      <PaymentForm
        goalAmount={totalGoal}
        donationAmount={donationAmount}
        onBack={() => setCurrentView("attend-fundraising")}
        onPayment={handlePayment}
      />
    );
  }

  if (currentView === "payment-complete" && invitationData) {
    return (
      <PaymentComplete
        recipientName={invitationData.name}
        onFinish={handlePaymentFinish}
      />
    );
  }

  // ========== Public Fundraising Flow ==========
  if (currentView === "public-host-settings") {
    return (
      <PublicHostSettings
        cartCount={cartCount}
        onBack={() => setCurrentView("funding")}
        onConfirm={handlePublicHostConfirm}
      />
    );
  }

  if (currentView === "public-invitation-settings" && publicHostData) {
    return (
      <PublicInvitationSettings
        hostData={publicHostData}
        cartItems={cart}
        cartCount={cartCount}
        onBack={() => setCurrentView("public-host-settings")}
        onConfirm={handlePublicInvitationConfirm}
      />
    );
  }

  if (currentView === "public-invitation-confirm" && publicInvitationData) {
    return (
      <PublicInvitationConfirm
        invitation={publicInvitationData}
        cartCount={cartCount}
        onBack={() => setCurrentView("public-invitation-settings")}
        onPreview={handlePublicPreviewAttend}
        onConfirm={handlePublicInvitationContentConfirm}
      />
    );
  }

  if (currentView === "public-invitation-share" && publicInvitationData) {
    return (
      <PublicInvitationShare
        invitation={publicInvitationData}
        cartCount={cartCount}
        onBack={() => setCurrentView("public-invitation-confirm")}
        onPreview={handlePublicPreviewAttend}
      />
    );
  }

  if (currentView === "public-attend-fundraising" && publicInvitationData) {
    return (
      <PublicAttendFundraising
        invitation={publicInvitationData}
        onBack={() => setCurrentView("public-invitation-share")}
        onDonate={handlePublicDonate}
      />
    );
  }

  if (currentView === "public-payment-form" && publicInvitationData) {
    return (
      <PublicPaymentForm
        goalAmount={totalGoal}
        donationAmount={donationAmount}
        onBack={() => setCurrentView("public-attend-fundraising")}
        onPayment={handlePublicPayment}
      />
    );
  }

  if (currentView === "public-payment-complete" && publicInvitationData) {
    return (
      <PublicPaymentComplete
        recipientName={publicInvitationData.name}
        onFinish={handlePublicPaymentFinish}
      />
    );
  }

  // Render home page
  return (
    <div className="min-h-screen bg-background">
      <Header
        cartCount={cartCount}
        onMenuClick={() => setIsMenuOpen(true)}
        onCartClick={handleCartClick}
      />
      
      <CategoryTabs
        categories={categories}
        activeCategory={activeCategory}
        activeSubcategory={activeSubcategory}
        onCategoryChange={setActiveCategory}
        onSubcategoryChange={setActiveSubcategory}
      />
      
      <ProductGrid
        products={filteredProducts}
        onProductClick={handleProductClick}
      />
      
      <SlideMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={handleNavigate}
      />
      
      <ProductDrawer
        product={selectedProduct}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default Index;
