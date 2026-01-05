import { useState, useMemo } from "react";
import Header from "@/components/Header";
import SlideMenu from "@/components/SlideMenu";
import BannerSlider from "@/components/BannerSlider";
import FeaturedCampaigns from "@/components/FeaturedCampaigns";
import CategoryTabs from "@/components/CategoryTabs";
import ProductGrid from "@/components/ProductGrid";
import ProductDrawer from "@/components/ProductDrawer";
import CartDrawer from "@/components/CartDrawer";
import FundingSelection from "@/components/FundingSelection";
import InvitationSettings from "@/components/InvitationSettings";
import InvitationConfirm from "@/components/InvitationConfirm";
import InvitationShare from "@/components/InvitationShare";
import LineFriendSelector from "@/components/LineFriendSelector";
import LineChatRoom from "@/components/LineChatRoom";
import AttendFundraising from "@/components/AttendFundraising";
import PaymentForm from "@/components/PaymentForm";
import CreditCardForm from "@/components/CreditCardForm";
import LinePayForm from "@/components/LinePayForm";
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
import AllCampaigns from "@/components/AllCampaigns";
import LineAuthPage from "@/components/LineAuthPage";
import SearchResults from "@/components/SearchResults";
import Footer from "@/components/Footer";
import { products, categories } from "@/data/products";
import { Product, CartItem, FundingType, InvitationData, PublicHostData, PublicInvitationData, AppView, LineFriend, MediaItemData, AspectRatioType } from "@/types";
import { toast } from "sonner";

const Index = () => {
  const [currentView, setCurrentView] = useState<AppView>("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  
  // Personal fundraising state
  const [invitationData, setInvitationData] = useState<InvitationData | null>(null);
  const [donationAmount, setDonationAmount] = useState(0);
  const [selectedLineFriends, setSelectedLineFriends] = useState<LineFriend[]>([]);

  // Public fundraising state
  const [publicHostData, setPublicHostData] = useState<PublicHostData | null>(null);
  const [publicInvitationData, setPublicInvitationData] = useState<PublicInvitationData | null>(null);
  const [publicSelectedLineFriends, setPublicSelectedLineFriends] = useState<LineFriend[]>([]);

  // Campaign attend state (from all campaigns)
  const [selectedCampaignData, setSelectedCampaignData] = useState<InvitationData | null>(null);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesCategory = product.category?.toLowerCase().includes(query);
        const matchesSubcategory = product.subcategory?.toLowerCase().includes(query);
        if (!matchesName && !matchesCategory && !matchesSubcategory) return false;
      }
      // Category filter
      if (activeCategory !== "all" && product.category !== activeCategory) return false;
      if (activeSubcategory && product.subcategory !== activeSubcategory) return false;
      return true;
    });
  }, [activeCategory, activeSubcategory, searchQuery]);

  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const totalGoal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  // Get current page for slide menu active state
  const getCurrentMenuPage = (): string => {
    if (currentView === "home") return "home";
    if (currentView === "all-campaigns" || currentView === "campaign-attend") return "all-campaigns";
    if (currentView === "proposals") return "proposals";
    if (currentView === "donations") return "donations";
    return "home";
  };

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
      setIsCartOpen(true);
    } else {
      toast.info("請先選擇商品");
    }
  };

  const handleAddToWishlist = (product: Product) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === product.id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
    toast.success(`已加入「${product.name}」到願望清單`);
  };

  const handleCartConfirm = () => {
    setIsCartOpen(false);
    setCurrentView("funding");
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const handleNavigate = (page: string) => {
    if (page === "home") {
      setCurrentView("home");
    } else if (page === "proposals") {
      setCurrentView("proposals");
    } else if (page === "donations") {
      setCurrentView("donations");
    } else if (page === "all-campaigns") {
      setCurrentView("all-campaigns");
    } else if (page === "logout") {
      handleLogout();
    }
  };

  const handleLogout = () => {
    // Reset all state and navigate to LINE auth page
    setCart([]);
    setInvitationData(null);
    setPublicHostData(null);
    setPublicInvitationData(null);
    setSelectedCampaignData(null);
    setDonationAmount(0);
    setCurrentView("line-auth");
  };

  const handleLineAuthAllow = () => {
    toast.success("LINE 認證成功");
    setCurrentView("home");
  };

  const handleLineAuthCancel = () => {
    setCurrentView("home");
  };

  const handleSelectCampaign = (campaign: {
    id: string;
    title: string;
    description: string;
    organizer: string;
    image: string;
    currentAmount: number;
    goalAmount: number;
    participants: number;
    remainingTime: string;
  }) => {
    // Convert campaign to InvitationData format for AttendFundraising
    const campaignInvitation: InvitationData = {
      message: campaign.description,
      name: campaign.organizer,
      deadline: campaign.remainingTime,
      products: [],
      mediaItems: [{ id: "1", url: campaign.image, type: "image" as const }],
    };
    setSelectedCampaignData(campaignInvitation);
    setCurrentView("campaign-attend");
  };

  const handleCampaignDonate = (amount: number) => {
    setDonationAmount(amount);
    setCurrentView("payment-form");
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

  const handleLineShareClick = () => {
    setCurrentView("line-friend-selector");
  };

  const handleLineFriendConfirm = (friends: LineFriend[]) => {
    setSelectedLineFriends(friends);
    setCurrentView("line-chat-room");
  };

  const handleLineChatDonateClick = () => {
    setCurrentView("attend-fundraising");
  };

  const handlePreviewAttend = () => {
    setCurrentView("attend-fundraising");
  };

  const handleDonate = (amount: number) => {
    setDonationAmount(amount);
    setCurrentView("payment-form");
  };

  const handlePayment = (method: "credit" | "linepay") => {
    if (method === "credit") {
      setCurrentView("credit-card-form");
    } else {
      setCurrentView("linepay-form");
    }
  };

  const handleCreditCardConfirm = () => {
    setCurrentView("payment-complete");
  };

  const handleLinePayConfirm = () => {
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

  const handlePublicLineShareClick = () => {
    setCurrentView("public-line-friend-selector");
  };

  const handlePublicLineFriendConfirm = (friends: LineFriend[]) => {
    setPublicSelectedLineFriends(friends);
    setCurrentView("public-line-chat-room");
  };

  const handlePublicLineChatDonateClick = () => {
    setCurrentView("public-attend-fundraising");
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
    if (method === "credit") {
      setCurrentView("public-credit-card-form");
    } else {
      setCurrentView("public-linepay-form");
    }
  };

  const handlePublicCreditCardConfirm = () => {
    setCurrentView("public-payment-complete");
  };

  const handlePublicLinePayConfirm = () => {
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

  // Render LINE auth page
  if (currentView === "line-auth") {
    return (
      <LineAuthPage
        onAllow={handleLineAuthAllow}
        onCancel={handleLineAuthCancel}
      />
    );
  }

  // Handle viewing attend fundraising from proposal detail
  const handleViewAttendFundraising = (proposalId: string, isPublic: boolean) => {
    // Create mock invitation data from proposal for preview
    const mockInvitation: InvitationData = {
      message: "這是募資活動的訊息內容",
      name: "募資活動",
      deadline: "2025-12-31",
      products: [],
      mediaItems: [],
    };
    setInvitationData(mockInvitation);
    if (isPublic) {
      setCurrentView("proposal-attend-public");
    } else {
      setCurrentView("proposal-attend-personal");
    }
  };

  // Render proposals page
  if (currentView === "proposals") {
    return (
      <>
        <ProposalsLog
          onBack={() => setCurrentView("home")}
          onMenuClick={() => setIsMenuOpen(true)}
          onCartClick={handleCartClick}
          cartCount={cartCount}
          onViewAttendFundraising={handleViewAttendFundraising}
        />
        <SlideMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          onNavigate={handleNavigate}
          currentPage="proposals"
        />
      </>
    );
  }

  // Render proposal attend personal (from proposal detail message board)
  if (currentView === "proposal-attend-personal" && invitationData) {
    return (
      <AttendFundraising
        invitation={invitationData}
        onBack={() => setCurrentView("proposals")}
        onDonate={handleDonate}
        messageBoardEnabled={true}
        isProposalOwner={true}
      />
    );
  }

  // Render proposal attend public (from proposal detail message board)
  if (currentView === "proposal-attend-public" && invitationData) {
    return (
      <PublicAttendFundraising
        invitation={invitationData}
        hostData={publicHostData}
        onBack={() => setCurrentView("proposals")}
        onDonate={handlePublicDonate}
        messageBoardEnabled={true}
        isProposalOwner={true}
      />
    );
  }

  // Render donations page
  if (currentView === "donations") {
    return (
      <>
        <DonationsLog
          onBack={() => setCurrentView("home")}
          onMenuClick={() => setIsMenuOpen(true)}
          onCartClick={handleCartClick}
          cartCount={cartCount}
        />
        <SlideMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          onNavigate={handleNavigate}
          currentPage="donations"
        />
      </>
    );
  }

  // Render all campaigns page
  if (currentView === "all-campaigns") {
    return (
      <AllCampaigns
        onBack={() => setCurrentView("home")}
        onSelectCampaign={handleSelectCampaign}
        onNavigate={handleNavigate}
      />
    );
  }

  // Render campaign attend page (from all campaigns)
  if (currentView === "campaign-attend" && selectedCampaignData) {
    return (
      <AttendFundraising
        invitation={selectedCampaignData}
        onBack={() => setCurrentView("all-campaigns")}
        onDonate={handleCampaignDonate}
      />
    );
  }

  // Render funding selection
  if (currentView === "funding") {
    return (
      <FundingSelection
        onBack={() => {
          setCurrentView("home");
          setIsCartOpen(true);
        }}
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
        onLineShare={handleLineShareClick}
      />
    );
  }

  if (currentView === "line-friend-selector" && invitationData) {
    return (
      <LineFriendSelector
        onBack={() => setCurrentView("invitation-share")}
        onConfirm={handleLineFriendConfirm}
      />
    );
  }

  if (currentView === "line-chat-room" && invitationData && selectedLineFriends.length > 0) {
    return (
      <LineChatRoom
        friendName={selectedLineFriends[0].name}
        message={invitationData.message}
        onBack={() => setCurrentView("invitation-share")}
        onDonateClick={handleLineChatDonateClick}
      />
    );
  }

  if (currentView === "attend-fundraising" && invitationData) {
    return (
      <AttendFundraising
        invitation={invitationData}
        onBack={() => setCurrentView("line-chat-room")}
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

  if (currentView === "credit-card-form" && invitationData) {
    return (
      <CreditCardForm
        donationAmount={donationAmount}
        onBack={() => setCurrentView("payment-form")}
        onConfirm={handleCreditCardConfirm}
      />
    );
  }

  if (currentView === "linepay-form" && invitationData) {
    return (
      <LinePayForm
        donationAmount={donationAmount}
        onBack={() => setCurrentView("payment-form")}
        onConfirm={handleLinePayConfirm}
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
        onLineShare={handlePublicLineShareClick}
      />
    );
  }

  if (currentView === "public-line-friend-selector" && publicInvitationData) {
    return (
      <LineFriendSelector
        onBack={() => setCurrentView("public-invitation-share")}
        onConfirm={handlePublicLineFriendConfirm}
      />
    );
  }

  if (currentView === "public-line-chat-room" && publicInvitationData && publicSelectedLineFriends.length > 0) {
    return (
      <LineChatRoom
        friendName={publicSelectedLineFriends[0].name}
        message={publicInvitationData.message}
        onBack={() => setCurrentView("public-invitation-share")}
        onDonateClick={handlePublicLineChatDonateClick}
      />
    );
  }

  if (currentView === "public-attend-fundraising" && publicInvitationData) {
    return (
      <PublicAttendFundraising
        invitation={publicInvitationData}
        onBack={() => setCurrentView("public-line-chat-room")}
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

  if (currentView === "public-credit-card-form" && publicInvitationData) {
    return (
      <CreditCardForm
        donationAmount={donationAmount}
        onBack={() => setCurrentView("public-payment-form")}
        onConfirm={handlePublicCreditCardConfirm}
      />
    );
  }

  if (currentView === "public-linepay-form" && publicInvitationData) {
    return (
      <LinePayForm
        donationAmount={donationAmount}
        onBack={() => setCurrentView("public-payment-form")}
        onConfirm={handlePublicLinePayConfirm}
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
    <div className="min-h-screen bg-background flex flex-col">
      <Header
        cartCount={cartCount}
        onMenuClick={() => setIsMenuOpen(true)}
        onCartClick={handleCartClick}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      <main className="flex-1">
        {searchQuery.trim() ? (
          <SearchResults
            query={searchQuery}
            results={filteredProducts}
            onProductClick={handleProductClick}
            onAddToWishlist={handleAddToWishlist}
            onClearSearch={() => setSearchQuery("")}
          />
        ) : (
          <>
            <BannerSlider />
            
            <FeaturedCampaigns onSelectCampaign={handleSelectCampaign} onViewAll={() => setCurrentView("all-campaigns")} />
            
            <div className="px-4 pt-4">
              <h2 className="text-lg font-semibold text-foreground mb-3">想要實現你的願望？</h2>
            </div>
            
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
              onAddToWishlist={handleAddToWishlist}
            />
          </>
        )}
      </main>
      
      <Footer />
      
      <SlideMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={handleNavigate}
        currentPage="home"
      />
      
      <ProductDrawer
        product={selectedProduct}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        cartItems={cart}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onContinueShopping={() => setIsCartOpen(false)}
        onConfirm={handleCartConfirm}
      />
    </div>
  );
};

export default Index;
