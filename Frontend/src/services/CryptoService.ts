import argon2 from "argon2-browser/dist/argon2-bundled.min.js";
import * as crypto from "crypto";
import {ArgonType} from "argon2-browser/dist/argon2-bundled.min.js";

export class CryptoService {
    // Derive key using Argon2id
    static async deriveKey(
        password: string,
        salt: Uint8Array,
        iterations: number = 3, // Argon2id default iterations (adjust for your security needs)
        memory: number = 65536, // Argon2id memory cost
        parallelism: number = 1, // Argon2id parallelism
        hashLength: number = 32 // Derived key length in bytes (256 bits)
    ): Promise<CryptoKey> {
        // Derive a key using Argon2id
        const result = await argon2.hash({
            pass: password, // Password provided by the user
            salt: salt, // The salt for key derivation
            time: iterations, // Number of iterations
            mem: memory, // Memory cost
            parallelism: parallelism, // Parallelism
            hashLen: hashLength, // Length of derived key
            type: ArgonType.Argon2id // Use Argon2id variant
        });

        const derivedKeyBytes = result.hash; // This will be the derived key

        // Import the derived key for AES-GCM encryption and decryption
        return await window.crypto.subtle.importKey(
            'raw',
            derivedKeyBytes,
            { name: 'AES-GCM' },
            false,
            ['encrypt', 'decrypt']
        );
    }

    // Encryption with AES-GCM
    static async encryptData(
        data: string,
        key: CryptoKey
    ): Promise<{ encryptedData: ArrayBuffer; iv: Uint8Array }> {
        const iv = window.crypto.getRandomValues(new Uint8Array(12)); // Generate a random IV
        const encryptedData = await window.crypto.subtle.encrypt(
            {
                name: 'AES-GCM',
                iv: iv
            },
            key,
            new TextEncoder().encode(data) // Convert data to ArrayBuffer
        );

        return { encryptedData, iv }; // Return both encrypted data and IV
    }

    // Decryption with AES-GCM
    static async decryptData(
        encryptedData: ArrayBuffer,
        key: CryptoKey,
        iv: Uint8Array
    ): Promise<string> {
        const decryptedData = await window.crypto.subtle.decrypt(
            {
                name: 'AES-GCM',
                iv: iv
            },
            key,
            encryptedData
        );

        return new TextDecoder().decode(decryptedData); // Convert ArrayBuffer back to string
    }

    // Generate a random salt
    generateSalt(length: number = 16): Uint8Array {
        const salt = new Uint8Array(length);
        window.crypto.getRandomValues(salt); // Populate salt with random values
        return salt;
    }

    async deriveKey(masterPassword: string, salt: Uint8Array): Promise<Uint8Array> {
        const key = await argon2.hash({
            pass: masterPassword,
            salt:  salt,  // Use a secure, unique salt
            time: 3, // Number of iterations
            mem: 2 ** 16, // Memory cost
            parallelism: 1, // Parallelism
            hashLen: 32, // Length of derived key
            type: ArgonType.Argon2id // Use Argon2id variant
        });

        return key.hash;  // Derived key (in hex or base64)
    }

    encryptPassword(derivedKey: Buffer, plainPassword: string): { ciphertext: string, iv: string } {
        const iv = window.crypto.getRandomValues(new Uint8Array(12)).buffer;  // AES-GCM uses a 12-byte IV
        const cipher = crypto.createCipheriv('aes-256-gcm', derivedKey, iv);

        const encrypted = Buffer.concat([cipher.update(plainPassword, 'utf8'), cipher.final()]);
        const authTag = cipher.getAuthTag();  // Get the authentication tag for integrity verification

        return {
            ciphertext: Buffer.concat([encrypted, authTag]).toString('hex'),
            iv: iv['hex']
        };
    }

    decryptPassword(derivedKey: Buffer, ciphertext: string, iv: string): string {
        const data = Buffer.from(ciphertext, 'hex');
        const ivBuffer = Buffer.from(iv, 'hex');
        const authTag = data.subarray(-16);  // AES-GCM uses a 16-byte auth tag
        const encryptedText = data.subarray(0, -16);

        const decipher = crypto.createDecipheriv('aes-256-gcm', derivedKey, ivBuffer);
        decipher.setAuthTag(authTag);  // Set the authentication tag for integrity verification

        const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
        return decrypted.toString('utf8');
    }
}
