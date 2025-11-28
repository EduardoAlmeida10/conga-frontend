export interface RecentRecord {
    id: string;
    description: string;
    details: string; 
    route: string; 
    iconBgColor: string;
}

export const RECENT_RECORDS: RecentRecord[] = [
    {
        id: 'produtores_1',
        description: 'Registro Produtores',
        details: 'João – 80 L',
        route: '/producao/produtores',
        iconBgColor: 'text-blue-500',
    },
    {
        id: 'insumos_2',
        description: 'Insumos',
        details: 'Ração Bovinos (10) – R$ 1.500,00',
        route: '/custos/insumos',
        iconBgColor: 'text-blue-500',
    },
    {
        id: 'pessoal_3',
        description: 'Pessoal',
        details: 'Salário Fixo – R$ 3.500,00',
        route: '/custos/pessoal',
        iconBgColor: 'text-blue-500',
    },
    {
        id: 'operacionais_4',
        description: 'Operacionais',
        details: 'Higiene – R$ 120,00',
        route: '/custos/operacionais',
        iconBgColor: 'text-blue-500',
    },
    {
        id: 'utilidades_5',
        description: 'Utilidades',
        details: 'Energia – R$ 220,00',
        route: '/custos/utilidades',
        iconBgColor: 'text-blue-500',
    },
];