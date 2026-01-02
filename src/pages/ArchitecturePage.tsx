import { ArrowLeft, Download, ZoomIn, ZoomOut } from "lucide-react";
import { useState } from "react";
import architectureDiagram from "@/assets/page-architecture-diagram.png";

const ArchitecturePage = () => {
  const [zoom, setZoom] = useState(100);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 25, 50));
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = architectureDiagram;
    link.download = "page-architecture-diagram.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => window.history.back()}
            className="p-2 -ml-2 hover:bg-secondary rounded-full transition-colors"
          >
            <ArrowLeft size={20} className="text-foreground" />
          </button>
          <h1 className="text-lg font-semibold text-foreground">頁面架構圖</h1>
          <div className="w-9" />
        </div>
      </header>

      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-secondary/30">
        <div className="flex items-center gap-2">
          <button
            onClick={handleZoomOut}
            disabled={zoom <= 50}
            className="p-2 hover:bg-secondary rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ZoomOut size={18} className="text-foreground" />
          </button>
          <span className="text-sm text-muted-foreground min-w-[3rem] text-center">
            {zoom}%
          </span>
          <button
            onClick={handleZoomIn}
            disabled={zoom >= 200}
            className="p-2 hover:bg-secondary rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ZoomIn size={18} className="text-foreground" />
          </button>
        </div>
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
        >
          <Download size={16} />
          下載圖片
        </button>
      </div>

      {/* Diagram Display */}
      <main className="flex-1 overflow-auto p-4">
        <div className="flex justify-center">
          <div
            className="bg-card rounded-xl shadow-lg border border-border overflow-hidden transition-transform duration-200"
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top center" }}
          >
            <img
              src={architectureDiagram}
              alt="頁面架構圖"
              className="max-w-full h-auto"
            />
          </div>
        </div>
      </main>

      {/* Info Footer */}
      <footer className="border-t border-border bg-secondary/30 px-4 py-3">
        <p className="text-xs text-muted-foreground text-center">
          此架構圖展示了應用程式的完整頁面結構與導航流程
        </p>
      </footer>
    </div>
  );
};

export default ArchitecturePage;
