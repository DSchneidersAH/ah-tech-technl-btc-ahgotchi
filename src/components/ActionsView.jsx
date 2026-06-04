export default function ActionsView({
  allPropositions,
  customerPropositions,
  receipts,
  customers,
  selectedCustomer,
  onCustomerChange
}) {

  const getCustomerName = (klantnummer) => {
    const customer = customers.find(c => c.klantnummer === klantnummer)
    return customer ? customer.naam : klantnummer
  }

  // Get proposition IDs that the selected customer has
  const customerPropIds = new Set(
    customerPropositions
      .filter(cp => cp.klantnummer === selectedCustomer)
      .map(cp => cp.propositionId)
  )

  // Check if a proposition is owned by the selected customer
  const isPropositionOwned = (propositionId) => {
    return customerPropIds.has(propositionId)
  }

  const filteredReceipts = receipts.filter(r => r.klantnummer === selectedCustomer)

  const filteredCustomers = customers.filter(c => c.klantnummer === selectedCustomer)

  return (
    <div className="actions-view">
      <div className="customer-selector-container">
        <label htmlFor="customer-select" className="customer-selector-label">
          Klant:
        </label>
        <select
          id="customer-select"
          className="customer-selector"
          value={selectedCustomer}
          onChange={(e) => onCustomerChange(e.target.value)}
        >
          {customers.map((customer) => (
            <option key={customer.klantnummer} value={customer.klantnummer}>
              {customer.naam} (#{customer.klantnummer})
            </option>
          ))}
        </select>
      </div>

      <div className="actions-section">
        <h2 className="actions-section-title">Propositions</h2>
        <div className="actions-grid">
          {allPropositions.map((prop) => {
            const isOwned = isPropositionOwned(prop.id)
            return (
              <div
                key={prop.id}
                className={`actions-card ${!isOwned ? 'actions-card--grayed' : ''}`}
              >
                <div className="actions-card-icon">{prop.icon}</div>
                <div className="actions-card-content">
                  <h3 className="actions-card-title">{prop.title}</h3>
                  <p className="actions-card-subtitle">{prop.tagline}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="actions-section">
        <h2 className="actions-section-title">Bonnen</h2>
        <div className="actions-list">
          {filteredReceipts.map((receipt, idx) => (
            <div key={`${receipt.klantnummer}-${idx}`} className="actions-receipt">
              <div className="actions-receipt-header">
                <span className="actions-receipt-customer">{getCustomerName(receipt.klantnummer)}</span>
                <span className="actions-receipt-number">#{receipt.klantnummer}</span>
              </div>
              <div className="actions-receipt-items">
                {receipt.bonregels.map((item, itemIdx) => (
                  <div key={`${item.artikelnummer}-${itemIdx}`} className="actions-receipt-item">
                    <span className="actions-receipt-item-name">{item.kassabonomschrijving}</span>
                    <span className="actions-receipt-item-price">€{item.prijs.toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="actions-receipt-total">
                Totaal: €{receipt.bonregels.reduce((sum, item) => sum + item.prijs, 0).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="actions-section">
        <h2 className="actions-section-title">Klanten</h2>
        <div className="actions-list">
          {filteredCustomers.map((customer) => (
            <div key={customer.klantnummer} className="actions-customer">
              <span className="actions-customer-name">{customer.naam}</span>
              <span className="actions-customer-number">{customer.klantnummer}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
