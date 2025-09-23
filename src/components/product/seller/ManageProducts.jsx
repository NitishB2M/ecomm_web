import { useState } from "react";
import { Tabs, TabsList, TabsItem, TabsContent } from "keep-react";
import ListProducts from "./ListProducts";
import AddProductForm from "./AddProductForm";

const ManageProducts = () => {
  const [activeTab, setActiveTab] = useState("tab2");
  const [editData, setEditData] = useState([]);

  const handleProductEditData = (data) => {
    setEditData(data);
    setActiveTab("tab2");
  };

  return (
    <div className="m_container min_h_screen2 px-4 py-8">
      <div className="p-4 py-2">
      <div >
        <div className="flex flex-col px-4">
          <div className="text-2xl font-bold text-center">
            Manage Products
          </div>
          <div className="">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="items-start justify-start gap-2 flex">
                <TabsItem value="tab1" className="bg-l-boxBg dark:text-d-ctaText dark:bg-d-background">Product List</TabsItem>
                <TabsItem value="tab2" className="bg-l-boxBg dark:text-d-ctaText dark:bg-d-background">Add New Product</TabsItem>
                <TabsItem value="tab3" className="bg-l-boxBg dark:text-d-ctaText dark:bg-d-background">Filter Products</TabsItem>
              </TabsList>
              <TabsContent value="tab1">
                <ListProducts callback={(data) => handleProductEditData(data)} />
              </TabsContent>
              <TabsContent value="tab2">
                <AddProductForm data={editData} />
              </TabsContent>
              <TabsContent value="tab3">Content for Tab 3</TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ManageProducts;