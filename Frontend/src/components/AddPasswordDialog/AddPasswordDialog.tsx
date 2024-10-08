import Button from "@mui/material/Button";
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import TextField from "@mui/material/TextField";
import React, {useState} from "react";
import {CryptoService} from "../../services/CryptoService.ts";
import {PasswordService} from "../../services/PasswordService.ts";
import {CreatePasswordDTO} from "../../models/dtos/CreatePasswordDTO.ts";
import {useAtom} from "jotai/index";
import {TokenAtom} from "../../atoms/TokenAtom.tsx";
import {DerivedAtom} from "../../atoms/DerivedKeyAtom.tsx";
import {UserAtom} from "../../atoms/UserAtom.tsx";

interface AddPasswordDialogProps {
  open: boolean,
  onClose: () => void
  onAdd: () => void
}

export const AddPasswordDialog: React.FunctionComponent<AddPasswordDialogProps> = ({open, onClose, onAdd}) => {
  const cryptoService = new CryptoService();
  const passwordService = new PasswordService();
  const [token] = useAtom(TokenAtom);
  const [derivedKey] = useAtom(DerivedAtom);
  const [user] = useAtom(UserAtom);
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [note, setNote] = useState<string>("");

  const handleAddDialog = async () => {
    const cryptoKey = await cryptoService.importDerivedKey(derivedKey!);
    const {ciphertext: nameCipherText} = await cryptoService.encrypt(cryptoKey, name);
    const {ciphertext: passwordCipherText} = await cryptoService.encrypt(cryptoKey, password);

    const dto: CreatePasswordDTO = {
      userId: user!.id,
      encryptedName: nameCipherText,
      encryptedPassword: passwordCipherText,
      note: note
    }

    await passwordService.createPassword(dto, token)

    onAdd();
    onClose();
  }

  return (
      <Dialog open={open} onClose={() => onClose}>
        <DialogTitle>
          Add a new password
        </DialogTitle>
        <DialogContent>
          <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
              onBlur={(e) => setName(e.target.value)}

          />
          <TextField
              autoFocus
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              onBlur={(e) => setPassword(e.target.value)}
          />
          <TextField
              autoFocus
              margin="dense"
              id="note"
              label="Note"
              type="text"
              fullWidth
              onBlur={(e) => setNote(e.target.value)}

          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddDialog} color="primary">
            Add
          </Button>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
  )
}
