import { useEffect, useState } from "react";

import Notification from "../../../components/common/Notification";

import { addClient } from "../services/clientServices";
import { getSubCategories } from "../../category/services/categoryService";

function AddClientModal({ open, onClose }) {
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

      await addClient(payload);

      setMessage("Client added successfully");
      setMessageType("success");

      resetForm();

      setTimeout(() => {
        onClose();
      }, 1500);
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
          rounded-xl
          shadow-xl
          w-full
          max-w-md
          p-6
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
            top-4
            right-4
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
            text-xl
            font-semibold
            text-[#032A5C]
            mb-4
          "
        >
          Add Client
        </h2>

        {/* Notification */}
        <Notification message={message} type={messageType} />

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Client Name */}
          <div>
            <label className="block mb-1 text-sm">Client Name</label>

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
                px-3
                py-2
                outline-none
              "
              required
            />
          </div>

          {/* Subcategory */}
          <div>
            <label className="block mb-1 text-sm">Subcategory</label>

            <select
              name="subcategory"
              value={formData.subcategory}
              onChange={handleChange}
              className="
                w-full
                border
                border-[#E59C11]
                rounded-md
                px-3
                py-2
                outline-none
              "
              required
            >
              <option value="">Select Subcategory</option>

              {subCategories.map((item, index) => (
                <option key={index} value={item.subCategory}>
                  {item.subCategory}
                </option>
              ))}
            </select>
          </div>

          {/* Quantity */}
          <div>
            <label className="block mb-1 text-sm">Quantity</label>

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
                px-3
                py-2
                outline-none
              "
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block mb-1 text-sm">Amount</label>

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
                px-3
                py-2
                outline-none
              "
            />
          </div>

          {/* Estimated Budget */}
          <div>
            <label className="block mb-1 text-sm">Estimated Budget</label>

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
                px-3
                py-2
                outline-none
              "
            />
          </div>

          {/* Status */}
          <div>
            <label className="block mb-1 text-sm">Status</label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="
                w-full
                border
                border-[#E59C11]
                rounded-md
                px-3
                py-2
                outline-none
              "
              required
            >
              <option value="">Select Status</option>

              <option value="Credit">Credit</option>

              <option value="Debit">Debit</option>
            </select>
          </div>

          {/* Remarks */}
          <div>
            <label className="block mb-1 text-sm">Remarks</label>

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
                px-3
                py-2
                outline-none
              "
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 text-sm">Description</label>

            <textarea
              rows="3"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="
                w-full
                border
                border-[#E59C11]
                rounded-md
                px-3
                py-2
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
              py-3
              rounded-lg
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

