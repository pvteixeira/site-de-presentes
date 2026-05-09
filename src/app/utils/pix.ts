// PIX Payload Generator for Static PIX
// Format: EMV QR Code (BR.GOV.BCB.PIX)

export function generatePixPayload(
  pixKey: string,
  merchantName: string,
  merchantCity: string,
  amount?: number,
  txid?: string
) {
  const formatLength = (val: string) => val.length.toString().padStart(2, '0');

  const payloadFormatIndicator = '000201';
  
  const gui = '0014BR.GOV.BCB.PIX';
  const key = `01${formatLength(pixKey)}${pixKey}`;
  const merchantAccountInformation = `26${formatLength(gui + key)}${gui}${key}`;
  
  const merchantCategoryCode = '52040000';
  const transactionCurrency = '5303986';
  
  let transactionAmount = '';
  if (amount && amount > 0) {
    const amountStr = amount.toFixed(2);
    transactionAmount = `54${formatLength(amountStr)}${amountStr}`;
  }
  
  const countryCode = '5802BR';
  const merchantNameFmt = `59${formatLength(merchantName)}${merchantName}`;
  const merchantCityFmt = `60${formatLength(merchantCity)}${merchantCity}`;
  
  const txidStr = txid ? txid : '***';
  const txidFmt = `05${formatLength(txidStr)}${txidStr}`;
  const additionalDataFieldTemplate = `62${formatLength(txidFmt)}${txidFmt}`;
  
  const payload = [
    payloadFormatIndicator,
    merchantAccountInformation,
    merchantCategoryCode,
    transactionCurrency,
    transactionAmount,
    countryCode,
    merchantNameFmt,
    merchantCityFmt,
    additionalDataFieldTemplate,
    '6304' // CRC16 starts here
  ].join('');

  return payload + crc16(payload);
}

function crc16(payload: string) {
  let polinomio = 0x1021;
  let resultado = 0xFFFF;
  
  for (let i = 0; i < payload.length; i++) {
    resultado ^= payload.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if ((resultado & 0x8000) > 0) {
        resultado = (resultado << 1) ^ polinomio;
      } else {
        resultado = (resultado << 1);
      }
    }
    resultado &= 0xFFFF;
  }
  return resultado.toString(16).toUpperCase().padStart(4, '0');
}
