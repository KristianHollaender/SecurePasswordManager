# SecurePasswordManager
## SSD - PBSW project

### Initial drawing of the application structure
![SecuriKey](https://github.com/user-attachments/assets/b55158a8-cd8b-4501-89f4-2ebd416adba1)

### Updated drawing of the application structure


## Setup Guide
- **.NET8** is required for this application.
- **Docker (Desktop)** is required for composing this application.

### Running the application
- Clone the repository
- Go to `../SecuriKey` and do following command
```
docker compose up --build
```
- Go to the assigned localhost frontend port
- Create an account, sign in and happy testing!

## Discussion about security of the application

### Who are the threat actors?
- **Malicious attackers** attempting to access sensitive data (e.g., passwords) stored in the application.
- **Phishing attacks** aimed at stealing user credentials to gain unauthorized access.
- **Weak passwords** chosen by users, leading to vulnerabilities.

### What is the security model (encryption, key handling etc.)
- **Argon2Id** used to securely hash passwords.
- Each password is hashed with a unique salt.
- **Hashed data** only stored in the SQLite database; no plaintext passwords are stored.
- Every HTTP request sent is done using hashed data, decryption only happens on the frontend.
- **Encryption keys** are derived using Argon2Id with a strong salt, increasing resistance to brute-force attacks.

### Pitfalls and limitations in the application
- **Weak user passwords** can still undermine security, even with strong encryption.
- **No two-factor authentication** (2FA) implemented, making it easier for attackers to gain access with stolen credentials.
- **Limited scalability** due to the use of SQLite for data storage (best suited for small to medium applications).

## Screenshots of the application

