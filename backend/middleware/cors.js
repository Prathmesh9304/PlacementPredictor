// CORS middleware to allow all origins
const corsMiddleware = (req, res, next) => {
  // Get the origin from the request
  const origin = req.headers.origin;
  
  // Allow requests from the specific origin or use * as fallback
  res.setHeader("Access-Control-Allow-Origin", origin || "*");

  // Allow specific methods
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Allow specific headers
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
  );

  // Allow credentials
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // Add Content Security Policy header that allows fonts and other resources
  res.setHeader(
    "Content-Security-Policy", 
    "default-src 'self'; font-src 'self' https: data:; img-src 'self' data:; style-src 'self' 'unsafe-inline'; connect-src 'self' *"
  );

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Move to the next middleware
  next();
};

module.exports = corsMiddleware;
