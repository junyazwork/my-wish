import { useState } from "react";
import Header from "./Header";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { toast } from "sonner";
import { taiwanAddress } from "@/data/taiwanAddress";

export interface RecipientData {
  name: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  streetDetail: string;
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
  const [city, setCity] = useState(viewOnlyData?.city || "");
  const [district, setDistrict] = useState(viewOnlyData?.district || "");
  const [streetDetail, setStreetDetail] = useState(viewOnlyData?.streetDetail || "");

  const cityOptions = Object.keys(taiwanAddress);
  const districtOptions = city ? taiwanAddress[city] ?? [] : [];

  const handleCityChange = (value: string) => {
    setCity(value);
    setDistrict("");
  };

  const handleSubmit = () => {
    if (viewOnlyData) {
      onBack();
      return;
    }

    if (!name.trim() || !phone.trim() || !city.trim() || !district.trim() || !streetDetail.trim()) {
      toast.error("請填寫所有必填欄位");
      return;
    }

    onSubmit({
      name: name.trim(),
      phone: phone.trim(),
      city: city.trim(),
      district: district.trim(),
      streetDetail: streetDetail.trim(),
      address: `${city.trim()}${district.trim()}${streetDetail.trim()}`,
    });
    toast.success("收件人資料已送出");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header title="填寫收件人資料" showBack onBack={onBack} onMenuClick={onMenuClick} />

      <div className="flex-1 overflow-auto px-4 py-6 space-y-5">
        <div className="space-y-2">
          <Label htmlFor="recipient-name" className="text-sm font-medium text-foreground">
            收件人姓名（必填）
          </Label>
          <Input
            id="recipient-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="請輸入收件人姓名"
            disabled={!!viewOnlyData}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="recipient-phone" className="text-sm font-medium text-foreground">
            聯絡電話（必填）
          </Label>
          <Input
            id="recipient-phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="請輸入聯絡電話"
            type="tel"
            disabled={!!viewOnlyData}
            required
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">縣市（必填）</Label>
          <Select value={city} onValueChange={handleCityChange} disabled={!!viewOnlyData} required>
            <SelectTrigger aria-label="縣市">
              <SelectValue placeholder="請選擇縣市" />
            </SelectTrigger>
            <SelectContent>
              {cityOptions.map((cityOption) => (
                <SelectItem key={cityOption} value={cityOption}>
                  {cityOption}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">鄉鎮市區（必填）</Label>
          <Select value={district} onValueChange={setDistrict} disabled={!!viewOnlyData || !city} required>
            <SelectTrigger aria-label="鄉鎮市區">
              <SelectValue placeholder={city ? "請選擇鄉鎮市區" : "請先選擇縣市"} />
            </SelectTrigger>
            <SelectContent>
              {districtOptions.map((districtOption) => (
                <SelectItem key={districtOption} value={districtOption}>
                  {districtOption}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="recipient-street" className="text-sm font-medium text-foreground">
            街道/路/巷/弄/號/樓（必填）
          </Label>
          <Input
            id="recipient-street"
            value={streetDetail}
            onChange={(e) => setStreetDetail(e.target.value)}
            placeholder="請輸入詳細地址"
            disabled={!!viewOnlyData}
            required
          />
        </div>
      </div>

      <div className="px-4 py-4 border-t border-border">
        <Button
          onClick={handleSubmit}
          variant={viewOnlyData ? "outline" : "default"}
          className="w-full h-12 text-base font-medium"
        >
          {viewOnlyData ? "返回" : "送出"}
        </Button>
      </div>
    </div>
  );
};

export default RecipientForm;

