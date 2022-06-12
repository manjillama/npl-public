export const keys = {
  APP_VERSION: process.env.APP_VERSION,
  CORS_WHITELISTS: new RegExp(process.env.CORS_WHITELISTS),
  LOGS: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
  MONGO_URI: process.env.NODE_ENV === 'test' ? process.env.MONGO_URI_TEST : process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  CRYPTO_SECRET: process.env.CRYPTO_SECRET,
  CRYPTO_IV: process.env.CRYPTO_IV,
};
