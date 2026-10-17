/**
 * Comprime imagens no navegador do cliente antes de enviar ao servidor.
 * Reduz fotos pesadas de celulares (5MB - 15MB) para ~35KB - 60KB mantendo texto 100% legível e nítido.
 */
export async function compressReceiptImage(file: File, maxDimension = 900, quality = 0.65): Promise<string> {
  // Se for PDF
  if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
    if (file.size > 1.5 * 1024 * 1024) {
      throw new Error(
        'O comprovante em PDF é muito pesado (acima de 1.5MB). Por favor, tire um print (captura de tela) do comprovante no aplicativo do banco e anexe a imagem.'
      );
    }
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Erro ao ler arquivo PDF do comprovante.'));
      reader.readAsDataURL(file);
    });
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const rawDataUrl = event.target?.result as string;
      const img = new Image();

      img.onload = () => {
        try {
          let { width, height } = img;

          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            } else {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(rawDataUrl);
            return;
          }

          // Fundo branco para garantir legibilidade em JPEGs caso haja transparência
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);

          let compressedDataUrl = canvas.toDataURL('image/jpeg', quality);

          // Se ainda ficou acima de 500KB (muito raro para 900px JPEG), recomprime com qualidade 0.5
          if (compressedDataUrl.length > 500 * 1024) {
            compressedDataUrl = canvas.toDataURL('image/jpeg', 0.5);
          }

          resolve(compressedDataUrl);
        } catch (err) {
          console.error('Erro na compressão via canvas:', err);
          if (rawDataUrl.length > 1024 * 1024) {
            reject(new Error('A imagem é muito pesada para envio. Por favor, tire um print (screenshot) do comprovante e tente novamente.'));
          } else {
            resolve(rawDataUrl);
          }
        }
      };

      img.onerror = () => {
        // Geralmente ocorre com arquivos HEIC do iPhone em navegadores que não suportam HEIC
        if (file.size > 1.2 * 1024 * 1024) {
          reject(new Error('O formato da foto (HEIC) é muito pesado para processar. Por favor, tire um print (captura de tela) do comprovante e anexe a captura.'));
        } else {
          resolve(rawDataUrl);
        }
      };

      img.src = rawDataUrl;
    };

    reader.onerror = () => {
      reject(new Error('Erro ao ler o arquivo selecionado. Tente novamente.'));
    };

    reader.readAsDataURL(file);
  });
}

