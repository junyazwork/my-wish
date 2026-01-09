import { useState } from "react";
import { Check, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { InvitationData } from "@/types";
import WishlistItem from "./WishlistItem";
import Footer from "./Footer";

interface InvitationConfirmProps {
  invitation: InvitationData;
  cartCount: number;
  onBack: () => void;
  onPreview: () => void;
  onConfirm: () => void;
  currentAmount?: number;
  goalAmount?: number;
}

const InvitationConfirm = ({
  invitation,
  cartCount,
  onBack,
  onPreview,
  onConfirm,
  currentAmount = 0,
  goalAmount = 0,
}: InvitationConfirmProps) => {
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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={onBack} className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft size={24} />
          </button>

          {/* Success Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/20 rounded-full">
            <Check size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">成功送出</span>
          </div>

          <div className="relative p-2 -mr-2 text-muted-foreground">
            <Heart size={22} />
            {cartCount > 0 && (
              <span className="absolute top-0.5 right-0.5 min-w-[18px] h-[18px] px-1 bg-destructive text-destructive-foreground text-[10px] font-medium rounded-full flex items-center justify-center">
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
          onClick={onBack}
          className="flex-1 py-3.5 border border-border rounded-xl text-foreground font-medium transition-colors hover:bg-secondary"
        >
          上一步
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 py-3.5 bg-primary text-primary-foreground rounded-xl font-medium transition-all hover:opacity-90"
        >
          確認內容
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default InvitationConfirm;
