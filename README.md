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
- If the database is compromised, the attackers cannot access the users passwords, because of the encryption. 
- **Encryption keys** are derived using Argon2Id with a strong salt, increasing resistance to brute-force attacks.

### Pitfalls and limitations in the application
- **Weak user passwords** can still undermine security, even with strong encryption.
- **No two-factor authentication** (2FA) implemented, making it easier for attackers to gain access with stolen credentials.
- **Limited scalability** due to the use of SQLite for data storage.

### Plan for how a user can access their credentials across devices
For a user to be able to access their credentials across devices, the following changes would need to be made:
- Deploy both the backend and the frontend.
- Find a secure place to host the SQL-database.

## Screenshots of the application

### Sign-In
![image](https://github.com/user-attachments/assets/b7aa1be3-7e0c-4db7-8760-85591f574c91)

### Home
![image](https://github.com/user-attachments/assets/82bcc302-b560-45b4-876f-8f1e532ef17d)

### Add Password Dialog
![image](https://github.com/user-attachments/assets/24a30dc1-6eca-41ef-8a50-41ca7a7ea99c)

### Creating Password
![image](https://github.com/user-attachments/assets/acb47be7-f211-4a99-9d5b-1d5da6a655a1)


