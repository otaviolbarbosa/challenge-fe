export const currencyFormat = (value = 0, currencySymbol = 'BRL', fractionSize = 2) => {
    let currency = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: currencySymbol,
        maximumFractionDigits: fractionSize,
    });

    return currency.format(value);
}

export const fractionNumber = (value = 0) => {
    return Intl.NumberFormat('pt-BR', { minimumIntegerDigits: 2}).format(value);

}