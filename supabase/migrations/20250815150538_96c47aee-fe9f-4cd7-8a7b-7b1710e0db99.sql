-- Create security definer function to check admin status without recursion
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = $1 AND profiles.is_admin = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Drop existing admin policies that might cause recursion
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all vendors" ON public.vendors;
DROP POLICY IF EXISTS "Admins can update all vendors" ON public.vendors;
DROP POLICY IF EXISTS "Admins can view all products" ON public.products;
DROP POLICY IF EXISTS "Admins can update all products" ON public.products;
DROP POLICY IF EXISTS "Admins can view all orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can update all orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can view all order items" ON public.order_items;
DROP POLICY IF EXISTS "Admins can manage categories" ON public.categories;

-- Create new admin policies using the security definer function
CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update all profiles" 
ON public.profiles 
FOR UPDATE 
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can view all vendors" 
ON public.vendors 
FOR SELECT 
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update all vendors" 
ON public.vendors 
FOR UPDATE 
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can view all products" 
ON public.products 
FOR SELECT 
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update all products" 
ON public.products 
FOR UPDATE 
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can view all orders" 
ON public.orders 
FOR SELECT 
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update all orders" 
ON public.orders 
FOR UPDATE 
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can view all order items" 
ON public.order_items 
FOR SELECT 
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage categories" 
ON public.categories 
FOR ALL 
USING (public.is_admin(auth.uid()));

-- Update vendor policies to support admin updates
CREATE POLICY "Admins can update vendor approval status" 
ON public.vendors 
FOR UPDATE 
USING (public.is_admin(auth.uid()));

-- Make sure we have the updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;