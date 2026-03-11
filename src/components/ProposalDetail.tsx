import { useState, useMemo } from "react";
import { Mail, Send, ArrowUpDown, ArrowUp, ArrowDown, ClipboardList } from "lucide-react";
import { toast } from "sonner";
import Header from "./Header";
import { Progress } from "./ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button } from "./ui/button";
import { DonationRecord } from "@/contexts/CampaignsContext";
import WishlistItem from "./WishlistItem";
import { CartItem } from "@/types";
import RecipientForm, { RecipientData } from "./RecipientForm";
import ProposalShippingInfo from "./ProposalShippingInfo";
import ReturnRequestForm from "./ReturnRequestForm";
import { useReturnOrders } from "@/contexts/ReturnOrdersContext";

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
  products: CartItem[];
}

interface ProposalDetailProps {
  proposal: ProposalDetailData;
  onBack: () => void;
  onMenuClick: () => void;
  onShareClick: () => void;
  onViewMessageBoard?: () => void;
  onSendThankYouLetter?: () => void;
  onSendSingleThankYouLetter?: (donation: DonationRecord) => void;
}

const ProposalDetail = ({
  proposal,
  onBack,
  onMenuClick,
  onShareClick,
  onViewMessageBoard,
  onSendThankYouLetter,
  onSendSingleThankYouLetter
}: ProposalDetailProps) => {
  const { addReturnOrder } = useReturnOrders();
  const [amountSortOrder, setAmountSortOrder] = useState<"none" | "asc" | "desc">("none");
  const [timeSortOrder, setTimeSortOrder] = useState<"none" | "asc" | "desc">("none");
  const [showRecipientForm, setShowRecipientForm] = useState(false);
  const [showReturnForm, setShowReturnForm] = useState(false);
  const [recipientData, setRecipientData] = useState<RecipientData | null>(null);

  const sortedDonations = useMemo(() => {
    let result = [...proposal.donations];

    if (amountSortOrder !== "none") {
      result.sort((a, b) => amountSortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount);
    } else if (timeSortOrder !== "none") {
      result.sort((a, b) => {
        const timeA = new Date(a.date).getTime();
        const timeB = new Date(b.date).getTime();
        return timeSortOrder === "asc" ? timeA - timeB : timeB - timeA;
      });
    } else {
      return proposal.donations;
    }

    return result;
  }, [proposal.donations, amountSortOrder, timeSortOrder]);

  const toggleAmountSort = () => {
    setTimeSortOrder("none");
    setAmountSortOrder((prev) => {
      if (prev === "none") return "desc";
      if (prev === "desc") return "asc";
      return "none";
    });
  };

  const toggleTimeSort = () => {
    setAmountSortOrder("none");
    setTimeSortOrder((prev) => {
      if (prev === "none") return "desc";
      if (prev === "desc") return "asc";
      return "none";
    });
  };

  const getAmountSortIcon = () => {
    if (amountSortOrder === "asc") return <ArrowUp className="w-4 h-4" />;
    if (amountSortOrder === "desc") return <ArrowDown className="w-4 h-4" />;
    return <ArrowUpDown className="w-4 h-4" />;
  };

  const getTimeSortIcon = () => {
    if (timeSortOrder === "asc") return <ArrowUp className="w-4 h-4" />;
    if (timeSortOrder === "desc") return <ArrowDown className="w-4 h-4" />;
    return <ArrowUpDown className="w-4 h-4" />;
  };

  const getProgressPercentage = (current: number, goal: number) => {
    if (goal === 0) return 0;
    return Math.min(current / goal * 100, 100);
  };

  const percentage = getProgressPercentage(proposal.currentAmount, proposal.goalAmount);
  const isGoalReached = proposal.currentAmount >= proposal.goalAmount && proposal.goalAmount > 0;

  // Generate mock order data from products
  const generateOrderNumber = () => "202501150001";
  const generateProductCode = (index: number) => `AB-${String(index + 1).padStart(3, "0")}`;
  const generateProductNumber = (index: number) => `A${String(100001 + index)}`;

  // Mock shipping status - delivered for ended campaigns, shipping for active
  const mockShippingStatus = proposal.status === "building" ? "processing" as const :
    proposal.currentAmount >= proposal.goalAmount ? "delivered" as const : "shipping" as const;

  // Mock delivered date - 3 days ago for delivered status (within 7-day return window)
  const mockDeliveredDate = mockShippingStatus === "delivered"
    ? new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
    : undefined;

  const handleRecipientSubmit = (data: RecipientData) => {
    setRecipientData(data);
    setShowRecipientForm(false);
  };

  if (showReturnForm) {
    return (
      <ReturnRequestForm
        products={proposal.products.map((p, i) => ({
          productName: p.name,
          productCode: generateProductCode(i),
          quantity: p.quantity,
        }))}
        onBack={() => setShowReturnForm(false)}
        onMenuClick={onMenuClick}
        onSubmit={(data) => {
          setShowReturnForm(false);
          toast.success("退換貨申請已送出");
        }}
      />
    );
  }

  if (showRecipientForm) {
    return (
      <RecipientForm
        onBack={() => setShowRecipientForm(false)}
        onMenuClick={onMenuClick}
        onSubmit={handleRecipientSubmit} />);
  }

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
        onShareClick={onShareClick} />
      

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
              indicatorClassName={isGoalReached ? "bg-success" : undefined} />
            
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
        {isGoalReached && onSendThankYouLetter &&
        <div className="px-4 py-[2px] pt-[24px] pb-[8px]">
            <Button
            onClick={onSendThankYouLetter}
            className="w-full h-12 text-base font-medium bg-success hover:bg-success/90">
            
              <Send className="w-5 h-5 mr-2" />
              發送感謝信給大家
            </Button>
          </div>
        }

        {/* Fill Recipient Info Button - Only show when goal is reached */}
        {isGoalReached &&
        <div className="px-4 py-[24px] pb-[24px] pt-[8px]">
            <Button
            onClick={() => setShowRecipientForm(true)}
            variant={recipientData ? "outline" : "default"}
            className="w-full h-12 text-base font-medium">
            
              <ClipboardList className="w-5 h-5 mr-2" />
              {recipientData ? "修改收件人資料" : "填寫收件人資料"}
            </Button>
          </div>
        }

        {/* Wishlist Section */}
        {proposal.products.length > 0 &&
        <div className="px-4 py-6">
            <h3 className="text-lg font-medium text-foreground mb-4">我的願望清單</h3>
            <div className="space-y-3">
              {proposal.products.map((product) =>
            <WishlistItem key={product.id} item={product} />
            )}
            </div>

            {/* Shipping Info - Show after recipient data submitted */}
            {recipientData && isGoalReached &&
          <div className="mt-6">
                <ProposalShippingInfo
              orderNumber={generateOrderNumber()}
              orderDate={proposal.proposalDate || ""}
              status={mockShippingStatus}
              deliveredDate={mockDeliveredDate}
              products={proposal.products.map((p, i) => ({
                productName: p.name,
                productCode: generateProductCode(i),
                productNumber: generateProductNumber(i),
                quantity: p.quantity,
                unitPrice: p.price
              }))}
              total={proposal.products.reduce((sum, p) => sum + p.price * p.quantity, 0)}
              recipient={recipientData}
              onRequestReturn={() => setShowReturnForm(true)} />
              </div>
          }
          </div>
        }

        {/* Divider */}
        <div className="h-px bg-border" />

        {/* 贊助紀錄 */}
        <div className="px-4 py-6">
          <h3 className="text-lg font-medium text-foreground mb-4">贊助紀錄</h3>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-muted-foreground">LINE 名稱</TableHead>
                <TableHead className="text-muted-foreground">
                  <button
                    onClick={toggleAmountSort}
                    className="flex items-center gap-1 hover:text-foreground transition-colors">
                    
                    金額
                    {getAmountSortIcon()}
                  </button>
                </TableHead>
                <TableHead className="text-muted-foreground">
                  <button
                    onClick={toggleTimeSort}
                    className="flex items-center gap-1 hover:text-foreground transition-colors">
                    
                    時間
                    {getTimeSortIcon()}
                  </button>
                </TableHead>
                <TableHead className="text-muted-foreground text-center">回覆感謝</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedDonations.map((donation) =>
              <TableRow key={donation.id}>
                  <TableCell className="text-foreground">{donation.lineName}</TableCell>
                  <TableCell className="text-foreground">${donation.amount}</TableCell>
                  <TableCell className="text-foreground">{donation.date}</TableCell>
                  <TableCell className="text-center">
                    {donation.email ?
                  <button onClick={() => onSendSingleThankYouLetter?.(donation)} className="inline-flex">
                        <Mail className="w-5 h-5 text-primary mx-auto cursor-pointer hover:text-primary/80 transition-colors" />
                      </button> :

                  <Mail className="w-5 h-5 text-muted-foreground/50 mx-auto" />
                  }
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>);

};

export default ProposalDetail;