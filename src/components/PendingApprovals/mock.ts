// src/mocks/pendingApprovalsMocks.ts

export interface ApprovalItem {
  id: string;
  name: string;
  quantity: number;
  date: string; // Ex: "21/10/2025"
  status: 'Pendente';
}

export const MOCK_PENDING_ITEMS: ApprovalItem[] = [
  {
    id: 'a1',
    name: 'João',
    quantity: 200,
    date: '21/10/2025',
    status: 'Pendente',
  },
  {
    id: 'b2',
    name: 'Maria', // Alterado para Maria para simular dados diferentes
    quantity: 350,
    date: '22/10/2025',
    status: 'Pendente',
  },
  {
    id: 'c3',
    name: 'Carlos', // Alterado para Carlos
    quantity: 150,
    date: '23/10/2025',
    status: 'Pendente',
  },
];