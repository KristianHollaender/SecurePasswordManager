export interface CreatePasswordDTO{
  userId: string,
  encryptedName: string;
  encryptedPassword: string;
  note?: string;
}