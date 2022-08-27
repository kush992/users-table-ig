import { useState, useEffect } from "react";
import { keyBy } from 'lodash';

import { fetchAccounts, fetchAccountTypes } from "../utility/utility";

import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const UsersTable = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [order, setOrder] = useState("asce");

  const sorting = (column) => {
    if (order === "asce") {
      const sorted = [...data].sort((a, b) => (a[column] > b[column] ? 1 : -1));
      setData(sorted);
      setOrder("desc");
    }
    if (order === "desc") {
      const sorted = [...data].sort((a, b) => (a[column] < b[column] ? 1 : -1));
      setData(sorted);
      setOrder("asce");
    }
  };

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const account = await fetchAccounts();
        const accountType = await fetchAccountTypes();

        const accountResponse = keyBy(account, 'accountType');
        const accountTypeResponse = keyBy(accountType, 'id');
        const combinedDataSet = Object.keys(accountResponse).reduce((acc, key) => {
          acc.push({
            ...accountResponse[key],
            ...accountTypeResponse[key]
          });
          return acc;
        }, []);
        setData(combinedDataSet);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAll();
  }, []);

  return (
    <div className="App">
      {loading && <p>Hold tight, getting you there....</p>}
      {!loading && (
        <TableContainer component={Paper} className="table__container">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  onClick={() => sorting(data.name)}
                  className="table__header pointer"
                >
                  Name (Sortable)
                </TableCell>
                <TableCell
                  onClick={() => sorting(data.profitLoss)}
                  className="table__header pointer"
                >
                  Profit and Loss(Sortable)
                </TableCell>
                <TableCell className="table__header">Account Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((data) => (
                <TableRow key={data.id}>
                  <TableCell>{data.name}</TableCell>
                  <TableCell>
                    {data.currency}
                    {data.profitLoss}
                  </TableCell>
                  <TableCell>{data.title}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default UsersTable;
