import React, { useState, useEffect } from "react";
import {
  Input, Textarea, Button, Select, SelectAction, SelectContent,
  SelectGroup, SelectItem, SelectLabel, SelectValue, Carousel,
  CarouselButtons, CarouselControl, CarouselIndicators, CarouselItem,
  CarouselNextButton, CarouselPrevButton, CarouselSlides,
} from "keep-react";
import { toast, Toaster } from "react-hot-toast";
import {
  Plus, Minus, X, Image, TextT, Barcode, TextAlignLeft, CurrencyInr,
  Scales, Money, Archive, Tag, Trash, TextAa, NumberSquareOne,
} from "phosphor-react";
import { v4 as uuidv4 } from "uuid";
import { useProduct } from "../@utils/hooks/useProduct";

const AddProductForm = ({ data }) => {
  const { addProduct, updateProduct } = useProduct();
  const additionalV = [
    {
      mainTitle: "Meta Data",
      fields: [
        {
          title: "meta title",
          value: "",
          fieldType: "text",
          placeholder: "Enter meta title",
        },
        {
          title: "meta value",
          value: "",
          fieldType: "text",
          placeholder: "Enter meta value",
        },
      ],
    },
    {
      mainTitle: "Price (optional)",
      fields: [
        {
          title: "regular price",
          value: 0,
          fieldType: "number",
          placeholder: "Enter regular price",
        },
        {
          title: "sale price",
          value: 0,
          fieldType: "number",
          placeholder: "Enter sale price",
        }
      ]
    },
    {
      mainTitle: "Shape",
      fields: [
        {
          title: "weight",
          value: 0,
          fieldType: "number",
          placeholder: "Enter weight in kg",
        },
        {
          title: "length",
          value: 0,
          fieldType: "number",
          placeholder: "Enter length",
        },
        {
          title: "height",
          value: 0,
          fieldType: "number",
          placeholder: "Enter height",
        },
        {
          title: "width",
          value: 0,
          fieldType: "number",
          placeholder: "Enter width",
        },
        {
          title: "dimension unit",
          value: "",
          fieldType: "text",
          placeholder: "Enter dimension unit(cm, in, ft)",
        },
      ],
    },
  ];

  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    short_desc: "",
    description: "",
    price: "",
    compare_price: 0,
    cost_price: 0,
    discount: 0,
    discount_type: "",
    tax: 0,
    quantity: 0,
    stock_status: "",
    in_stock: true,
    is_featured: false,
    brand_id: "",
    category_id: "",
    dimension_unit: "cm",
    height: 0,
    length: 0,
    width: 0,
    weight: 0,
    images: [],
    main_image: "",
    meta_description: "",
    meta_title: "",
    slug_url: "s",
    tags: null,
    rating: 0,
    updated_at: "",
    variants: [],
    attributes: [],
  });

  const [variants, setVariants] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  const [errors, setErrors] = useState({});
  const [openAdditional, setOpenAdditional] = useState(false);
  const [additional, setAdditional] = useState(additionalV);
  const [showToast, setShowToast] = useState(false);
  const [currentAttribute, setCurrentAttribute] = useState("");
  const [currentAttributeValue, setCurrentAttributeValue] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (data) {
      setFormData(data);
      if (data?.variants?.length > 0) {
        setVariants(data.variants);
        setFormData((prev) => ({
          ...prev,
          variants: [],
        }));
      }
      if (data?.attributes?.length > 0) {
        setAttributes(data.attributes);
      }
      if (data?.tags?.length > 0) {
        setCurrentTag(...data.tags);
      }
      if (data?.additional?.length > 0) {
        setAdditional(data.additional);
      }
      if (data?.images?.length > 0) {
        setImages(data.images);
      }
    }
  }, [data]);

  useEffect(() => {
    return () => {
      images.forEach(image => {
        if (image.preview) {
          URL.revokeObjectURL(image.preview);
        }
      });
    };
  }, [images]);

  const handleInputChange = (e) => {
    if (e.target.type === "checkbox") {
      if (e.target.checked && formData.quantity === 0) {
        e.target.checked = false;
        setErrors((prev) => ({
          ...prev,
          quantity: "Quantity must be greater than 0",
        }));
        return;
      }
      const { name, checked } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      if (errors[name]) {
        setErrors((prev) => ({
          ...prev,
          [name]: "",
        }));
      }
    }
  };

  const handleAddVariant = () => {
    const newVariant = { sku: '', name: '', price: '', quantity: 0};
    setVariants([...variants, newVariant]);
  };

  const handleRemoveVariant = (variant_id) => {
    const updatedVariants = variants.filter((variant) => variant.id !== variant_id);
    setVariants(updatedVariants);
  };

  // Inside handleInputChange for variants
  const handleVariantChange = (e, index, field) => {
    const updatedVariants = [...variants];
    updatedVariants[index][field] = e.target.value;
    setVariants(updatedVariants);
  };

  const handleAdditionalChange = (sectionIndex, fieldIndex, value) => {
    const updatedAdditional = [...additional];
    updatedAdditional[sectionIndex].fields[fieldIndex].value = value;

    // Update state
    setAdditional(updatedAdditional);

    // Sync with formData
    const updatedFormData = { ...formData };
    updatedFormData.additional = updatedAdditional;
    setFormData(updatedFormData);
  };

  const handleAdditionalKeyDown = (sectionIndex, fieldIndex, e) => {
    if (e.key === 'Enter' || e.key === 'NumpadEnter') {
      e.preventDefault();
    }
  };

  const handleAddImage = () => {
    if (images.length >= 5) {
      toast.error("You can add up to 5 images");
      return;
    }
    setImages([
      ...images,
      {
        id: "",
        product_id: data?.id || "",
        url: "",
        file: null,
        image: "",
        is_main: false,
      },
    ]);
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImages = [...images];
        newImages[index] = {
          ...newImages[index],
          file: file,
          preview: URL.createObjectURL(file),
          image: reader.result
        };
        setImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (image_id) => {
    console.log(image_id, images);
    const newImages = [...images];
    const imageIndex = newImages.findIndex((image) => image.id === image_id);
    if (imageIndex !== -1) {
      newImages.splice(imageIndex, 1);
      setImages(newImages);
    }
  };

  const handleKeyDown = (e, index, field) => {
    if (e.key === "Enter") {
      const nextIndex = index + 1;
      if (nextIndex < variants.length) {
        const nextField = document.querySelectorAll(`input`)[nextIndex];
        nextField?.focus();
      }
      e.preventDefault();
    }
  };

  const handleAddTag = (e) => {
    if (e.key === "Enter" && currentTag.trim()) {
      e.preventDefault();
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }));
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleAddAttribute = () => {
    const newAttribute = { id: '', name: '', value: '' };
    setAttributes([...attributes, newAttribute]);
  };

  const handleRemoveAttribute = (atr_id) => {
    const updatedAttributes = attributes.filter((i) => i.id !== atr_id);
    setAttributes(updatedAttributes);
  };

  // Inside handleInputChange for attributes
  const handleAttributeChange = (e, index, field) => {
    const updatedAttributes = [...attributes];
    updatedAttributes[index][field] = e.target.value;
    setAttributes(updatedAttributes);
  };

  const validateForm = () => {
    const newErrors = {};

    // Basic Information Validation
    if (!formData.name?.trim()) {
      newErrors.name = 'Product name is required';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Product name must be at least 3 characters';
    }

    if (!formData.sku?.trim()) {
      newErrors.sku = 'SKU is required';
    } else if (!/^[A-Za-z0-9-_]+$/.test(formData.sku)) {
      newErrors.sku = 'SKU can only contain letters, numbers, hyphens, and underscores';
    }

    if (!formData.short_desc?.trim()) {
      newErrors.short_desc = 'Short description is required';
    } else if (formData.short_desc.length < 10) {
      newErrors.short_desc = 'Short description must be at least 10 characters';
    }

    if (!formData.description?.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }

    // Price and Quantity Validation
    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be a positive number';
    }

    if (!formData.quantity) {
      newErrors.quantity = 'Quantity is required';
    } else if (isNaN(formData.quantity) || parseInt(formData.quantity) < 0) {
      newErrors.quantity = 'Quantity must be a non-negative number';
    }

    // Variant Validation
    if (variants.length > 0) {
      const variantErrors = [];
      const usedSkus = new Set();

      variants.forEach((variant, index) => {
        const variantError = {};

        // Validate variant SKU
        if (!variant.sku?.trim()) {
          variantError.sku = 'Variant SKU is required';
        } else if (!/^[A-Za-z0-9-_]+$/.test(variant.sku)) {
          variantError.sku = 'Variant SKU can only contain letters, numbers, hyphens, and underscores';
        } else if (usedSkus.has(variant.sku)) {
          variantError.sku = 'Duplicate SKU found. Each variant must have a unique SKU';
        }
        usedSkus.add(variant.sku);

        // Validate variant name
        if (!variant.name?.trim()) {
          variantError.name = 'Variant name is required';
        }

        // Validate variant price
        if (!variant.price) {
          variantError.price = 'Variant price is required';
        } else if (isNaN(variant.price) || parseFloat(variant.price) <= 0) {
          variantError.price = 'Variant price must be a positive number';
        }

        // Validate variant quantity
        if (!variant.quantity) {
          variantError.quantity = 'Variant quantity is required';
        } else if (isNaN(variant.quantity) || parseInt(variant.quantity) < 0) {
          variantError.quantity = 'Variant quantity must be a non-negative number';
        }

        if (Object.keys(variantError).length > 0) {
          variantErrors[index] = variantError;
        }
      });

      if (variantErrors.length > 0) {
        newErrors.variants = variantErrors;
      }
    }

    setErrors(newErrors);
    console.log(newErrors)
    return Object.keys(newErrors).length === 0;
  };

  const formatProductData = (data) => {
    const cleanVariants = data.variants.map(variant => ({
      id: variant?.id,
      sku: variant?.sku,
      name: variant?.name,
      price: parseFloat(variant?.price) || 0,
      quantity: parseInt(variant?.quantity) || 0,
    }));

    const productData = {
      name: data.name,
      sku: data.sku,
      short_desc: data.short_desc,
      description: data.description,
      slug_url: "",
      is_featured: data.is_featured || false,
      rating: parseFloat(data.rating) || 0,
      price: parseFloat(data.price) || 0,
      compare_price: parseFloat(data.compare_price) || 0,
      cost_price: parseFloat(data.cost_price) || 0,
      discount: parseFloat(data.discount) || 0,
      discount_type: data.discount_type || 'percentage',
      tax: parseFloat(data.tax) || 0,
      quantity: parseInt(data.quantity) || 0,
      stock_status: data.stock_status || 'in_stock',
      in_stock: data.in_stock || true,
      brand_id: data.brand_id || null,
      category_id: data.category_id || null,
      tags: Array.isArray(data.tags) ? data.tags : [],
      dimension_unit: data.dimension_unit || '',
      height: parseFloat(data.height) || 0,
      length: parseFloat(data.length) || 0,
      width: parseFloat(data.width) || 0,
      weight: parseFloat(data.weight) || 0,
      meta_title: data.meta_title || data.name,
      meta_description: data.meta_description || data.short_desc,
      variants: cleanVariants,
      attributes: data.attributes || [],
      additional: data.additional || [],
      images: images.map(img => ({
        id: img?.id,
        product_id: img?.product_id || data?.id,
        url: img?.url || '',
        image: img?.image || '',
        is_main: img?.is_main || false,
        name: img?.name || '',
        type: img?.type || ''
      })).filter(img => img.image || img.url),
    };
    const cleanData = (obj) => {
      Object.keys(obj).forEach(key => {
        if (obj[key] === null || obj[key] === undefined || obj[key] === '') {
          delete obj[key];
        } else if (typeof obj[key] === 'object') {
          cleanData(obj[key]);
        }
      });
      return obj;
    };
    return cleanData(productData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill in all the required fields.");
      return;
    }

    const product = {
      ...formData,
      variants,
      attributes,
    };

    const cleanProduct = formatProductData(product);
    console.log("data before sending:", cleanProduct);
    if (formData !== null && formData?.id) {
      const result = await updateProduct(cleanProduct, formData.id);
      if (result.success) {
        toast.success(result.message);
        handleReset();
      } else {
        toast.error(result.error);
      }
    } else {
      const result = await addProduct(cleanProduct);
      if (result.success) {
        toast.success(result.message);
        handleReset();
      } else {
        toast.error(result.error);
      }
    }
  };

  const handleReset = () => {
    setFormData({
      id: null,
      name: "",
      sku: "",
      short_desc: "",
      description: "",
      price: "",
      compare_price: 0,
      cost_price: 0,
      discount: 0,
      discount_type: "",
      tax: 0,
      quantity: 0,
      stock_status: "",
      in_stock: true,
      is_featured: false,
      brand_id: "",
      category_id: "",
      dimension_unit: "cm",
      height: 0,
      length: 0,
      width: 0,
      weight: 0,
      images: [],
      main_image: "",
      meta_description: "",
      meta_title: "",
      slug_url: "s",
      tags: null,
      rating: 0,
      updated_at: "",
      variants: [],
      attributes: [],
    });
    setImages([]);
    setVariants([]);
    setAttributes([]);
    setErrors({});
    setCurrentTag("");
    setCurrentAttribute("");
    setCurrentAttributeValue("");
    setAdditional([]);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mx-auto">
      <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />
      <div className="bg-l-boxBg text-l-primary dark:bg-d-boxBg dark:text-d-primary p-6 pt-2 rounded-lg">
        {/* Basic Information */}
        <div className="space-y-4 mt-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold ">Basic Information</h2>
          </div>
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <div className="relative w-full md:w-[49%] lg:w-[48%]">
                <p className="mb-1 text-sm">Product Name</p>
                <TextT className="absolute left-3 top-9 h-5 w-5" />
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onKeyDown={(e) => handleKeyDown(e, variants.length - 1, "name")}
                  placeholder="Enter product name"
                  color={errors.name ? "error" : "gray"}
                  className="ps-11 placeholder:text-l-primary/80"
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
              </div>

              <div className="relative w-full md:w-[49%]">
                <p className="mb-1 text-sm">SKU (Stock Keeping Unit)</p>
                <Barcode className="absolute left-3 top-9 h-5 w-5" />
                <Input
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleInputChange}
                  onKeyDown={(e) => handleKeyDown(e, variants.length - 1, "sku")}
                  placeholder="Enter SKU (Stock Keeping Unit)"
                  color={errors.sku ? "error" : "gray"}
                  className="ps-11 placeholder:text-l-primary/80"
                />
                {errors.sku && <p className="mt-1 text-sm text-red-500">{errors.sku}</p>}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 w-full">
              <div className="relative sm:w-full md:w-full lg:w-[48%]">
                <p className="mb-1 text-sm">Short Description</p>
                <TextAlignLeft className="absolute left-3 top-9 h-5 w-5" />
                <Textarea
                  name="short_desc"
                  value={formData.short_desc}
                  onChange={handleInputChange}
                  onKeyDown={(e) => handleKeyDown(e, variants.length - 1, "short_desc")}
                  placeholder="Enter short product description"
                  color={errors.short_desc ? "error" : "gray"}
                  rows={4}
                  className="ps-11 placeholder:text-l-primary/80"
                />
                {errors.short_desc && <p className="mt-1 text-sm text-red-500">{errors.short_desc}</p>}
              </div>

              <div className="relative sm:w-full md:w-full lg:w-[49%]">
                <p className="mb-1 text-sm">Description</p>
                <TextAlignLeft className="absolute left-3 top-9 h-5 w-5" />
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  onKeyDown={(e) => handleKeyDown(e, variants.length - 1, "description")}
                  placeholder="Enter detailed product description"
                  color={errors.description ? "error" : "gray"}
                  rows={4}
                  className="ps-11 placeholder:text-l-primary/80"
                />
                {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
              </div>
            </div>
          </div>
        </div>
        <div className="!my-4 dark:border-gray-600" />
        {/* Pricing */}
        <div className="space-y-4 mt-2">
          <h2 className="text-lg font-semibold ">Pricing</h2>
          <div className="!mt-1 flex-wrap !flex gap-2">
            <div className="relative sm:w-full md:w-[48%] lg:w-[24%]">
              <p className="mb-1 text-sm">Price</p>
              <CurrencyInr className="absolute left-3 top-9 h-5 w-5" />
              <Input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                onKeyDown={(e) => handleKeyDown(e, variants.length - 1, "price")}
                placeholder="Enter sell price"
                color={errors.price ? "error" : "gray"}
                className="ps-11 placeholder:text-l-primary/80"
              />
              {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}
            </div>

            <div className="relative sm:w-full md:w-[49%] lg:w-[25%]">
              <p className="mb-1 text-sm">Discount</p>
              <Scales className="absolute left-3 top-9 h-5 w-5" />
              <Input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleInputChange}
                onKeyDown={(e) => handleKeyDown(e, variants.length - 1, "discount")}
                placeholder="Enter discount"
                color={errors.discount ? "error" : "gray"}
                className="ps-11 placeholder:text-l-primary/80"
              />
              {errors?.discount && <p className="mt-1 text-sm text-red-500">{errors.discount}</p>}
            </div>

            <div className="relative sm:w-full md:w-[48%] lg:w-[25%]">
              <p className="mb-1 text-sm">Discount Type</p>
              <TextAa className="absolute left-3 top-9 h-5 w-5" />
              <Input
                type="text"
                name="discount_type"
                value={formData.discount_type}
                onChange={handleInputChange}
                onKeyDown={(e) => handleKeyDown(e, variants.length - 1, "discount_type")}
                placeholder="Enter discount type"
                color={errors.discount_type ? "error" : "gray"}
                className="ps-11 placeholder:text-l-primary/80"
              />
              {errors?.discount_type && <p className="mt-1 text-sm text-red-500">{errors.discount_type}</p>}
            </div>

            <div className="relative sm:w-full md:w-[49%] lg:w-[24%]">
              <p className="mb-1 text-sm">Tax</p>
              <Money className="absolute left-3 top-9 h-5 w-5" />
              <Input
                type="number"
                name="tax"
                value={formData.tax}
                onChange={handleInputChange}
                onKeyDown={(e) => handleKeyDown(e, variants.length - 1, "tax")}
                placeholder="Enter tax"
                color={errors.tax ? "error" : "gray"}
                className="ps-11 placeholder:text-l-primary/80"
              />
              {errors.tax && <p className="mt-1 text-sm text-red-500">{errors.tax}</p>}
            </div>
          </div>
        </div>
        <div className="!my-4 dark:border-gray-600" />
        {/* Inventory */}
        <div className="space-y-4 mt-2">
          <h2 className="text-lg font-semibold ">Inventory</h2>
          <div className="flex flex-wrap items-start gap-3 !mt-1">
            <div className="relative sm:w-full md:w-[49%] lg:w-[24%]">
              <p className="mb-1 text-sm">Quantity</p>
              <Archive className="absolute left-3 top-9 h-5 w-5" />
              <Input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                onKeyDown={(e) => handleKeyDown(e, variants.length - 1, "quantity")}
                placeholder="Enter stock quantity"
                className={`ps-11 placeholder:text-l-primary/80 ${errors.quantity ? "!text-c-error" : "text-gray"}`}
              />
              {errors.quantity && (
                <p className="mt-1 text-sm text-red-500">{errors.quantity}</p>
              )}
            </div>

            <div className="relative sm:w-full md:w-[49%] lg:w-[24%]">
              <p className="mb-1 text-sm">In Stock</p>
              <div
                name="in_stock"
                checked={formData.in_stock}
                onChange={handleInputChange}
                color="warning"
                defaultChecked
              />
            </div>
          </div>
        </div>
        <div className="!my-4 dark:border-gray-600" />
        {/* Variants */}
        <div className="space-y-4 mt-2">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold ">Product Variants</h2>
            <Button
              size="sm"
              type="button"
              variant="outline"
              onClick={handleAddVariant}
              className={`border-c-info ${variants.length >= 5 ? 'border-red-600' : ''}`}
            >
              <Plus className="mr-2" /> Add Variant
            </Button>
          </div>

          <div className="space-y-3">
            {variants.map((variant, index) => {
              if (variant.id === "") {
                variant.id = uuidv4();
              }
              return (
              <div key={`${variant.id}`} className="grid grid-cols-5 gap-3 items-start !mt-1">
                <div className="relative">
                  <p className="mb-1 text-sm">Variant SKU</p>
                  <Barcode className="absolute left-3 top-9 h-5 w-5" />
                  <Input
                    type="text"
                    value={variant.sku}
                    onChange={(e) => handleVariantChange(e, index, 'sku')}
                    placeholder="Variant SKU"
                    className="ps-11 placeholder:text-l-primary/80"
                  />
                </div>

                <div className="relative">
                  <p className="mb-1 text-sm">Variant Name</p>
                  <TextAa className="absolute left-3 top-9 h-5 w-5" />
                  <Input
                    type="text"
                    value={variant.name}
                    onChange={(e) => handleVariantChange(e, index, 'name')}
                    placeholder="Variant Name"
                    className="ps-11 placeholder:text-l-primary/80"
                  />
                </div>

                <div className="relative">
                  <p className="mb-1 text-sm">Price</p>
                  <CurrencyInr className="absolute left-3 top-9 h-5 w-5" />
                  <Input
                    type="number"
                    value={variant.price}
                    onChange={(e) => handleVariantChange(e, index, 'price')}
                    placeholder="Price"
                    className="ps-11 placeholder:text-l-primary/80"
                  />
                </div>

                <div className="relative">
                  <p className="mb-1 text-sm">Quantity</p>
                  <Scales className="absolute left-3 top-9 h-5 w-5" />
                  <Input
                    type="number"
                    value={variant.quantity}
                    onChange={(e) => handleVariantChange(e, index, 'quantity')}
                    placeholder="Quantity"
                    className="ps-11 placeholder:text-l-primary/80"
                  />
                </div>
                <Button
                  size="sm"
                  type="button"
                  variant="outline"
                  color="error"
                  onClick={() => handleRemoveVariant(variant.id)}
                  className="border-red-600 w-fit self-end"
                >
                  <Trash />
                </Button>
              </div>
            )})}
          </div>
        </div>
        <div className="!my-4 dark:border-gray-600" />
        {/* Images */}
        <div className="space-y-4 mb-4 py-2">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Images</h2>
            <div className="">
              <Button
                size="sm"
                type="button"
                variant="outline"
                onClick={handleAddImage}
                className={`border-c-info ${images.length >= 5 ? 'border-red-600' : ''}`}
              >
                <Plus className="mr-2" /> Add Image
              </Button>
            </div>
          </div>

          <div className="space-y-3 flex flex-row sm:flex-wrap lg:flex-nowrap gap-4 justify-start">
            <div className="lg:w-1/4 sm:w-full">
              {images.map((image, index) => {
                if (image.id === "") {
                  image.id = uuidv4();
                }
                return (
                  <div key={image.id} className="flex flex-row gap-3 items-end !mt-1">
                    <div className="relative">
                      <p className="mb-1 text-sm">Image {index + 1}</p>
                      <Image className="absolute left-3 top-9 h-5 w-5" />
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, index)}
                        className="ps-11 placeholder:text-l-primary/80"
                      />
                    </div>
                    <Button
                      size="md"
                      type="button"
                      variant="outline"
                      color="error"
                      onClick={() => handleRemoveImage(image.id)}
                      className="border-red-600 w-fit"
                    >
                      <Trash />
                    </Button>
                  </div>
                );
              })}
            </div>
            {images.length > 0 && (
              <div className="flex flex-row gap-3 items-end !mt-1 relative lg:w-3/4 sm:w-full">
                  <Carousel
                    options={{ slidesToScroll: 1, slidesToShow: 1, enableMouseEvents: true }}
                    slideInterval={5000}
                    indicators={true}
                    className="h-64 rounded-lg p-2"
                  >
                    <CarouselSlides className="flex gap-2 ml-2">
                    {images.map((image, index) => (
                      <CarouselItem
                        key={image.id}
                        className="flex-[0_0_20%] !pl-0 [&:not(.is-snapped)]:opacity-[0.86] border dark:border-d-ctaText rounded-lg h-52"
                      >
                        {(image.preview || image.url) ? (
                          <img
                            src={image.preview || image.url}
                            alt={`Product Image ${index + 1}`}
                            className="h-full w-full object-contain rounded-lg"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full w-full text-gray-400">
                            <Image size={48} />
                            <p className="mt-2">No image uploaded</p>
                          </div>
                        )}
                      </CarouselItem>
                    ))}
                    </CarouselSlides>
                    <CarouselControl className="!mt-0 pt-2">
                      <CarouselButtons>
                        <CarouselPrevButton />
                        <CarouselNextButton />
                      </CarouselButtons>
                      <CarouselIndicators />
                    </CarouselControl>
                  </Carousel>
              </div>
            )}
          </div>
        </div>
        <div className="!my-4 dark:border-gray-600" />
        {/* Tags */}
        <div className="space-y-4 mb-2">
          <h2 className="text-lg font-semibold">Tags</h2>
          <div className="relative !mt-1">
            <Tag className="absolute left-3 top-3 h-5 w-5" />
            <Input
              type="text"
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder="Type tag and press Enter"
              className="ps-11 placeholder:text-l-primary/80"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {formData?.tags?.map((tag, index) => (
              <span
                key={`tag-${tag}-${index}`}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm border border-2 border-white"
              >
                {tag}
                <X
                  size={14}
                  className="ml-2 cursor-pointer hover:text-l-hover"
                  onClick={() => handleRemoveTag(tag)}
                />
              </span>
            ))}
          </div>
        </div>
        <div className="!my-4 dark:border-gray-600" />
        {/* More Attributes */}
        <div className="space-y-4 mb-2">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">More Attributes</h2>
            <div className="">
              <Button
                size="sm"
                type="button"
                variant="outline"
                onClick={handleAddAttribute}
                className={`border-c-info ${attributes.length >= 8 ? 'border-red-600' : ''}`}
              >
                <Plus className="mr-2" /> Add Attribute
              </Button>
            </div>
          </div>

          <div className="space-y-3 flex flex-row flex-wrap gap-4 justify-start">
            {attributes.map((attribute, index) => {
              if (attribute.id === "") {
                attribute.id = uuidv4();
              }
              return (
                <div key={`${attribute.id}`} className="flex flex-row gap-3 items-end !mt-1">
                  <div className="relative">
                    <p className="mb-1 text-sm">Attribute Name</p>
                    <TextAa className="absolute left-3 top-9 h-5 w-5" />
                    <Input
                      type="text"
                      value={attribute.name}
                      onChange={(e) => handleAttributeChange(e, index, 'name')}
                      placeholder="Attribute Name"
                      className="ps-11 placeholder:text-l-primary/80"
                    />
                  </div>

                  <div className="relative">
                    <p className="mb-1 text-sm">Attribute Value</p>
                    <TextAa className="absolute left-3 top-9 h-5 w-5" />
                    <Input
                      type="text"
                      value={attribute.value}
                      onChange={(e) => handleAttributeChange(e, index, 'value')}
                      placeholder="Attribute Value"
                      className="ps-11 placeholder:text-l-primary/80"
                    />
                  </div>

                  <Button
                    size="md"
                    type="button"
                    variant="outline"
                    color="error"
                    onClick={() => handleRemoveAttribute(attribute.id)}
                    className="border-red-600 w-fit"
                  >
                    <Trash />
                  </Button>
                </div>
              )
            })}
          </div>

        </div>
        <div className="!my-4 dark:border-gray-600" />
        {/* Additional */}
        <div className="space-y-4 mb-2">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Additional</h2>
            <div className="">
              <Button
                size="sm"
                type="button"
                variant="outline"
                onClick={() => setOpenAdditional(!openAdditional)}
                className={`border-c-info ${openAdditional ? 'border-red-600' : ''}`}
              >
                {openAdditional ? 'Close' : 'Open'} Additional Fields
              </Button>
            </div>
          </div>
          {openAdditional && (
            <div className="flex flex-col flex-wrap gap-4 justify-start w-full">
              <div className="flex flex-row flex-wrap gap-4 justify-start w-full">

                {additional && additional.length > 0 && additional.map((section, sectionIndex) => (
                  <div key={`section-${section.mainTitle}-${sectionIndex}`} className="border p-4 rounded-md md:w-full lg:w-[49%] h-fit">
                    <h4 className="font-semibold">{section?.mainTitle}</h4>
                    <div className="flex flex-wrap flex-row gap-3 items-end !mt-2">
                      {section?.fields?.map((field, fieldIndex) => (
                        <div key={`field-${section.mainTitle}-${field.title}-${fieldIndex}`} className="relative w-full lg:w-[49%]">
                          <div className="relative">
                            <p className="mb-1 text-sm">{field?.title}</p>
                            {field?.fieldType === 'number' ?
                              <NumberSquareOne className="absolute left-3 top-9 h-5 w-5" /> :
                              <TextAa className="absolute left-3 top-9 h-5 w-5" />
                            }
                            <Input
                              type={field?.fieldType}
                              value={field?.value}
                              onChange={(e) =>
                                handleAdditionalChange(sectionIndex, fieldIndex, e.target.value)
                              }
                              onKeyDown={(e) =>
                                handleAdditionalKeyDown(sectionIndex, fieldIndex, e)
                              }
                              placeholder={field?.placeholder}
                              className="ps-11 placeholder:text-l-primary/80"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end mt-4">
          {formData && (
            <Button
              onClick={handleReset}
              type="button"
              variant="outline"
              className="text-md border border-c-danger text-c-danger mr-2"
            >
              Reset
            </Button>
          )}
          <Button
            type="submit"
            size="md"
            color="info"
            className="bg-link hover:bg-link/80 dark:text-d-ctaText text-l-ctaText"
          >
            {formData && formData?.id ? "Update Product" : (<><Plus className="mr-2" />Add Product</>)}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddProductForm;
