// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import argon2, {ArgonType} from "argon2-browser/dist/argon2-bundled.min.js";

export class CryptoService {

    // Use a Uint8Array to hardcode the IV (12 bytes / 96 bits is typical for AES-GCM)
     iv = new Uint8Array([0x05, 0x10, 0x0c, 0xca, 0x1c, 0x4d, 0xd9, 0x7d, 0x5f, 0x92, 0x13, 0x2d]);

// Convert the Uint8Array to a hex string
     ivHex = Array.from(this.iv).map(b => b.toString(16).padStart(2, '0')).join('');

// Convert the hex string back to Uint8Array
     ivBytes = Uint8Array.from(this.ivHex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));

    // Generate a random salt and return it as a Base64 string
    generateSalt(length: number = 16): string {
        const salt = new Uint8Array(length);
        window.crypto.getRandomValues(salt);
        return this.uint8ArrayToBase64(salt);
    }

    // Helper function to convert Uint8Array to Base64
    uint8ArrayToBase64(arr: Uint8Array): string {
        return btoa(String.fromCharCode(...Array.from(arr)));
    }

    // Helper function to decode Base64 string back to Uint8Array
    base64ToUint8Array(base64: string): Uint8Array {
        const binaryString = atob(base64);
        return new Uint8Array([...binaryString].map(char => char.charCodeAt(0)));
    }

    async deriveKey(masterPassword: string, saltBase64: string): Promise<Uint8Array> {
        const salt = this.base64ToUint8Array(saltBase64);
        const key = await argon2.hash({
            pass: masterPassword,
            salt: salt,  // Use a secure, unique salt
            time: 3,     // Number of iterations
            mem: 2 ** 16, // Memory cost
            parallelism: 1, // Parallelism
            hashLen: 32, // Length of derived key (32 bytes for AES-256)
            type: ArgonType.Argon2id // Use Argon2id variant
        });

        // Convert the hex-encoded key into Uint8Array
        return this.hexToUint8Array(key.hashHex)
    }

    async encrypt(derivedKey: CryptoKey, plainText: string): Promise<{ ciphertext: string, iv: string }> {

        const encodedPassword = new TextEncoder().encode(plainText);  // Convert the plaintext password to Uint8Array
        const encrypted = await window.crypto.subtle.encrypt(
            {
                name: "AES-GCM",
                iv: this.iv,   // Initialization vector
                tagLength: 128  // Tag length for AES-GCM (16 bytes / 128 bits)
            },
            derivedKey,
            encodedPassword
        );

        // Convert ArrayBuffers to hex strings for storage or transmission
        const ciphertextHex = Array.from(new Uint8Array(encrypted)).map(b => b.toString(16).padStart(2, '0')).join('');

        return { ciphertext: ciphertextHex, iv: this.ivHex };
    }

    async decrypt(derivedKey: CryptoKey, ciphertext: string): Promise<string> {
        const ciphertextBytes = Uint8Array.from(ciphertext.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));

        const decrypted = await window.crypto.subtle.decrypt(
            {
                name: "AES-GCM",
                iv: this.ivBytes,
                tagLength: 128  // Tag length for AES-GCM (16 bytes / 128 bits)
            },
            derivedKey,
            ciphertextBytes
        );

        // Convert decrypted ArrayBuffer back to string
        return new TextDecoder().decode(decrypted);
    }

    async importDerivedKey(keyBytes: Uint8Array): Promise<CryptoKey> {
        return await window.crypto.subtle.importKey(
            "raw",    // The key format is raw bytes
            keyBytes, // The derived key (must be 32 bytes for AES-256)
            { name: "AES-GCM" },
            false,    // Key is not extractable
            ["encrypt", "decrypt"]  // Key usages
        );
    }

    // Helper function to convert hex string to Uint8Array
    hexToUint8Array(hexString: string): Uint8Array {
        const result = new Uint8Array(hexString.length / 2);
        for (let i = 0; i < hexString.length; i += 2) {
            result[i / 2] = parseInt(hexString.substring(i, 2), 16);
        }
        return result;
    }

    generateRandomPassword(): string {
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@!#$%^&*()_+-=[]{}|;:,.<>?";
        const passwordLength = 24;
        let password = "";
        for (let i = 0; i < passwordLength; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        return password;
    }
}
