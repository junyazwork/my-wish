import { useState } from "react";
import Header from "./Header";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";

export interface RecipientData {
  name: string;
  phone: string;
  address: string;
}

interface RecipientFormProps {
  onBack: () => void;
  onMenuClick: () => void;
  onSubmit: (data: RecipientData) => void;
  viewOnlyData?: RecipientData;
}

const RecipientForm = ({ onBack, onMenuClick, onSubmit, viewOnlyData }: RecipientFormProps) => {
  const [name, setName] = useState(viewOnlyData?.name || "");
  const [phone, setPhone] = useState(viewOnlyData?.phone || "");
  const [address, setAddress] = useState(viewOnlyData?.address || "");

  const handleSubmit = () => {
    if (viewOnlyData) {
      // View-only mode, just go back
      onBack();
      return;
    }
    if (!name.trim() || !phone.trim() || !address.trim()) {
      toast.error("請填寫所有欄位");
      return;
    }
    onSubmit({ name: name.trim(), phone: phone.trim(), address: address.trim() });
    toast.success("收件人資料已送出");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header
        title="填寫收件人資料"
        showBack
        onBack={onBack}
        onMenuClick={onMenuClick}
      />

      <div className="flex-1 overflow-auto px-4 py-6 space-y-5">
        <div className="space-y-2">
          <Label htmlFor="recipient-name" className="text-sm font-medium text-foreground">
            收件人姓名
          </Label>
          <Input
            id="recipient-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="請輸入收件人姓名"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="recipient-phone" className="text-sm font-medium text-foreground">
            聯絡電話
          </Label>
          <Input
            id="recipient-phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="請輸入聯絡電話"
            type="tel"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="recipient-address" className="text-sm font-medium text-foreground">
            配送地址
          </Label>
          <Input
            id="recipient-address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="請輸入配送地址"
          />
        </div>
      </div>

      <div className="px-4 py-4 border-t border-border">
        <Button
          onClick={handleSubmit}
          className="w-full h-12 text-base font-medium"
        >
          送出
        </Button>
      </div>
    </div>
  );
};

export default RecipientForm;
