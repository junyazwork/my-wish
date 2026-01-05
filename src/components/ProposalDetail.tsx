import { useState, useEffect } from "react";
import { Mail, Send } from "lucide-react";
import Header from "./Header";
import { Progress } from "./ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button } from "./ui/button";
import { useCampaigns, DonationRecord } from "@/contexts/CampaignsContext";

interface ProposalDetailData {
  id: string;
  name: string;
  proposalDate: string;
  deadline: string;
  status: "building" | "active";
  currentAmount: number;
  goalAmount: number;
  isPublic: boolean;
  messageBoard: boolean;
  notifyBeforeDeadline: boolean;
  notifyDays: number;
  donations: DonationRecord[];
}

interface ProposalDetailProps {
  proposal: ProposalDetailData;
  onBack: () => void;
  onMenuClick: () => void;
  onShareClick: () => void;
  onViewMessageBoard?: () => void;
  onSendThankYouLetter?: () => void;
}

const ProposalDetail = ({
  proposal,
  onBack,
  onMenuClick,
  onShareClick,
  onViewMessageBoard,
  onSendThankYouLetter,
}: ProposalDetailProps) => {
  const { updateCampaignVisibility } = useCampaigns();
  const [isPublic, setIsPublic] = useState(proposal.isPublic);
  const [messageBoard, setMessageBoard] = useState(proposal.messageBoard);
  const [notifyEnabled, setNotifyEnabled] = useState(proposal.notifyBeforeDeadline);
  const [notifyDays, setNotifyDays] = useState(proposal.notifyDays);

  // Update shared context when isPublic changes
  useEffect(() => {
    updateCampaignVisibility(proposal.id, isPublic);
  }, [isPublic, proposal.id, updateCampaignVisibility]);

  const getProgressPercentage = (current: number, goal: number) => {
    if (goal === 0) return 0;
    return Math.min((current / goal) * 100, 100);
  };

  const percentage = getProgressPercentage(proposal.currentAmount, proposal.goalAmount);
  const isGoalReached = proposal.currentAmount >= proposal.goalAmount && proposal.goalAmount > 0;

  const getStatusBadge = (status: "building" | "active") => {
    if (status === "building") {
      return <span className="px-3 py-1 text-sm rounded bg-muted text-muted-foreground">建立中</span>;
    }
    // Check if goal is reached
    if (isGoalReached) {
      return <span className="px-3 py-1 text-sm rounded bg-success text-success-foreground">已達標</span>;
    }
    return <span className="px-3 py-1 text-sm rounded bg-primary text-primary-foreground">進行中</span>;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header
        title={proposal.name}
        showBack
        onBack={onBack}
        onMenuClick={onMenuClick}
        showShare
        onShareClick={onShareClick}
      />

      <div className="flex-1 overflow-auto">
        {/* Date and Status */}
        <div className="px-4 pt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-muted-foreground text-sm">
              {proposal.proposalDate} 提案 | {proposal.deadline} 截止
            </span>
            {getStatusBadge(proposal.status)}
          </div>

          {/* Progress Bar */}
          <div className="mb-2">
            <Progress
              value={percentage}
              className="h-3 bg-muted"
              indicatorClassName={isGoalReached ? "bg-success" : undefined}
            />
          </div>

          {/* Amount Info */}
          <div className="flex justify-between items-center mb-6">
            <span className={`text-lg font-medium ${isGoalReached ? "text-success" : "text-primary"}`}>
              $ {proposal.currentAmount.toLocaleString()}
            </span>
            <span className="text-muted-foreground text-sm">
              目標 $ {proposal.goalAmount.toLocaleString()} ({percentage.toFixed(0)}%)
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border" />

        {/* Send Thank You Letter Button - Only show when goal is reached */}
        {isGoalReached && onSendThankYouLetter && (
          <div className="px-4 pt-6">
            <Button
              onClick={onSendThankYouLetter}
              className="w-full h-12 text-base font-medium bg-success hover:bg-success/90"
            >
              <Send className="w-5 h-5 mr-2" />
              發送感謝信
            </Button>
          </div>
        )}

        {/* Settings Section */}
        <div className="px-4 py-6 space-y-6">
          {/* 募資活動 */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-3">募資活動</h3>
            <div className="flex gap-0">
              <button
                onClick={() => setIsPublic(false)}
                className={`px-6 py-2 text-sm rounded-l-md border transition-colors ${
                  !isPublic
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-muted text-muted-foreground border-border"
                }`}
              >
                私密
              </button>
              <button
                onClick={() => setIsPublic(true)}
                className={`px-6 py-2 text-sm rounded-r-md border-l-0 border transition-colors ${
                  isPublic
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-muted text-muted-foreground border-border"
                }`}
              >
                公開
              </button>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              設為私密時，募資網頁只有收到 LINE 邀請函的好友才能查看。
            </p>
          </div>

          {/* 留言板功能 */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-3">留言板功能</h3>
            <div className="flex items-center gap-4">
              <div className="flex gap-0">
                <button
                  onClick={() => setMessageBoard(false)}
                  className={`px-6 py-2 text-sm rounded-l-md border transition-colors ${
                    !messageBoard
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted text-muted-foreground border-border"
                  }`}
                >
                  關閉
                </button>
                <button
                  onClick={() => setMessageBoard(true)}
                  className={`px-6 py-2 text-sm rounded-r-md border-l-0 border transition-colors ${
                    messageBoard
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted text-muted-foreground border-border"
                  }`}
                >
                  啟用
                </button>
              </div>
              {messageBoard && onViewMessageBoard && (
                <button
                  onClick={onViewMessageBoard}
                  className="px-4 py-2 text-sm rounded-md border border-primary text-primary hover:bg-primary/10 transition-colors"
                >
                  查看留言板
                </button>
              )}
            </div>
          </div>

          {/* 截止前尚未達成目標時通知增資或放棄 */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-3">截止前尚未達成目標時通知增資或放棄</h3>
            <div className="flex items-center gap-3">
              <div className="flex gap-0">
                <button
                  onClick={() => setNotifyEnabled(false)}
                  className={`px-6 py-2 text-sm rounded-l-md border transition-colors ${
                    !notifyEnabled
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted text-muted-foreground border-border"
                  }`}
                >
                  關閉
                </button>
                <button
                  onClick={() => setNotifyEnabled(true)}
                  className={`px-6 py-2 text-sm rounded-r-md border-l-0 border transition-colors ${
                    notifyEnabled
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted text-muted-foreground border-border"
                  }`}
                >
                  啟用
                </button>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={notifyDays}
                  onChange={(e) => setNotifyDays(parseInt(e.target.value) || 0)}
                  className="w-16 px-3 py-2 text-center border border-border rounded-md bg-background text-foreground"
                />
                <span className="text-muted-foreground text-sm">天前發送通知</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border" />

        {/* 贊助紀錄 */}
        <div className="px-4 py-6">
          <h3 className="text-lg font-medium text-foreground mb-4">贊助紀錄</h3>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-muted-foreground">LINE 名稱</TableHead>
                <TableHead className="text-muted-foreground">金額</TableHead>
                <TableHead className="text-muted-foreground">時間</TableHead>
                <TableHead className="text-muted-foreground text-center">寄信</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {proposal.donations.map((donation) => (
                <TableRow key={donation.id}>
                  <TableCell className="text-foreground">{donation.lineName}</TableCell>
                  <TableCell className="text-foreground">${donation.amount}</TableCell>
                  <TableCell className="text-foreground">{donation.date}</TableCell>
                  <TableCell className="text-center">
                    {donation.email ? (
                      <a href={`mailto:${donation.email}`}>
                        <Mail className="w-5 h-5 text-primary mx-auto cursor-pointer hover:text-primary/80 transition-colors" />
                      </a>
                    ) : (
                      <Mail className="w-5 h-5 text-muted-foreground/50 mx-auto" />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ProposalDetail;
