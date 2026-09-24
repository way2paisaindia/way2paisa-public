import { createClient } from '@supabase/supabase-js';

const notificationTo = 'way2paisaindia@gmail.com';
const notificationFrom = 'Way2Paisa Enquiries <onboarding@resend.dev>';

function clean(value, max = 500) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function text(value) {
  return value || 'Not provided';
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

    return Response.json({ ok: true });
  } catch (error) {
    console.error('Lead submission failed', error);
    return Response.json({ error: 'We could not submit your request. Please try again or contact us on WhatsApp.' }, { status: 500 });
  }
}
