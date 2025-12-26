import { useState, useRef } from "react";
import { ChevronLeft, Plus, Trash2 } from "lucide-react";

export interface MediaItem {
  id: string;
  file: File;
  url: string;
  type: "image" | "video";
}

type AspectRatio = "4:3" | "1:1" | "16:9";

interface MediaUploadEditorProps {
  onSave: (media: MediaItem[], aspectRatio: AspectRatio) => void;
  onBack: () => void;
  initialMedia?: MediaItem[];
  initialAspectRatio?: AspectRatio;
}

const MediaUploadEditor = ({
  onSave,
  onBack,
  initialMedia = [],
  initialAspectRatio = "4:3",
}: MediaUploadEditorProps) => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(initialMedia);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>(initialAspectRatio);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [isLongPressing, setIsLongPressing] = useState(false);
  const [showTrashZone, setShowTrashZone] = useState(false);
  const [isOverTrash, setIsOverTrash] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const remainingSlots = 5 - mediaItems.length;
    const filesToAdd = Array.from(files).slice(0, remainingSlots);

    const newItems: MediaItem[] = filesToAdd.map((file) => ({
      id: crypto.randomUUID(),
      file,
      url: URL.createObjectURL(file),
      type: file.type.startsWith("video/") ? "video" : "image",
    }));

    setMediaItems((prev) => [...prev, ...newItems]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeItem = (id: string) => {
    setMediaItems((prev) => {
      const itemIndex = prev.findIndex((m) => m.id === id);
      const item = prev.find((m) => m.id === id);
      if (item) {
        URL.revokeObjectURL(item.url);
      }
      const newItems = prev.filter((m) => m.id !== id);
      // Adjust selected index if needed
      if (selectedIndex >= newItems.length && newItems.length > 0) {
        setSelectedIndex(newItems.length - 1);
      } else if (selectedIndex > itemIndex) {
        setSelectedIndex(selectedIndex - 1);
      }
      return newItems;
    });
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
    setShowTrashZone(true);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newItems = [...mediaItems];
    const [draggedItem] = newItems.splice(draggedIndex, 1);
    newItems.splice(index, 0, draggedItem);
    setMediaItems(newItems);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    if (isOverTrash && draggedIndex !== null) {
      const itemToRemove = mediaItems[draggedIndex];
      if (itemToRemove) {
        removeItem(itemToRemove.id);
      }
    }
    setDraggedIndex(null);
    setShowTrashZone(false);
    setIsOverTrash(false);
    setIsLongPressing(false);
  };

  const handleTouchStart = (index: number) => {
    longPressTimer.current = setTimeout(() => {
      setIsLongPressing(true);
      setShowTrashZone(true);
      setDraggedIndex(index);
    }, 500);
  };

  const handleTouchEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
    if (isOverTrash && draggedIndex !== null) {
      const itemToRemove = mediaItems[draggedIndex];
      if (itemToRemove) {
        removeItem(itemToRemove.id);
      }
    }
    setIsLongPressing(false);
    setShowTrashZone(false);
    setDraggedIndex(null);
    setIsOverTrash(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isLongPressing || draggedIndex === null) return;

    const touch = e.touches[0];
    const trashZone = document.getElementById("trash-zone");
    if (trashZone) {
      const rect = trashZone.getBoundingClientRect();
      const isOver =
        touch.clientX >= rect.left &&
        touch.clientX <= rect.right &&
        touch.clientY >= rect.top &&
        touch.clientY <= rect.bottom;
      setIsOverTrash(isOver);
    }
  };

  const handleSave = () => {
    onSave(mediaItems, aspectRatio);
  };

  const getAspectRatioClass = () => {
    switch (aspectRatio) {
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

  const getRatioIcon = (ratio: AspectRatio, isActive: boolean) => {
    const baseClass = `transition-colors ${isActive ? "stroke-primary" : "stroke-muted-foreground"}`;
    switch (ratio) {
      case "4:3":
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={baseClass}>
            <rect x="4" y="6" width="16" height="12" rx="2" strokeWidth="1.5" />
          </svg>
        );
      case "1:1":
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={baseClass}>
            <rect x="5" y="5" width="14" height="14" rx="2" strokeWidth="1.5" />
          </svg>
        );
      case "16:9":
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={baseClass}>
            <rect x="3" y="7" width="18" height="10" rx="2" strokeWidth="1.5" />
          </svg>
        );
    }
  };

  const currentMedia = mediaItems[selectedIndex];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={onBack}
            className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-lg font-semibold text-foreground">編輯媒體</h1>
          <div className="w-10" />
        </div>
      </header>

      {/* Aspect Ratio Tabs */}
      <div className="flex justify-center gap-12 py-4">
        {(["4:3", "1:1", "16:9"] as AspectRatio[]).map((ratio) => (
          <button
            key={ratio}
            onClick={() => setAspectRatio(ratio)}
            className="flex flex-col items-center gap-1"
          >
            {getRatioIcon(ratio, aspectRatio === ratio)}
            <span
              className={`text-sm font-medium transition-colors ${
                aspectRatio === ratio ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {ratio}
            </span>
          </button>
        ))}
      </div>

      {/* Main Preview Area */}
      <div className="flex-1 px-5 flex flex-col">
        <div className={`${getAspectRatioClass()} w-full bg-muted rounded-2xl overflow-hidden relative`}>
          {currentMedia ? (
            currentMedia.type === "image" ? (
              <img
                src={currentMedia.url}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <video
                src={currentMedia.url}
                className="w-full h-full object-cover"
                controls
                muted
              />
            )
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <span>尚未上傳任何媒體</span>
            </div>
          )}

          {/* Page Indicators */}
          {mediaItems.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              {mediaItems.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === selectedIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Thumbnail Row */}
        <div className="py-6">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {mediaItems.map((item, index) => (
              <div
                key={item.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                onTouchStart={() => handleTouchStart(index)}
                onTouchEnd={handleTouchEnd}
                onTouchMove={handleTouchMove}
                onClick={() => setSelectedIndex(index)}
                className={`flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden cursor-pointer transition-all border-2 ${
                  selectedIndex === index
                    ? "border-primary"
                    : "border-transparent"
                } ${draggedIndex === index ? "opacity-50 scale-95" : ""}`}
              >
                {item.type === "image" ? (
                  <img
                    src={item.url}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video
                    src={item.url}
                    className="w-full h-full object-cover"
                    muted
                  />
                )}
              </div>
            ))}

            {/* Add Button */}
            {mediaItems.length < 5 && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex-shrink-0 w-24 h-24 rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 flex items-center justify-center hover:border-primary/50 hover:bg-primary/10 transition-colors"
              >
                <Plus size={32} className="text-primary" />
              </button>
            )}
          </div>

          {/* Trash Zone - appears when long pressing */}
          {showTrashZone && (
            <div
              id="trash-zone"
              onDragOver={(e) => {
                e.preventDefault();
                setIsOverTrash(true);
              }}
              onDragLeave={() => setIsOverTrash(false)}
              onDrop={handleDragEnd}
              className={`mt-4 py-6 rounded-xl border-2 border-dashed flex items-center justify-center gap-2 transition-colors ${
                isOverTrash
                  ? "border-destructive bg-destructive/10 text-destructive"
                  : "border-muted-foreground/30 text-muted-foreground"
              }`}
            >
              <Trash2 size={24} />
              <span className="text-sm font-medium">拖曳至此處刪除</span>
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Bottom Button */}
      <div className="sticky bottom-0 bg-background border-t border-border p-4">
        <button
          onClick={handleSave}
          className="w-full py-3.5 bg-primary text-primary-foreground rounded-xl font-medium transition-all hover:opacity-90"
        >
          儲存
        </button>
      </div>
    </div>
  );
};

export default MediaUploadEditor;
