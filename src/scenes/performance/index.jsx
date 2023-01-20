import { useSelector } from 'react-redux'
import { Box, useTheme } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

import { useGetUserPerformanceQuery } from '../../state/api'
import Header from '../../components/Header'
import DataGridCustomColumnMenu from '../../components/DataGridCustomColumnMenu'

export default function Performance() {
  const userId = useSelector((state) => state.global.userId)
  const { data, isLoading } = useGetUserPerformanceQuery(userId)

  const theme = useTheme()

  const columns = [
    {
      field: '_id',
      headerName: 'ID',
      flex: 1,
    },
    {
      field: 'userId',
      headerName: 'User ID',
      flex: 1,
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      flex: 1,
    },
    {
      field: 'products',
      headerName: 'No. of Products',
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: 'cost',
      headerName: 'Cost',
      flex: 1,
      renderCell: (params) => `${params.value.toFixed(2)}`,
    },
  ]

  return (
    <Box m='1.5rem 2.5rem'>
      <Header
        title='Performance'
        subtitle='Track your Affiliate Sales Performance'
      />
      <Box
        height='75vh'
        mt='2.5rem'
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: theme.palette.primary.light,
          },
          '& .MuiDataGrid-footerContainer': {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: 'none',
          },
          '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          rows={(data && data.sales) || []}
          columns={columns}
          getRowId={(row) => row._id}
          components={{
            ColumnMenu: DataGridCustomColumnMenu,
          }}
        />
      </Box>
    </Box>
  )
}
