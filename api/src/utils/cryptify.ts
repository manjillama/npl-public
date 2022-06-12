import crypto from 'crypto';
import { StatusCodes } from 'http-status-codes';
import { keys } from '../config';
import { AppError } from './errors';

/**
 * @param  {string} text string to encrypt
 * @returns encrypted string
 */
export const encrypt = (text: string): string => {
  if (!text) throw new AppError('Encryption error, invalid text', StatusCodes.BAD_REQUEST);

  const cipher = crypto.createCipheriv('aes-256-cbc', keys.CRYPTO_SECRET, keys.CRYPTO_IV);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
};
/**
 * @param  {string} encryptedText string to decrypt
 * @returns decrypted string
 */
export const decrypt = (encryptedText: string): string => {
  if (!encryptedText) throw new AppError('Decryption error, invalid text', StatusCodes.BAD_REQUEST);
  let decrypted = '';
  try {
    const decipher = crypto.createDecipheriv('aes-256-cbc', keys.CRYPTO_SECRET, keys.CRYPTO_IV);
    decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
  } catch (error: any) {
    throw new AppError('Bad decrypt', StatusCodes.BAD_REQUEST);
  }
  return decrypted;
};
