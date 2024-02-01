import SingleProduct from "./SingleProduct";

const Product = ({ items }) => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items &&
          items.map((item) => <SingleProduct key={item._id} data={item} />)}
      </div>
    </div>
  );
};

export default Product;
