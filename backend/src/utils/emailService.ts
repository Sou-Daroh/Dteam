import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS 
  }
});

export const sendOrderConfirmation = async (to: string, orderDetails: any) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: to,
      subject: 'Order Confirmation - Dteam',
      html: `
        <h1>Thank you for your purchase!</h1>
        <h2>Order Details:</h2>
        <p>Order ID: ${orderDetails._id}</p>
        <p>Total Amount: $${orderDetails.total}</p>
        <div>
          <h3>Purchased Items:</h3>
          ${orderDetails.items.map((item: any) => `
            <div>
              <p>Game: ${item.title}</p>
              <p>Price: $${item.price}</p>
            </div>
          `).join('')}
        </div>
        <p>Thank you for shopping with Dteam!</p>
      `
    });
    console.log('Order confirmation email sent');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

export const sendWelcomeEmail = async (to: string, username: string) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: to,
      subject: 'Welcome to Dteam!',
      html: `
        <h1>Welcome to Dteam, ${username}!</h1>
        <p>Thank you for joining our gaming community.</p>
        <p>Start exploring our collection of games and enjoy your gaming journey!</p>
        <p>Best regards,</p>
        <p>Dteam</p>
      `
    });
    console.log('Welcome email sent');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};