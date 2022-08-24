import * as React from 'react'
import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography, Tooltip } from '@mui/material'
import DinnerDining from '@mui/icons-material/DinnerDining'
import MenuIcon from '@mui/icons-material/Menu'
import StringResource from '../resources/StringResource'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './AuthProvider'

const pages = [StringResource.General.RecipeManagement, StringResource.General.WeeklySchedule]
const protectedSettings = [StringResource.General.Session]
const settings = [StringResource.General.About]

const AppNavBar = () => {
    const navigate = useNavigate()
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget)
    }
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

    const { loggedIn, handleLogin, handleLogout } = useAuth()

    const openPage = (page: String) => {
        handleCloseNavMenu()
        handleCloseUserMenu()

        switch (page) {
            case StringResource.General.RecipeManagement:
                navigate(StringResource.Routes.RecipeManagement)
                break
            case StringResource.General.WeeklySchedule:
                navigate(StringResource.Routes.WeeklySchedule)
                break
            case StringResource.General.Session:
                navigate(StringResource.Routes.UserSession)
                break
            case StringResource.General.About:
                navigate(StringResource.Routes.About)
                break
            case StringResource.General.Login:
                navigate(StringResource.Routes.Login)
                break
            case StringResource.General.Logout:
                navigate(StringResource.Routes.Logout)
                break
            default:
                break
        }
    }

    return (
        <AppBar position="sticky">
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    {/* Logo and Title:    Medium size and higher */}
                    <DinnerDining sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href={StringResource.Routes.Root}
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.2rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        {StringResource.General.AppTitle}
                    </Typography>

                    {/* Pages:    Medium size and higher */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {loggedIn ? pages.map((page) => (
                            <Button
                                key={page}
                                onClick={() => openPage(page)}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        )) : <></>}
                    </Box>

                    {/* Menu with pages:    Small sizes */}
                    {loggedIn ?
                        (<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={() => openPage(page)}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>) : <></>
                    }

                    {/* Logo and Title:    Small sizes */}
                    <DinnerDining sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href={StringResource.Routes.Root}
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        {StringResource.General.AppTitle}
                    </Typography>

                    {/* User and About:    All sizes */}
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {loggedIn ? protectedSettings.map((setting) => (
                                <MenuItem key={setting} onClick={() => openPage(setting)}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            )) : <></>}
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={() => openPage(setting)}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                            <MenuItem onClick={loggedIn ? handleLogout : handleLogin}>
                                <Typography textAlign="center">{loggedIn ? StringResource.General.Logout : StringResource.General.Login}</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default AppNavBar