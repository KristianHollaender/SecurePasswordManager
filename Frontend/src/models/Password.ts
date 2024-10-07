export interface Password {
    Id: string;
    EncryptedName: string;
    EncryptedPassword: string;
    CreatedAt: Date;
    UpdatedAt: Date;
    Note: string;
    UserId: string;
}
