import React, { useState, useEffect } from "react";
import {
  Input, Textarea, Button, Select, SelectAction, SelectContent,
  SelectGroup, SelectItem, SelectLabel, SelectValue, Carousel,
  CarouselButtons, CarouselControl, CarouselIndicators, CarouselItem,
  CarouselNextButton, CarouselPrevButton, CarouselSlides,
} from "keep-react";
import { toast } from "react-toastify";
import {
  Plus, Minus, X, Image, TextT, Barcode, TextAlignLeft, CurrencyInr,
  Scales, Money, Archive, Tag, Trash, TextAa, NumberSquareOne,
  CurrencyDollar,
} from "phosphor-react";
import { useProduct } from "@/utils/hooks/useProduct";
import { Formik } from "formik";
import FormikForm from "@/components/shared/FormikForm";
import * as Yup from "yup";
import { FaChevronDown, FaChevronUp, FaWeight } from "react-icons/fa";
import AddProductVariant from "./AddProductVariant";


const AddProductForm = ({ data }) => {
  const { addProduct, updateProduct } = useProduct();
  const [accordion, setAccordion] = useState({
    basic: true,
    pricing: false,
    inventory: false,
    variants: false,
    images: false,
    tags: false,
    attributes: false,
    additional: false,
  });
  const additionalV = [
    {
      mainTitle: "Meta Data",
      fields: [
        {title: "meta title",value: "",fieldType: "text",placeholder: "Enter meta title"},
        {title: "meta value",value: "",fieldType: "text",placeholder: "Enter meta value"},
      ],
    },
    {
      mainTitle: "Price (optional)",
      fields: [
        {title: "regular price",value: 0,fieldType: "number",placeholder: "Enter regular price"},
        {title: "sale price",value: 0,fieldType: "number",placeholder: "Enter sale price"},
      ]
    },
    {
      mainTitle: "Shape",
      fields: [
        {title: "weight",value: 0,fieldType: "number",placeholder: "Enter weight in kg"},
        {title: "length",value: 0,fieldType: "number",placeholder: "Enter length"},
        {title: "height",value: 0,fieldType: "number",placeholder: "Enter height"},
        {title: "width",value: 0,fieldType: "number",placeholder: "Enter width"},
        {title: "dimension unit",value: "",fieldType: "text",placeholder: "Enter dimension unit(cm, in, ft)"},
      ],
    },
  ];

  const [initialValues, setInitialValues] = useState({
    name: "",
    category: [],
    brand: [],
    tag: [],
    min_price: "",
    max_price: "",
    min_rating: "",
  });
  const validationSchema = Yup.object().shape({});

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

  function generateSKU(productName) {
    if (!productName) return '';
    const base = productName
      .toUpperCase()
      .replace(/[^A-Z0-9 ]/g, '')
      .trim()
      .replace(/\s+/g, '-');

    const suffix = Math.floor(1000 + Math.random() * 9000);
    return `${base}-${suffix}`;
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, setFieldValue, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit} className="w-full mx-auto">
          <div className="bg-l-boxBg text-l-primary dark:bg-d-boxBg dark:text-d-primary p-6 pt-2 rounded-lg flex flex-col gap-4 divide-y divide-border dark:divide-dark-border">
            {/* Basic Information */}
            <div className={`space-y-4 py-6 px-4 rounded-lg bg-primary dark:bg-dark-surface/50`}>
              <div className={`flex items-center justify-between cursor-pointer `} onClick={() => setAccordion({ ...accordion, basic: !accordion.basic })}>
                <h2 className="text-lg font-semibold">Basic Information </h2>
                {accordion.basic ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              {accordion.basic && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <FormikForm.Input
                    label="Product Name"
                    name="name"
                    placeholder="Enter product name"
                    icon={<TextT />}
                    iconPosition="left"
                    onChange={(e) => {
                      handleChange(e);
                      const sku = generateSKU(e.target.value);
                      setFieldValue('sku', sku);
                    }}
                  />

                  <FormikForm.Input
                    label="SKU (Stock Keeping Unit)"
                    name="sku"
                    placeholder="Enter SKU (Stock Keeping Unit)"
                    icon={<Barcode />}
                    iconPosition="left"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormikForm.TextArea
                    label="Short Description"
                    name="short_desc"
                    placeholder="Enter short product description"
                    icon={<TextAlignLeft />}
                    iconPosition="left"
                    maxLength={100}
                  />

                  <FormikForm.TextArea
                    label="Description"
                    name="description"
                    placeholder="Enter product description"
                    icon={<TextAlignLeft />}
                    iconPosition="left"
                  />
                </div>
              </div>
              )}
            </div>
            {/* Pricing */}
            <div className={`space-y-4 py-6 px-4 rounded-lg bg-primary dark:bg-dark-surface/50`}>
              <div className={`flex items-center justify-between cursor-pointer `} onClick={() => setAccordion({ ...accordion, pricing: !accordion.pricing })}>
                <h2 className="text-lg font-semibold">Pricing</h2>
                {accordion.pricing ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              {accordion.pricing && (
              <div className="grid grid-cols-4 grid-rows-2 gap-4">
                <FormikForm.Input
                  label="Price"
                  name="price"
                  placeholder="Enter sell price"
                  icon={<CurrencyInr />}
                  iconPosition="left"
                />

                <FormikForm.Input
                  label="Cost Price"
                  name="cost_price"
                  placeholder="Enter cost price"
                  icon={<CurrencyInr />}
                  iconPosition="left"
                />

                <FormikForm.Input
                  label="Discount"
                  name="discount"
                  placeholder="Enter discount"
                  icon={<Scales />}
                  iconPosition="left"
                />

                <FormikForm.Select
                  label="Discount Type"
                  name="discount_type"
                  options={[
                    { value: "percentage", label: "Percentage" },
                    { value: "fixed", label: "Fixed" },
                  ]}
                />

                <FormikForm.Input
                  label="Tax"
                  name="tax"
                  placeholder="Enter tax"
                  icon={<CurrencyInr />}
                  iconPosition="left"
                />
              </div>
              )}
            </div>
            {/* Inventory */}
            <div className={`space-y-4 py-6 px-4 rounded-lg bg-primary dark:bg-dark-surface/50`}>
              <div className={`flex items-center justify-between cursor-pointer `} onClick={() => setAccordion({ ...accordion, inventory: !accordion.inventory })}>
                <h2 className="text-lg font-semibold">Inventory</h2>
                {accordion.inventory ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              {accordion.inventory && (
              <div className="grid grid-cols-4 grid-rows-2 gap-4">
                <FormikForm.Input
                  label="Quantity"
                  name="quantity"
                  placeholder="Enter stock quantity"
                  icon={<Archive />}
                  iconPosition="left"
                />

                <FormikForm.Input
                  label="Weight"
                  name="weight"
                  placeholder="Enter weight"
                  icon={<FaWeight />}
                  iconPosition="left"
                />

                <FormikForm.Input
                  label="Length"
                  name="length"
                  placeholder="Enter length"
                  icon={<FaWeight />}
                  iconPosition="left"
                />

                <FormikForm.Input
                  label="Width"
                  name="width"
                  placeholder="Enter width"
                  icon={<FaWeight />}
                  iconPosition="left"
                />

                <FormikForm.Input
                  label="Height"
                  name="height"
                  placeholder="Enter height"
                  icon={<FaWeight />}
                  iconPosition="left"
                />
              </div>
              )}
            </div>
            {/* Variants */}
            <div className={`space-y-4 py-6 px-4 rounded-lg bg-primary dark:bg-dark-surface/50`}>
              <div className={`flex items-center justify-between cursor-pointer`} onClick={() => setAccordion({ ...accordion, variants: !accordion.variants })}>
                <h2 className="text-lg font-semibold">Product Variants</h2>
                {accordion.variants ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              {accordion.variants && (
                <AddProductVariant />
              )}
            </div>
            {/* Images */}
            <div className={`space-y-4 py-6 px-4 rounded-lg bg-primary dark:bg-dark-surface/50`}>
              <div className={`flex items-center justify-between cursor-pointer`} onClick={() => setAccordion({ ...accordion, images: !accordion.images })}>
                <h2 className="text-lg font-semibold">Images</h2>
                {accordion.images ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              {accordion.images && (
              <div className="space-y-3 flex flex-row sm:flex-wrap lg:flex-nowrap gap-4 justify-start">
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
                <div className="lg:w-1/4 sm:w-full">
                  {images.map((image, index) => {
                    if (image.id === "") {
                      image.id = 1;
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
              )}
            </div>
            {/* Tags */}
            <div className={`space-y-4 py-6 px-4 rounded-lg bg-primary dark:bg-dark-surface/50 `}>
              <div className={`flex items-center justify-between cursor-pointer`} onClick={() => setAccordion({ ...accordion, tags: !accordion.tags })}>
                <h2 className="text-lg font-semibold">Product tags</h2>
                {accordion.tags ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              {accordion.tags && (
              <div className="flex flex-wrap gap-2">
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
                {formData?.tags?.map((tag, index) => (
                  <span
                    key={`tag-${tag}-${index}`}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm border-2 border-white"
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
              )}
            </div>
            {/* More Attributes */}
            <div className={`space-y-4 py-6 px-4 rounded-lg bg-primary dark:bg-dark-surface/50`}>
              <div className={`flex items-center justify-between cursor-pointer`} onClick={() => setAccordion({ ...accordion, attributes: !accordion.attributes })}>
                <h2 className="text-lg font-semibold">Product attributes</h2>
                {accordion.attributes ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              {accordion.attributes && (
              <div className="space-y-3 flex flex-row flex-wrap gap-4 justify-start">
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
                {attributes.map((attribute, index) => {
                  if (attribute.id === "") {
                    attribute.id = 1;
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
              )}
            </div>
            {/* Additional */}
            <div className={`space-y-4 py-6 px-4 rounded-lg bg-primary dark:bg-dark-surface/50`}>
              <div className={`flex items-center justify-between cursor-pointer`} onClick={() => setAccordion({ ...accordion, additional: !accordion.additional })}>
                <h2 className="text-lg font-semibold">Product additional</h2>
                {accordion.additional ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              {accordion.additional && (
              <div>
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
              )}
            </div>

            <div className={`flex justify-end py-6 px-4`}>
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
      )}
    </Formik>
  );
};

export default AddProductForm;
