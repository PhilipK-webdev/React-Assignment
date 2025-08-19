import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Actions } from "./components/Actions";
import { ProductList } from "./components/ProductList";
import { MOCK_PRODUCTS } from "./utils/constant";
import type { ProductType } from "./types/ProductType";
import { Product } from "./components/Product";
import useLocalStorage from "./hooks/useLocalStorage";
import { Pagination } from "./components/Pagination";
function App() {
  const [products, setProdcuts] = useState<ProductType[]>(MOCK_PRODUCTS);
  const [addingNewProduct, setAddingNewProduct] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectValue, setSelectValue] = useState<string>("Name");
  const [defaultTitle, setDefaultTitle] = useState<string>("New Product");
  const [selectedProduct, setSelctedProduct] = useState<ProductType | null>(
    null
  );
  const [productsStorage, setProductsStorage] = useLocalStorage<ProductType[]>(
    "products",
    MOCK_PRODUCTS
  );
  const filteredProducts = useMemo(() => {
    if (selectValue === "Name") {
      return productsStorage.filter((p) =>
        p.Name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (selectValue === "Price" && Number(searchTerm)) {
      return productsStorage.filter((p) => p.Price <= Number(searchTerm));
    } else if (selectValue === "Desc") {
      const checkIfDescriptionExists = productsStorage.some(
        (p) => p?.Description
      );
      if (checkIfDescriptionExists) {
        const x = productsStorage.filter((p) => p.Description);
        return x.filter((p) =>
          p.Description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
    }
    return productsStorage;
  }, [productsStorage, searchTerm, selectValue]);

  const [createProduct, setCreateProduct] = useState<ProductType | null>({
    ID: 0,
    Description: "",
    Price: 0,
    Name: "",
    CreationDate: new Date(),
  });

  useEffect(() => {
    window.location.hash = "/products";
  }, []);

  const renderData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return (
      <ProductList
        selected={selectedProduct}
        list={filteredProducts.slice(startIndex, endIndex)}
        handleEdit={handleEdit}
        handleDeleteProduct={handleDeleteProduct}
      />
    );
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const goToPrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const goToSpecificPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleEdit = (e, id: number): void => {
    e.preventDefault();
    if (!id) return;
    window.location.hash = `/products/${id}`;
    setAddingNewProduct(false);
    const item = products.filter((f) => f.ID === id)[0];
    setSelctedProduct(item);
    setCreateProduct(null);
    const title = `Product ${id} Details`;
    setDefaultTitle(title);
  };

  const handleAddNewProduct = (): void => {
    if (!addingNewProduct) {
      setAddingNewProduct(true);
      setSelctedProduct(null);
      const title = `New Product`;
      setDefaultTitle(title);
    }
  };

  const handleSaveProduct = () => {
    if (validateForm()) {
      alert("Please fill the form");
      return;
    }
    if (addingNewProduct) {
      if (createProduct) {
        createProduct.ID = filteredProducts.length + 1;
        setProdcuts([...products, createProduct]);
        setCreateProduct(null);
        setProductsStorage([...products, createProduct]);
      }
    } else {
      if (selectedProduct) {
        setProdcuts((prev) => {
          const updated = [...prev];
          const index = updated.findIndex((p) => p.ID === selectedProduct.ID);
          if (index !== -1) {
            updated[index] = selectedProduct;
          }
          return updated;
        });

        setProductsStorage(products);
      }
      setSelctedProduct(null);
    }
    setAddingNewProduct(false);
  };

  const handleDeleteProduct = (e, id: number): void => {
    e.stopPropagation();
    const filteredProducts = productsStorage.filter((p) => p.ID !== id);
    setProdcuts(filteredProducts);
    setProductsStorage(filteredProducts);
  };

  const validateForm = () => {
    const { Name, Description, Price } = addingNewProduct
      ? createProduct
      : selectedProduct;
    return (
      !Name ||
      Name.lenght > 30 ||
      !Price ||
      (Description && Description.lenght > 200)
    );
  };

  return (
    <div className="container">
      <Header title="My Store" />
      <Actions
        selectValue={selectValue}
        handleAddNewProduct={handleAddNewProduct}
        setSearchTerm={setSearchTerm}
        setSelectValue={setSelectValue}
      />
      <div className="flex-container">
        <>
          <div className="container-one">
            {renderData()}
            <Pagination
              currentPage={currentPage}
              goToNextPage={goToNextPage}
              goToPrevPage={goToPrevPage}
              itemsPerPage={itemsPerPage}
              products={filteredProducts}
              goToSpecificPage={goToSpecificPage}
            />
          </div>
        </>

        {(selectedProduct || addingNewProduct) && (
          <>
            <div className="container-two">
              <Product
                title={defaultTitle}
                handleSaveProduct={handleSaveProduct}
                product={selectedProduct ?? createProduct}
                updateProduct={
                  addingNewProduct ? setCreateProduct : setSelctedProduct
                }
              />
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
