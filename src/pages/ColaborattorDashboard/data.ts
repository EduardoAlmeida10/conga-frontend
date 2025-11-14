import type { Invoice } from "../../entities/Invoice";

export const invoices: Invoice[] = [
  {
    invoice: "1.150 L",
    paymentStatus: "05/10/2025",
    totalAmount: 250.0,
    paymentMethod: "João",
  },
  {
    invoice: "1.060 L",
    paymentStatus: "04/10/2025",
    totalAmount: 250.0,
    paymentMethod: "Pedro",
  },
  {
    invoice: "920 L",
    paymentStatus: "03/10/2025",
    totalAmount: 250.0,
    paymentMethod: "José",
  },
];
