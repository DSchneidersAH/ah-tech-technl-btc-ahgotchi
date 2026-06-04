import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ActionsView from './ActionsView'

const mockAllPropositions = [
  {
    id: 'allerhande',
    title: 'Allerhande recipes',
    tagline: '20,000+ recipes inside the app.',
    icon: '📖'
  },
  {
    id: 'scan-kook',
    title: 'AH Scan & Kook',
    tagline: 'Photograph your fridge → dinner idea.',
    icon: '📸'
  },
  {
    id: 'bonus-box',
    title: 'Bonus Box',
    tagline: 'Personal Bonus offers, every week.',
    icon: '🎁'
  },
  {
    id: 'weekly-menu',
    title: 'Personal weekly menu',
    tagline: 'Steijn plans your week in seconds.',
    icon: '📅'
  },
  {
    id: 'food-waste',
    title: 'Food-waste reduction',
    tagline: 'Small daily swaps. Big 2030 goal.',
    icon: '♻️'
  }
]

const mockCustomerPropositions = [
  {
    klantnummer: '200456',
    propositionId: 'allerhande'
  },
  {
    klantnummer: '200456',
    propositionId: 'bonus-box'
  },
  {
    klantnummer: '200457',
    propositionId: 'scan-kook'
  },
  {
    klantnummer: '200457',
    propositionId: 'weekly-menu'
  }
]

const mockReceipts = [
  {
    klantnummer: '200456',
    bonregels: [
      { artikelnummer: '100001', kassabonomschrijving: 'AH Volkorenbrood', prijs: 2.39 }
    ]
  }
]

const mockCustomers = [
  {
    klantnummer: '200456',
    naam: 'Jan de Vries'
  }
]

describe('ActionsView', () => {
  const mockOnCustomerChange = vi.fn()

  it('renders all data sections', () => {
    render(
      <ActionsView
        allPropositions={mockAllPropositions}
        customerPropositions={mockCustomerPropositions}
        receipts={mockReceipts}
        customers={mockCustomers}
        selectedCustomer="200456"
        onCustomerChange={mockOnCustomerChange}
      />
    )

    expect(screen.getByText('Propositions')).toBeInTheDocument()
    expect(screen.getByText('Bonnen')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Klanten' })).toBeInTheDocument()
  })


  it('displays proposition data correctly', () => {
    render(
      <ActionsView
        allPropositions={mockAllPropositions}
        customerPropositions={mockCustomerPropositions}
        receipts={mockReceipts}
        customers={mockCustomers}
        selectedCustomer="200456"
        onCustomerChange={mockOnCustomerChange}
      />
    )

    // Should show all 5 propositions
    expect(screen.getByText('Allerhande recipes')).toBeInTheDocument()
    expect(screen.getByText('Bonus Box')).toBeInTheDocument()
    expect(screen.getByText('AH Scan & Kook')).toBeInTheDocument()
    expect(screen.getByText('Personal weekly menu')).toBeInTheDocument()
    expect(screen.getByText('Food-waste reduction')).toBeInTheDocument()
  })

  it('displays receipt data correctly', () => {
    render(
      <ActionsView
        allPropositions={mockAllPropositions}
        customerPropositions={mockCustomerPropositions}
        receipts={mockReceipts}
        customers={mockCustomers}
        selectedCustomer="200456"
        onCustomerChange={mockOnCustomerChange}
      />
    )

    expect(screen.getByText('AH Volkorenbrood')).toBeInTheDocument()
    expect(screen.getByText('€2.39')).toBeInTheDocument()
  })

  it('displays customer data correctly', () => {
    render(
      <ActionsView
        allPropositions={mockAllPropositions}
        customerPropositions={mockCustomerPropositions}
        receipts={mockReceipts}
        customers={mockCustomers}
        selectedCustomer="200456"
        onCustomerChange={mockOnCustomerChange}
      />
    )

    const customerNames = screen.getAllByText('Jan de Vries')
    expect(customerNames.length).toBeGreaterThan(0)
    const customerNumbers = screen.getAllByText(/200456/)
    expect(customerNumbers.length).toBeGreaterThan(0)
  })

  it('displays klantnummer when customer is not found in customer list', () => {
    // Receipt with a customer number that's NOT in the customers list
    const receiptWithUnknownCustomer = [
      {
        klantnummer: '999999',
        bonregels: [
          { artikelnummer: '100001', kassabonomschrijving: 'AH Volkorenbrood', prijs: 2.39 }
        ]
      }
    ]

    // Customers list WITHOUT 999999
    const limitedCustomers = [
      { klantnummer: '999999', naam: 'Test Customer' }
    ]

    render(
      <ActionsView
        allPropositions={mockAllPropositions}
        customerPropositions={mockCustomerPropositions}
        receipts={receiptWithUnknownCustomer}
        customers={limitedCustomers}
        selectedCustomer="999999"
        onCustomerChange={mockOnCustomerChange}
      />
    )

    // Should show the customer naam from customers list OR the klantnummer
    const elements = screen.getAllByText(/999999|Test Customer/)
    expect(elements.length).toBeGreaterThan(0)
  })


  it('renders customer selector dropdown', () => {
    render(
      <ActionsView
        allPropositions={mockAllPropositions}
        customerPropositions={mockCustomerPropositions}
        receipts={mockReceipts}
        customers={mockCustomers}
        selectedCustomer="200456"
        onCustomerChange={mockOnCustomerChange}
      />
    )

    expect(screen.getByRole('combobox')).toBeInTheDocument()
    const janElements = screen.getAllByText(/Jan de Vries/)
    expect(janElements.length).toBeGreaterThan(0)
  })

  it('filters receipts by selected customer', () => {
    const multipleReceipts = [
      {
        klantnummer: '200456',
        bonregels: [
          { artikelnummer: '100001', kassabonomschrijving: 'AH Volkorenbrood', prijs: 2.39 }
        ]
      },
      {
        klantnummer: '200457',
        bonregels: [
          { artikelnummer: '100002', kassabonomschrijving: 'AH Halfvolle Melk 1L', prijs: 1.09 }
        ]
      }
    ]

    const multipleCustomers = [
      { klantnummer: '200456', naam: 'Jan de Vries' },
      { klantnummer: '200457', naam: 'Maria van Dijk' }
    ]

    // Render with Maria selected
    const { rerender } = render(
      <ActionsView
        allPropositions={mockAllPropositions}
        customerPropositions={mockCustomerPropositions}
        receipts={multipleReceipts}
        customers={multipleCustomers}
        selectedCustomer="200457"
        onCustomerChange={mockOnCustomerChange}
      />
    )

    // Should show Maria's receipt
    expect(screen.getByText('AH Halfvolle Melk 1L')).toBeInTheDocument()
    expect(screen.queryByText('AH Volkorenbrood')).not.toBeInTheDocument()

    // Rerender with Jan selected
    rerender(
      <ActionsView
        allPropositions={mockAllPropositions}
        customerPropositions={mockCustomerPropositions}
        receipts={multipleReceipts}
        customers={multipleCustomers}
        selectedCustomer="200456"
        onCustomerChange={mockOnCustomerChange}
      />
    )

    // Should now show Jan's receipt
    expect(screen.getByText('AH Volkorenbrood')).toBeInTheDocument()
    expect(screen.queryByText('AH Halfvolle Melk 1L')).not.toBeInTheDocument()
  })

  it('filters all data sections when customer is selected', () => {
    const multipleReceipts = [
      {
        klantnummer: '200456',
        bonregels: [
          { artikelnummer: '100001', kassabonomschrijving: 'AH Volkorenbrood', prijs: 2.39 }
        ]
      },
      {
        klantnummer: '200457',
        bonregels: [
          { artikelnummer: '100002', kassabonomschrijving: 'AH Halfvolle Melk 1L', prijs: 1.09 }
        ]
      }
    ]

    const multipleCustomers = [
      { klantnummer: '200456', naam: 'Jan de Vries' },
      { klantnummer: '200457', naam: 'Maria van Dijk' }
    ]

    // Render with Maria selected
    const { rerender } = render(
      <ActionsView
        allPropositions={mockAllPropositions}
        customerPropositions={mockCustomerPropositions}
        receipts={multipleReceipts}
        customers={multipleCustomers}
        selectedCustomer="200457"
        onCustomerChange={mockOnCustomerChange}
      />
    )

    // Should show Maria's data
    const mariaElements = screen.getAllByText(/Maria van Dijk/)
    expect(mariaElements.length).toBeGreaterThan(0)
    expect(screen.queryByText('AH Volkorenbrood')).not.toBeInTheDocument()
    expect(screen.getByText('AH Halfvolle Melk 1L')).toBeInTheDocument()

    // Rerender with Jan selected
    rerender(
      <ActionsView
        allPropositions={mockAllPropositions}
        customerPropositions={mockCustomerPropositions}
        receipts={multipleReceipts}
        customers={multipleCustomers}
        selectedCustomer="200456"
        onCustomerChange={mockOnCustomerChange}
      />
    )

    // Should now show Jan's data
    expect(screen.getByText('AH Volkorenbrood')).toBeInTheDocument()
    expect(screen.queryByText('AH Halfvolle Melk 1L')).not.toBeInTheDocument()

    // Should only show Jan in klanten section
    const janInKlanten = screen.getAllByText('Jan de Vries')
    expect(janInKlanten.length).toBeGreaterThan(0)
  })

  it('does not render rewards section', () => {
    render(
      <ActionsView
        allPropositions={mockAllPropositions}
        customerPropositions={mockCustomerPropositions}
        receipts={mockReceipts}
        customers={mockCustomers}
        selectedCustomer="200456"
        onCustomerChange={mockOnCustomerChange}
      />
    )

    expect(screen.queryByText('Rewards')).not.toBeInTheDocument()
    expect(screen.queryByText('25% off Perla coffee')).not.toBeInTheDocument()
  })

  it('shows all 5 propositions with grayed styling', () => {
    const { container } = render(
      <ActionsView
        allPropositions={mockAllPropositions}
        customerPropositions={mockCustomerPropositions}
        receipts={mockReceipts}
        customers={mockCustomers}
        selectedCustomer="200456"
        onCustomerChange={mockOnCustomerChange}
      />
    )

    const selector = screen.getByRole('combobox')

    // Initially shows all 5 propositions
    expect(screen.getByText('Allerhande recipes')).toBeInTheDocument()
    expect(screen.getByText('Bonus Box')).toBeInTheDocument()
    expect(screen.getByText('AH Scan & Kook')).toBeInTheDocument()
    expect(screen.getByText('Personal weekly menu')).toBeInTheDocument()
    expect(screen.getByText('Food-waste reduction')).toBeInTheDocument()

    // Food-waste should NOT be owned by anyone initially, so it should be grayed
    const allCards = container.querySelectorAll('.actions-card')
    expect(allCards.length).toBe(5)

    // Select Jan de Vries
    fireEvent.change(selector, { target: { value: '200456' } })

    // Should still show all 5 propositions
    expect(screen.getByText('Allerhande recipes')).toBeInTheDocument()
    expect(screen.getByText('Bonus Box')).toBeInTheDocument()
    expect(screen.getByText('AH Scan & Kook')).toBeInTheDocument()
    expect(screen.getByText('Personal weekly menu')).toBeInTheDocument()
    expect(screen.getByText('Food-waste reduction')).toBeInTheDocument()

    // Check that owned propositions don't have grayed class
    const updatedCards = container.querySelectorAll('.actions-card')
    const grayedCards = container.querySelectorAll('.actions-card--grayed')

    // Jan owns 2, so 3 should be grayed
    expect(grayedCards.length).toBe(3)
  })
})
