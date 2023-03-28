import { Card, AppBar, Button, Container, Toolbar, Typography } from '@mui/material'
import { Outlet } from 'react-router-dom'
import theme from '../theme'
import { useLocation, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const linkStyle = {
  textDecoration: 'none',
  color: theme.colors.white,
  flexGrow: 1
}

const Layout = () => {
  const location = useLocation()
  const navigate = useNavigate()
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
