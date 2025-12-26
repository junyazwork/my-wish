import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar, Upload } from "lucide-react";
import { CartItem, PublicHostData, PublicInvitationData } from "@/types";
import thankYouBanner from "@/assets/thank-you-banner.jpg";
import MediaUploadEditor, { MediaItem } from "./MediaUploadEditor";

type AspectRatio = "4:3" | "1:1" | "16:9";

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
  const [showMediaEditor, setShowMediaEditor] = useState(false);
  const [uploadedMedia, setUploadedMedia] = useState<MediaItem[]>([]);
  const [mediaAspectRatio, setMediaAspectRatio] = useState<AspectRatio>("4:3");
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const maxMessageLength = 100;

  const handleConfirm = () => {
    if (!message.trim() || !name.trim() || !deadline) return;

    onConfirm({
      host: hostData,
      message: message.trim(),
      name: name.trim(),
      deadline,
      products: cartItems,
    });
  };

  const handleMediaSave = (media: MediaItem[], aspectRatio: AspectRatio) => {
    setUploadedMedia(media);
    setMediaAspectRatio(aspectRatio);
    setCurrentMediaIndex(0);
    setShowMediaEditor(false);
  };

  const getAspectRatioClass = () => {
    switch (mediaAspectRatio) {
      case "4:3":
        return "aspect-[4/3]";
      case "1:1":
        return "aspect-square";
      case "16:9":
        return "aspect-video";
      default:
        return "aspect-[4/3]";
    }
  };

  const handlePrevMedia = () => {
    setCurrentMediaIndex((prev) =>
      prev === 0 ? uploadedMedia.length - 1 : prev - 1
    );
  };

  const handleNextMedia = () => {
    setCurrentMediaIndex((prev) =>
      prev === uploadedMedia.length - 1 ? 0 : prev + 1
    );
  };

  const isValid = message.trim() && name.trim() && deadline;

  if (showMediaEditor) {
    return (
      <MediaUploadEditor
        onSave={handleMediaSave}
        onBack={() => setShowMediaEditor(false)}
        initialMedia={uploadedMedia}
        initialAspectRatio={mediaAspectRatio}
      />
    );
  }

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
      <div className="flex-1 p-5 space-y-4">
        {/* Banner Carousel or Uploaded Media */}
        {uploadedMedia.length > 0 ? (
          <div className={`relative rounded-xl overflow-hidden ${getAspectRatioClass()}`}>
            {uploadedMedia[currentMediaIndex].type === "image" ? (
              <img
                src={uploadedMedia[currentMediaIndex].url}
                alt={`Media ${currentMediaIndex + 1}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <video
                src={uploadedMedia[currentMediaIndex].url}
                className="w-full h-full object-cover"
                muted
                autoPlay
                loop
              />
            )}
            {uploadedMedia.length > 1 && (
              <>
                <button
                  onClick={handlePrevMedia}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/50 flex items-center justify-center"
                >
                  <ChevronLeft size={20} className="text-foreground" />
                </button>
                <button
                  onClick={handleNextMedia}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/50 flex items-center justify-center"
                >
                  <ChevronRight size={20} className="text-foreground" />
                </button>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2 py-1 rounded-full bg-background/70 text-xs text-foreground">
                  {currentMediaIndex + 1} / {uploadedMedia.length}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="relative rounded-xl overflow-hidden">
            <img src={thankYouBanner} alt="Thank You Banner" className="w-full h-48 object-cover" />
            <button className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/50 flex items-center justify-center">
              <ChevronLeft size={20} className="text-foreground" />
            </button>
            <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/50 flex items-center justify-center">
              <ChevronRight size={20} className="text-foreground" />
            </button>
          </div>
        )}

        {/* Upload Media Button */}
        <button
          onClick={() => setShowMediaEditor(true)}
          className="w-full py-3 border border-border rounded-xl flex items-center justify-center gap-2 text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors bg-card"
        >
          <Upload size={18} />
          <span>
            {uploadedMedia.length > 0
              ? `已上傳 ${uploadedMedia.length} 個媒體 - 點擊編輯`
              : "上傳圖片/影片"}
          </span>
        </button>

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
      </div>

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
    </div>
  );
};

export default PublicInvitationSettings;
