import React, { useState } from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
function Popup({ setOpen, onAddJob }) {
  const [date, setDate] = useState("");

  // Yup schema
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    location: Yup.string().required("Location is required"),
    jobType: Yup.string().required("Job Type is required"),
    salaryMin: Yup.number()
      .typeError("Enter a valid number")
      .required("Min Salary is required"),
    salaryMax: Yup.number()
      .typeError("Enter a valid number")
      .required("Max Salary is required")
      .moreThan(Yup.ref("salaryMin"), "Max must be greater than Min"),
    deadline: Yup.date().required("Deadline is required"),
    description: Yup.string()
      .min(20, "Description must be at least 20 characters")
      .required("Job description is required"),
  });

  return (
    <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
      {/* Desktop / Tablet Popup */}
      <div className=" flex-row bg-white rounded-2xl shadow-xl p-6 relative animate-fadeIn">
        <div className="text-center pb-0 lg:pb-4 text-xl font-semibold mb-4">
          Edit User: System Administrator
        </div>
        <FormFields
          validationSchema={validationSchema}
          setDate={setDate}
          date={date}
          onAddJob={onAddJob}
          setOpen={setOpen}
        />
      </div>

      {/* Mobile Full Page */}
      {/* <div className="block sm:hidden w-full h-full bg-white p-6 relative overflow-y-auto animate-fadeIn">
        <h2 className="text-center pb-0 text-3xl font-semibold mb-4">
          Edit User: System Administrator
        </h2>
        <FormFields
          validationSchema={validationSchema}
          setDate={setDate}
          date={date}
          setOpen={setOpen} // <--- pass it here
          onAddJob={onAddJob}
        />

        {/* Close Button */}
      {/* </div> */}
    </div>
  );
}

function FormFields({ validationSchema, setOpen, onAddJob }) {
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        location: "",
        jobType: "",
        salaryMin: "",
        salaryMax: "",
        deadline: "",
        description: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log("Form submitted", values);
        const newJob = {
          company: `${values.firstName} ${values.lastName}`,
          title: `${values.location}`,
          type: values.jobType,
          exp: "0-2 Yrs",
          salary: `${values.salaryMin}`,
          posted: "Just now",
          description: values.description.split("\n").filter(Boolean),
          logo: logo,
        };
        if (onAddJob) {
          onAddJob(newJob);
          console.log("onAddJob called successfully with:", newJob);
        }
        setOpen(false);
      }}
    >
      {({ handleSubmit }) => (
        <Form className="space-y-5 ps-0 me-5" onSubmit={handleSubmit}>
          {/* First & Last Name */}

          <div>
            <label className="block text-sm font-medium mb-1 text-[#374151]">
              First Name
            </label>
            <Field
              type="text"
              name="firstName"
              className="w-full border-0 rounded-lg px-3 py-0"
              placeholder="Enter your first name"
            />
            <ErrorMessage
              name="firstName"
              component="p"
              className="text-red-500 text-xs mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-[#374151]">
              Email address
            </label>
            <Field
              type="email"
              name="lastName"
              className="w-full border-0 rounded-lg px-3 py-0"
              placeholder="Enter your last name"
            />
            <ErrorMessage
              name="lastName"
              component="p"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          {/* Role*/}
          <div>
            <label className="block text-sm font-medium mb-1 text-[#374151]">
              Role
            </label>
            <Field
              as="select"
              name="location"
              className="w-full border-0 rounded-lg px-3 py-0"
            >
              <option value="">Choose preferred location</option>
              <option value="Chennai">Chennai</option>
              <option value="Madurai">Madurai</option>
              <option value="Coimbatore">Coimbatore</option>
              <option value="Trichy">Trichy</option>
            </Field>
            <ErrorMessage
              name="location"
              component="p"
              className="text-red-500 text-xs mt-1"
            />
          </div>
          {/* Status*/}
          <div>
            <label className="block text-sm font-medium mb-1 text-[#374151]">
              Status
            </label>

            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <Field
                  type="checkbox"
                  name="status"
                  value="active"
                  className="h-4 w-4 text-[#222222] border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">Active</span>
              </label>
            </div>

            <ErrorMessage
              name="roles"
              component="p"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex bg-transparent p-2 px-4 rounded-lg text-black border-1 border-black"
            >
              <p>Save Draft</p>
            </button>
            <button
              type="submit"
              className="flex bg-[#00AAFF] p-2 px-4 rounded-lg text-white"
            >
              <p>Publish</p>
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default Popup;
