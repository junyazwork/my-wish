import { Check } from "lucide-react";
import { InvitationData } from "@/types";
import thankYouBanner from "@/assets/thank-you-banner.jpg";

interface InvitationConfirmProps {
  invitation: InvitationData;
  cartCount: number;
  onBack: () => void;
  onPreview: () => void;
  onConfirm: () => void;
}

const InvitationConfirm = ({
  invitation,
  cartCount,
  onBack,
  onPreview,
  onConfirm,
}: InvitationConfirmProps) => {
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

export default InvitationConfirm;
