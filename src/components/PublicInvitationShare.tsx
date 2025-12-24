import { ChevronLeft, Check } from "lucide-react";
import { PublicInvitationData } from "@/types";
import thankYouBanner from "@/assets/thank-you-banner.jpg";
import { toast } from "sonner";

interface PublicInvitationShareProps {
  invitation: PublicInvitationData;
  cartCount: number;
  onBack: () => void;
  onPreview: () => void;
  onConfirmContent: () => void;
}

const PublicInvitationShare = ({
  invitation,
  cartCount,
  onBack,
  onPreview,
  onConfirmContent,
}: PublicInvitationShareProps) => {
  const handleCopyLink = () => {
    const link = `${window.location.origin}/public-fundraising/${Date.now()}`;
    navigator.clipboard.writeText(link);
    toast.success("連結已複製！");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={onBack} className="p-2 -ml-2 text-muted-foreground">
            <ChevronLeft size={24} />
          </button>
          
          {/* Success Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 rounded-full">
            <Check size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">成功送出</span>
          </div>
          
          <div className="relative p-2 -mr-2">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
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
      <div className="flex-1 p-5 space-y-4">
        {/* Banner */}
        <div className="relative rounded-xl overflow-hidden">
          <img
            src={thankYouBanner}
            alt="Thank You Banner"
            className="w-full h-48 object-cover"
          />
        </div>

        {/* Message Display */}
        <div className="bg-secondary/30 rounded-lg p-4">
          <p className="text-foreground">{invitation.message}</p>
        </div>

        {/* Preview Button */}
        <button
          onClick={onPreview}
          className="w-full py-3.5 border border-border rounded-xl text-foreground font-medium transition-colors hover:bg-secondary"
        >
          來去贊助
        </button>
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
          onClick={onConfirmContent}
          className="flex-1 py-3.5 bg-primary text-primary-foreground rounded-xl font-medium transition-all hover:opacity-90"
        >
          確認內容
        </button>
      </div>
    </div>
  );
};

export default PublicInvitationShare;
