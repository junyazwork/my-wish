import { useState } from "react";
import { Calendar, X, ChevronLeft, Heart, ImagePlus } from "lucide-react";
import { InvitationData, CartItem } from "@/types";
import InlineMediaEditor, { MediaItem, AspectRatio } from "./InlineMediaEditor";
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
  const [showMediaEditor, setShowMediaEditor] = useState(false);
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
      });
    }
  };

  const clearDeadline = () => setDeadline("");

  // Media Editor Page View
  if (showMediaEditor) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="flex items-center justify-between px-4 py-3">
            <button onClick={() => setShowMediaEditor(false)} className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors">
              <ChevronLeft size={24} />
            </button>

            <h1 className="text-lg font-semibold text-foreground">上傳圖片/影片</h1>

            <div className="w-10" />
          </div>
        </header>

        {/* Media Editor Content */}
        <main className="flex-1 p-5">
          <InlineMediaEditor
            mediaItems={mediaItems}
            setMediaItems={setMediaItems}
            aspectRatio={aspectRatio}
            setAspectRatio={setAspectRatio}
          />
        </main>

        {/* Bottom Button */}
        <div className="sticky bottom-0 bg-background border-t border-border p-4">
          <button
            onClick={() => setShowMediaEditor(false)}
            className="w-full py-3.5 bg-primary text-primary-foreground rounded-xl font-medium transition-all hover:opacity-90"
          >
            完成
          </button>
        </div>
      </div>
    );
  }

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

        {/* Upload Media Button */}
        <button
          onClick={() => setShowMediaEditor(true)}
          className="w-full py-3.5 border border-border rounded-xl bg-card text-foreground font-medium flex items-center justify-center gap-2 hover:bg-muted/50 transition-colors"
        >
          <ImagePlus size={20} />
          上傳圖片/影片
          {mediaItems.length > 0 && (
            <span className="ml-1 px-2 py-0.5 bg-primary/20 text-primary text-sm rounded-full">
              {mediaItems.length}
            </span>
          )}
        </button>
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
