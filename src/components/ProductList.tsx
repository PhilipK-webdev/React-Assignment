import type { ProductType } from "../types/ProductType";

import img from "../assets/imgPlace.png";
import { CustomButton } from "./Button";
type ProductListType = {
  list?: ProductType[];
  handleEdit: (event, id: number) => void;
  handleDeleteProduct: (e, id: number) => void;
  selected: ProductType | null;
};

export const ProductList: React.FC<ProductListType> = ({
  list,
  handleEdit,
  handleDeleteProduct,
  selected,
}) => {
  return (
    <div>
      <ul>
        {list &&
          list.map((product) => (
            <li
              key={product.ID}
              className={`card-product`}
              style={{
                backgroundColor:
                  selected?.ID === product.ID ? "rgb(35, 143, 179)" : "",
                color: selected?.ID === product.ID ? "white" : "",
              }}
              onClick={(e) => handleEdit(e, product.ID)}
            >
              <div className="product-list-card ">
                <img src={img} alt="placeholder" />
                <div className="product-list-box">
                  <div className="product-name">{product.Name}</div>
                  <div className="product-desc">{product.Description}</div>
                </div>
              </div>
              <CustomButton
                title="Delete"
                style="button-delete"
                onClick={(e) => handleDeleteProduct(e, product.ID)}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};
