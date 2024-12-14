import { Request, Response } from 'express';
import Game from '../models/Game';
import { Order } from '../models/Order';
import mongoose from 'mongoose';

// Get all games
export const getGames = async (req: Request, res: Response): Promise<void> => {
  try {
    const games = await Game.find({});
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching games' });
  }
};

// Get single game by ID
export const getGameById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    console.log('Received ID:', id);

    // Check if ID is valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log('Invalid MongoDB ObjectId format');
      res.status(400).json({ message: 'Invalid game ID format' });
      return;
    }

    const game = await Game.findById(id);
    console.log('Found game:', game);

    if (!game) {
      res.status(404).json({ message: 'Game not found' });
      return;
    }

    res.json(game);
  } catch (error) {
    console.error('Error in getGameById:', error);
    res.status(500).json({ message: 'Error fetching game' });
  }
};

// Get all purchased games
export const getPurchasedGames = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await Order.find({});
    res.json(orders);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

// Get user's purchased games
export const getUserPurchasedGames = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ userId });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching purchased games' });
  }
};

// Record a new game purchase
export const recordPurchase = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!validatePurchase(req)) {
      res.status(400).json({ message: 'Invalid purchase data' });
      return;
    }
    const purchase = new Order(req.body);
    const newPurchase = await purchase.save();
    res.status(201).json(newPurchase);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: 'An unknown error occurred' });
    }
  }
};


// Search games
export const searchGames = async (req: Request, res: Response): Promise<void> => {
  try {
    const searchTerm = req.query.q as string;
    
    if (!searchTerm) {
      res.status(400).json({ message: 'Search term is required' });
      return;
    }

    const searchRegex = new RegExp(searchTerm, 'i');
    const games = await Game.find({
      $or: [
        { title: searchRegex },
        { description: searchRegex },
        { genre: searchRegex }
      ]
    });

    res.json(games);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Error searching games' });
  }
};

export const getFeaturedGames = async (req: Request, res: Response): Promise<void> => {
  try {
    const featuredGames = await Game.find({ featured: true });
    res.json(featuredGames);
  } catch (error) {
    console.error('Error in getFeaturedGames:', error);
    res.status(500).json({ message: 'Error fetching featured games' });
  }
};

const validatePurchase = (req: Request) => {
  const { userId, gameId, gameName, purchasePrice } = req.body;
  if (!userId || !gameId || !gameName || !purchasePrice) {
    return false;
  }
  return true;
};