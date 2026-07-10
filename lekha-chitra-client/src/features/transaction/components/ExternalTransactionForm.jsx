function ExternalTransactionForm({
  formData,
  setFormData,
  clients,
  loading,
  handleSubmit,
}) {
  const paymentTypes = ["Credit", "Debit", "Transfer"];

  const paymentMethods = ["Cash", "Online", "Loan"];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form
      className="space-y-1.5"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      {/* Client */}

      <div>
        <label className="block mb-0.5 text-xs font-medium text-gray-700">
          Client
        </label>

        <select
          name="clientName"
          value={formData.clientName}
          onChange={handleChange}
          disabled={loading}
          className="w-full
border
border-[#E59C11]
rounded-md
px-2.5
py-1
text-sm
outline-none
focus:ring-1
focus:ring-[#032A5C]
"
        >
          <option value="">Select Client</option>

          {!loading &&
            clients.map((client) => (
              <option key={client.name} value={client.name}>
                {client.name}
              </option>
            ))}
        </select>
      </div>

      {/* Amount */}

      <div>
        <label className="block mb-0.5 text-xs font-medium text-gray-700">
          Amount
        </label>

        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Enter Amount"
          className="w-full border border-[#E59C11] rounded-md px-2.5 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#032A5C]"
        />
      </div>

      {/* Payment */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Payment Type */}

        <div>
          <label className="block mb-0.5 text-xs font-medium text-gray-700">
            Payment Type
          </label>

          <select
            name="paymentType"
            value={formData.paymentType}
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
focus:ring-1
focus:ring-[#032A5C]
"
          >
            <option value="">Select</option>

            {paymentTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Payment Method */}

        <div>
          <label className="block mb-0.5 text-xs font-medium text-gray-700">
            Payment Method
          </label>

          <select
            name="paymentMethod"
            value={formData.paymentMethod}
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
focus:ring-1
focus:ring-[#032A5C]
"
          >
            <option value="">Select</option>

            {paymentMethods.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Remarks */}

      <div>
        <label className="block mb-0.5 text-xs font-medium text-gray-700">
          Remarks
        </label>

        <textarea
          rows={2}
          name="remarks"
          value={formData.remarks}
          onChange={handleChange}
          placeholder="Remarks..."
          className="w-full
border
border-[#E59C11]
rounded-md
px-2.5
py-1
text-sm
outline-none
focus:ring-1
focus:ring-[#032A5C]
"
        />
      </div>

      {/* Save */}

      <div className="flex justify-end">
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
          {loading ? "Saving..." : "Save Transaction"}
        </button>
      </div>
    </form>
  );
}

export default ExternalTransactionForm;
