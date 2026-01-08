import { useState } from "react";
import { ChevronLeft, Heart } from "lucide-react";
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
      <main className="flex-1">
        {/* Name Field */}
        <div className="flex items-center px-5 py-4 border-b border-border">
          <label className="text-foreground font-medium w-24 shrink-0">提案人</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Chris Yeh"
            className="flex-1 text-muted-foreground bg-transparent focus:outline-none focus:text-foreground"
          />
        </div>

        {/* Date Field */}
        <div className="flex items-center px-5 py-4 border-b border-border">
          <label className="text-foreground font-medium w-24 shrink-0">提案截止日期</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            placeholder="YYYY/MM/DD"
            className="flex-1 text-muted-foreground bg-transparent focus:outline-none focus:text-foreground"
          />
        </div>

        {/* Message Field */}
        <div className="px-5 py-4 border-b border-border">
          <label className="text-foreground font-medium block mb-2">內容</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value.slice(0, maxChars))}
            placeholder="請寫下你募資原因"
            className="w-full text-muted-foreground bg-transparent resize-none focus:outline-none focus:text-foreground min-h-[120px]"
            rows={5}
          />
        </div>
      </main>

      {/* Bottom Section */}
      <div className="sticky bottom-0 bg-background p-4 space-y-3">
        {/* Upload Media Link */}
        <button
          onClick={() => setShowMediaEditor(true)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors ml-auto"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
          </svg>
          <span>上傳照片/影片</span>
          {mediaItems.length > 0 && (
            <span className="px-2 py-0.5 bg-primary/20 text-primary text-sm rounded-full">
              {mediaItems.length}
            </span>
          )}
        </button>

        {/* Submit Button */}
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
