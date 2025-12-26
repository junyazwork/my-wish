import { useState, useRef } from "react";
import { ChevronLeft, Plus, GripVertical, X, ImageIcon, Video } from "lucide-react";

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
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      const item = prev.find((m) => m.id === id);
      if (item) {
        URL.revokeObjectURL(item.url);
      }
      return prev.filter((m) => m.id !== id);
    });
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
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
    setDraggedIndex(null);
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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
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

      {/* Content */}
      <div className="flex-1 p-5 space-y-6">
        {/* Aspect Ratio Selection */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">呈現比例</label>
          <div className="flex gap-3">
            {(["4:3", "1:1", "16:9"] as AspectRatio[]).map((ratio) => (
              <button
                key={ratio}
                onClick={() => setAspectRatio(ratio)}
                className={`flex-1 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                  aspectRatio === ratio
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/50"
                }`}
              >
                {ratio}
              </button>
            ))}
          </div>
        </div>

        {/* Upload Button */}
        {mediaItems.length < 5 && (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-3 border-2 border-dashed border-border rounded-xl flex items-center justify-center gap-2 text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors"
          >
            <Plus size={20} />
            <span>上傳圖片/影片 ({mediaItems.length}/5)</span>
          </button>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Media Preview Grid */}
        {mediaItems.length > 0 && (
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">
              拖曳調整順序
            </label>
            <div className="space-y-3">
              {mediaItems.map((item, index) => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                  className={`relative rounded-xl overflow-hidden border border-border bg-card transition-transform ${
                    draggedIndex === index ? "opacity-50 scale-95" : ""
                  }`}
                >
                  <div className={`${getAspectRatioClass()} bg-muted`}>
                    {item.type === "image" ? (
                      <img
                        src={item.url}
                        alt={`Media ${index + 1}`}
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

                  {/* Overlay Controls */}
                  <div className="absolute top-2 left-2 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center cursor-grab active:cursor-grabbing">
                      <GripVertical size={16} className="text-foreground" />
                    </div>
                    <div className="px-2 py-1 rounded-full bg-background/80 backdrop-blur-sm flex items-center gap-1 text-xs text-foreground">
                      {item.type === "image" ? (
                        <ImageIcon size={12} />
                      ) : (
                        <Video size={12} />
                      )}
                      <span>{index + 1}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-destructive/80 backdrop-blur-sm flex items-center justify-center hover:bg-destructive transition-colors"
                  >
                    <X size={16} className="text-destructive-foreground" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {mediaItems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <ImageIcon size={48} strokeWidth={1.5} />
            <p className="mt-3 text-sm">尚未上傳任何媒體</p>
          </div>
        )}
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
