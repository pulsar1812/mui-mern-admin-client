import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Box, useMediaQuery } from '@mui/material'

import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import FlexBetween from '../../components/FlexBetween'

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const isNonMobile = useMediaQuery('(min-width: 600px')

  return (
    <Box width='100%' height='100%' display={isNonMobile ? 'flex' : 'block'}>
      <Sidebar
        isNonMobile={isNonMobile}
        drawerWidth='250px'
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box>
        <Navbar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  )
}
