export const formatCpf = (value: string): string =>
    value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
        .slice(0, 14);

export const formatPhone = (value: string): string =>
    value
        .replace(/\D/g, '')
        .replace(/^(\d{2})(\d)/, '+$1 $2')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4,5})(\d{4})$/, '$1-$2')
        .slice(0, 20);