import { useState } from "react";
import Header from "./Header";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { DonationRecord } from "@/contexts/CampaignsContext";

import cardBg01 from "@/assets/card-bg-01.jpg";
import cardBg02 from "@/assets/card-bg-02.jpg";
import cardBg03 from "@/assets/card-bg-03.jpg";
import cardBg04 from "@/assets/card-bg-04.jpg";
import cardBg05 from "@/assets/card-bg-05.jpg";
import cardBg06 from "@/assets/card-bg-06.jpg";

interface ThankYouLetterEditorProps {
  campaignName: string;
  donations: DonationRecord[];
  onBack: () => void;
  onMenuClick: () => void;
}

const CARD_BACKGROUNDS = [
  { id: 1, src: cardBg01 },
  { id: 2, src: cardBg02 },
  { id: 3, src: cardBg03 },
  { id: 4, src: cardBg04 },
  { id: 5, src: cardBg05 },
  { id: 6, src: cardBg06 },
];

const ThankYouLetterEditor = ({ campaignName, donations, onBack, onMenuClick }: ThankYouLetterEditorProps) => {
  const { toast } = useToast();
  const [title, setTitle] = useState(`感謝您支持「${campaignName}」`);
  const [content, setContent] = useState("");
  const [selectedBgId, setSelectedBgId] = useState(1);
  const [isSending, setIsSending] = useState(false);

  // Filter donations with valid email
  const donationsWithEmail = donations.filter((d) => d.email);
  const recipientCount = donationsWithEmail.length;
  const recipientEmail = donationsWithEmail.length > 0 ? donationsWithEmail[0].email : "user@gmail.com";

  const selectedBg = CARD_BACKGROUNDS.find((bg) => bg.id === selectedBgId)?.src || cardBg01;

  const handleSend = async () => {
    if (!title.trim()) {
      toast({
        title: "請填寫完整",
        description: "信件標題是必填欄位",
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
    await new Promise((resolve) => setTimeout(resolve, 1500));

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
      <Header title="感謝函" showBack onBack={onBack} onMenuClick={onMenuClick} />

      <div className="flex-1 overflow-auto pb-24">
        {/* Recipient Info Row */}
        <div className="px-4 py-3 flex items-start border-b border-border">
          <span className="text-sm font-medium text-foreground w-16 shrink-0 pt-0.5">發送給</span>
          <div className="flex-1">
            <div className="text-sm text-muted-foreground">
              {donationsWithEmail.length > 0
                ? donationsWithEmail.map((d, idx) => (
                    <span key={d.id || idx}>
                      {d.email}
                      {idx < donationsWithEmail.length - 1 && "、"}
                    </span>
                  ))
                : "沒有人"}
            </div>
            {donationsWithEmail.length > 0 && (
              <div className="text-xs text-muted-foreground/70 mt-1">共 {donationsWithEmail.length} 位</div>
            )}
          </div>
        </div>

        {/* Title Input Row */}
        <div className="px-4 py-3 border-b border-border">
          <span className="text-sm font-medium text-foreground">信件標題</span>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="請輸入信件標題"
            className="mt-2 bg-background border-0 p-0 h-auto text-sm focus-visible:ring-0 placeholder:text-muted-foreground"
          />
        </div>

        {/* Card Preview */}
        <div className="px-4 py-4">
          <div
            className="relative w-full aspect-square rounded-lg overflow-hidden"
            style={{
              backgroundImage: `url(${selectedBg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Content Textarea Overlay */}
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="在此輸入感謝內容..."
                className="w-full h-40 bg-transparent border-0 text-foreground text-lg font-medium text-center leading-relaxed resize-none focus-visible:ring-0 placeholder:text-foreground/50"
              />
            </div>
          </div>
        </div>

        {/* Background Thumbnails */}
        <div className="px-4 pb-4">
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex gap-2 pb-3">
              {CARD_BACKGROUNDS.map((bg) => (
                <button
                  key={bg.id}
                  onClick={() => setSelectedBgId(bg.id)}
                  className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedBgId === bg.id ? "border-primary ring-2 ring-primary/20" : "border-transparent"
                  }`}
                >
                  <img src={bg.src} alt={`背景 ${bg.id}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>

      {/* Sticky Send Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
        <Button onClick={handleSend} disabled={!isFormValid || isSending} className="w-full h-12 text-base font-medium">
          {isSending ? "寄送中..." : "寄出感謝函"}
        </Button>
      </div>
    </div>
  );
};

export default ThankYouLetterEditor;
