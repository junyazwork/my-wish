import React from "react";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { RotateCcw, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { RecipientData } from "./RecipientForm";

type ShippingStatus = "processing" | "shipping" | "delivered";

const statusLabels: Record<ShippingStatus, string> = {
  processing: "處理中",
  shipping: "配送中",
  delivered: "已送達",
};

const statusProgress: Record<ShippingStatus, number> = {
  processing: 30,
  shipping: 65,
  delivered: 100,
};

interface OrderProduct {
  productName: string;
  productCode?: string;
  productNumber?: string;
  quantity: number;
  unitPrice: number;
}

interface ProposalShippingInfoProps {
  orderNumber: string;
  orderDate: string;
  status: ShippingStatus;
  products: OrderProduct[];
  total: number;
  recipient: RecipientData;
  deliveredDate?: string;
  onRequestReturn?: () => void;
  hasPendingReturn?: boolean;
}

const DetailRow = ({ label, value }: { label: string; value?: string | number }) => {
  if (value === undefined || value === null) return null;
  return (
    <div className="flex justify-between py-3 border-b border-border last:border-b-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground text-right max-w-[60%]">{String(value)}</span>
    </div>
  );
};

const ProductTable = ({ products }: { products: OrderProduct[] }) => (
  <div className="border border-border rounded-lg overflow-hidden">
    <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-0 text-xs">
      <div className="bg-muted/60 px-3 py-2 font-medium text-muted-foreground">商品名稱</div>
      <div className="bg-muted/60 px-3 py-2 font-medium text-muted-foreground text-center">品號</div>
      <div className="bg-muted/60 px-3 py-2 font-medium text-muted-foreground text-center">商品編號</div>
      <div className="bg-muted/60 px-3 py-2 font-medium text-muted-foreground text-center">數量</div>
      <div className="bg-muted/60 px-3 py-2 font-medium text-muted-foreground text-right">售價</div>
      {products.map((p, i) => (
        <React.Fragment key={i}>
          <div className={cn("px-3 py-2 border-t border-border text-foreground", i % 2 === 1 && "bg-muted/20")}>
            {p.productName}
          </div>
          <div className={cn("px-3 py-2 border-t border-border text-center text-foreground", i % 2 === 1 && "bg-muted/20")}>{p.productCode || "-"}</div>
          <div className={cn("px-3 py-2 border-t border-border text-center text-foreground", i % 2 === 1 && "bg-muted/20")}>{p.productNumber || "-"}</div>
          <div className={cn("px-3 py-2 border-t border-border text-center text-foreground", i % 2 === 1 && "bg-muted/20")}>{p.quantity}</div>
          <div className={cn("px-3 py-2 border-t border-border text-right text-foreground", i % 2 === 1 && "bg-muted/20")}>NT$ {p.unitPrice.toLocaleString()}</div>
        </React.Fragment>
      ))}
    </div>
  </div>
);

const ProposalShippingInfo = ({
  orderNumber,
  orderDate,
  status,
  products,
  total,
  recipient,
  deliveredDate,
  onRequestReturn,
}: ProposalShippingInfoProps) => {
  const progress = statusProgress[status];
  const isDelivered = status === "delivered";

  // Show return button only within 7 days of delivery
  const canRequestReturn = (() => {
    if (!isDelivered || !onRequestReturn || !deliveredDate) return false;
    const delivered = new Date(deliveredDate);
    const now = new Date();
    const diffDays = (now.getTime() - delivered.getTime()) / (1000 * 60 * 60 * 24);
    return diffDays <= 7;
  })();

  return (
    <div className="space-y-4">
      {/* Shipping Progress */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-medium text-foreground">配送進度</h4>
          <Badge variant={isDelivered ? "secondary" : "default"}>
            {statusLabels[status]}
          </Badge>
        </div>
        <Progress value={progress} className="h-2 bg-muted" />
        <div className="flex justify-between mt-1 text-xs text-muted-foreground">
          <span>處理中</span>
          <span>配送中</span>
          <span>已送達</span>
        </div>
      </div>

      {/* Order Details */}
      <div className="space-y-1">
        <DetailRow label="訂單號碼" value={orderNumber} />
        <DetailRow label="發單日" value={orderDate} />
        <div className="pt-2">
          <p className="text-xs font-medium text-muted-foreground mb-2">商品明細</p>
          <ProductTable products={products} />
        </div>
        <DetailRow label="總計" value={`NT$ ${total.toLocaleString()}`} />
        <DetailRow label="收件人" value={recipient.name} />
        <DetailRow label="聯絡電話" value={recipient.phone} />
        <DetailRow label="配送地址" value={recipient.address} />
      </div>

      {/* Return Button - Only for delivered within 7 days */}
      {canRequestReturn && (
        <Button
          onClick={onRequestReturn}
          variant="outline"
          className="w-full h-10 text-sm"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          申請退換貨
        </Button>
      )}
    </div>
  );
};

export default ProposalShippingInfo;
