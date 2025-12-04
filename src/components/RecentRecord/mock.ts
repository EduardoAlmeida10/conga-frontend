export interface RecentRecord {
    id: string;
    description: string;
    details: string;
    expenseType?: string;
    route: string; 
    iconBgColor: string;
}

export const RECENT_RECORDS: RecentRecord[] = [
    {
        id: 'produtores_1',
        description: 'Registro Produtores',
        details: 'João – 80 L',
        route: '/producao',
        iconBgColor: 'text-blue-500',
    },
    {
        id: 'insumos_2',
        description: 'Insumos',
        details: 'Ração Bovinos (10) – R$ 1.500,00',
        route: '/despesas',
        iconBgColor: 'text-blue-500',
    },
    {
        id: 'pessoal_3',
        description: 'Pessoal',
        details: 'Salário Fixo – R$ 3.500,00',
        route: '/despesas',
        iconBgColor: 'text-blue-500',
    },
    {
        id: 'operacionais_4',
        description: 'Operacionais',
        details: 'Higiene – R$ 120,00',
        route: '/despesas',
        iconBgColor: 'text-blue-500',
    },
    {
        id: 'utilidades_5',
        description: 'Utilitario',
        details: 'Energia – R$ 220,00',
        route: '/despesas',
        iconBgColor: 'text-blue-500',
    },
];