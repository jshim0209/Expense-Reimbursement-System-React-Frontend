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
  Menu,
  MenuItem,
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
import ReceiptDialog from "./ReceiptDialog";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontSize: 14,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const ReimbursementTable = () => {
  const reimbursements = useRecoilValue(reimbursementState);
  const user = useRecoilValue(userState);
  const [type, setType] = useRecoilState(typeState);
  const [status, setStatus] = useRecoilState(statusState);
  const [types, setTypes] = useRecoilState(allTypesState);
  const [statuses, setStatuses] = useRecoilState(allStatusesState);
  const [open, setOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorE2, setAnchorE2] = useState(null);
  const openTypeMenu = Boolean(anchorEl);
  const openStatusMenu = Boolean(anchorE2);
  const handleTypeFilter = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const closeTypeMenu = () => {
    setAnchorEl(null);
  };

  const handleStatusFilter = (event) => {
    setAnchorE2(event.currentTarget);
  };
  const closeStatusMenu = () => {
    setAnchorE2(null);
  };

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

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <TableContainer
        style={{
          width: "80vw",
          borderRadius: "5px",
          marginTop: "50px",
          marginBottom: "50px",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Amount</StyledTableCell>
              <StyledTableCell>Submitted</StyledTableCell>
              <StyledTableCell>Resolved</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Receipt</StyledTableCell>
              <StyledTableCell>Author</StyledTableCell>
              <StyledTableCell>Resolver</StyledTableCell>

              <StyledTableCell>
                <Button
                  id="basic-button"
                  aria-controls={openTypeMenu ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={openTypeMenu ? "true" : undefined}
                  onClick={handleTypeFilter}
                >
                  Type
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={openTypeMenu}
                  onClose={closeTypeMenu}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem
                    value={{}}
                    onClick={() => {
                      setType({});
                      closeTypeMenu();
                    }}
                  >
                    All
                  </MenuItem>
                  {types.map((type) => (
                    <MenuItem
                      key={type.id}
                      value={type}
                      onClick={() => {
                        setType(type);
                        closeTypeMenu();
                      }}
                    >
                      {type.type}
                    </MenuItem>
                  ))}
                </Menu>
              </StyledTableCell>

              <StyledTableCell>
                <Button
                  id="basic-button"
                  aria-controls={openStatusMenu ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={openStatusMenu ? "true" : undefined}
                  onClick={handleStatusFilter}
                >
                  Status
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorE2}
                  open={openStatusMenu}
                  onClose={closeStatusMenu}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem
                    value={{}}
                    onClick={() => {
                      setStatus({});
                      closeStatusMenu();
                    }}
                  >
                    All
                  </MenuItem>
                  {statuses.map((status) => (
                    <MenuItem
                      key={status.id}
                      value={status}
                      onClick={() => {
                        setStatus(status);
                        closeStatusMenu();
                      }}
                    >
                      {status.status}
                    </MenuItem>
                  ))}
                </Menu>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reimbursements.map((reimbursement) => (
              <TableRow key={reimbursement.id}>
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
                <StyledTableCell>
                  <Button onClick={openDialog}>View Receipt</Button>
                  <ReceiptDialog
                    open={open}
                    closeDialog={closeDialog}
                    receiptImage={reimbursement.receipt}
                  />
                </StyledTableCell>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

export default ReimbursementTable;
