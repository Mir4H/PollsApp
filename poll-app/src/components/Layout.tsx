import { Card, AppBar, Button, Container, Toolbar, Typography, Alert } from '@mui/material'
import { Outlet } from 'react-router-dom'
import theme from '../theme'
import { useLocation, useNavigate } from 'react-router-dom'
import { Link, useParams } from 'react-router-dom'

const linkStyle = {
  textDecoration: "none",
  color: theme.colors.white,
  flexGrow: 1
}

const Layout = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const success = useParams()
  console.log(location.pathname)

  return (
    <Container maxWidth="xl">
      <Card sx={{ pb: 10, bgcolor: theme.colors.offwhite }}>
        <AppBar position="sticky">
          <Toolbar sx={{ bgcolor: theme.colors.primary }}>
            <Link style={linkStyle} to={'/'}>
            <Typography variant="h4" component="div">
              Polls
            </Typography>
            </Link>
            {location.pathname === '/create' ? null : (
              <Button
                onClick={() => navigate('/create')}
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
            )}
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
