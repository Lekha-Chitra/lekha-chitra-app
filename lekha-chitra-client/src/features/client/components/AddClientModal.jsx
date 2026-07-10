import { useEffect, useState } from "react";

import Notification from "../../../components/common/Notification";

import { addClient } from "../services/clientServices";
import { getSubCategories } from "../../category/services/categoryService";

function AddClientModal({ open, onClose,onSuccess }) {
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [subCategories, setSubCategories] = useState([]);

  const [formData, setFormData] = useState({
    clientName: "",
    subcategory: "",
    quantity: "",
    amount: "",
    estimatedBudget: "",
    status: "",
    remarks: "",
    description: "",
  });

    useEffect(() => {
      if (open) {
        resetForm();
        loadSubCategories();
      }
    }, [open]);

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [message]);

  const loadSubCategories = async () => {
    try {
      const response = await getSubCategories();

      setSubCategories(response.data || []);
    } catch (error) {
      console.error(error);

      setMessage("Failed to load subcategories");
      setMessageType("error");
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setFormData({
      clientName: "",
      subcategory: "",
      quantity: "",
      amount: "",
      estimatedBudget: "",
      status: "",
      remarks: "",
      description: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        client: {
          name: formData.clientName,
          status: formData.status,
          amount: Number(formData.amount),
          description: formData.description,
          remarks: formData.remarks,
          estimatedBudget: Number(formData.estimatedBudget),
          quantity: Number(formData.quantity),
          subCategory: formData.subcategory,
        },
      };

     const response = await addClient(payload);

     if (response.isSuccess) {
       setMessage("Client added successfully");
       setMessageType("success");

       resetForm();

       // Refresh the client table
       await onSuccess?.();

       setTimeout(() => {
         onClose();
       }, 1000);
     }
    } catch (error) {
      console.error(error);

      setMessage(error.response?.data?.message || "Something went wrong");

      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

 return (
  <div
    className="
      fixed
      inset-0
      bg-black/40
      flex
      items-center
      justify-center
      z-50
      p-4
    "
  >
    <div
      className="
        bg-white
        rounded-lg
        shadow-xl
        w-full
        max-w-[430px]
        p-4
        relative
        max-h-[85vh]
        overflow-y-auto
      "
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="
          absolute
          top-3
          right-3
          text-gray-500
          hover:text-black
          cursor-pointer
        "
      >
        ✕
      </button>

      {/* Title */}
      <h2
        className="
          text-lg
          font-semibold
          text-[#032A5C]
          mb-3
        "
      >
        Add Client
      </h2>

      {/* Notification */}
      <Notification message={message} type={messageType} />

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-1.5">
        {/* Client Name */}
        <div>
          <label className="block mb-0.5 text-xs font-medium text-gray-700">
            Client Name
          </label>
          <input
            type="text"
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
            placeholder="Enter client name"
            className="
              w-full
              border
              border-[#E59C11]
              rounded-md
              px-2.5
              py-1
              text-sm
              outline-none
            "
            required
          />
        </div>

        {/* Subcategory + Status */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block mb-0.5 text-xs font-medium text-gray-700">
              Subcategory
            </label>
            <select
              name="subcategory"
              value={formData.subcategory}
              onChange={handleChange}
              className="
                w-full
                border
                border-[#E59C11]
                rounded-md
                px-2.5
                py-1
                text-sm
                outline-none
              "
              required
            >
              <option value="">Select</option>
              {subCategories.map((item, index) => (
                <option key={index} value={item.subCategory}>
                  {item.subCategory}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-0.5 text-xs font-medium text-gray-700">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="
                w-full
                border
                border-[#E59C11]
                rounded-md
                px-2.5
                py-1
                text-sm
                outline-none
              "
              required
            >
              <option value="">Select</option>
              <option value="Credit">Credit</option>
              <option value="Debit">Debit</option>
            </select>
          </div>
        </div>

        {/* Balance + Estimated Budget */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block mb-0.5 text-xs font-medium text-gray-700">
              Balance
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="
                w-full
                border
                border-[#E59C11]
                rounded-md
                px-2.5
                py-1
                text-sm
                outline-none
              "
            />
          </div>

          <div>
            <label className="block mb-0.5 text-xs font-medium text-gray-700">
              Estimated Budget
            </label>
            <input
              type="number"
              name="estimatedBudget"
              value={formData.estimatedBudget}
              onChange={handleChange}
              className="
                w-full
                border
                border-[#E59C11]
                rounded-md
                px-2.5
                py-1
                text-sm
                outline-none
              "
            />
          </div>
        </div>

        {/* Quantity + Remarks */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block mb-0.5 text-xs font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="
                w-full
                border
                border-[#E59C11]
                rounded-md
                px-2.5
                py-1
                text-sm
                outline-none
              "
            />
          </div>

          <div>
            <label className="block mb-0.5 text-xs font-medium text-gray-700">
              Remarks
            </label>
            <input
              type="text"
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              className="
                w-full
                border
                border-[#E59C11]
                rounded-md
                px-2.5
                py-1
                text-sm
                outline-none
              "
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block mb-0.5 text-xs font-medium text-gray-700">
            Description
          </label>
          <textarea
            rows="2"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="
              w-full
              border
              border-[#E59C11]
              rounded-md
              px-2.5
              py-1
              text-sm
              resize-none
              outline-none
            "
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            bg-[#032A5C]
            text-white
            py-1.5
            rounded-md
            text-sm
            font-medium
            cursor-pointer
            hover:opacity-90
            disabled:opacity-50
          "
        >
          {loading ? "Adding Client..." : "Add Client"}
        </button>
      </form>
    </div>
  </div>
);
}

export default AddClientModal;

