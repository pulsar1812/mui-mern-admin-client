import SearchIcon from '@mui/icons-material/Search'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
} from '@mui/x-data-grid'

import FlexBetween from './FlexBetween'

export default function DataGridCustomToolbar({
  searchInput,
  setSearchInput,
  setSearch,
}) {
  return (
    <GridToolbarContainer>
      <FlexBetween width='100%'>
        <GridToolbarColumnsButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </FlexBetween>
      <TextField
        variant='standard'
        label='Search...'
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        sx={{ mb: '0.5rem', width: '15rem' }}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                onClick={() => {
                  setSearch(searchInput)
                  setSearchInput('')
                }}
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </GridToolbarContainer>
  )
}
