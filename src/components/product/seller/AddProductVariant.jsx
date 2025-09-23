import FormikForm from "@/components/shared/FormikForm";
import { FieldArray, Formik } from "formik";
import { Barcode, CurrencyInr, NumberSquareOne, Plus, Scales, TextAa, Trash } from "phosphor-react";
import { useState } from "react";


const AddProductVariant = () => {
  const [showVariants, setShowVariants] = useState(false);


  const [initialValues, setInitialValues] = useState({
    variants: [{id: 1, name: "", sku: "", price: 0, quantity: 0}]
  });

  const handleAddVariant = () => {

  }

  const handleVariantChange = (e, index, field) => {

  }

  const handleRemoveVariant = (index) => {

  }
  return (
    <Formik initialValues={initialValues} onSubmit={() => { }}>
      {({ values }) => (
        <FieldArray name="variants">
          {({ push, remove }) => (
          <div className="space-y-3">
            {values.variants && values.variants.length > 0 && values.variants.map((variant, index) => (
                <div className="grid grid-cols-6 gap-3 items-start">
                  <FormikForm.Input
                    type="text"
                    label="Name"
                    name={`variants[${index}].name`}
                    icon={<TextAa className="h-5 w-5" />}
                    iconPosition="left"
                  />
                  <FormikForm.Input
                    type="text"
                    label="SKU"
                    name={`variants[${index}].sku`}
                    icon={<Barcode className="h-5 w-5" />}
                    iconPosition="left"
                  />
                  <FormikForm.Input
                    type="number"
                    label="Price"
                    name={`variants[${index}].price`}
                    icon={<CurrencyInr className="h-5 w-5" />}
                    iconPosition="left"
                  />
                  <FormikForm.Input
                    type="number"
                    label="Quantity"
                    name={`variants[${index}].quantity`}
                    icon={<Scales className="h-5 w-5" />}
                    iconPosition="left"
                  />
                  <FormikForm.Input
                    type="text"
                    label="Size"
                    name={`variants[${index}].size`}
                    icon={<NumberSquareOne className="h-5 w-5" />}
                    iconPosition="left"
                  />

                  <div className="flex items-center gap-2 mt-7">
                    <button
                      type="button"
                      onClick={() => handleRemoveVariant(index)}
                      className="text-info"
                    >
                      <Plus className="h-9 w-9 border-2 p-1 rounded-full border-info hover:bg-info/25 transition-500" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveVariant(index)}
                      className="text-red-600"
                    >
                      <Trash className="h-9 w-9 border-2 p-1 rounded-full border-red-600 hover:bg-red-600/25 transition-500" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
          )}
        </FieldArray>
      )}
    </Formik>
  )
};

export default AddProductVariant