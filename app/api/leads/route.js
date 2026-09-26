import { createClient } from '@supabase/supabase-js';

const notificationTo = 'way2paisaindia@gmail.com';
const notificationFrom = 'Way2Paisa Enquiries <onboarding@resend.dev>';
const whatsAppAlertTo = '919820139735';
const msg91WhatsAppNumber = '918850373012';
const msg91WhatsAppTemplate = 'new_way2paisa_booking';

function clean(value, max = 500) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function text(value) {
  return value || 'Not provided';
}

async function sendWhatsAppLeadAlert({ name, phone, email, projectName, appointmentType, appointmentDate, appointmentTime }) {
  // Keep this optional: the booking must still be saved and emailed if WhatsApp
  // is temporarily unavailable or the MSG91 account has no prepaid balance.
  if (!process.env.MSG91_AUTH_KEY) return;

  const preference = appointmentType
    ? `${appointmentType} | ${appointmentDate} | ${appointmentTime}`
    : 'Project enquiry';
  const response = await fetch('https://api.msg91.com/api/v5/whatsapp/whatsapp-outbound-message/', {
    method: 'POST',
    headers: {
      authkey: process.env.MSG91_AUTH_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      integrated_number: process.env.MSG91_WHATSAPP_NUMBER || msg91WhatsAppNumber,
      content_type: 'template',
      payload: {
        // MSG91 validates the recipient at this level. Keep the same number in
        // the template components for the bulk-template API format as well.
        to: [process.env.MSG91_WHATSAPP_ALERT_TO || whatsAppAlertTo],
        messaging_product: 'whatsapp',
        type: 'template',
        template: {
          name: process.env.MSG91_WHATSAPP_TEMPLATE || msg91WhatsAppTemplate,
          language: { code: 'en', policy: 'deterministic' },
          namespace: null,
          to_and_components: [{
            to: [process.env.MSG91_WHATSAPP_ALERT_TO || whatsAppAlertTo],
            components: {
              // MSG91 maps template variables by numbered component keys.
              body_1: { type: 'text', value: name },
              body_2: { type: 'text', value: `${phone}${email ? ` | ${email}` : ''}` },
              body_3: { type: 'text', value: projectName },
              body_4: { type: 'text', value: preference },
            },
          }],
        },
      },
    }),
  });

  const responseBody = await response.text();
  if (!response.ok) {
    console.error('MSG91 WhatsApp lead notification failed', responseBody);
    return;
  }
  console.info('MSG91 WhatsApp lead notification accepted', responseBody);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const name = clean(body.name, 120);
    const phone = clean(body.phone, 40);
    const email = clean(body.email, 160);
    const projectName = clean(body.projectName, 200);
    const landingPage = clean(body.landingPage, 1000);
    const appointmentType = clean(body.appointmentType, 80);
    const appointmentDate = clean(body.appointmentDate, 20);
    const appointmentTime = clean(body.appointmentTime, 20);

    if (!name || !phone || !body.projectId || !projectName) {
      return Response.json({ error: 'Please complete your name and mobile number.' }, { status: 400 });
    }
    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      return Response.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }
    if (appointmentType && (!appointmentDate || !appointmentTime)) {
      return Response.json({ error: 'Please select an appointment date and time.' }, { status: 400 });
    }

    const remarks = appointmentType
      ? `${appointmentType}: ${projectName} on ${appointmentDate} at ${appointmentTime}`
      : `Project enquiry: ${projectName}`;
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    );
    const { error: leadError } = await supabase.from('leads').insert({
      name,
      phone,
      email: email || null,
      project_id: body.projectId,
      source: appointmentType ? 'Website - Appointment' : 'Website - Project Detail',
      campaign: projectName,
      landing_page: landingPage || null,
      remarks,
      appointment_type: appointmentType || null,
      appointment_date: appointmentType ? appointmentDate : null,
      appointment_time: appointmentType ? appointmentTime : null,
    });
    if (leadError) throw leadError;

    const subject = appointmentType
      ? `New ${appointmentType}: ${projectName}`
      : `New project enquiry: ${projectName}`;
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL || notificationFrom,
        to: [process.env.LEADS_NOTIFICATION_EMAIL || notificationTo],
        reply_to: email || undefined,
        subject,
        text: [
          subject,
          '',
          `Name: ${name}`,
          `Mobile: ${phone}`,
          `Email: ${text(email)}`,
          `Project: ${projectName}`,
          `Appointment: ${text(appointmentType)}`,
          `Date: ${text(appointmentDate)}`,
          `Time: ${text(appointmentTime)}`,
          `Page: ${text(landingPage)}`,
        ].join('\n'),
      }),
    });
    if (!emailResponse.ok) {
      const detail = await emailResponse.text();
      console.error('Resend lead notification failed', detail);
      return Response.json({ error: 'Your request was saved, but the team notification could not be sent. Please contact us on WhatsApp.' }, { status: 502 });
    }

    await sendWhatsAppLeadAlert({
      name,
      phone,
      email,
      projectName,
      appointmentType,
      appointmentDate,
      appointmentTime,
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error('Lead submission failed', error);
    return Response.json({ error: 'We could not submit your request. Please try again or contact us on WhatsApp.' }, { status: 500 });
  }
}
