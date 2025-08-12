import { Search, ShoppingCart, User, Heart, Menu, ChevronDown, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold text-primary">PennyeKart</h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-4 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search for products, brands and more"
                className="pl-10 h-10 border-border focus:ring-primary"
              />
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-1">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="hidden md:flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{user.user_metadata?.full_name || user.email}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/orders')}>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Orders
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                variant="ghost" 
                size="sm" 
                className="hidden md:flex items-center space-x-1"
                onClick={() => navigate('/auth')}
              >
                <User className="h-4 w-4" />
                <span>Login</span>
              </Button>
            )}
            
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="h-5 w-5" />
            </Button>
            
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-accent text-xs text-accent-foreground flex items-center justify-center">
                0
              </span>
            </Button>
          </div>
        </div>

        {/* Categories Navigation */}
        <div className="hidden md:block border-t border-border">
          <NavigationMenu className="mx-0 max-w-full">
            <NavigationMenuList className="flex items-center space-x-6 h-12 px-0">
              <NavigationMenuItem>
                <Button variant="ghost" size="sm" className="text-sm font-medium">
                  Minutes
                </Button>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Button variant="ghost" size="sm" className="text-sm font-medium">
                  Mobiles & Tablets
                </Button>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium h-auto p-2">
                  Fashion
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[400px]">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-medium mb-2">Men</h3>
                        <ul className="space-y-1 text-sm">
                          <li><a href="#" className="text-muted-foreground hover:text-foreground">T-Shirts</a></li>
                          <li><a href="#" className="text-muted-foreground hover:text-foreground">Shirts</a></li>
                          <li><a href="#" className="text-muted-foreground hover:text-foreground">Jeans</a></li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Women</h3>
                        <ul className="space-y-1 text-sm">
                          <li><a href="#" className="text-muted-foreground hover:text-foreground">Dresses</a></li>
                          <li><a href="#" className="text-muted-foreground hover:text-foreground">Tops</a></li>
                          <li><a href="#" className="text-muted-foreground hover:text-foreground">Sarees</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium h-auto p-2">
                  Electronics
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[400px]">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-medium mb-2">Audio</h3>
                        <ul className="space-y-1 text-sm">
                          <li><a href="#" className="text-muted-foreground hover:text-foreground">Headphones</a></li>
                          <li><a href="#" className="text-muted-foreground hover:text-foreground">Speakers</a></li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Computing</h3>
                        <ul className="space-y-1 text-sm">
                          <li><a href="#" className="text-muted-foreground hover:text-foreground">Laptops</a></li>
                          <li><a href="#" className="text-muted-foreground hover:text-foreground">Accessories</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium h-auto p-2">
                  Home & Furniture
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[400px]">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-medium mb-2">Furniture</h3>
                        <ul className="space-y-1 text-sm">
                          <li><a href="#" className="text-muted-foreground hover:text-foreground">Sofas</a></li>
                          <li><a href="#" className="text-muted-foreground hover:text-foreground">Chairs</a></li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Decor</h3>
                        <ul className="space-y-1 text-sm">
                          <li><a href="#" className="text-muted-foreground hover:text-foreground">Lighting</a></li>
                          <li><a href="#" className="text-muted-foreground hover:text-foreground">Wall Art</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Button variant="ghost" size="sm" className="text-sm font-medium">
                  TVs & Appliances
                </Button>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Button variant="ghost" size="sm" className="text-sm font-medium">
                  Flight Bookings
                </Button>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium h-auto p-2">
                  Beauty, Food..
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[400px]">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-medium mb-2">Beauty</h3>
                        <ul className="space-y-1 text-sm">
                          <li><a href="#" className="text-muted-foreground hover:text-foreground">Skincare</a></li>
                          <li><a href="#" className="text-muted-foreground hover:text-foreground">Makeup</a></li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Food</h3>
                        <ul className="space-y-1 text-sm">
                          <li><a href="#" className="text-muted-foreground hover:text-foreground">Snacks</a></li>
                          <li><a href="#" className="text-muted-foreground hover:text-foreground">Beverages</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Button variant="ghost" size="sm" className="text-sm font-medium">
                  Grocery
                </Button>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search for products, brands and more"
              className="pl-10 h-10"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;