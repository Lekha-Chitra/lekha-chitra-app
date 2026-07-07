function InternalTransactionForm({ formData, setFormData, clients, loading,handleSubmit }) {
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
    <form className="space-y-4"
    onSubmit={(e) => {
      e.preventDefault();
      handleSubmit();
    }}>
      {/* From & To */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* From */}

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            From
          </label>

          <select
            name="from"
            value={formData.from}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#032A5C]"
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

        {/* To */}

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            To
          </label>

          <select
            name="to"
            value={formData.to}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#032A5C]"
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
      </div>

      {/* Amount */}

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Amount
        </label>

        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Enter Amount"
          className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#032A5C]"
        />
      </div>

      {/* Payment */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Payment Type */}

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Payment Type
          </label>

          <select
            name="paymentType"
            value={formData.paymentType}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#032A5C]"
          >
            <option value="">Select</option>

            {paymentTypes.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Payment Method */}

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Payment Method
          </label>

          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#032A5C]"
          >
            <option value="">Select</option>

            {paymentMethods.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Remarks */}

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Remarks
        </label>

        <textarea
          rows={4}
          name="remarks"
          value={formData.remarks}
          onChange={handleChange}
          placeholder="Remarks..."
          className="w-full border rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#032A5C]"
        />
      </div>

      {/* Save */}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="bg-[#032A5C] text-white px-6 py-3 rounded-lg hover:bg-[#043a7c] transition hover:bg-[#043a7c]
    disabled:opacity-50
    disabled:cursor-not-allowed"
        >
          {loading ? "Saving..." : "Save Transaction"}
        </button>
      </div>
    </form>
  );
}

export default InternalTransactionForm;
