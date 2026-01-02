import { ArrowLeft, Mail, Phone, MapPin, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Footer from "@/components/Footer";

const ContactPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("訊息已送出，我們會盡快回覆您！");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold">聯絡我們</h1>
          <div className="w-10" />
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-4 py-6">
        <div className="space-y-6">
          {/* Contact Info */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold">聯絡資訊</h2>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-5 h-5 text-primary" />
                <span>contact@mywishonline.com</span>
              </div>
              
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="w-5 h-5 text-primary" />
                <span>02-1234-5678</span>
              </div>
              
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary" />
                <span>台北市信義區信義路五段 100 號</span>
              </div>
              
              <div className="flex items-center gap-3 text-muted-foreground">
                <Clock className="w-5 h-5 text-primary" />
                <span>週一至週五 9:00 - 18:00</span>
              </div>
            </div>
          </section>

          {/* Contact Form */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold">留言給我們</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">姓名</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="請輸入您的姓名"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">電子郵件</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="請輸入您的電子郵件"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">主旨</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="請輸入主旨"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">訊息內容</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="請輸入您的訊息"
                  rows={5}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full">
                送出訊息
              </Button>
            </form>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
