import { Box } from '@mui/material'

import Header from '../../components/Header'
import BreakdownChart from '../../components/BreakdownChart'

export default function Breakdown() {
  return (
    <Box m='1.5rem 2.5rem'>
      <Header title='Breakdown' subtitle='Breakdown of sales by category' />
      <Box height='75vh' mt='2.5rem'>
        <BreakdownChart />
      </Box>
    </Box>
  )
}
