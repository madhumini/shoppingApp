import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { productColumns} from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../redux/apiCalls";

const Datatable = () => {
   const dispatch = useDispatch();
   const products = useSelector((state) => state.product.products);
   console.log(products)
  //  const products = useSelector((state) =>
  //    Object.values(state.product.products)
  //  );

   useEffect(() => {
     getProducts(dispatch);
   }, [dispatch]);

   const handleDelete = (id) => {
     deleteProduct(id, dispatch);
    //  setData(data.filter((item) => item.id !== id));
   };
  // const [data, setData] = useState(products);
// console.log(data)

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={"/products/"+params.row._id} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to="/products/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={products}
        columns={productColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default Datatable;
