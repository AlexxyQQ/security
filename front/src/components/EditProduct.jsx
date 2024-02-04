import { Loader2 } from "lucide-react";
import useFetch from "../hooks/useFetch";
import EditProductList from "./EditProductList";

const EditProduct = ({ user }) => {
  const { data, isloading, error } = useFetch(
    "https://localhost:3001/api/product"
  );

  if (isloading) {
    return (
      <div>
        <Loader2 className="h-4 w-4 inline-block animate-spin" /> Loading...
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const userProducts = data.message.filter(
    (product) => product.userId === user.id
  );

  return (
    <div>
      <>
        <EditProductList items={userProducts} />
      </>
    </div>
  );
};

export default EditProduct;
