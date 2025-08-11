import { Star, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  id: string;
  title: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  discount?: number;
  freeDelivery?: boolean;
}

const ProductCard = ({
  title,
  image,
  price,
  originalPrice,
  rating,
  reviewCount,
  discount,
  freeDelivery
}: ProductCardProps) => {
  return (
    <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg border-border">
      <CardContent className="p-0">
        {/* Image Container */}
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {discount && (
            <Badge className="absolute top-2 left-2 bg-discount text-white font-semibold">
              {discount}% OFF
            </Badge>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 bg-white/80 hover:bg-white"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-medium text-sm mb-2 line-clamp-2 text-foreground">
            {title}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center gap-1 bg-success px-2 py-1 rounded text-xs text-white">
              <Star className="h-3 w-3 fill-current" />
              <span className="font-medium">{rating}</span>
            </div>
            <span className="text-xs text-muted-foreground">
              ({reviewCount.toLocaleString()})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg font-bold text-foreground">
              ₹{price.toLocaleString()}
            </span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Free Delivery */}
          {freeDelivery && (
            <p className="text-xs text-success font-medium">Free Delivery</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;