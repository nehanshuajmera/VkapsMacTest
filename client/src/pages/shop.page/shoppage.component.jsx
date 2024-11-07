import { useContext } from "react";
import { ProductContext } from "../../contexts/products.context";
import "./shoppage.styles.scss";

export const ShopPage = () => {
  const {products, loading, error} = useContext(ProductContext);
  return (
    <div className="shop-page">
      <h1> Shop Now</h1>
      {loading && <div className="loading-data">Loading.....</div>}
      {error && <div className="error-fetching">{error}</div>}
      <div className="all-products--container">
        {products.map((product) => (
          <div className="single-product" key={product._id}>
            <h1>{product.name}</h1>
            <h1>{product.price}</h1>
            <h1>{product.category}</h1>
            {product.inStock ? <h1>Shop Now</h1> : <h1>Out of Stock</h1>}
          </div>
        ))}
      </div>
    </div>
  );
};
