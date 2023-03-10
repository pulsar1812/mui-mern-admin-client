import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Box, useMediaQuery } from '@mui/material'

import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import { useGetUserQuery } from '../../state/api'

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const userId = useSelector((state) => state.global.userId)
  const { data } = useGetUserQuery(userId)

  const isNonMobile = useMediaQuery('(min-width: 600px')

  return (
    <Box width='100%' height='100%' display={isNonMobile ? 'flex' : 'block'}>
      <Sidebar
        user={data || {}}
        isNonMobile={isNonMobile}
        drawerWidth='250px'
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flexGrow={1}>
        <Navbar
          user={data || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  )
}
