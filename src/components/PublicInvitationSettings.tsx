import { useState } from "react";
import { ChevronLeft, Calendar } from "lucide-react";
import { CartItem, PublicHostData, PublicInvitationData } from "@/types";
import InlineMediaEditor, { MediaItem, AspectRatio } from "./InlineMediaEditor";
import WishlistItem from "./WishlistItem";
import FundraisingSettings from "./FundraisingSettings";
import Footer from "./Footer";

interface PublicInvitationSettingsProps {
  hostData: PublicHostData;
  cartItems: CartItem[];
  cartCount: number;
  onBack: () => void;
  onConfirm: (data: PublicInvitationData) => void;
}

const PublicInvitationSettings = ({
  hostData,
  cartItems,
  cartCount,
  onBack,
  onConfirm,
}: PublicInvitationSettingsProps) => {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("3:4");
  const [isPublic, setIsPublic] = useState(false);
  const [messageBoard, setMessageBoard] = useState(false);
  const [notifyEnabled, setNotifyEnabled] = useState(false);
  const [notifyDays, setNotifyDays] = useState(3);
  const maxMessageLength = 100;

  const handleConfirm = () => {
    if (!message.trim() || !name.trim() || !deadline) return;

    onConfirm({
      host: hostData,
      message: message.trim(),
      name: name.trim(),
      deadline,
      products: cartItems,
      mediaItems: mediaItems.map(item => ({
        id: item.id,
        url: item.url,
        type: item.type,
      })),
      aspectRatio,
      isPublic,
      messageBoard,
      notifyEnabled,
      notifyDays,
    });
  };

  const isValid = message.trim() && name.trim() && deadline;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={onBack} className="p-2 -ml-2 text-muted-foreground">
            <ChevronLeft size={24} />
          </button>

          <h1 className="text-lg font-semibold text-foreground">邀請函</h1>

          <div className="relative p-2 -mr-2">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-primary"
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
      <main className="flex-1 p-5 space-y-4">
        {/* Inline Media Editor */}
        <InlineMediaEditor
          mediaItems={mediaItems}
          setMediaItems={setMediaItems}
          aspectRatio={aspectRatio}
          setAspectRatio={setAspectRatio}
        />

        {/* Message Input */}
        <div className="relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value.slice(0, maxMessageLength))}
            placeholder="輸入邀請訊息..."
            className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground resize-none h-24 focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <span className="absolute bottom-3 right-3 text-xs text-muted-foreground">
            {message.length} / {maxMessageLength}
          </span>
        </div>

        {/* Name Input */}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="您的名稱"
          className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        />

        {/* Deadline Input */}
        <div className="relative">
          <Calendar size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Wishlist Section */}
        <div className="pt-2">
          <h3 className="text-base font-medium text-foreground mb-3">我的願望清單</h3>
          <div className="space-y-3">
            {cartItems.map((item) => (
              <WishlistItem key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Settings Section */}
        <div className="pt-2">
          <FundraisingSettings
            isPublic={isPublic}
            onIsPublicChange={setIsPublic}
            messageBoard={messageBoard}
            onMessageBoardChange={setMessageBoard}
            notifyEnabled={notifyEnabled}
            onNotifyEnabledChange={setNotifyEnabled}
            notifyDays={notifyDays}
            onNotifyDaysChange={setNotifyDays}
          />
        </div>
      </main>

      {/* Bottom Button */}
      <div className="sticky bottom-0 bg-background border-t border-border p-4">
        <button
          onClick={handleConfirm}
          disabled={!isValid}
          className="w-full py-3.5 bg-primary text-primary-foreground rounded-xl font-medium transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          建立募資活動
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default PublicInvitationSettings;
