import cors from 'cors';

const corsOptions = {
  origin: 'https://dig-master.vercel.app/', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

export default cors(corsOptions);