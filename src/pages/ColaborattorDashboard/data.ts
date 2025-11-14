import type { Invoice } from "../../entities/Invoice";

export const invoices: Invoice[] = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: 250.0,
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: 150.0,
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: 350.0,
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: 450.0,
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: 550.0,
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: 200.0,
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: 300.0,
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV008",
    paymentStatus: "Unpaid",
    totalAmount: 7600.0,
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV009",
    paymentStatus: "Unpaid",
    totalAmount: 10,
    paymentMethod: "Credit Card",
  },
];
