// PIX Payload Generator & Constants for Static PIX
// Format: EMV QR Code (BR.GOV.BCB.PIX)

export const OFFICIAL_PIX_KEY = 'alineteixeirabs@gmail.com';
export const OFFICIAL_PIX_PAYLOAD = '00020126960014br.gov.bcb.pix0125alineteixeirabs@gmail.com0245Lista_de_Presentes_-_Casamento_Aline_e_Klecio5204000053039865802BR5925ALINE_TEIXEIRA_BRUNO_SILV6006OLINDA62240520CasamentoAlineeKlcio6304040C';
export const BENEFICIARY_NAME = 'Aline Teixeira Bruno Silva';
export const BENEFICIARY_CITY = 'Olinda';

export function generatePixPayload(
  pixKey: string = OFFICIAL_PIX_KEY,
  merchantName: string = 'ALINE_TEIXEIRA_BRUNO_SILV',
  merchantCity: string = 'OLINDA',
  amount?: number,
  txid: string = 'CasamentoAlineeKlcio'
) {
  const formatLength = (val: string) => val.length.toString().padStart(2, '0');

  const payloadFormatIndicator = '000201';
  
  const gui = '0014br.gov.bcb.pix';
  const key = `01${formatLength(pixKey)}${pixKey}`;
  const desc = '0245Lista_de_Presentes_-_Casamento_Aline_e_Klecio';
  const merchantAccountInformation = `26${formatLength(gui + key + desc)}${gui}${key}${desc}`;
  
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
  
  const txidStr = txid ? txid : 'CasamentoAlineeKlcio';
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
