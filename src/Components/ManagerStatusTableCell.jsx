import styled from "@emotion/styled";
import { Button, TableCell, tableCellClasses } from "@mui/material";
import { Fragment, useState } from "react";
import UpdateReimbStatus from "./UpdateReimbStatus";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontSize: 14,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const ManagerStatusTableCell = (props) => {
  const { reimbursement } = props;
  const [open, setOpen] = useState(false);

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      {reimbursement.status.status.toLowerCase() === "rejected" ? (
        <StyledTableCell>
          <Button style={{ color: "#f95959" }} onClick={openDialog}>
            {reimbursement.status.status}
          </Button>
        </StyledTableCell>
      ) : reimbursement.status.status.toLowerCase() === "approved" ? (
        <StyledTableCell>
          <Button style={{ color: "#a2c11c" }} onClick={openDialog}>
            {reimbursement.status.status}
          </Button>
        </StyledTableCell>
      ) : (
        <StyledTableCell>
          <Button style={{ color: "#00bbf0" }} onClick={openDialog}>
            {reimbursement.status.status}
          </Button>
          <UpdateReimbStatus
            open={open}
            closeDialog={closeDialog}
            reimbursement={reimbursement}
          />
        </StyledTableCell>
      )}
    </Fragment>
  );
};

export default ManagerStatusTableCell;
