import styled from "@emotion/styled";
import { Button, TableCell, tableCellClasses } from "@mui/material";
import { Fragment } from "react";

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

  return (
    <Fragment>
      {reimbursement.status.status.toLowerCase() === "rejected" ? (
        <StyledTableCell>
          <Button style={{ color: "#f95959" }}>
            {reimbursement.status.status}
          </Button>
        </StyledTableCell>
      ) : reimbursement.status.status.toLowerCase() === "approved" ? (
        <StyledTableCell>
          <Button style={{ color: "#a2c11c" }}>
            {reimbursement.status.status}
          </Button>
        </StyledTableCell>
      ) : (
        <StyledTableCell>
          <Button style={{ color: "#00bbf0" }}>
            {reimbursement.status.status}
          </Button>
        </StyledTableCell>
      )}
    </Fragment>
  );
};

export default ManagerStatusTableCell;
