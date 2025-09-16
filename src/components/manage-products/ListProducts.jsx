import { useEffect } from 'react';
import { DotsThreeOutlineVertical, Funnel, Plus } from 'phosphor-react';
import {
  Badge,
  Button,
  Dropdown,
  DropdownAction,
  DropdownContent,
  DropdownItem,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'keep-react';
import { toast, Toaster } from 'react-hot-toast';
import { useProduct } from '../@utils/hooks/useProduct';

const data = [
  {
    id: "b199f2db-0352-4dfe-9fc9-0229e31e7774",
    name: "Smartphone Pro X2",
    price: 999.99,
    category: "Smartphones", // Assuming you want to use this as the category
    rating: { rate: 4.5, count: 120 }, // Assuming a rating system where rate is the average score and count is the number of reviews
    stock: 45
  },
  {
    id: "b199f2db-0352-4dfe-9fc9-0229e31e7773",
    name: "Smartphone Pro X2",
    price: 999.99,
    category: "Smartphones", // Assuming you want to use this as the category
    rating: { rate: 4.5, count: 120 }, // Assuming a rating system where rate is the average score and count is the number of reviews
    stock: 45
  }
];

const ListProducts = ({callback}) => {
  const { fetchProductsForSeller, products, deleteProduct } = useProduct();

  useEffect(() => {
    fetchProductsForSeller();
  }, [fetchProductsForSeller]);

  const handleDelete = (product_id, product_name) => {
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex flex-col ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex p-4">
          <div className="flex items-start">
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">
                Are you sure you want to delete <b>{product_name}</b> (ID: {product_id})?
              </p>
              <p className="mt-1 text-sm text-gray-500">
                This action cannot be undone.
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-t border-gray-200">
          <button
            onClick={() => {
              // Code to delete the product (use product_id)
              deleteProduct(product_id);
              toast.dismiss(t.id);
            }}
            className="w-full border border-transparent p-3 rounded-none rounded-bl-lg flex items-center justify-center text-sm font-medium bg-red-600 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Delete
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent p-3 rounded-none rounded-br-lg flex items-center justify-center text-sm font-medium bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Cancel
          </button>
        </div>
      </div>
    ), {
      duration: 30000,
      style: {
        borderRadius: '10px',
        backgroundColor: '#F0F3F9',
        color: '#333',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      },
    });
  };

  const handleEdit = (data) => {
    callback(data);
  };

  const handleAddProduct = () => {
    callback(null);
  };

  return (
    <Table className='bg-[#F0F3F9aa]'>
      <Toaster />
      <TableCaption className='bg-l-boxBg/60 rounded-t-lg'>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <h2 className="text-heading-6 font-semibold text-metal-900 dark:text-white">Total Product</h2>
            <Badge className="border border-metal-900 text-metal-900 dark:bg-metal-800 dark:text-white">
              {products?.length || 0} Product
            </Badge>
          </div>
          <div className="flex items-center gap-5">
            <Button variant="outline" className="flex gap-1.5 !border-metal-900 !text-metal-900 dark:!border-white dark:!text-white" onClick={handleAddProduct}>
              <Plus className="size-4 fill-metal-900 dark:fill-white" />
              Add Product
            </Button>
            <Button variant="outline" className="flex gap-1.5 !border-metal-900 !text-metal-900 dark:!border-white dark:!text-white">
              <Funnel className="size-4 fill-metal-900 dark:fill-white" />
              Filter Product
            </Button>
          </div>
        </div>
      </TableCaption>
      <TableHeader className='!rounded-none !border-none'>
        <TableRow>
          <TableHead>
            <div className="w-[100px]">SKU</div>
          </TableHead>
          <TableHead>
            <div className="w-[160px]">Product Name</div>
          </TableHead>
          <TableHead>
            <div className="w-[65px]">Price</div>
          </TableHead>
          <TableHead>
            <div className="w-[100px]">Category</div>
          </TableHead>
          <TableHead>
            <div className="w-[60px]">Rating</div>
          </TableHead>
          <TableHead>
            <div className="w-[60px]">Stock</div>
          </TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products && products?.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.sku}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.price.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</TableCell>
            <TableCell></TableCell>
            <TableCell>{item?.rating?.rate} ({item?.rating?.count || 0} reviews)</TableCell>
            <TableCell>{item?.quantity}</TableCell>
            <TableCell>
              <Dropdown>
                <DropdownAction asChild>
                  <button>
                    <DotsThreeOutlineVertical className="size-4 fill-metal-900 dark:fill-white" />
                  </button>
                </DropdownAction>
                <DropdownContent align="end" className="w-[200px] border border-metal-100 p-3 dark:border-metal-800">
                  <DropdownItem onClick={() => handleEdit(item)}>Edit</DropdownItem>
                  <DropdownItem onClick={() => handleDelete(item.id, item.name)}>Delete</DropdownItem>
                </DropdownContent>
              </Dropdown>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ListProducts;