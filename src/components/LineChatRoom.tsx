import thankYouBanner from "@/assets/thank-you-banner.jpg";

interface LineChatRoomProps {
  friendName: string;
  message: string;
  onBack: () => void;
  onDonateClick: () => void;
  onCreditCardClick: () => void;
}

const LineChatRoom = ({
  friendName,
  message,
  onBack,
  onDonateClick,
  onCreditCardClick,
}: LineChatRoomProps) => {
  const currentTime = new Date().toLocaleTimeString("zh-TW", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="min-h-screen bg-[#8CABD9] flex flex-col">
      {/* LINE Chat Header */}
      <header className="sticky top-0 z-40 bg-[#8CABD9] border-b border-[#7A9BC8]">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <button onClick={onBack} className="flex items-center gap-1 text-foreground">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="15,18 9,12 15,6" />
              </svg>
              <span className="text-sm">99+</span>
            </button>
            <span className="text-lg font-semibold text-foreground ml-2">{friendName}</span>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-foreground">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
            <button className="text-foreground">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </button>
            <button className="text-foreground">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Chat Content */}
      <div className="flex-1 p-4">
        {/* Sender Name */}
        <div className="flex items-start gap-2 mb-2">
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-muted-foreground"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-foreground/80 mb-1">Natasha</span>
            
            {/* Message Card */}
            <div className="bg-card rounded-2xl overflow-hidden shadow-lg max-w-[280px]">
              {/* Banner Image */}
              <div className="relative">
                <img
                  src={thankYouBanner}
                  alt="Thank You"
                  className="w-full h-40 object-cover"
                />
                {/* Diamond decoration */}
                <div className="absolute right-4 bottom-4 w-2 h-2 bg-card/60 rotate-45" />
              </div>

              {/* Card Content */}
              <div className="p-3 bg-card">
                <h3 className="font-semibold text-foreground mb-1">My Wish</h3>
                <p className="text-sm text-foreground mb-3">{message}</p>
                <div className="border-t border-border">
                  <button
                    onClick={onDonateClick}
                    className="w-full text-center text-[#5B7BB5] font-medium py-2 border-b border-border"
                  >
                    來去贊助
                  </button>
                  <button
                    onClick={onCreditCardClick}
                    className="w-full text-center text-[#5B7BB5] font-medium py-2"
                  >
                    信用卡支付
                  </button>
                </div>
              </div>
            </div>

            {/* Time */}
            <span className="text-xs text-foreground/60 mt-1 self-end">{currentTime}</span>
          </div>
        </div>
      </div>

      {/* Bottom Input Bar (Mock) */}
      <div className="sticky bottom-0 bg-[#F7F7F7] border-t border-border p-2">
        <div className="flex items-center gap-2">
          <button className="p-2 text-muted-foreground">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
          <button className="p-2 text-muted-foreground">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
          </button>
          <button className="p-2 text-muted-foreground">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </button>
          <div className="flex-1 bg-card rounded-full px-4 py-2">
            <span className="text-muted-foreground">Aa</span>
          </div>
          <button className="p-2 text-muted-foreground">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 14s1.5 2 4 2 4-2 4-2" />
              <line x1="9" y1="9" x2="9.01" y2="9" />
              <line x1="15" y1="9" x2="15.01" y2="9" />
            </svg>
          </button>
          <button className="p-2 text-muted-foreground">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LineChatRoom;
