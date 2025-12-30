import { ChevronLeft } from "lucide-react";

interface LineAuthPageProps {
  onAllow: () => void;
  onCancel: () => void;
}

const LineAuthPage = ({ onAllow, onCancel }: LineAuthPageProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <button 
          onClick={onCancel}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-medium text-foreground">認證</h1>
        <button 
          onClick={onCancel}
          className="text-muted-foreground hover:text-foreground transition-colors text-sm"
        >
          取消
        </button>
      </div>

      {/* Green line indicator */}
      <div className="h-1 bg-[#06C755]" />

      {/* Content */}
      <div className="flex-1 flex flex-col items-center px-6 pt-12">
        {/* App Icon */}
        <div className="w-28 h-28 rounded-2xl bg-[#06C755]/80 flex items-center justify-center mb-4">
          <div className="w-16 h-16 rounded-xl bg-[#06C755]/60" />
        </div>

        {/* App Name */}
        <h2 className="text-xl font-semibold text-foreground mb-2">My Wish</h2>
        <p className="text-muted-foreground text-sm mb-1">提供者：my wish</p>
        <p className="text-muted-foreground text-sm mb-8">my wish</p>

        {/* Permission Request */}
        <p className="text-foreground text-center mb-6">
          此服務提供者要求以下的存取權限。
        </p>

        {/* Permissions List */}
        <div className="w-full border-t border-b border-border py-4 mb-4">
          <p className="text-[#06C755] text-sm mb-4 px-2">要求存取的項目</p>
          
          <div className="flex items-center justify-between py-3 px-2">
            <div className="flex items-center gap-2">
              <span className="text-foreground">▶</span>
              <span className="text-foreground">個人檔案（必要資訊）</span>
            </div>
            <span className="text-muted-foreground bg-muted px-4 py-1 rounded text-sm">許可</span>
          </div>
          
          <div className="flex items-center justify-between py-3 px-2">
            <div className="flex items-center gap-2">
              <span className="text-foreground">▶</span>
              <span className="text-foreground">用戶識別資訊（必要資訊）</span>
            </div>
            <span className="text-muted-foreground bg-muted px-4 py-1 rounded text-sm">許可</span>
          </div>
        </div>

        {/* Add Friend Section */}
        <div className="w-full border-b border-border py-4 mb-8">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#06C755]/60" />
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">🛡</span>
                <span className="text-foreground font-medium">My Wish</span>
              </div>
            </div>
            <button className="text-[#06C755] border border-[#06C755] rounded-full px-4 py-1.5 text-sm hover:bg-[#06C755]/10 transition-colors">
              加入好友
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="p-4 pb-8 space-y-3">
        <button
          onClick={onAllow}
          className="w-full py-4 bg-[#06C755] text-white font-medium rounded-lg hover:bg-[#05B54C] transition-colors"
        >
          許可
        </button>
        <button
          onClick={onCancel}
          className="w-full py-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          取消
        </button>
      </div>
    </div>
  );
};

export default LineAuthPage;
