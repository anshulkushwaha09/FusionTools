import nodemailer from 'nodemailer';

export const handler = async (event, context) => {
  // Only trigger on form submission events
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const payload = JSON.parse(event.body);
    // Netlify form payload structure
    const { email, user_type } = payload.payload.data;

    // Check if we have credentials
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Missing email credentials in environment variables.");
      return { statusCode: 500, body: "Server configuration error" };
    }

    // Configure Nodemailer for Gmail
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // Email Content
    const mailOptions = {
        from: `"Fusion Tools AI" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Welcome to Fusion Tools AI! 🚀",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #00f3ff; background: #0a0f1a; padding: 15px; border-radius: 8px; text-align: center;">Welcome to the Inner Circle!</h2>
                
                <p>Hi there,</p>
                <p>Thanks for joining <strong>Fusion Tools AI</strong>! We're thrilled to have you on board.</p>
                
                <p>As promised, here is your welcome bonus:</p>
                
                <div style="background: #f4f4f4; padding: 15px; border-left: 4px solid #bc13fe; margin: 20px 0;">
                    <h3>🎁 <strong>Premium AI Prompt Pack</strong></h3>
                    <p>Unlock the full potential of AI with our curated collection of high-performance prompts.</p>
                    <a href="https://fusiontools.ai/bonuses/prompt-pack-v1.pdf" style="display: inline-block; padding: 10px 20px; background: #bc13fe; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Download Now</a>
                </div>
                
                <p><strong>What to expect next?</strong></p>
                <ul>
                    <li>🔔 Alerts for new free AI tools.</li>
                    <li>💡 Tips to boost your productivity.</li>
                    <li>🚀 Early access to beta features.</li>
                </ul>
                
                <p>Cheers,<br>The Fusion Tools Team</p>
                
                <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
                <p style="font-size: 12px; color: #888; text-align: center;">
                    You are receiving this email because you signed up on Fusion Tools AI.<br>
                    <a href="#" style="color: #888;">Unsubscribe</a>
                </p>
            </div>
        `
    };

    // Send Mail
    await transporter.sendMail(mailOptions);
    console.log(`Welcome email sent to ${email}`);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully" })
    };

  } catch (error) {
    console.error("Error sending email:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to send email" })
    };
  }
};
