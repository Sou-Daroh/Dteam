import mongoose, { Document } from 'mongoose';

export interface IGame extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  genres: string[];
  rating: number;
  features: string[];
  releaseDate: Date;
  featured?: boolean;
  discount?: number;
  originalPrice?: number;
}

const gameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  genres: {
    type: [String],
    required: true,
    default: []
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  featured: {
    type: Boolean,
    default: false
  },
  originalPrice: {
    type: Number
  },
  discount: {
    type: Number
  },
  features: {
    type: [String],
    default: []
  },
  releaseDate: {
    type: Date,
    required: true
  },
});

export const Game = mongoose.model<IGame>('Game', gameSchema);
export default Game;