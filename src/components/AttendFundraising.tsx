import { useState } from "react";
import { ChevronLeft, ChevronRight, Edit3 } from "lucide-react";
import { InvitationData } from "@/types";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import WishlistItem from "./WishlistItem";
import Footer from "./Footer";

interface MessageData {
  id: string;
  content: string;
  authorName: string;
  createdAt: string;
  reply?: string;
  replyTime?: string;
}

interface AttendFundraisingProps {
  invitation: InvitationData;
  onBack: () => void;
  onDonate: (amount: number) => void;
  messageBoardEnabled?: boolean;
  hasDonated?: boolean;
  currentAmount?: number;
  proposalDate?: string;
  messages?: MessageData[];
  onAddMessage?: () => void;
  isProposalOwner?: boolean;
}

const AttendFundraising = ({
  invitation,
  onBack,
  onDonate,
  messageBoardEnabled = true,
  hasDonated = false,
  currentAmount = 0,
  proposalDate,
  messages = [],
  onAddMessage,
  isProposalOwner = false,
}: AttendFundraisingProps) => {
  const [amount, setAmount] = useState("");
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [replyingMessageId, setReplyingMessageId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [repliedMessages, setRepliedMessages] = useState<Record<string, { text: string; time: string }>>({});
  const mediaItems = invitation.mediaItems || [];
  const aspectRatio = invitation.aspectRatio || "3:4";

  const totalGoal = invitation.products.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const progressPercent = totalGoal > 0 ? Math.min((currentAmount / totalGoal) * 100, 100) : 0;
  const isGoalReached = currentAmount >= totalGoal && totalGoal > 0;

  // Mock data for demo
  const displayProposalDate = proposalDate || "2025-10-01";
  const displayDeadline = invitation.deadline || "2025-12-31";
  const displayMessages: MessageData[] = messages.length > 0 ? messages : [
    { id: "1", content: "加油加油希望募資能成功！！", authorName: "王大明王大明", createdAt: "2025-12-27 15:39" },
    { id: "2", content: "加油加油希望募資能成功！！", authorName: "王大明王大明", createdAt: "2025-12-27 15:39" },
  ];

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

  const handlePrevMedia = () => {
    setCurrentMediaIndex((prev) => (prev > 0 ? prev - 1 : mediaItems.length - 1));
  };

  const handleNextMedia = () => {
    setCurrentMediaIndex((prev) => (prev < mediaItems.length - 1 ? prev + 1 : 0));
  };

  const handleDonate = () => {
    const numAmount = parseInt(amount, 10);
    if (numAmount > 0) {
      onDonate(numAmount);
    }
  };

  const handleReplyClick = (messageId: string) => {
    if (repliedMessages[messageId]) {
      // Already replied, show edit mode with existing reply
      setReplyText(repliedMessages[messageId].text);
    } else {
      setReplyText("");
    }
    setReplyingMessageId(messageId);
  };

  const handleReplySubmit = (messageId: string) => {
    if (replyText.trim()) {
      const now = new Date();
      const timeString = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      setRepliedMessages((prev) => ({
        ...prev,
        [messageId]: { text: replyText.trim(), time: timeString },
      }));
      setReplyingMessageId(null);
      setReplyText("");
    }
  };

  const handleReplyCancel = () => {
    setReplyingMessageId(null);
    setReplyText("");
  };

  const handleReplyDelete = (messageId: string) => {
    setRepliedMessages((prev) => {
      const updated = { ...prev };
      delete updated[messageId];
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center px-4 py-3">
          <button
            onClick={onBack}
            className="flex items-center text-foreground hover:opacity-70 transition-opacity"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="flex-1 text-lg font-semibold text-foreground text-center pr-6">
            {invitation.name}的 Wish
          </h1>
        </div>
      </header>

      {/* Media Display */}
      <div className="relative">
        {mediaItems.length > 0 ? (
          <>
            <div className={`w-full ${getAspectRatioClass()} bg-muted overflow-hidden`}>
              {mediaItems[currentMediaIndex].type === "video" ? (
                <video
                  src={mediaItems[currentMediaIndex].url}
                  className="w-full h-full object-cover"
                  controls
                />
              ) : (
                <img
                  src={mediaItems[currentMediaIndex].url}
                  alt="邀請函媒體"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            {/* Navigation arrows */}
            {mediaItems.length > 1 && (
              <>
                <button
                  onClick={handlePrevMedia}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-background/80 rounded-full flex items-center justify-center text-foreground hover:bg-background transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={handleNextMedia}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-background/80 rounded-full flex items-center justify-center text-foreground hover:bg-background transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
                {/* Page indicators */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {mediaItems.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentMediaIndex ? "bg-primary" : "bg-background/60"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-56 bg-muted flex items-center justify-center">
            <span className="text-muted-foreground">尚未上傳媒體</span>
          </div>
        )}
      </div>

      {/* Wishlist Section - Below Media */}
      {invitation.products.length > 0 && (
        <div className="px-5 py-4">
          <h3 className="text-lg font-medium text-foreground mb-3">願望清單</h3>
          <div className="space-y-3">
            {invitation.products.map((product) => (
              <WishlistItem key={product.id} item={product} />
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      <main className="flex-1 p-5 space-y-4">
        {/* Date & Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {displayProposalDate} 提案 | {displayDeadline} 截止
          </span>
          <Badge className={isGoalReached ? "bg-success text-success-foreground hover:bg-success" : "bg-primary text-primary-foreground hover:bg-primary"}>
            {isGoalReached ? "已達標" : "進行中"}
          </Badge>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {displayProposalDate} 提案 | {displayDeadline} 截止
          </span>
          <Badge className={isGoalReached ? "bg-success text-success-foreground hover:bg-success" : "bg-primary text-primary-foreground hover:bg-primary"}>
            {isGoalReached ? "已達標" : "進行中"}
          </Badge>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <Progress 
            value={progressPercent} 
            className="h-2" 
            indicatorClassName={isGoalReached ? "bg-success" : undefined}
          />
          <div className="flex items-center justify-between text-sm">
            <span className={isGoalReached ? "text-success font-semibold" : "text-primary font-semibold"}>
              ${currentAmount.toLocaleString()}
            </span>
            <span className="text-muted-foreground">
              目標 ${totalGoal.toLocaleString()} ({Math.round(progressPercent)}%)
            </span>
          </div>
        </div>

        <Separator />

        {/* Donation Amount Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-foreground font-medium">已贊助金額</span>
            <span className="text-primary font-semibold text-lg">
              ${hasDonated ? "100" : "0"}
            </span>
          </div>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="100"
            className="w-full p-4 border border-border rounded-xl bg-card text-foreground text-center placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Donate Button */}
        <button
          onClick={handleDonate}
          disabled={!amount || parseInt(amount, 10) <= 0 || isGoalReached}
          className="w-full py-3.5 bg-primary text-primary-foreground rounded-xl font-medium transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGoalReached ? "已達標" : "贊助"}
        </button>

        {/* Message Board Section */}
        {messageBoardEnabled && (
          <>
            <Separator />
            <div className="space-y-4">
              {/* Message Board Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">留言板</h2>
                {hasDonated && (
                  <button
                    onClick={onAddMessage}
                    className="flex items-center gap-1 text-primary text-sm font-medium hover:opacity-80 transition-opacity"
                  >
                    <Edit3 size={16} />
                    我要留言
                  </button>
                )}
              </div>

              {/* Messages List */}
              <div className="space-y-4">
                {displayMessages.map((message) => (
                  <div key={message.id} className="space-y-2 pb-4 border-b border-border last:border-b-0">
                    <p className="text-foreground font-medium">{message.content}</p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{message.authorName}</span>
                      <span>{message.createdAt}</span>
                    </div>
                    
                    {/* Reply Display - Visible to all users */}
                    {repliedMessages[message.id] && replyingMessageId !== message.id && (
                      <div className="mt-2 pl-3 border-l-2 border-primary/30">
                        <p className="text-sm text-foreground">{repliedMessages[message.id].text}</p>
                        <span className="text-xs text-muted-foreground">{repliedMessages[message.id].time}</span>
                      </div>
                    )}
                    
                    {/* Reply Controls - Only for proposal owner */}
                    {isProposalOwner && (
                      <>
                        {replyingMessageId === message.id ? (
                          <div className="mt-2 space-y-2">
                            <input
                              type="text"
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              placeholder="輸入回覆內容..."
                              className="w-full p-3 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleReplySubmit(message.id)}
                                disabled={!replyText.trim()}
                                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                送出
                              </button>
                              <button
                                onClick={handleReplyCancel}
                                className="px-4 py-2 border border-border text-muted-foreground rounded-lg text-sm font-medium hover:bg-muted transition-colors"
                              >
                                取消
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex gap-2 mt-2">
                            <button
                              onClick={() => handleReplyClick(message.id)}
                              className="text-sm text-primary font-medium hover:opacity-80 transition-opacity"
                            >
                              {repliedMessages[message.id] ? "修改留言" : "回覆留言"}
                            </button>
                            {repliedMessages[message.id] && (
                              <button
                                onClick={() => handleReplyDelete(message.id)}
                                className="text-sm text-destructive font-medium hover:opacity-80 transition-opacity"
                              >
                                刪除留言
                              </button>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default AttendFundraising;
