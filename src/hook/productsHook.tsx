import React, { createContext, ReactNode, useContext, useState } from "react";

interface ProductProviderProps {
  children: ReactNode;
}

export interface IProduct {
  name: string;
  qtd: number;
  value: number;
  category_id: number;
}

interface ProductContextData {
  listProduct: IProduct[];
  insertProduct: any;
  removeProduct: any;
  reset: any;
}

export const ProductContext = createContext({} as ProductContextData);

function ProductProvider({ children }: ProductProviderProps) {
  const [listProduct, setListProduct] = useState<IProduct[]>([]);

  const insertProduct = (product: IProduct) => {
    setListProduct([...listProduct, product]);
  };

  const removeProduct = (lis: IProduct[]) => {
    setListProduct([...lis]);
  };

  const reset = () => setListProduct([]);

  return (
    <ProductContext.Provider
      value={{
        listProduct,
        insertProduct,
        removeProduct,
        reset,
      }}>
      {children}
    </ProductContext.Provider>
  );
}

function productHook() {
  const context = useContext(ProductContext);
  return context;
}

export { ProductProvider, productHook };
