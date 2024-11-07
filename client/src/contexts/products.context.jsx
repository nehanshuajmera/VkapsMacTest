import { createContext, useState, useEffect } from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const ProductContext = createContext();

export const ProductProvider = ({children}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`${apiUrl}/products`);
      setProducts(res.data);
    } catch (err) {
      console.error(`Error fetching Products: ${err.message}`);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [])
  
  return (
    <ProductContext.Provider value={{products, loading, error}}>
      {children}
    </ProductContext.Provider>
  )
}