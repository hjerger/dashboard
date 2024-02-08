import React, { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import Collapse from "@mui/material/Collapse"
import IconButton from "@mui/material/IconButton"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import { ParentSize } from "@visx/responsive"
import axios from "axios"

const createData = (data: any) => {
  return {
    key: data.id,
    description: data.description,
    groupingType: data.grouping_type,
    severity: data.severity,
    status: data.status,
    owner: data.owner,
    created: data.grouped_finding_created,
    workflow: data.workflow,
    groupingKey: data.grouping_key,
    progress: data.progress,
    sla: data.sla,
    analyst: data.security_analyst,
  }
}

type RowPros = {
  row: ReturnType<typeof createData>
}

const Row = ({ row }: RowPros) => {
  const [open, setOpen] = useState(false)
  const [raw, setRaw] = useState<any[]>([])

  const loadRawFindings = (data: any[]) => {
    const rawFindings: any[] = data.map((d) => {
      return {
        key: d.id,
        securityTool: d.source_security_tool_name,
        collaborationTool: d.source_collaboration_tool_name,
        severity: d.severity,
        status: d.status,
        created: d.finding_created,
        asset: d.asset,
        remediationUrl: d.remediation_url,
        remediationText: d.remediation_text,
      }
    })
    setRaw(rawFindings)
  }

  useEffect(() => {
    if (open) {
      axios
        .get(`http://localhost:3030/findings/rawByGroup/${row.key}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((response) => {
          loadRawFindings(response.data)
        })
        .catch((error) => {
          console.log(error)
          setRaw([])
        })
    }
  }, [open, row.key])

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell width="10">
          <div style={{ marginRight: 0 }}>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </div>
        </TableCell>
        <TableCell align="center" component="th" scope="row">
          {row.groupingType}
        </TableCell>
        <TableCell align="center">{row.severity}</TableCell>
        <TableCell align="center">{row.status}</TableCell>
        <TableCell align="center">{row.owner}</TableCell>
        <TableCell align="center">{row.created}</TableCell>
        <TableCell align="left">{row.workflow}</TableCell>
        <TableCell align="center">{row.progress}</TableCell>
        <TableCell align="center">{row.sla}</TableCell>
        <TableCell align="center">{row.analyst}</TableCell>
        <TableCell align="left">{row.groupingKey}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={11}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1, minWidth: 2200, backgroundColor: "#36393E" }}>
              <Typography variant="subtitle2" gutterBottom component="div">
                Raw Findings
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ width: 150 }}>Security Tool</TableCell>
                    <TableCell sx={{ width: 150 }}>
                      Collaboration Tool
                    </TableCell>
                    <TableCell>Severity</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell sx={{ width: 220 }}>Created</TableCell>
                    <TableCell>Asset</TableCell>
                    <TableCell>Remediation Url</TableCell>
                    <TableCell>Remediation Text</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {raw.map((findingsRow: any) => (
                    <TableRow key={findingsRow.key}>
                      <TableCell component="th" scope="row">
                        {findingsRow.securityTool}
                      </TableCell>
                      <TableCell>{findingsRow.collaborationTool}</TableCell>
                      <TableCell>{findingsRow.severity}</TableCell>
                      <TableCell>{findingsRow.status}</TableCell>
                      <TableCell>{findingsRow.created}</TableCell>
                      <TableCell>{findingsRow.asset}</TableCell>
                      <TableCell>{findingsRow.remediationUrl}</TableCell>
                      <TableCell>{findingsRow.remediationText}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

const CollapsibleTable = () => {
  const [rows, setRows] = useState<any[]>([])

  useEffect(() => {
    axios
      .get("http://localhost:3030/findings/grouped", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        loadRows(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const loadRows = (data: any[]) => {
    const newRows: any[] = data.map((d) => {
      return createData(d)
    })
    setRows(newRows)
  }

  return (
    <ParentSize>
      {(parent) => (
        <Paper sx={{ width: parent.width + 16, overflow: "hidden" }}>
          {/* <TableContainer component={Paper}> */}
          <TableContainer
            sx={{
              maxHeight: parent.height,
              "&::-webkit-scrollbar": {
                width: 8,
                height: 10,
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "#464646",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#131313",
              },
            }}
          >
            <Table
              aria-label="grouping table"
              size="small"
              stickyHeader
              sx={{ minWidth: 2200 }}
            >
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell align="center">Grouping Type</TableCell>
                  <TableCell align="center">Severity</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Owner</TableCell>
                  <TableCell align="center">Created</TableCell>
                  <TableCell sx={{ width: 220 }} align="center">
                    Workflow
                  </TableCell>
                  <TableCell align="center">Progress</TableCell>
                  <TableCell align="center">Sla</TableCell>
                  <TableCell align="center">Analyst</TableCell>
                  <TableCell align="center">Grouping Key</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row: any) => (
                  <Row key={row.key} row={row} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </ParentSize>
  )
}

export default CollapsibleTable
