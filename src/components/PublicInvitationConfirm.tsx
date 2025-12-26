import { useState } from "react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { PublicInvitationData } from "@/types";

interface PublicInvitationConfirmProps {
  invitation: PublicInvitationData;
  cartCount: number;
  onBack: () => void;
  onPreview: () => void;
  onConfirm: () => void;
}

const PublicInvitationConfirm = ({
  invitation,
  cartCount,
  onBack,
  onPreview,
  onConfirm,
}: PublicInvitationConfirmProps) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const mediaItems = invitation.mediaItems || [];
  const aspectRatio = invitation.aspectRatio || "3:4";

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
      <div className="flex-1 p-5">
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
              onClick={onPreview}
              className="w-full py-3 border border-border rounded-lg text-foreground font-medium hover:bg-secondary transition-colors"
            >
              來去贊助
            </button>
          </div>
        </div>
      </div>

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
    </div>
  );
};

export default PublicInvitationConfirm;
