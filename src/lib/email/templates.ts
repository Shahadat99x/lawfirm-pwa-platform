export const appointmentRequested = (fullName: string, date: string, time: string) => `
<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
  <h2>Appointment Request Received</h2>
  <p>Dear ${fullName},</p>
  <p>We have received your request for a consultation on <strong>${date} at ${time}</strong>.</p>
  <p>Our team will review your request and confirm shortly.</p>
  <p>Best regards,<br>LexNova Legal Team</p>
</div>
`

export const appointmentApproved = (fullName: string, date: string, time: string) => `
<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
  <h2 style="color: #2e7d32;">Appointment Confirmed</h2>
  <p>Dear ${fullName},</p>
  <p>We are pleased to confirm your appointment:</p>
  <ul>
    <li><strong>Date:</strong> ${date}</li>
    <li><strong>Time:</strong> ${time}</li>
  </ul>
  <p>We look forward to meeting you.</p>
  <p>Best regards,<br>LexNova Legal Team</p>
</div>
`

export const appointmentRejected = (fullName: string, reason?: string) => `
<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
  <h2>Update on Your Appointment Request</h2>
  <p>Dear ${fullName},</p>
  <p>Unfortunately, we are unable to confirm your appointment request at this time.</p>
  ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ''}
  <p>Please visit our website to book an alternative slot or contact us directly.</p>
  <p>Best regards,<br>LexNova Legal Team</p>
</div>
`

export const adminNewAppointmentNotification = (fullName: string, email: string, date: string, time: string, practiceArea: string) => `
<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
  <h2>New Appointment Request</h2>
  <p>A new appointment has been requested:</p>
  <ul>
    <li><strong>Name:</strong> ${fullName}</li>
    <li><strong>Email:</strong> ${email}</li>
    <li><strong>Date:</strong> ${date}</li>
    <li><strong>Time:</strong> ${time}</li>
    <li><strong>Practice Area:</strong> ${practiceArea}</li>
  </ul>
  <p><a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/appointments">Login to Admin Dashboard to review</a></p>
</div>
`
