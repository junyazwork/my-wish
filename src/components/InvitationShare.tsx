import { InvitationData } from "@/types";
import { toast } from "sonner";
import thankYouBanner from "@/assets/thank-you-banner.jpg";

interface InvitationShareProps {
  invitation: InvitationData;
  cartCount: number;
  onBack: () => void;
  onPreview: () => void;
}

const InvitationShare = ({
  invitation,
  cartCount,
  onBack,
  onPreview,
}: InvitationShareProps) => {
  const handleCopyLink = () => {
    // In production, this would be a real shareable link
    const shareUrl = `${window.location.origin}/attend/${invitation.name}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success("連結已複製");
  };

  const handleLineShare = () => {
    const shareUrl = `${window.location.origin}/attend/${invitation.name}`;
    const lineShareUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}`;
    window.open(lineShareUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={onBack} className="p-2 -ml-2 text-muted-foreground">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
            </svg>
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
      <div className="flex-1 p-5">
        {/* Invitation Card */}
        <div className="rounded-2xl overflow-hidden border border-border bg-card shadow-lg">
          {/* Banner Image */}
          <div className="relative">
            <img
              src={thankYouBanner}
              alt="Thank You"
              className="w-full h-48 object-cover"
            />
            {/* Diamond decoration */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-3 bg-card/60 rotate-45" />
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
    </div>
  );
};

export default InvitationShare;
