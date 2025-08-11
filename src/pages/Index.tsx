import { Smartphone, Laptop, Headphones, Shirt, Home, Car, BookOpen, Gamepad2 } from "lucide-react";
import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import phoneImage from "@/assets/product-phone.jpg";
import laptopImage from "@/assets/product-laptop.jpg";
import headphonesImage from "@/assets/product-headphones.jpg";

const Index = () => {
  const categories = [
    { title: "Electronics", icon: Smartphone, itemCount: "10,000+" },
    { title: "Fashion", icon: Shirt, itemCount: "25,000+" },
    { title: "Home & Garden", icon: Home, itemCount: "15,000+" },
    { title: "Automotive", icon: Car, itemCount: "5,000+" },
    { title: "Books", icon: BookOpen, itemCount: "50,000+" },
    { title: "Sports & Gaming", icon: Gamepad2, itemCount: "8,000+" },
    { title: "Computers", icon: Laptop, itemCount: "3,000+" },
    { title: "Audio", icon: Headphones, itemCount: "2,500+" },
  ];

  const featuredProducts = [
    {
      id: "1",
      title: "Latest Smartphone with 5G Technology and Advanced Camera System",
      image: phoneImage,
      price: 15999,
      originalPrice: 19999,
      rating: 4.4,
      reviewCount: 2847,
      discount: 20,
      freeDelivery: true,
    },
    {
      id: "2", 
      title: "Premium Laptop for Gaming and Professional Work with High-End Graphics",
      image: laptopImage,
      price: 65999,
      originalPrice: 79999,
      rating: 4.6,
      reviewCount: 1265,
      discount: 17,
      freeDelivery: true,
    },
    {
      id: "3",
      title: "Wireless Noise Cancelling Headphones with Premium Sound Quality",
      image: headphonesImage,
      price: 2999,
      originalPrice: 4999,
      rating: 4.3,
      reviewCount: 5432,
      discount: 40,
      freeDelivery: true,
    },
    {
      id: "4",
      title: "Professional Bluetooth Earbuds with Long Battery Life",
      image: headphonesImage,
      price: 1499,
      originalPrice: 2499,
      rating: 4.2,
      reviewCount: 3198,
      discount: 40,
      freeDelivery: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroBanner />
      
      {/* Categories Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <CategoryCard
                key={index}
                title={category.title}
                icon={category.icon}
                itemCount={category.itemCount}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-foreground">Featured Products</h2>
            <a href="#" className="text-primary hover:underline font-medium">View All</a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers Banner */}
      <section className="py-12 bg-gradient-to-r from-primary via-primary to-accent">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Special Weekend Sale!</h2>
          <p className="text-xl mb-6 opacity-90">Get up to 70% off on selected items. Limited time offer!</p>
          <div className="flex justify-center gap-4">
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold">48</div>
              <div className="text-sm">Hours</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold">23</div>
              <div className="text-sm">Minutes</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold">45</div>
              <div className="text-sm">Seconds</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
