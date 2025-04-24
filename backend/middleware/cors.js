// CORS middleware to allow all origins
const corsMiddleware = (req, res, next) => {
  // Allow requests from any origin
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  // Allow specific methods
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
  // Allow specific headers
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
  
  // Allow credentials
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Move to the next middleware
  next();
};

module.exports = corsMiddleware;