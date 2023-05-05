import styled from "@emotion/styled";
import { TableCell, tableCellClasses } from "@mui/material";
import { Fragment } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontSize: 14,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const EmployeeStatusTableCell = (props) => {
  const { reimbursement } = props;

  return (
    <Fragment>
      {reimbursement.status.status.toLowerCase() === "rejected" ? (
        <StyledTableCell style={{ color: "#f95959" }}>
          {reimbursement.status.status}
        </StyledTableCell>
      ) : reimbursement.status.status.toLowerCase() === "approved" ? (
        <StyledTableCell style={{ color: "#a2c11c" }}>
          {reimbursement.status.status}
        </StyledTableCell>
      ) : (
        <StyledTableCell style={{ color: "#00bbf0" }}>
          {reimbursement.status.status}
        </StyledTableCell>
      )}
    </Fragment>
  );
};

export default EmployeeStatusTableCell;
