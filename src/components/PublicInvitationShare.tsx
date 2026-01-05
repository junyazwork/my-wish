import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PublicInvitationData } from "@/types";
import { toast } from "sonner";
import WishlistItem from "./WishlistItem";
import Footer from "./Footer";

interface PublicInvitationShareProps {
  invitation: PublicInvitationData;
  cartCount: number;
  onBack: () => void;
  onPreview: () => void;
  onLineShare: () => void;
  currentAmount?: number;
  goalAmount?: number;
}

const PublicInvitationShare = ({
  invitation,
  cartCount,
  onBack,
  onPreview,
  onLineShare,
  currentAmount = 0,
  goalAmount = 0,
}: PublicInvitationShareProps) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const mediaItems = invitation.mediaItems || [];
  const aspectRatio = invitation.aspectRatio || "3:4";
  const isGoalReached = currentAmount >= goalAmount && goalAmount > 0;

  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case "3:4":
        return "aspect-[3/4]";
      case "1:1":
        return "aspect-square";
      case "9:16":
        return "aspect-[9/16]";
      default:
        return "aspect-[3/4]";
    }
  };

  const handlePrevMedia = () => {
    setCurrentMediaIndex((prev) => (prev > 0 ? prev - 1 : mediaItems.length - 1));
  };

  const handleNextMedia = () => {
    setCurrentMediaIndex((prev) => (prev < mediaItems.length - 1 ? prev + 1 : 0));
  };

  const handleCopyLink = () => {
    const shareUrl = `${window.location.origin}/public-fundraising/${invitation.name}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success("連結已複製");
  };

  const handleLineShare = () => {
    onLineShare();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={onBack} className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft size={24} />
          </button>

          <h1 className="text-lg font-semibold text-foreground">邀請函</h1>

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
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[20px] h-5 px-1.5 bg-destructive text-destructive-foreground text-xs font-medium rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 p-5">
        {/* Invitation Card */}
        <div className="rounded-2xl overflow-hidden border border-border bg-card shadow-lg">
          {/* Media Display */}
          <div className="relative">
            {mediaItems.length > 0 ? (
              <>
                <div className={`w-full ${getAspectRatioClass()} bg-muted overflow-hidden`}>
                  {mediaItems[currentMediaIndex].type === "video" ? (
                    <video
                      src={mediaItems[currentMediaIndex].url}
                      className="w-full h-full object-cover"
                      controls
                    />
                  ) : (
                    <img
                      src={mediaItems[currentMediaIndex].url}
                      alt="邀請函媒體"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                {/* Navigation arrows */}
                {mediaItems.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevMedia}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-background/80 rounded-full flex items-center justify-center text-foreground hover:bg-background transition-colors"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={handleNextMedia}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-background/80 rounded-full flex items-center justify-center text-foreground hover:bg-background transition-colors"
                    >
                      <ChevronRight size={20} />
                    </button>
                    {/* Page indicators */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {mediaItems.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentMediaIndex ? "bg-primary" : "bg-background/60"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="w-full h-48 bg-muted flex items-center justify-center">
                <span className="text-muted-foreground">尚未上傳媒體</span>
              </div>
            )}
          </div>

          {/* Card Content */}
          <div className="p-4 space-y-3 text-center">
            <p className="text-foreground">{invitation.message}</p>
            <button
              disabled
              className={`w-full py-3 border rounded-lg font-medium cursor-not-allowed ${
                isGoalReached 
                  ? "border-success bg-success/10 text-success" 
                  : "border-border bg-muted text-muted-foreground"
              }`}
            >
              {isGoalReached ? "已達標" : "來去贊助"}
            </button>
          </div>
        </div>

        {/* Wishlist Section */}
        {invitation.products && invitation.products.length > 0 && (
          <div className="mt-5">
            <h3 className="text-base font-medium text-foreground mb-3">我的願望清單</h3>
            <div className="space-y-3">
              {invitation.products.map((item) => (
                <WishlistItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Bottom Buttons */}
      <div className="sticky bottom-0 bg-background border-t border-border p-4 flex gap-3">
        <button
          onClick={handleCopyLink}
          className="flex-1 py-3.5 bg-primary text-primary-foreground rounded-xl font-medium transition-all hover:opacity-90"
        >
          複製連結
        </button>
        <button
          onClick={handleLineShare}
          className="flex-1 py-3.5 border-2 border-[#06C755] text-[#06C755] rounded-xl font-medium transition-all hover:bg-[#06C755]/10"
        >
          Line分享
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default PublicInvitationShare;