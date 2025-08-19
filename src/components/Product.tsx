import type { ProductType } from "../types/ProductType";
import { CustomButton } from "./Button";
import img from "../assets/imgPlace.png";
import { MAX_DECRIPTION, MAX_NAME, MIN_PRICE } from "../utils/constant";
type ProType = {
  product: ProductType;
  updateProduct: (item: ProductType) => void;
  handleSaveProduct: () => void;
  title: string;
  isValid: boolean;
};
export const Product: React.FC<ProType> = ({
  product,
  updateProduct,
  handleSaveProduct,
  title,
}) => {
  return (
    <>
      <fieldset>
        <legend>{title}</legend>
        <li className="product">
          <div
            style={{
              display: "flex",
              gap: "200px",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            <div>
              <img src={img} alt="placeholder" className="product-image" />
              <form action="">
                <label htmlFor="Name">Name</label>
                <input
                  className="custom-input"
                  type="text"
                  value={product?.Name ?? ""}
                  name="Name"
                  maxLength={MAX_NAME}
                  minLength={1}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    updateProduct({ ...product, Name: e.target.value })
                  }
                />
                <label htmlFor="Description">Description</label>
                <input
                  type="text"
                  className="custom-input"
                  maxLength={MAX_DECRIPTION}
                  minLength={0}
                  value={product?.Description ?? ""}
                  name="Description"
                  style={{ minHeight: "50px" }}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    updateProduct({ ...product, Description: e.target.value })
                  }
                />
                <label htmlFor="Price">Price</label>
                <div className="price-box">
                  <input
                    className="custom-input-price"
                    type="number"
                    value={product?.Price ?? 0}
                    name="Price"
                    min={MIN_PRICE}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      updateProduct({
                        ...product,
                        Price: Number(e.target.value),
                      })
                    }
                  />
                  <span>$</span>
                </div>
              </form>
            </div>
            <CustomButton
              title="Save"
              style="button-save"
              onClick={handleSaveProduct}
            />
          </div>
        </li>
      </fieldset>
    </>
  );
};
