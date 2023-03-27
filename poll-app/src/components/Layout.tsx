import { Card, AppBar, Button, Container, Toolbar, Typography } from '@mui/material'
import { Outlet } from 'react-router-dom'
import theme from '../theme'

const Layout = () => {
  return (
    <Container maxWidth="xl">
      <Card sx={{ pb: 10, bgcolor: theme.colors.offwhite }}>
        <AppBar position="sticky">
          <Toolbar sx={{ bgcolor: theme.colors.primary }}>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              Polls
            </Typography>
            <Button
              variant="contained"
              sx={{
                bgcolor: theme.colors.secondary,
                '&:hover': {
                  backgroundColor: theme.colors.white,
                  color: theme.colors.primary
                }
              }}
            >
              Add Poll
            </Button>
          </Toolbar>
        </AppBar>
        <Container>
          <Outlet />
        </Container>
      </Card>
    </Container>
  )
}

export default Layout
