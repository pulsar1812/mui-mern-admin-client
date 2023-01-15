import { useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Rating,
  Typography,
  useTheme,
} from '@mui/material'

export default function Product({
  _id,
  name,
  price,
  description,
  category,
  rating,
  supply,
  stat,
}) {
  const [isExpanded, setIsExpanded] = useState(false)

  const theme = useTheme()

  return (
    <Card
      sx={{
        backgroundImage: 'none',
        backgroundColor: theme.palette.background.alt,
        borderRadius: '8px',
      }}
    >
      <CardContent>
        <Typography
          color={theme.palette.secondary[700]}
          gutterBottom
          sx={{ fontSize: 14 }}
        >
          {category}
        </Typography>
        <Typography variant='h5' component='div'>
          {name}
        </Typography>
        <Typography color={theme.palette.secondary[400]} sx={{ mb: '1.5rem' }}>
          ${price.toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly />
        <Typography variant='body2'>{description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant='primary'
          size='small'
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout='auto'
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          <Typography>ID: {_id}</Typography>
          <Typography>Supply Left: {supply}</Typography>
          <Typography>
            Yearly Sales This Year: {stat.yearlySalesTotal}
          </Typography>
          <Typography>
            Yearly Units Sold This Year: {stat.yearlyTotalSoldUnits}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
}
