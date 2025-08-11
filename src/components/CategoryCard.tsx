import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface CategoryCardProps {
  title: string;
  icon: LucideIcon;
  itemCount: string;
  className?: string;
}

const CategoryCard = ({ title, icon: Icon, itemCount, className }: CategoryCardProps) => {
  return (
    <Card className={`group cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 border-border ${className}`}>
      <CardContent className="p-6 text-center">
        <div className="mb-4 flex justify-center">
          <div className="rounded-full bg-primary/10 p-4 group-hover:bg-primary/20 transition-colors">
            <Icon className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h3 className="font-semibold text-lg mb-2 text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{itemCount} items</p>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;