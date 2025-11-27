export const formatCurrency = (value: number) => {
    const numValue = typeof value === "number" && !isNaN(value) ? value : 0;
    return numValue.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
    });
};

export const formatLiters = (value: number) => {
    const numValue = typeof value === "number" && !isNaN(value) ? value : 0;
    return `${numValue.toLocaleString('pt-BR')} L`;
};