import { useRecoilValue } from "recoil";
import { reimbursementState } from "../GlobalState";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,
} from "@mui/material";
import styled from "@emotion/styled";
import { Fragment } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontSize: 14,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  border: "#DEB992 solid 1px",
}));

const ReimbursementTable = () => {
  const reimbursements = useRecoilValue(reimbursementState);

  return (
    <Fragment>
      <TableContainer
        style={{
          width: "80vw",
          border: "#DEB992 solid 1px",
          borderRadius: "5px",
          marginTop: "50px",
          marginBottom: "50px",
        }}
      >
        <Table>
          <TableHead>
            <TableRow style={{ border: "#DEB992 solid 1px" }}>
              <StyledTableCell>Amount</StyledTableCell>
              <StyledTableCell>Submitted</StyledTableCell>
              <StyledTableCell>Resolved</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Receipt</StyledTableCell>
              <StyledTableCell>Author</StyledTableCell>
              <StyledTableCell>Resolver</StyledTableCell>
              <StyledTableCell>Type</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reimbursements.map((reimbursement) => (
              <StyledTableRow key={reimbursement.name}>
                <StyledTableCell>{reimbursement.amount}</StyledTableCell>
                <StyledTableCell>{reimbursement.timeSubmitted}</StyledTableCell>
                {!reimbursement.timeResolved ? (
                  <StyledTableCell></StyledTableCell>
                ) : (
                  <StyledTableCell>
                    {reimbursement.timeResolved}
                  </StyledTableCell>
                )}

                <StyledTableCell>{reimbursement.description}</StyledTableCell>
                <StyledTableCell>{reimbursement.receipt}</StyledTableCell>
                <StyledTableCell>
                  {reimbursement.author.profile.email}
                </StyledTableCell>
                {!reimbursement.resolver ? (
                  <StyledTableCell></StyledTableCell>
                ) : (
                  <StyledTableCell>
                    {reimbursement.resolver.profile.email}
                  </StyledTableCell>
                )}

                <StyledTableCell>{reimbursement.status.status}</StyledTableCell>
                <StyledTableCell>{reimbursement.type.type}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

export default ReimbursementTable;
