import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import thankYouBanner from "@/assets/thank-you-banner.jpg";
import Footer from "./Footer";

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
}

interface PaymentCompleteProps {
  recipientName: string;
  onFinish: () => void;
  mediaItems?: MediaItem[];
  aspectRatio?: '3:4' | '1:1' | '9:16';
}

const PaymentComplete = ({ recipientName, onFinish, mediaItems = [], aspectRatio = '3:4' }: PaymentCompleteProps) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case '1:1': return 'aspect-square';
      case '9:16': return 'aspect-[9/16]';
      default: return 'aspect-[3/4]';
    }
  };

  const handlePrevMedia = () => {
    setCurrentMediaIndex((prev) => (prev > 0 ? prev - 1 : mediaItems.length - 1));
  };

  const handleNextMedia = () => {
    setCurrentMediaIndex((prev) => (prev < mediaItems.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Media Display */}
      <div className="relative">
        {mediaItems.length > 0 ? (
          <div className={`relative ${getAspectRatioClass()} bg-muted overflow-hidden`}>
            {mediaItems[currentMediaIndex]?.type === 'video' ? (
              <video
                src={mediaItems[currentMediaIndex].url}
                className="w-full h-full object-cover"
                controls
              />
            ) : (
              <img
                src={mediaItems[currentMediaIndex]?.url}
                alt="Media"
                className="w-full h-full object-cover"
              />
            )}
            
            {/* Navigation Arrows */}
            {mediaItems.length > 1 && (
              <>
                <button
                  onClick={handlePrevMedia}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-background/80 rounded-full flex items-center justify-center shadow-md"
                >
                  <ChevronLeft className="w-5 h-5 text-foreground" />
                </button>
                <button
                  onClick={handleNextMedia}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-background/80 rounded-full flex items-center justify-center shadow-md"
                >
                  <ChevronRight className="w-5 h-5 text-foreground" />
                </button>
              </>
            )}

            {/* Page Indicators */}
            {mediaItems.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {mediaItems.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentMediaIndex ? 'bg-primary' : 'bg-background/60'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <img
            src={thankYouBanner}
            alt="Thank You"
            className="w-full h-64 object-cover"
          />
        )}
      </div>
      <main className="flex-1 p-6 space-y-4">
        <h1 className="text-xl font-bold text-primary">
          {recipientName}感謝您的贊助！
        </h1>
        <div className="space-y-2 text-muted-foreground">
          <p>贊助通知將寄送至您留下的Email</p>
          <p>成案後將會開立電子發票給您</p>
          <p>未成案將全額退費!</p>
        </div>
      </main>

      {/* Bottom Button */}
      <div className="sticky bottom-0 bg-background border-t border-border p-4">
        <button
          onClick={onFinish}
          className="w-full py-3.5 bg-primary text-primary-foreground rounded-xl font-medium transition-all hover:opacity-90"
        >
          到MyWishOnline官方帳號
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default PaymentComplete;
