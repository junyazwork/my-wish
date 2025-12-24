import { useState } from "react";
import { ChevronDown, ChevronLeft } from "lucide-react";
import { PublicHostData } from "@/types";

interface PublicHostSettingsProps {
  cartCount: number;
  onBack: () => void;
  onConfirm: (data: PublicHostData) => void;
}

const cities = ["台北市", "新北市", "桃園市", "台中市", "台南市", "高雄市"];

const organizationsByCity: Record<string, { name: string; address: string }[]> = {
  "台北市": [
    { name: "星光永續發展協會", address: "台北市信義區測試路 101 號 1 樓" },
    { name: "希望基金會", address: "台北市大安區仁愛路 200 號" },
  ],
  "新北市": [
    { name: "新北愛心協會", address: "新北市板橋區中山路 50 號" },
  ],
  "桃園市": [
    { name: "桃園公益基金會", address: "桃園市中壢區中正路 100 號" },
  ],
  "台中市": [
    { name: "台中希望協會", address: "台中市西屯區台灣大道 300 號" },
  ],
  "台南市": [
    { name: "台南愛心基金會", address: "台南市中西區民生路 150 號" },
  ],
  "高雄市": [
    { name: "高雄公益協會", address: "高雄市前鎮區成功路 200 號" },
  ],
};

const PublicHostSettings = ({ cartCount, onBack, onConfirm }: PublicHostSettingsProps) => {
  const [selectedCity, setSelectedCity] = useState("台北市");
  const [selectedOrg, setSelectedOrg] = useState(organizationsByCity["台北市"][0]);
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [isOrgOpen, setIsOrgOpen] = useState(false);

  const organizations = organizationsByCity[selectedCity] || [];

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setSelectedOrg(organizationsByCity[city][0]);
    setIsCityOpen(false);
  };

  const handleOrgChange = (org: { name: string; address: string }) => {
    setSelectedOrg(org);
    setIsOrgOpen(false);
  };

  const handleConfirm = () => {
    onConfirm({
      city: selectedCity,
      organization: selectedOrg.name,
      address: selectedOrg.address,
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={onBack} className="p-2 -ml-2 text-muted-foreground">
            <ChevronLeft size={24} />
          </button>
          
          <h1 className="text-lg font-semibold text-foreground">Wish List</h1>
          
          <div className="relative p-2 -mr-2">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[20px] h-5 px-1.5 bg-destructive text-destructive-foreground text-xs font-medium rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 p-5 space-y-4">
        <h2 className="text-base font-semibold text-foreground">請選擇受贈單位</h2>

        {/* City Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsCityOpen(!isCityOpen)}
            className="w-full px-4 py-3 border border-border rounded-lg bg-background flex items-center justify-between text-foreground"
          >
            <span>{selectedCity}</span>
            <ChevronDown size={20} className={`text-muted-foreground transition-transform ${isCityOpen ? 'rotate-180' : ''}`} />
          </button>
          {isCityOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
              {cities.map((city) => (
                <button
                  key={city}
                  onClick={() => handleCityChange(city)}
                  className={`w-full px-4 py-3 text-left hover:bg-secondary transition-colors ${city === selectedCity ? 'bg-secondary' : ''}`}
                >
                  {city}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Organization Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsOrgOpen(!isOrgOpen)}
            className="w-full px-4 py-3 border border-border rounded-lg bg-background flex items-center justify-between text-foreground"
          >
            <span>{selectedOrg.name}</span>
            <ChevronDown size={20} className={`text-muted-foreground transition-transform ${isOrgOpen ? 'rotate-180' : ''}`} />
          </button>
          {isOrgOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
              {organizations.map((org) => (
                <button
                  key={org.name}
                  onClick={() => handleOrgChange(org)}
                  className={`w-full px-4 py-3 text-left hover:bg-secondary transition-colors ${org.name === selectedOrg.name ? 'bg-secondary' : ''}`}
                >
                  {org.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Organization Info Card */}
        <div className="bg-secondary/50 rounded-lg p-4 mt-4">
          <h3 className="text-sm font-semibold text-foreground mb-2">受贈單位資訊：</h3>
          <p className="text-sm text-muted-foreground">{selectedOrg.address}</p>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="sticky bottom-0 bg-background border-t border-border p-4">
        <button
          onClick={handleConfirm}
          className="w-full py-3.5 bg-primary text-primary-foreground rounded-xl font-medium transition-all hover:opacity-90"
        >
          確定
        </button>
      </div>
    </div>
  );
};

export default PublicHostSettings;
