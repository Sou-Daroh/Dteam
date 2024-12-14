import { Router } from 'express';
import { 
  getGames, 
  getGameById, 
  searchGames, 
  recordPurchase, 
  getFeaturedGames,  // Add this import
  getPurchasedGames, 
  getUserPurchasedGames 
} from '../controllers/gameController';
import { auth } from '../middleware/auth';

const router = Router();

// Define routes - order matters!
router.get('/', getGames);
router.get('/search', searchGames);
router.get('/purchased', auth, getPurchasedGames);
router.get('/purchased/:userId', auth, getUserPurchasedGames);
router.post('/purchase', auth, recordPurchase);
router.get('/featured', getFeaturedGames);  // Add this route before the :id route
router.get('/:id', getGameById);


export default router;