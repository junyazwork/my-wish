import { useState, useRef } from "react";
import { Plus, Trash2 } from "lucide-react";

export interface MediaItem {
  id: string;
  file: File;
  url: string;
  type: "image" | "video";
}

export type AspectRatio = "3:4" | "1:1" | "9:16";

interface InlineMediaEditorProps {
  mediaItems: MediaItem[];
  setMediaItems: React.Dispatch<React.SetStateAction<MediaItem[]>>;
  aspectRatio: AspectRatio;
  setAspectRatio: React.Dispatch<React.SetStateAction<AspectRatio>>;
}

const InlineMediaEditor = ({
  mediaItems,
  setMediaItems,
  aspectRatio,
  setAspectRatio,
}: InlineMediaEditorProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [isLongPressing, setIsLongPressing] = useState(false);
  const [showTrashZone, setShowTrashZone] = useState(false);
  const [isOverTrash, setIsOverTrash] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    const trashZone = document.getElementById("inline-trash-zone");
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

  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case "3:4":
        return "aspect-[3/4]";
      case "1:1":
        return "aspect-square";
      case "9:16":
        return "aspect-[9/16]";
      default:
        return "aspect-[3/4]";
    }
  };

  const getRatioIcon = (ratio: AspectRatio, isActive: boolean) => {
    const baseClass = `transition-colors ${isActive ? "stroke-primary" : "stroke-muted-foreground"}`;
    switch (ratio) {
      case "3:4":
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={baseClass}>
            <rect x="6" y="4" width="12" height="16" rx="2" strokeWidth="1.5" />
          </svg>
        );
      case "1:1":
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={baseClass}>
            <rect x="5" y="5" width="14" height="14" rx="2" strokeWidth="1.5" />
          </svg>
        );
      case "9:16":
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={baseClass}>
            <rect x="7" y="3" width="10" height="18" rx="2" strokeWidth="1.5" />
          </svg>
        );
    }
  };

  const currentMedia = mediaItems[selectedIndex];

  return (
    <div className="space-y-4">
      {/* Aspect Ratio Tabs */}
      <div className="flex justify-center gap-12 py-2">
        {(["3:4", "1:1", "9:16"] as AspectRatio[]).map((ratio) => (
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
            <span>點擊下方加號上傳媒體</span>
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
            className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden cursor-pointer transition-all border-2 ${
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
            className="flex-shrink-0 w-20 h-20 rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 flex items-center justify-center hover:border-primary/50 hover:bg-primary/10 transition-colors"
          >
            <Plus size={28} className="text-primary" />
          </button>
        )}
      </div>

      {/* Hint Text */}
      <p className="text-center text-sm text-muted-foreground">
        最多上傳 5 張圖片或影片、共 50mb 以內。
      </p>

      {/* Trash Zone - appears when long pressing or dragging */}
      {showTrashZone && (
        <div
          id="inline-trash-zone"
          onDragOver={(e) => {
            e.preventDefault();
            setIsOverTrash(true);
          }}
          onDragLeave={() => setIsOverTrash(false)}
          onDrop={handleDragEnd}
          className={`py-4 rounded-xl border-2 border-dashed flex items-center justify-center gap-2 transition-colors ${
            isOverTrash
              ? "border-destructive bg-destructive/10 text-destructive"
              : "border-muted-foreground/30 text-muted-foreground"
          }`}
        >
          <Trash2 size={20} />
          <span className="text-sm font-medium">拖曳至此處刪除</span>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};

export default InlineMediaEditor;
