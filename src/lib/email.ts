import nodemailer from 'nodemailer';

export interface SendRsvpEmailParams {
  name: string;
  email: string;
  status: 'confirmed' | 'declined';
  guestCount?: number;
  companionNames?: string;
  notes?: string;
}

export function isEmailConfigured(): boolean {
  return Boolean(
    process.env.RESEND_API_KEY ||
    (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD && process.env.GMAIL_USER.includes('@'))
  );
}

export async function sendRsvpConfirmationEmail({
  name,
  email,
  status,
  guestCount = 1,
  companionNames = '',
  notes = '',
}: SendRsvpEmailParams) {
  if (!isEmailConfigured()) {
    console.warn('[E-MAIL] Nenhum serviço de e-mail configurado (RESEND_API_KEY ou GMAIL_USER/GMAIL_APP_PASSWORD).');
    return { 
      success: false, 
      notConfigured: true, 
      message: 'Serviço de e-mail ainda não configurado.' 
    };
  }

  const firstName = name.split(' ')[0];
  const isConfirmed = status === 'confirmed';

  const googleCalendarUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE' +
    '&text=' + encodeURIComponent('Casamento Aline & Klécio 💍') +
    '&dates=20270109T220000Z/20270110T070000Z' +
    '&details=' + encodeURIComponent('Cerimônia Religiosa às 19h na Igreja do Bom Jesus do Bonfim (Olinda - PE) e Recepção às 21h no Dayse Nogueira Recepções.\n\nSite: https://casamento-aline-klecio.vercel.app') +
    '&location=' + encodeURIComponent('Igreja do Bom Jesus do Bonfim, Olinda - PE');

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Casamento Aline e Klecio//PT',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:casamento-aline-klecio-2027-${Date.now()}@alineeklecio`,
    'DTSTAMP:20260914T200000Z',
    'DTSTART:20270109T220000Z',
    'DTEND:20270110T070000Z',
    'SUMMARY:Casamento Aline & Klécio 💍',
    'DESCRIPTION:Cerimônia Religiosa às 19h na Igreja do Bom Jesus do Bonfim e Recepção às 21h no Dayse Nogueira Recepções.',
    'LOCATION:Igreja do Bom Jesus do Bonfim, Olinda - PE',
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const guestSubject = isConfirmed
    ? `Presença Confirmada! Casamento Aline & Klécio ✨`
    : `Agradecemos por nos responder! Casamento Aline & Klécio ✨`;

  const coupleNotificationSubject = isConfirmed
    ? `🎉 Nova Presença Confirmada: ${name} (${guestCount} ${guestCount > 1 ? 'pessoas' : 'pessoa'})`
    : `ℹ️ Ausência Informada: ${name}`;

  // 1. Template HTML elegante para o Convidado
  const guestHtml = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${guestSubject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f5f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f5f7; padding: 30px 15px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 580px; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;">
          
          <!-- Top Silver Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1e293b 0%, #334155 50%, #1e293b 100%); padding: 36px 24px; text-align: center;">
              <p style="margin: 0 0 6px 0; font-size: 13px; letter-spacing: 3px; text-transform: uppercase; color: #cbd5e1; font-weight: 500;">
                09 de Janeiro de 2027 • Olinda - PE
              </p>
              <h1 style="margin: 0; font-size: 32px; font-weight: 300; letter-spacing: 1px; color: #ffffff; font-family: 'Times New Roman', Georgia, serif;">
                Aline &amp; Klécio
              </h1>
              <div style="margin: 12px auto 0; width: 60px; height: 1px; background: linear-gradient(90deg, transparent, #94a3b8, transparent);"></div>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding: 36px 30px;">
              <h2 style="margin: 0 0 14px 0; font-size: 22px; font-weight: 600; color: #0f172a; font-family: 'Times New Roman', Georgia, serif; text-align: center;">
                ${isConfirmed ? `Presença Confirmada com Sucesso!` : `Agradecemos por nos avisar!`}
              </h2>

              <p style="font-size: 15px; line-height: 1.6; color: #475569; margin: 0 0 24px 0; text-align: center;">
                Olá, <strong>${firstName}</strong>! ${
                  isConfirmed
                    ? 'Recebemos com muita alegria a sua confirmação de presença. Cada detalhe está sendo preparado com muito carinho para celebrarmos juntos!'
                    : 'Agradecemos de coração por nos avisar com antecedência. Sentiremos a sua falta nesse dia especial, mas sabemos que você estará conosco em pensamento!'
                }
              </p>

              <!-- RSVP Summary Box -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; border-radius: 14px; border: 1px solid #e2e8f0; margin-bottom: 28px;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 12px 0; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #64748b;">
                      Resumo da sua resposta
                    </p>
                    
                    <p style="margin: 0 0 8px 0; font-size: 14px; color: #1e293b;">
                      <strong>Nome:</strong> ${name}
                    </p>

                    <p style="margin: 0 0 8px 0; font-size: 14px; color: #1e293b;">
                      <strong>Status:</strong> ${
                        isConfirmed 
                          ? '<span style="color: #059669; font-weight: 600;">Confirmado</span>' 
                          : '<span style="color: #e11d48; font-weight: 600;">Não comparecerá</span>'
                      }
                    </p>

                    ${isConfirmed ? `
                    <p style="margin: 0 0 8px 0; font-size: 14px; color: #1e293b;">
                      <strong>Total de Pessoas:</strong> ${guestCount} ${guestCount > 1 ? 'pessoas' : 'pessoa'}
                    </p>
                    ${companionNames ? `
                    <p style="margin: 0 0 8px 0; font-size: 14px; color: #1e293b;">
                      <strong>Acompanhante(s):</strong> ${companionNames}
                    </p>` : ''}
                    ` : ''}

                    ${notes ? `
                    <p style="margin: 0; font-size: 13px; color: #64748b; font-style: italic;">
                      <strong>Observações/Recado:</strong> "${notes}"
                    </p>` : ''}
                  </td>
                </tr>
              </table>

              ${isConfirmed ? `
              <!-- Event Timeline & Locations -->
              <div style="border-top: 1px solid #f1f5f9; padding-top: 24px; margin-bottom: 24px;">
                <p style="margin: 0 0 16px 0; font-size: 12px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #475569; text-align: center;">
                  Informações do Grande Dia
                </p>

                <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 12px;">
                  <tr>
                    <td style="padding: 12px 16px; background-color: #f8fafc; border-radius: 10px; border-left: 3px solid #94a3b8;">
                      <p style="margin: 0 0 4px 0; font-size: 14px; font-weight: 600; color: #0f172a;">
                        ⛪ Cerimônia Religiosa • 19h
                      </p>
                      <p style="margin: 0; font-size: 13px; color: #64748b;">
                        Igreja do Bom Jesus do Bonfim<br>
                        R. Bonfim/Tv do Bonfim, Carmo, Olinda – PE
                      </p>
                    </td>
                  </tr>
                </table>

                <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="padding: 12px 16px; background-color: #f8fafc; border-radius: 10px; border-left: 3px solid #94a3b8;">
                      <p style="margin: 0 0 4px 0; font-size: 14px; font-weight: 600; color: #0f172a;">
                        🎉 Recepção • 21h
                      </p>
                      <p style="margin: 0; font-size: 13px; color: #64748b;">
                        Dayse Nogueira Recepções<br>
                        Av. Carlos de Lima Cavalcante, 2499 - Casa Caiada, Olinda – PE
                      </p>
                    </td>
                  </tr>
                </table>

                <!-- Google Calendar Button -->
                <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 28px 0 10px 0;">
                  <tr>
                    <td align="center">
                      <a href="${googleCalendarUrl}" target="_blank" style="display: inline-block; padding: 14px 28px; background: linear-gradient(135deg, #0f172a 0%, #334155 100%); color: #ffffff; text-decoration: none; font-size: 13px; font-weight: 600; letter-spacing: 0.5px; border-radius: 12px; box-shadow: 0 4px 14px rgba(15, 23, 42, 0.15);">
                        📅 Adicionar ao Meu Google Agenda
                      </a>
                    </td>
                  </tr>
                </table>
              </div>
              ` : ''}

              <!-- Footer Note -->
              <p style="font-size: 13px; text-align: center; color: #94a3b8; margin: 20px 0 0 0;">
                Qualquer dúvida ou alteração, entre em contato diretamente com os noivos.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 20px 24px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0; font-size: 12px; color: #94a3b8; font-family: 'Times New Roman', Georgia, serif;">
                Com amor e carinho, Aline &amp; Klécio ❤️
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  // 2. Template HTML para notificação aos Noivos (alineeklecio@gmail.com)
  const coupleHtml = `
<!DOCTYPE html>
<html lang="pt-BR">
<body style="font-family: sans-serif; background-color: #f8fafc; padding: 20px; color: #0f172a;">
  <div style="max-width: 500px; margin: 0 auto; background: #ffffff; border-radius: 16px; padding: 24px; border: 1px solid #e2e8f0;">
    <h2 style="color: #0f172a; margin-top: 0; font-size: 20px;">
      ${isConfirmed ? '🎉 Nova Presença Confirmada!' : 'ℹ️ Ausência Informada'}
    </h2>
    <p style="font-size: 14px; color: #475569;">
      Um convidado acabou de responder no site do casamento:
    </p>
    <div style="background: #f1f5f9; border-radius: 12px; padding: 16px; margin: 16px 0; font-size: 14px;">
      <p style="margin: 0 0 6px 0;"><strong>Nome:</strong> ${name}</p>
      <p style="margin: 0 0 6px 0;"><strong>E-mail:</strong> ${email || 'Não informado'}</p>
      <p style="margin: 0 0 6px 0;"><strong>Status:</strong> ${isConfirmed ? 'Confirmado' : 'Não comparecerá'}</p>
      ${isConfirmed ? `<p style="margin: 0 0 6px 0;"><strong>Total de Pessoas:</strong> ${guestCount}</p>` : ''}
      ${companionNames ? `<p style="margin: 0 0 6px 0;"><strong>Acompanhantes:</strong> ${companionNames}</p>` : ''}
      ${notes ? `<p style="margin: 0;"><strong>Recado/Obs:</strong> "${notes}"</p>` : ''}
    </div>
    <p style="font-size: 12px; color: #94a3b8; margin-bottom: 0;">
      Acesse o painel do site para gerenciar todas as confirmações.
    </p>
  </div>
</body>
</html>
  `;

  let guestEmailSent = false;
  let coupleNotificationSent = false;
  let messageId = '';

  // E-mail dos noivos que receberá o aviso de novas confirmações
  const coupleEmail = process.env.GMAIL_USER || 'alineeklecio@gmail.com';

  // PRIORIDADE 1: Gmail SMTP (se configurado, envia para QUALQUER convidado sem bloqueio)
  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER.trim(),
          pass: process.env.GMAIL_APP_PASSWORD.replace(/\s+/g, ''),
        },
      });

      if (email && email.includes('@')) {
        const info = await transporter.sendMail({
          from: `"Aline & Klécio" <${process.env.GMAIL_USER.trim()}>`,
          to: email,
          subject: guestSubject,
          html: guestHtml,
          text: `Olá, ${firstName}!\n\nRecebemos a sua resposta para o Casamento de Aline & Klécio.\nStatus: ${isConfirmed ? 'Presença Confirmada' : 'Não comparecerá'}\nTotal de pessoas: ${guestCount}\n\nCerimônia: Igreja do Bom Jesus do Bonfim às 19h\nRecepção: Dayse Nogueira Recepções às 21h\n\nAdicionar ao Google Agenda: ${googleCalendarUrl}\n\nCom carinho,\nAline & Klécio`,
          icalEvent: isConfirmed ? {
            filename: 'convite-casamento.ics',
            method: 'REQUEST',
            content: icsContent,
          } : undefined,
        });
        guestEmailSent = true;
        messageId = info.messageId;
        console.log('[GMAIL] E-mail de confirmação enviado para o convidado:', email);
      }

      // Notifica os noivos também (se o convidado for diferente do e-mail dos noivos)
      if (email !== coupleEmail) {
        await transporter.sendMail({
          from: `"Site Casamento" <${process.env.GMAIL_USER.trim()}>`,
          to: coupleEmail,
          subject: coupleNotificationSubject,
          html: coupleHtml,
          text: `Nova confirmação recebida:\nNome: ${name}\nStatus: ${isConfirmed ? 'Confirmado' : 'Não comparecerá'}\nPessoas: ${guestCount}\nAcompanhantes: ${companionNames}\nRecado: ${notes}`,
        });
        coupleNotificationSent = true;
      }

      return { success: true, guestEmailSent, coupleNotificationSent, messageId };
    } catch (error: any) {
      console.error('[GMAIL] Erro ao enviar:', error);
    }
  }

  // PRIORIDADE 2: Resend API
  if (process.env.RESEND_API_KEY) {
    try {
      const fromAddress = process.env.RESEND_FROM || 'Aline & Klécio <onboarding@resend.dev>';

      // Tenta enviar para o convidado
      if (email && email.includes('@')) {
        const resGuest = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: fromAddress,
            to: [email],
            reply_to: coupleEmail,
            subject: guestSubject,
            html: guestHtml,
            text: `Olá, ${firstName}!\n\nRecebemos a sua resposta para o Casamento de Aline & Klécio.\nStatus: ${isConfirmed ? 'Presença Confirmada' : 'Não comparecerá'}\nTotal de pessoas: ${guestCount}\n\nCerimônia: Igreja do Bom Jesus do Bonfim às 19h\nRecepção: Dayse Nogueira Recepções às 21h\n\nCom carinho,\nAline & Klécio`,
          }),
        });

        const guestData = await resGuest.json();
        if (resGuest.ok && guestData.id) {
          guestEmailSent = true;
          messageId = guestData.id;
          console.log('[RESEND] E-mail de confirmação enviado para convidado:', email);
        } else {
          console.warn('[RESEND] Convidado externo:', guestData?.message);
        }
      }

      // Envia notificação instantânea para o e-mail dos noivos
      const resCouple = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromAddress,
          to: [coupleEmail],
          subject: coupleNotificationSubject,
          html: coupleHtml,
          text: `Nova confirmação recebida:\nNome: ${name}\nStatus: ${isConfirmed ? 'Confirmado' : 'Não comparecerá'}\nPessoas: ${guestCount}\nAcompanhantes: ${companionNames}\nRecado: ${notes}`,
        }),
      });

      const coupleData = await resCouple.json();
      if (resCouple.ok && coupleData.id) {
        coupleNotificationSent = true;
        console.log('[RESEND] Notificação enviada para os noivos:', coupleEmail);
      }

      return { 
        success: guestEmailSent || coupleNotificationSent, 
        guestEmailSent, 
        coupleNotificationSent, 
        messageId 
      };
    } catch (error: any) {
      console.error('[RESEND] Exceção:', error);
      return { success: false, message: error.message };
    }
  }

  return { success: false, message: 'Nenhum serviço de envio configurado com sucesso.' };
}
