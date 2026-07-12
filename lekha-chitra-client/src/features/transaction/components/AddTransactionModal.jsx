import { useState } from "react";

import TransactionModalHeader from "./TransactionModalHeader";
import InternalTransactionForm from "./InternalTransactionForm";
import ExternalTransactionForm from "./ExternalTransactionForm";

import Notification from "../../../components/common/Notification";

import useTransactionClients from "../hooks/useTransactionsClients";
import useAddTransaction from "../hooks/useAddTransaction";

const initialForm = {
  transactionType: "Internal",
  paymentType: "",
  from: "",
  to: "",
  clientName: "",
  amount: "",
  paymentMethod: "",
  remarks: "",
};

function AddTransactionModal({ open, onClose, onSuccess }) {
  const [formData, setFormData] = useState(initialForm);

  const [notification, setNotification] = useState({
    message: "",
    type: "",
  });

  const { clients, loading: clientLoading } = useTransactionClients();

  const { loading: saveLoading, saveTransaction } = useAddTransaction();

  if (!open) return null;

  const loading = clientLoading || saveLoading;

  const showNotification = (message, type) => {
    setNotification({
      message,
      type,
    });

    setTimeout(() => {
      setNotification({
        message: "",
        type: "",
      });
    }, 3000);
  };

  const resetForm = () => {
    setFormData(initialForm);
  };

  const handleTransactionType = (type) => {
    setFormData({
      ...initialForm,
      transactionType: type,
    });
  };

  const validateForm = () => {
    if (!formData.paymentType) {
      showNotification("Please select payment type.", "error");
      return false;
    }

    if (!formData.paymentMethod) {
      showNotification("Please select payment method.", "error");
      return false;
    }

    if (!formData.amount || Number(formData.amount) <= 0) {
      showNotification("Please enter a valid amount.", "error");
      return false;
    }

    if (formData.transactionType === "Internal") {
      if (!formData.from || !formData.to) {
        showNotification("Please select From and To client.", "error");
        return false;
      }

      if (formData.from === formData.to) {
        showNotification("From and To client cannot be the same.", "error");
        return false;
      }
    }

    if (formData.transactionType === "External" && !formData.clientName) {
      showNotification("Please select client.", "error");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const response = await saveTransaction(formData);

      if (!response.isSuccess) {
        showNotification(response.message, "error");
        return;
      }

      showNotification(response.message, "success");

      resetForm();

      onSuccess?.();

      setTimeout(() => {
        onClose();
      }, 700);
    } catch (error) {
      console.error(error);

      showNotification("Failed to create transaction.", "error");
    }
  };

return (
  <>
    {/* Overlay */}
    <div
      className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px]"
      onClick={onClose}
    />

    {/* Modal */}
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <TransactionModalHeader onClose={onClose} />

        {/* Notification + Transaction Type */}
        <div className="px-5  pb-4">
          <Notification
            message={notification.message}
            type={notification.type}
          />

          <div className="mt-3 flex justify-center">
            <div className="inline-flex w-full sm:w-auto rounded-lg bg-gray-100 p-1">
              <button
                type="button"
                onClick={() => handleTransactionType("Internal")}
                className={`flex-1 sm:flex-none px-5 py-2 rounded-md text-sm font-medium transition-all ${
                  formData.transactionType === "Internal"
                    ? "bg-[#032A5C] text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                Internal
              </button>

              <button
                type="button"
                onClick={() => handleTransactionType("External")}
                className={`flex-1 sm:flex-none px-5 py-2 rounded-md text-sm font-medium transition-all ${
                  formData.transactionType === "External"
                    ? "bg-[#032A5C] text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                External
              </button>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="px-5 pb-5">
          {formData.transactionType === "Internal" ? (
            <InternalTransactionForm
              formData={formData}
              setFormData={setFormData}
              clients={clients}
              loading={loading}
              handleSubmit={handleSubmit}
            />
          ) : (
            <ExternalTransactionForm
              formData={formData}
              setFormData={setFormData}
              clients={clients}
              loading={loading}
              handleSubmit={handleSubmit}
            />
          )}
        </div>
      </div>
    </div>
  </>
);
}

export default AddTransactionModal;
