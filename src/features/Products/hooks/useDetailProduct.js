import productApi from 'api/productApi';
import { useEffect, useState } from 'react';

const useDetailProduct = (productId) => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const response = await productApi.get(productId);
        setProduct(response);
      } catch (error) {
        console.log('Failed to fetch Product List ', error);
      }

      setLoading(false);
    })();
  }, [productId]);

  return {
    product,
    loading,
  };
};
export default useDetailProduct;
