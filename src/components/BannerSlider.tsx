import bannerImage from "@/assets/banner.jpg";

const BannerSlider = () => {
  return (
    <div className="w-full overflow-hidden">
      <img 
        src={bannerImage} 
        alt="一點心意，讓夢想更快實現" 
        className="w-full h-auto object-cover"
      />
    </div>
  );
};

export default BannerSlider;
