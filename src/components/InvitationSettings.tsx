import { useState } from "react";
import { Calendar, X, ChevronLeft, Heart } from "lucide-react";
import { InvitationData, CartItem } from "@/types";
import InlineMediaEditor, { MediaItem, AspectRatio } from "./InlineMediaEditor";
import FundraisingSettings from "./FundraisingSettings";
import Footer from "./Footer";

interface InvitationSettingsProps {
  cartItems: CartItem[];
  cartCount: number;
  onBack: () => void;
  onConfirm: (data: InvitationData) => void;
}

const InvitationSettings = ({ cartItems, cartCount, onBack, onConfirm }: InvitationSettingsProps) => {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("3:4");
  const [isPublic, setIsPublic] = useState(false);
  const [messageBoard, setMessageBoard] = useState(false);
  const [notifyEnabled, setNotifyEnabled] = useState(false);
  const [notifyDays, setNotifyDays] = useState(3);
  const maxChars = 100;

  const handleConfirm = () => {
    if (message && name && deadline) {
      onConfirm({
        message,
        name,
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
    }
  };

  const clearDeadline = () => setDeadline("");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={onBack} className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft size={24} />
          </button>

          <h1 className="text-lg font-semibold text-foreground">邀請函</h1>

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
            onChange={(e) => setMessage(e.target.value.slice(0, maxChars))}
            placeholder="大家好，這是我的贊助活動，謝謝大家的支持"
            className="w-full p-4 pb-8 border border-border rounded-xl bg-card text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
            rows={3}
          />
          <span className="absolute bottom-3 right-3 text-xs text-muted-foreground">
            {message.length} / {maxChars}
          </span>
        </div>

        {/* Name Input */}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Zimmer"
          className="w-full p-4 border border-border rounded-xl bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        />

        {/* Date Input */}
        <div className="relative">
          <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full p-4 pl-11 pr-10 border border-border rounded-xl bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          {deadline && (
            <button
              onClick={clearDeadline}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Settings Section */}
        <div className="pt-2">
          <h3 className="text-lg font-medium text-foreground mb-4">活動設定</h3>
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
          disabled={!message || !name || !deadline}
          className="w-full py-3.5 bg-primary text-primary-foreground rounded-xl font-medium transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          建立募資活動
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default InvitationSettings;
