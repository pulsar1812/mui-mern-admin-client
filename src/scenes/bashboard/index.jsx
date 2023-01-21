import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material'
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined'
import EmailIcon from '@mui/icons-material/Email'
import PointOfSaleIcon from '@mui/icons-material/PointOfSale'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import TrafficIcon from '@mui/icons-material/Traffic'
import { DataGrid } from '@mui/x-data-grid'

import Header from '../../components/Header'
import FlexBetween from '../../components/FlexBetween'
import BreakdownChart from '../../components/BreakdownChart'
import OverviewChart from '../../components/OverviewChart'
import StatBox from '../../components/StatBox'
import { useGetDashboardQuery } from '../../state/api'

export default function Dashboard() {
  const { data, isLoading } = useGetDashboardQuery()

  const isNonMediumScreens = useMediaQuery('(min-width: 1200px)')
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
      headerName: 'CreatedAt',
      flex: 1,
    },
    {
      field: 'products',
      headerName: '# of Products',
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
      <FlexBetween>
        <Header title='Dashboard' subtitle='Welcome to your dashboard' />
        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: '0.9rem',
              fontWeight: 'bold',
              p: '0.6rem 1.2rem',
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: '0.6rem' }} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>

      {/* A 12-column grid */}
      <Box
        display='grid'
        gridTemplateColumns='repeat(12, 1fr)'
        gridAutoRows='160px'
        gap='1.25rem'
        mt='1.25rem'
        sx={{
          '& > div': { gridColumn: isNonMediumScreens ? undefined : 'span 12' },
        }}
      >
        {/* Row 1 */}
        <StatBox
          title='Total Customers'
          value={data && data.totalCustomers}
          increase='+12%'
          icon={
            <EmailIcon
              sx={{ color: theme.palette.secondary[300], fontSize: '1.5rem' }}
            />
          }
          description='Since last month'
        />
        <StatBox
          title='Sales Today'
          value={data && data.currentDayStat.totalSales}
          increase='+20%'
          icon={
            <PointOfSaleIcon
              sx={{ color: theme.palette.secondary[300], fontSize: '1.5rem' }}
            />
          }
          description='Since last month'
        />
        <Box
          gridColumn='span 8'
          gridRow='span 2'
          backgroundColor={theme.palette.background.alt}
          p='1rem'
          borderRadius='0.5rem'
        >
          <OverviewChart isDashboard view='sales' />
        </Box>
        <StatBox
          title='Monthly Sales'
          value={data && data.currentMonthStat.totalSales}
          increase='+6%'
          icon={
            <PersonAddIcon
              sx={{ color: theme.palette.secondary[300], fontSize: '1.5rem' }}
            />
          }
          description='Since last month'
        />
        <StatBox
          title='Yearly Sales'
          value={data && data.yearlySalesTotal}
          increase='+26%'
          icon={
            <TrafficIcon
              sx={{ color: theme.palette.secondary[300], fontSize: '1.5rem' }}
            />
          }
          description='Since last month'
        />

        {/* Row 2 */}
        <Box
          gridColumn='span 8'
          gridRow='span 3'
          sx={{
            '& .MuiDataGrid-root': {
              border: 'none',
              borderRadius: '5rem',
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
              backgroundColor: theme.palette.background.alt,
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
            rows={(data && data.transactions) || []}
            columns={columns}
            getRowId={(row) => row._id}
          />
        </Box>

        <Box
          gridColumn='span 4'
          gridRow='span 3'
          backgroundColor={theme.palette.background.alt}
          p='1rem'
          borderRadius='0.5rem'
        >
          <Typography variant='h6' sx={{ color: theme.palette.secondary[100] }}>
            Sales by Category
          </Typography>
          <BreakdownChart isDashboard />
          <Typography
            fontSize='0.8rem'
            p='0 0.6rem'
            sx={{ color: theme.palette.secondary[200] }}
          >
            Breakdown of real states and information via category for revenue
            made for this year and total sales.
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
