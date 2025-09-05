import React, { useState } from "react";
import { toast } from "react-toastify";
const SystemSettings = () => {
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const handleToggle = () => {
    setMaintenanceMode((prev) => !prev);
    toast.success(
      maintenanceMode
        ? "Maintainance mode Enabled"
        : "Maintainance mode Disable"
    );
  };

  const handleSave = () => {
    toast.success("Setting saved successfully");
  };

  return (
    <>
      <h2 className="text-xl font-semibold text-gray-800 mb-6 p-3">
        System Settings
      </h2>

      {/* Maintenance Mode */}
      <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg mb-6">
        <div>
          <h3 className="text-base font-semibold text-gray-800">
            Maintenance Mode
          </h3>
          <p className="text-sm text-gray-500">
            When enabled, only administrators can access the system
          </p>
        </div>
        <button
          onClick={handleToggle}
          className={`px-4 py-2 rounded-lg font-medium text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition ${
            maintenanceMode
              ? "bg-red-600 hover:bg-red-700"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {maintenanceMode ? "Disable" : "Enable"}
        </button>
      </div>

      {/* System Information */}
      <div className="border-t-1 border-gray-200  p-2">
        <h3 className="text-lg font-semibold mt-4 text-gray-800  mb-4">
          System Information
        </h3>
        <div className="grid grid-cols-2 gap-6 text-sm text-gray-700">
          {/* Version */}
          <div>
            <p className="font-medium">Version</p>
            <p className="mt-1 text-gray-900">1.0.0</p>
          </div>

          {/* Last Updated */}
          <div>
            <p className="font-medium">Last Updated</p>
            <p className="mt-1 text-gray-900">9/5/2025</p>
          </div>

          {/* Database Status */}
          <div>
            <p className="font-medium">Database Status</p>
            <span className="inline-block mt-1 px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
              Connected
            </span>
          </div>

          {/* API Status */}
          <div>
            <p className="font-medium">API Status</p>
            <span className="inline-block mt-1 px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
              Operational
            </span>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end mt-8">
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
        >
          Save Settings
        </button>
      </div>
    </>
  );
};

export default SystemSettings;
