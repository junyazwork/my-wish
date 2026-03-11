import { useState } from "react";
import Header from "./Header";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { toast } from "sonner";

interface ReturnProduct {
  productName: string;
  productCode?: string;
  quantity: number;
  maxQuantity: number;
  selected: boolean;
}

interface ReturnRequestFormProps {
  products: { productName: string; productCode?: string; quantity: number }[];
  onBack: () => void;
  onMenuClick: () => void;
  onSubmit: (data: { reason: string; products: { productName: string; productCode?: string; quantity: number }[] }) => void;
}

const ReturnRequestForm = ({ products, onBack, onMenuClick, onSubmit }: ReturnRequestFormProps) => {
  const [reason, setReason] = useState("");
  const [returnProducts, setReturnProducts] = useState<ReturnProduct[]>(
    products.map((p) => ({
      ...p,
      maxQuantity: p.quantity,
      selected: false,
    }))
  );

  const toggleProduct = (index: number) => {
    setReturnProducts((prev) =>
      prev.map((p, i) =>
        i === index ? { ...p, selected: !p.selected, quantity: !p.selected ? p.maxQuantity : p.maxQuantity } : p
      )
    );
  };

  const updateQuantity = (index: number, qty: number) => {
    setReturnProducts((prev) =>
      prev.map((p, i) =>
        i === index ? { ...p, quantity: Math.max(1, Math.min(qty, p.maxQuantity)) } : p
      )
    );
  };

  const handleSubmit = () => {
    const selected = returnProducts.filter((p) => p.selected);
    if (!reason.trim()) {
      toast.error("請填寫退貨原因");
      return;
    }
    if (selected.length === 0) {
      toast.error("請選擇至少一項退貨商品");
      return;
    }
    onSubmit({
      reason,
      products: selected.map((p) => ({
        productName: p.productName,
        productCode: p.productCode,
        quantity: p.quantity,
      })),
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header title="申請退換貨" showBack onBack={onBack} onMenuClick={onMenuClick} />

      <div className="flex-1 overflow-auto px-4 py-6 space-y-6">
        {/* Return Reason */}
        <div className="space-y-2">
          <Label className="text-base font-medium text-foreground">退貨原因</Label>
          <Textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="請說明退貨原因..."
            className="min-h-[100px]"
          />
        </div>

        {/* Select Products */}
        <div className="space-y-3">
          <Label className="text-base font-medium text-foreground">選擇退貨商品</Label>
          {returnProducts.map((product, index) => (
            <div key={index} className="border border-border rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={product.selected}
                  onCheckedChange={() => toggleProduct(index)}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{product.productName}</p>
                  {product.productCode && (
                    <p className="text-xs text-muted-foreground">品號：{product.productCode}</p>
                  )}
                </div>
              </div>

              {product.selected && (
                <div className="flex items-center gap-3 pl-7">
                  <Label className="text-sm text-muted-foreground whitespace-nowrap">退貨數量</Label>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(index, product.quantity - 1)}
                      disabled={product.quantity <= 1}
                    >
                      -
                    </Button>
                    <Input
                      type="number"
                      value={product.quantity}
                      onChange={(e) => updateQuantity(index, parseInt(e.target.value) || 1)}
                      className="w-16 h-8 text-center"
                      min={1}
                      max={product.maxQuantity}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(index, product.quantity + 1)}
                      disabled={product.quantity >= product.maxQuantity}
                    >
                      +
                    </Button>
                    <span className="text-xs text-muted-foreground">/ {product.maxQuantity}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="px-4 py-4 border-t border-border">
        <Button onClick={handleSubmit} className="w-full h-12 text-base font-medium">
          送出退換貨申請
        </Button>
      </div>
    </div>
  );
};

export default ReturnRequestForm;
