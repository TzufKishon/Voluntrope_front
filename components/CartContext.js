import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  // Use useEffect to set the state from localStorage after the component mounts
  useEffect(() => {
    const ls = typeof window !== "undefined" ? window.localStorage : null;
    if (ls && ls.getItem('cart')) {
      setCartProducts(JSON.parse(ls.getItem('cart')));
    }
  }, []);

  useEffect(() => {
    const ls = typeof window !== "undefined" ? window.localStorage : null;
    if (ls) {
      if (cartProducts.length === 0) {
        ls.removeItem('cart');
      } else {
        ls.setItem('cart', JSON.stringify(cartProducts));
      }
    }
  }, [cartProducts]);

  function addProduct(productId) {
    setCartProducts(prev => [...prev, productId]);
  }

  function removeProduct(productId) {
    setCartProducts(prev => {
      const pos = prev.indexOf(productId);
      if (pos !== -1) {
        return prev.filter((value, index) => index !== pos);
      }
      return prev;
    });
  }

  function clearCart() {
    setCartProducts([]);
  }

  return (
    <CartContext.Provider value={{ cartProducts, setCartProducts, addProduct, removeProduct, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
