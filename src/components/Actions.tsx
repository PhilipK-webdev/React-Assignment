import { CustomButton } from "./Button";
type ActionProp = {
  handleAddNewProduct: () => void;
  setSearchTerm: (value: string) => void;
  setSelectValue: (value: string) => void;
  selectValue: string;
};

export const Actions: React.FC<ActionProp> = ({
  handleAddNewProduct,
  setSelectValue,
  setSearchTerm,
  selectValue,
}) => {
  return (
    <div className="actions">
      <CustomButton
        title="Add"
        style="button-add"
        onClick={handleAddNewProduct}
      />
      <form style={{ position: "relative" }}>
        <input
          type="text"
          placeholder="search products"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <select
        value={selectValue}
        name="product"
        id="product"
        onChange={(e) => setSelectValue(e.target.value)}
      >
        <option value="Name">Name</option>
        <option value="Desc">Description</option>
        <option value="Price">Price</option>
      </select>
    </div>
  );
};
