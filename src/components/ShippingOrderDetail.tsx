import React from "react";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type OrderStatus = "shipping" | "delivered" | "returning" | "returned";

interface OrderProduct {
  productName: string;
  productStyle?: string;
  productCode?: string;
  productNumber?: string;
  quantity: number;
  unitPrice: number;
}

interface ShippingOrder {
  id: string;
  orderNumber: string;
  date: string;
  status: OrderStatus;
  orderDate?: string;
  products: OrderProduct[];
  total: number;
  recipient?: string;
  phone?: string;
  address?: string;
  returnDate?: string;
  originalOrderNumber?: string;
  returnOrderNumber?: string;
  returnQuantity?: number;
  refundAmount?: number;
  returnReason?: string;
  returnPerson?: string;
  returnPhone?: string;
  pickupAddress?: string;
}

const statusLabels: Record<OrderStatus, string> = {
  shipping: "配送中",
  delivered: "已送達",
  returning: "退貨中",
  returned: "已退貨",
};

const statusVariants: Record<OrderStatus, "default" | "secondary" | "destructive" | "outline"> = {
  shipping: "default",
  delivered: "secondary",
  returning: "destructive",
  returned: "outline",
};

interface ShippingOrderDetailProps {
  order: ShippingOrder;
  onBack: () => void;
  onMenuClick: () => void;
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
          <div className={cn("px-3 py-2 border-t border-border", i % 2 === 1 && "bg-muted/20")}>
            <p className="font-medium text-foreground">{p.productName}</p>
            {p.productStyle && <p className="text-muted-foreground mt-0.5">{p.productStyle}</p>}
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

const ShippingOrderDetail = ({ order, onBack, onMenuClick }: ShippingOrderDetailProps) => {
  const isReturn = order.status === "returning" || order.status === "returned";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header
        title="訂單詳情"
        showBack
        onBack={onBack}
        onMenuClick={onMenuClick}
      />

      <div className="flex-1 overflow-auto px-4 py-4 space-y-4">
        {/* Status Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">{order.orderNumber}</h2>
          <Badge variant={statusVariants[order.status]}>{statusLabels[order.status]}</Badge>
        </div>

        {/* Details */}
        <div className="space-y-1">
          {isReturn ? (
            <>
              <DetailRow label="申請退貨日期" value={order.returnDate} />
              <DetailRow label="原訂單號碼" value={order.originalOrderNumber} />
              <DetailRow label="退貨單號" value={order.returnOrderNumber} />
              <div className="pt-2">
                <p className="text-xs font-medium text-muted-foreground mb-2">退貨商品</p>
                <ProductTable products={order.products} />
              </div>
              <DetailRow label="退貨數量" value={order.returnQuantity} />
              <DetailRow label="退款金額" value={`NT$ ${order.refundAmount?.toLocaleString()}`} />
              <DetailRow label="退貨原因" value={order.returnReason} />
              <DetailRow label="退貨人" value={order.returnPerson} />
              <DetailRow label="退貨人電話" value={order.returnPhone} />
              <DetailRow label="取件地址" value={order.pickupAddress} />
            </>
          ) : (
            <>
              <DetailRow label="發單日" value={order.orderDate} />
              <DetailRow label="訂單號碼" value={order.orderNumber} />
              <div className="pt-2">
                <p className="text-xs font-medium text-muted-foreground mb-2">商品明細</p>
                <ProductTable products={order.products} />
              </div>
              <DetailRow label="總計" value={`NT$ ${order.total?.toLocaleString()}`} />
              <DetailRow label="收件人" value={order.recipient} />
              <DetailRow label="聯絡電話" value={order.phone} />
              <DetailRow label="配送地址" value={order.address} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShippingOrderDetail;
