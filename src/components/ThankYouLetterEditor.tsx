import { useState } from "react";
import { Send } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import InlineMediaEditor, { MediaItem, AspectRatio } from "./InlineMediaEditor";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { DonationRecord } from "@/contexts/CampaignsContext";

interface ThankYouLetterEditorProps {
  campaignName: string;
  donations: DonationRecord[];
  onBack: () => void;
  onMenuClick: () => void;
}

const ThankYouLetterEditor = ({ 
  campaignName, 
  donations, 
  onBack, 
  onMenuClick 
}: ThankYouLetterEditorProps) => {
  const { toast } = useToast();
  const [title, setTitle] = useState(`感謝您支持「${campaignName}」`);
  const [content, setContent] = useState("");
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("3:4");
  const [isSending, setIsSending] = useState(false);

  // Filter donations with valid email
  const donationsWithEmail = donations.filter(d => d.email);
  const recipientCount = donationsWithEmail.length;

  const handleSend = async () => {
    if (!title.trim() || !content.trim()) {
      toast({
        title: "請填寫完整",
        description: "標題和內文都是必填欄位",
        variant: "destructive",
      });
      return;
    }

    if (recipientCount === 0) {
      toast({
        title: "沒有收件人",
        description: "沒有贊助人留下 Email 地址",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);

    // Simulate sending emails
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "感謝信已寄出",
      description: `已成功寄送給 ${recipientCount} 位贊助人`,
    });

    setIsSending(false);
    onBack();
  };

  const isFormValid = title.trim() && content.trim() && recipientCount > 0;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header 
        title="發送感謝信"
        showBack
        onBack={onBack}
        onMenuClick={onMenuClick}
      />

      <div className="flex-1 overflow-auto pb-24">
        {/* Recipient Info */}
        <div className="px-4 pt-4 pb-2">
          <div className="bg-muted/50 rounded-lg p-3">
            <p className="text-sm text-muted-foreground">
              將寄送給 <span className="text-foreground font-medium">{recipientCount}</span> 位留有 Email 的贊助人
            </p>
          </div>
        </div>

        {/* Media Editor */}
        <div className="px-4 py-4">
          <label className="block text-sm font-medium text-foreground mb-2">
            上傳媒體 (選填)
          </label>
          <InlineMediaEditor
            mediaItems={mediaItems}
            setMediaItems={setMediaItems}
            aspectRatio={aspectRatio}
            setAspectRatio={setAspectRatio}
          />
        </div>

        {/* Title */}
        <div className="px-4 py-2">
          <label className="block text-sm font-medium text-foreground mb-2">
            信件標題 <span className="text-destructive">*</span>
          </label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="請輸入信件標題"
            className="bg-background"
          />
        </div>

        {/* Content */}
        <div className="px-4 py-2">
          <label className="block text-sm font-medium text-foreground mb-2">
            信件內文 <span className="text-destructive">*</span>
          </label>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="請輸入感謝信內容..."
            className="bg-background min-h-[200px] resize-none"
          />
        </div>

        <Footer />
      </div>

      {/* Sticky Send Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
        <Button
          onClick={handleSend}
          disabled={!isFormValid || isSending}
          className="w-full h-12 text-base font-medium"
        >
          <Send className="w-5 h-5 mr-2" />
          {isSending ? "寄送中..." : `寄出感謝信 (${recipientCount} 人)`}
        </Button>
      </div>
    </div>
  );
};

export default ThankYouLetterEditor;
