const mongoose = require('mongoose');
require('dotenv').config();
const Project = require('./models/Project');

const projects = [
  {
    title: 'Portfolio Website',
    description: 'A full stack personal portfolio built with the MERN stack. Features a contact form, projects section, and a clean dark UI.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB'],
    githubLink: '',
    liveLink: 'https://yourportfolio.vercel.app'
  },
  {
    title: 'Eldora Skin',
    description: 'A luxury skincare e-commerce platform with product catalog, user authentication, cart system, and an AI-powered skin analyzer using OpenCV.',
    techStack: ['Python', 'Flask', 'PostgreSQL', 'OpenCV'],
    githubLink: '',
    liveLink: 'https://eldoraskin.vercel.app'
  }
]

async function seed() {
  await mongoose.connect(process.env.MONGO_URI)
  console.log('Connected to MongoDB')

  await Project.deleteMany()
  console.log('Cleared existing projects')

  await Project.insertMany(projects)
  console.log('Projects seeded!')

  mongoose.connection.close()
}

seed().catch(console.error)