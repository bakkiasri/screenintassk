import { useState } from "react";
import Layout from "../layouts/main";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import SystemSettings from "../components/SystemSetting";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("General");
  const [newAsset, setNewAsset] = useState("");
  const [newBase, setNewBase] = useState("");
  const [assetTypes, setAssetTypes] = useState([
    "Weapon",
    "Vehicle",
    "Equipment",
    "Ammunition",
    "Medical",
    "Food",
  ]);
  const [baseTypes, setBaseTypes] = useState([
    "Base Alpha",
    "Base Bravo",
    "Base Charlie",
  ]);

  const handleAdd = () => {
    if (newAsset.length === 0) {
      toast.error("Enter a Asset type name");
    }
    if (newAsset.trim() !== "" && !assetTypes.includes(newAsset)) {
      setAssetTypes([...assetTypes, newAsset]);
      setNewAsset("");
      toast.success("Asset type successfully added ");
    }
  };
  const handlebaseAdd = () => {
    if (newBase.length === 0) {
      toast.error("Enter a base type name");
    }
    if (newBase.trim() !== "" && !baseTypes.includes(newBase)) {
      setBaseTypes([...baseTypes, newBase]);
      setNewBase("");
      toast.success("Base type successfully added ");
    }
  };

  const handleRemove = (asset) => {
    setAssetTypes(assetTypes.filter((item) => item !== asset));
    toast.success("Asset type removed ");
  };
  const handleRemoveb = (base) => {
    setBaseTypes(baseTypes.filter((item) => item !== base));
    toast.success("base type removed ");
  };

  // ✅ Formik initial values
  const initialValues = {
    systemName: "Military Asset Management System",
    organizationName: "Department of Defense",
    defaultCurrency: "USD ($)",
    theme: "Default",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "12-hour (AM/PM)",
    timezone: "Eastern Time (ET)",
    emailNotifications: true,
  };

  // ✅ Yup validation schema
  const validationSchema = Yup.object({
    systemName: Yup.string().required("System Name is required"),
    organizationName: Yup.string().required("Organization Name is required"),
  });

  const handleSubmit = (values) => {
    console.log("Saved Settings:", values);
    toast.success("Settings Saved!");
  };

  return (
    <Layout>
      <div className="w-full min-w-full space-y-6 p-6">
        {/* Tabs */}
        <div className="text-xl mt-5 font-medium">Settings</div>
        <div className="border-b border-[#e5e7eb]">
          <nav className="flex gap-10 text-md font-medium">
            {["General", "Asset Type", "Bases", "System"].map((tab) => (
              <button
                key={tab}
                className={`pb-2 ${
                  activeTab === tab
                    ? "text-[#0284c7] border-b-2 border-[#0284c7]"
                    : "text-[#6b7280] hover:text-gray-700 hover:border-gray-700"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="bg-white shadow rounded-2xl px-4 py-2">
          {/* ✅ General Settings with Formik */}
          {activeTab === "General" && (
            <>
              <div className="px-4 py-6">
                <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  General Settings
                </h2>

                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ values, handleChange }) => (
                    <Form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* System Name */}
                      <div>
                        <label className="block text-sm font-medium mb-1 text-[#374151]">
                          System Name
                        </label>
                        <Field
                          type="text"
                          name="systemName"
                          className="w-full border rounded-lg px-3 py-2"
                        />
                        <ErrorMessage
                          name="systemName"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      {/* Organization Name */}
                      <div>
                        <label className="block text-sm font-medium mb-1 text-[#374151]">
                          Organization Name
                        </label>
                        <Field
                          type="text"
                          name="organizationName"
                          className="w-full border rounded-lg px-3 py-2"
                        />
                        <ErrorMessage
                          name="organizationName"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      {/* Default Currency */}
                      <div>
                        <label className="block text-sm font-medium mb-1 text-[#374151]">
                          Default Currency
                        </label>
                        <Field
                          as="select"
                          name="defaultCurrency"
                          className="w-full border rounded-lg px-3 py-2"
                        >
                          <option>USD ($)</option>
                          <option>EUR (€)</option>
                          <option>GBP (£)</option>
                        </Field>
                      </div>

                      {/* Theme */}
                      <div>
                        <label className="block text-sm font-medium mb-1 text-[#374151]">
                          Theme
                        </label>
                        <Field
                          as="select"
                          name="theme"
                          className="w-full border rounded-lg px-3 py-2"
                        >
                          <option>Default</option>
                          <option>Dark</option>
                          <option>Light</option>
                        </Field>
                      </div>

                      {/* Date Format */}
                      <div>
                        <label className="block text-sm font-medium mb-1 text-[#374151]">
                          Date Format
                        </label>
                        <Field
                          as="select"
                          name="dateFormat"
                          className="w-full border rounded-lg px-3 py-2"
                        >
                          <option>MM/DD/YYYY</option>
                          <option>DD/MM/YYYY</option>
                          <option>YYYY-MM-DD</option>
                        </Field>
                      </div>

                      {/* Time Format */}
                      <div>
                        <label className="block text-sm font-medium mb-1 text-[#374151]">
                          Time Format
                        </label>
                        <Field
                          as="select"
                          name="timeFormat"
                          className="w-full border rounded-lg px-3 py-2"
                        >
                          <option>12-hour (AM/PM)</option>
                          <option>24-hour</option>
                        </Field>
                      </div>

                      {/* Timezone */}
                      <div>
                        <label className="block text-sm font-medium mb-1 text-[#374151]">
                          Timezone
                        </label>
                        <Field
                          as="select"
                          name="timezone"
                          className="w-full border rounded-lg px-3 py-2"
                        >
                          <option>Eastern Time (ET)</option>
                          <option>Central Time (CT)</option>
                          <option>Pacific Time (PT)</option>
                        </Field>
                      </div>

                      {/* Email Notifications */}
                      <div className="flex items-center col-span-2">
                        <Field
                          type="checkbox"
                          name="emailNotifications"
                          checked={values.emailNotifications}
                          onChange={handleChange}
                          className="mr-2 h-4 w-4 text-blue-600"
                        />
                        <label className="text-sm">
                          Enable email notifications
                        </label>
                      </div>

                      {/* Save Button */}
                      <div className="col-span-2 flex justify-end">
                        <button
                          type="submit"
                          className="bg-[#0284c7] hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg"
                        >
                          Save Settings
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </>
          )}
          {activeTab === "Asset Type" && (
            <>
              <h2 className="text-xl font-semibold px-4 mt-6">Asset Type </h2>
              <div className="flex items-center  mb-6">
                <input
                  type="text"
                  value={newAsset}
                  onChange={(e) => setNewAsset(e.target.value)}
                  placeholder="Add new asset type"
                  className="flex-1 border-0 hover:border rounded-l-lg px-3 py-2 text-sm "
                />
                <button
                  onClick={handleAdd}
                  className="bg-[#0284c7] hover:bg-sky-700 text-white px-4 py-2 text-sm rounded-r-lg font-medium   focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition"
                >
                  Add
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5">
                {assetTypes.map((asset, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border-1 px-6 py-6 border-[#d1d5db] rounded-lg px-4 py-3 text-sm"
                  >
                    <span className="text-gray-800 font-medium">{asset}</span>
                    <button
                      onClick={() => handleRemove(asset)}
                      className="text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === "Bases" && (
            <>
              <h2 className="text-xl font-semibold px-4 mt-6">Base Type </h2>
              <div className="flex items-center  mb-6">
                <input
                  type="text"
                  value={newBase}
                  onChange={(e) => setNewBase(e.target.value)}
                  placeholder="Add new asset type"
                  className="flex-1 border-0 hover:border rounded-l-lg px-3 py-2 text-sm "
                />
                <button
                  onClick={handlebaseAdd}
                  className="bg-[#0284c7] hover:bg-sky-700 text-white px-4 py-2 text-sm rounded-r-lg font-medium   focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition"
                >
                  Add
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5">
                {baseTypes.map((base, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border-1 px-6 py-6 border-[#d1d5db] rounded-lg px-4 py-3 text-sm"
                  >
                    <span className="text-gray-800 font-medium">{base}</span>
                    <button
                      onClick={() => handleRemoveb(base)}
                      className="text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === "System" && (
            <div className="p-4 ">
              <SystemSettings />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
