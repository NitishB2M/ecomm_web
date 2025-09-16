import { useState, useEffect, use } from 'react';
import { useNavigate, usePathname } from 'next/navigation';
import { toast } from 'react-toastify';
import { Button as Button2 } from "keep-react";
import { ShoppingCart } from 'phosphor-react';
import { useCart } from '@/utils/hooks/useCart';
import { useProduct } from '@/utils/hooks/useProduct';
import ProductCard from './ProductCard';
import ProductCardSkeleton from '../skeletons/ProductCardSkeleton';
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Formik } from 'formik';
import FormikForm from '@/components/shared/FormikForm';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterDrawer, setFilterDrawer] = useState(false);
  const { fetchProducts, productLoading, fetchProductCategories } = useProduct();
  const [initialValues, setInitialValues] = useState({
    name: '',
    category: [],
    brand: [],
    tag: [],
    min_price: '',
    max_price: '',
    min_rating: '',
  });

  const loadProducts = async () => {
    const result = await fetchProducts();
    if (result?.status) {
      setProducts(result.data);
    }
  };

  const loadCategories = async () => {
    const result = await fetchProductCategories();
    if (result?.status) {
      
      const formatOptions = (type) =>
        result.data
          .filter((cat) => cat.entity_type === type)
          .map((cat) => ({ value: cat.entity_id, label: cat.entity_name }));

      const category = formatOptions('category');
      const brand = formatOptions('brand');
      const tag = formatOptions('tag');

      const options = {
        category: category,
        brand: brand,
        tag: tag,
      }
      setCategories(options);
      // setInitialValues((prev) => ({ ...prev, category: category, brand: brand, tag: tag }));
      setInitialValues((prev) => ({
        ...prev,
        category: [],
        brand: [],
        tag: [],
      }));
    }
  };
  
  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const handleFilterChange = (field, value) => {
    setInitialValues(prev => ({
      ...prev,
      [field]: value
    }));
    console.log(initialValues);
  };

  const applyFilters = () => {
    console.log(initialValues);
  };

  const onSubmit = (values) => {
    applyFilters();
  };

  const resetFilters = () => {
    setInitialValues({
      name: '',
      category: [],
      brand: [],
      min_price: '',
      max_price: '',
      min_rating: '',
    });
    setFilterDrawer(false);
  };

  const handleAddToCartCallback = async (response, message) => {
    // console.log(response, message);
  };

  const handleClickOpen = () => {
    resetFilters();
  };

  return (
    <div className="m_container min_h_screen mx-auto px-4 py-8 mt-6">
      <div className="flex justify-between items-center mb-6 w-full">
        <div className="text-2xl font-semibold">
          Products
        </div>
        <div className="relative flex items-center cursor-pointer text-xl button" onClick={() => setFilterDrawer((prev) => !prev)}>
          Filters
        </div>
        {filterDrawer && (
          <div className="fixed top-[64px] right-0 w-[400px] h-full shadow-lg bg-[#ccc] flex flex-col z-30 items-center p-4 px-4 dark:bg-dark-surface" onClose={() => setFilterDrawer(false)}>
            <Formik
              enableReinitialize
              initialValues={initialValues}
              onSubmit={onSubmit}
            >
            {({ values, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit} className="w-full">
                <div className="mb-4 flex justify-between w-full">
                  <div className="text-lg font-semibold">
                    Filters
                  </div>
                  <div onClick={() => setFilterDrawer(false)}>
                    <AiOutlineCloseCircle className='text-2xl'/>
                  </div>
                </div>

                <div className="w-full">
                  <FormikForm.Input
                    name="name"
                    label="Search by name"
                    placeholder="Enter product name"
                    onChange={(e) => {
                      handleFilterChange('name', e.target.value)
                    }}
                  />
                  <div className="max-h-48">
                    <FormikForm.MultiSelectSort
                      name="category"
                      label="Category"
                      labelClass="!text-lg font-medium"
                      containerClass="mt-1"
                      options={categories.category}
                      onChange={(array) => handleFilterChange('category', array)}
                    />
                  </div>

                  <div className="max-h-48">
                    <FormikForm.MultiSelectSort
                      name="brand"
                      label="Brand"
                      labelClass="!text-lg font-medium"
                      containerClass="mt-1"
                      options={categories.brand}
                      onChange={(array) => handleFilterChange('brand', array)}
                    />
                  </div>

                  <div className="max-h-48">
                    <FormikForm.MultiSelectSort
                      name="tag"
                      label="Tag"
                      labelClass="!text-lg font-medium"
                      containerClass="mt-1"
                      options={categories.tag}
                      onChange={(array) => handleFilterChange('tag', array)}
                    />
                  </div>

                  <div className="space-y-2">
                    <div>Price Range</div>
                    <div className="flex gap-2">
                      <div
                        label="Min"
                        type="number"
                        onChange={(e) => handleFilterChange('min_price', e.target.value)}
                        size="small"
                      />
                      <div
                        label="Max"
                        type="number"
                        onChange={(e) => handleFilterChange('max_price', e.target.value)}
                        size="small"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div >Minimum div</div>
                    <div
                      onChange={(_, value) => handleFilterChange('min_rating', value)}
                    />
                  </div>
                  <div className="flex gap-2 pt-4">
                    <button className='button border border-dark-border hover:bg-surface/80 hover:border-dark-info' onClick={applyFilters}>
                      Apply Filters
                    </button>
                    <button className='button-outline !border-dark-border' onClick={resetFilters}>
                      Reset
                    </button>
                  </div>
                </div>
              </form>
            )}
            </Formik>
            </div>
        )}
      </div>

      {/* Products div */}
      {productLoading ? (
        <div className="flex justify-center gap-4 items-center w-full">
          {/* <CircularProgress /> */}
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4'>
          {products && products.length > 0 ? products.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} callback={handleAddToCartCallback} />
            </div>
          )) :
            <div className='flex justify-center flex-col items-center min-h-[400px] md:min-h-screen w-full'>
              <div className="mb-4">
                No products found.
              </div>
              <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md" onClick={handleClickOpen}>
                <ShoppingCart /> &nbsp; Click here to refresh product
              </button>
            </div>
          }
        </div>
      )}
    </div>
  );
};

export default Products;
