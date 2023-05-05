import { useRecoilState, useRecoilValue } from "recoil";
import {
  allStatusesState,
  allTypesState,
  reimbursementState,
  statusState,
  typeState,
  userState,
} from "../GlobalState";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,
} from "@mui/material";
import styled from "@emotion/styled";
import { Fragment, useEffect, useState } from "react";
import { getTypes } from "../Services/type";
import { getStatuses } from "../Services/status";
import ManagerStatusTableCell from "./ManagerStatusTableCell";
import EmployeeStatusTableCell from "./EmployeeStatusTableCell";

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
  const user = useRecoilValue(userState);
  const [type, setType] = useRecoilState(typeState);
  const [status, setStatus] = useRecoilState(statusState);
  const [types, setTypes] = useRecoilState(allTypesState);
  const [statuses, setStatuses] = useRecoilState(allStatusesState);

  useEffect(() => {
    const getAllTypes = async () => {
      const data = await getTypes();
      setTypes(data);
    };
    getAllTypes();

    const getAllStatuses = async () => {
      const data = await getStatuses();
      setStatuses(data);
    };
    getAllStatuses();
  }, []);

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
              <StyledTableCell>
                <FormControl fullWidth>
                  <InputLabel id="type-select-label">Type</InputLabel>
                  <Select
                    labelId="type-select-label"
                    id="type-select"
                    value={type}
                    label="Type"
                    onChange={(e) => {
                      setType(e.target.value);
                    }}
                  >
                    {types.map((type) => (
                      <MenuItem key={type.id} value={type.type}>
                        {type.type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </StyledTableCell>
              <StyledTableCell>
                <FormControl fullWidth>
                  <InputLabel id="status-select-label">Status</InputLabel>
                  <Select
                    labelId="status-select-label"
                    id="status-select"
                    value={status}
                    label="Status"
                    onChange={(e) => {
                      setStatus(e.target.value);
                    }}
                  >
                    {statuses.map((status) => (
                      <MenuItem key={status.id} value={status.status}>
                        {status.status}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reimbursements.map((reimbursement) => (
              <StyledTableRow key={reimbursement.id}>
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

                <StyledTableCell>{reimbursement.type.type}</StyledTableCell>
                {!user.manager ? (
                  <EmployeeStatusTableCell reimbursement={reimbursement} />
                ) : (
                  <ManagerStatusTableCell reimbursement={reimbursement} />
                )}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

export default ReimbursementTable;
