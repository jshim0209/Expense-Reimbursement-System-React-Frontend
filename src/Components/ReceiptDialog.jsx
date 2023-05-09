import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const ReceiptDialog = (props) => {
  const { open, closeDialog, receiptImage } = props;

  const closeModal = () => {
    console.log(receiptImage);
    closeDialog();
  };

  return (
    <Dialog open={open} onClose={closeDialog}>
      <DialogTitle>Receipt Image</DialogTitle>
      <DialogContent>
        <img src={receiptImage} alt="receipt" />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>X</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReceiptDialog;
