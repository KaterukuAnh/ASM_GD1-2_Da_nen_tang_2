import React, { createContext, useContext, useState } from 'react';

// Định nghĩa các kiểu dữ liệu
interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

// Tạo context với kiểu dữ liệu an toàn
const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart phải được sử dụng trong CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: CartItem) => {
    // Thêm logging để debug
    console.log("Adding product to cart:", product);
    
    if (!product || !product.id) {
      console.error("Invalid product or missing ID");
      return;
    }
    
    setCartItems((prevCart) => {
      // Tìm sản phẩm theo ID chính xác
      const existingProductIndex = prevCart.findIndex(item => item.id === product.id);
      
      console.log("Existing product index:", existingProductIndex);
      
      if (existingProductIndex !== -1) {
        // Nếu sản phẩm đã tồn tại, cập nhật số lượng
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex] = {
          ...updatedCart[existingProductIndex],
          quantity: updatedCart[existingProductIndex].quantity + product.quantity
        };
        return updatedCart;
      }
      
      // Nếu là sản phẩm mới, thêm vào giỏ hàng
      return [...prevCart, { ...product }];
    });
  };

  const removeFromCart = (id: string) => {
    if (!id) {
      console.error("Invalid ID for removal");
      return;
    }
    
    setCartItems(prevCart => prevCart.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (!id) {
      console.error("Invalid ID for quantity update");
      return;
    }
    
    setCartItems(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};