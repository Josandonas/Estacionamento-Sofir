export const isValidCpf = (cpf: string): boolean => {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let sum = 0;
    let rest;

    for (let i = 1; i <= 9; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    rest = (sum * 10) % 11;
    rest = rest === 10 || rest === 11 ? 0 : rest;

    if (rest !== parseInt(cpf.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    rest = (sum * 10) % 11;
    rest = rest === 10 || rest === 11 ? 0 : rest;

    return rest === parseInt(cpf.substring(10, 11));
};

export const isValidPhone = (phone: string): boolean => {
    const regex = /^\+\d{1,3}\s\(\d{1,3}\)\s\d{4,5}-\d{4}$/;
    return regex.test(phone);
};

/**
 * Valida uma placa brasileira no formato antigo (ABC-1234)
 * ou no formato Mercosul (ABC1D23).
 *
 * @param placa - A placa a ser validada.
 * @returns True se a placa for válida, False caso contrário.
 */

export const validarPlacaBrasileira = (placa: string): boolean => {
    const regexAntiga = /^[A-Z]{3}-\d{4}$/; // Ex: ABC-1234
    const regexMercosul = /^[A-Z]{3}\d[A-Z]\d{2}$/; // Ex: ABC1D23
    return regexAntiga.test(placa) || regexMercosul.test(placa);
};