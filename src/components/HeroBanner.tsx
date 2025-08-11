import { Button } from "@/components/ui/button";
import heroBannerImage from "@/assets/hero-banner.jpg";

const HeroBanner = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[400px] md:h-[500px]">
        <img
          src={heroBannerImage}
          alt="Amazing deals and discounts on PennyeKart"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/50 to-transparent">
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Mega Sale
                <span className="block text-accent">Up to 80% Off</span>
              </h1>
              <p className="text-lg md:text-xl mb-8 opacity-90">
                Discover amazing deals on electronics, fashion, home & garden, and more. 
                Shop now and save big!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="secondary" className="h-12 px-8 text-lg font-semibold">
                  Shop Now
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-8 text-lg border-white text-white hover:bg-white hover:text-primary">
                  Explore Deals
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;