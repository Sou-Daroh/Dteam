import { Router, Request, Response } from 'express';
import { Order } from '../models/Order';
import { auth } from '../middleware/auth';
import { sendOrderConfirmation } from '../utils/emailService';

const router = Router();

router.post('/', auth, async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'User not authenticated' });
      return;
    }

    // Validate the order data
    const { items, total, paymentMethod, paymentDetails, email } = req.body;
    
    if (!items || !Array.isArray(items) || items.length === 0) {
      res.status(400).json({ message: 'Invalid items array' });
      return;
    }

    const order = new Order({
      userId: req.user.id,
      items: items.map(item => ({
        id: item.id.toString(), // Ensure ID is converted to string
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        imageUrl: item.imageUrl
      })),
      total,
      paymentMethod,
      paymentDetails,
      status: 'pending'
    });

    const savedOrder = await order.save();
    
    // Send order confirmation email
    try {
      await sendOrderConfirmation(email, savedOrder);
    } catch (emailError) {
      console.error('Failed to send order confirmation email:', emailError);
      // Continue with the response even if email fails
    }

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ 
      message: 'Error creating order',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get user's orders
router.get('/my-orders', auth, async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'User not authenticated' });
      return;
    }

    const orders = await Order.find({ userId: req.user.id })
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

export default router;