import mongoose from 'mongoose';
import Game, { IGame } from '../models/Game';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '../../.env') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined in environment variables');
  process.exit(1);
}

// Featured games
const sampleGames = [
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Cyberpunk 2077",
    description: "An open-world action-adventure RPG set in Night City, a megalopolis obsessed with power, glamour and body modification.",
    price: 29.99,
    originalPrice: 59.99,
    discount: 50,
    imageUrl: "/assets/game-images/cyberpunk2077.jpg",
    genres: ["Action", "RPG", "Open World", "Adventure"],
    rating: 4.5,
    featured: true,
    features: ["singleplayer", "controller", "cloud"],
    releaseDate: new Date("2020-12-10"),
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Elden Ring",
    description: "An action RPG developed by FromSoftware Inc. and BANDAI NAMCO Entertainment Inc., featuring a vast and seamless world.",
    price: 59.99,
    imageUrl: "/assets/game-images/eldenring.jpg",
    genres: ["Action", "RPG", "Open World", "Fantasy"],
    rating: 4.8,
    featured: true,
    features: ["singleplayer", "controller", "cloud"],
    releaseDate: new Date("2022-02-25")
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Red Dead Redemption 2",
    description: "An epic tale of life in America's unforgiving heartland. The game's vast and atmospheric world also provides the foundation for a brand new online multiplayer experience.",
    price: 39.99,
    originalPrice: 59.99,
    discount: 33,
    imageUrl: "/assets/game-images/rdr2.jpg",
    genres: ["Action", "Adventure", "Open World", "Western"],
    rating: 4.9,
    featured: true,
    features: ["multiplayer", "singleplayer", "controller"],
    releaseDate: new Date("2018-10-26")
  }
]

// Additional non-featured games
const additionalGames = [
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Baldur's Gate 3",
    description: "An epic RPG set in the Forgotten Realms. Choose from a wide range of D&D races and classes, or play as an origin character with a hand-crafted background.",
    price: 59.99,
    imageUrl: "/assets/game-images/baldursgate3.jpg",
    genres: ["RPG", "Fantasy", "Strategy", "Adventure"],
    rating: 4.9,
    features: ["singleplayer", "controller", "cloud"],
    releaseDate: new Date("2023-08-03")
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Diablo IV",
    description: "Join the eternal struggle between the High Heavens and the Burning Hells in this dark fantasy action RPG.",
    price: 69.99,
    imageUrl: "/assets/game-images/diablo4.jpg",
    genres: ["Action RPG", "Fantasy", "Horror", "Adventure"],
    rating: 4.5,
    features: ["singleplayer", "controller", "cloud"],
    releaseDate: new Date("2023-06-06")
  },    
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Final Fantasy XVI",
    description: "Embark on an epic dark fantasy adventure in the realm of Valisthea, where Eikons are powerful creatures that reside within Dominants.",
    price: 69.99,
    imageUrl: "/assets/game-images/ff16.jpg",
    genres: ["Action", "RPG", "Fantasy", "Adventure"],
    rating: 4.7,
    features: ["singleplayer", "controller", "cloud"],
    releaseDate: new Date("2023-06-06")
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "God of War Ragnarok",
    description: "Join Kratos and Atreus on a mythic journey for answers in this epic action-adventure through Norse mythology.",
    price: 49.99,
    imageUrl: "/assets/game-images/godofwar.jpg",
    genres: ["Action", "Adventure", "Fantasy", "Story Rich"],
    rating: 4.9,
    features: ["singleplayer", "controller", "cloud"],
    releaseDate: new Date("2022-11-09")
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Hades",
    description: "Defy the god of the dead as you hack and slash out of the Underworld in this rogue-like dungeon crawler.",
    price: 24.99,
    imageUrl: "/assets/game-images/hades.jpg",
    genres: ["Action", "Roguelike", "Indie", "RPG"],
    rating: 4.8,
    features: ["singleplayer", "controller", "cloud"],
    releaseDate: new Date("2020-09-17")
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Hollow Knight",
    description: "Forge your own path in this atmospheric Metroidvania through a vast ruined kingdom of insects and heroes.",
    price: 14.99,
    imageUrl: "/assets/game-images/hollowknight.jpg",
    genres: ["Metroidvania", "Indie", "Action", "Platformer"],
    rating: 4.9,
    features: ["singleplayer", "controller", "cloud"],
    releaseDate: new Date("2017-02-25")
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Resident Evil 4 Remake",
    description: "Survival horror at its finest as you fight to save the President's daughter in this reimagining of the 2005 classic.",
    price: 59.99,
    imageUrl: "/assets/game-images/re4remake.jpg",
    genres: ["Horror", "Action", "Survival Horror", "Adventure"],
    rating: 4.8,
    features: ["singleplayer", "controller", "cloud"],
    releaseDate: new Date("2023-03-24")
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Stardew Valley",
    description: "Build the farm of your dreams and create your own life in this charming farming simulation RPG.",
    price: 14.99,
    imageUrl: "/assets/game-images/stardewvalley.jpg",
    genres: ["Simulation", "RPG", "Indie", "Farming Sim"],
    rating: 4.9,
    features: ["singleplayer", "controller", "cloud"],
    releaseDate: new Date("2016-02-27")
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Stray",
    description: "Lost, alone and separated from family, a stray cat must untangle an ancient mystery to escape a long-forgotten cybercity.",
    price: 29.99,
    imageUrl: "/assets/game-images/stray.jpg",
    genres: ["Adventure", "Indie", "Puzzle", "Casual"],
    rating: 4.7,
    features: ["singleplayer", "controller", "cloud"],
    releaseDate: new Date("2022-07-19")
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "The Witcher 3: Wild Hunt",
    description: "Embark on an epic journey in a war-ravaged world in this action-RPG masterpiece. Track down the child of prophecy in a dark fantasy realm.",
    price: 39.99,
    imageUrl: "/assets/game-images/witcher3.jpg",
    genres: ["RPG", "Open World", "Fantasy", "Action"],
    rating: 4.9,
    features: ["singleplayer", "controller", "cloud"],
    releaseDate: new Date("2015-05-19")
  }
] as Partial<IGame>[];

const seedGames = async () => {
    try {
      console.log('Connecting to MongoDB at:', MONGODB_URI);
      await mongoose.connect(MONGODB_URI);
      console.log('Connected to MongoDB successfully');
      
      // Clear existing games
      await Game.deleteMany({});
      
      // Insert both featured and additional games
      const allGames = [...sampleGames, ...additionalGames];
      const insertedGames = await Game.insertMany(allGames);
      
      console.log(`${insertedGames.length} games seeded successfully.`);
      console.log('Game IDs:', insertedGames.map(game => (game as any)._id.toString()));
      
      await mongoose.connection.close();
      process.exit(0);
    } catch (error) {
      console.error('Error seeding games:', error);
      process.exit(1);
    }
  };

seedGames();