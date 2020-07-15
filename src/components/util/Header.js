import React from 'react'
import {withRouter} from "react-router-dom"
import {fade} from '@material-ui/core/styles'
import {withStyles} from '@material-ui/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import SearchIcon from '@material-ui/icons/Search'
import AccountCircle from '@material-ui/icons/AccountCircle'
import UserService from "../../services/UserService"
import NavigationTabs from "./NavigationTabs"
import jardinLogo from '../../images/jardin_logo.png'

const styles = (theme) => ({
    root: {
        width:'100%'
    },
    logo: {
        height: '100%',
        width: 120
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
        flexGrow: 1,
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    appBar: {
        backgroundColor: '#2b6343'
    },
    icon:{
        '&:hover': {
            border:'1.5px solid black'
        }
    },
    menu:{
        top:'50px'
    }

})

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: UserService.isAuthenticated() ? UserService.getCurrentUser() : undefined,
            anchorEl: null,
        }
        this.menuId = 'primary-search-account-menu'
        this.handleProfileMenuOpen = this.handleProfileMenuOpen.bind(this)
        this.handleMenuClose = this.handleMenuClose.bind(this)
        this.handleMyBlogs = this.handleMyBlogs.bind(this)
        this.handleMyOffers = this.handleMyOffers.bind(this)
        this.handleMyConsultations = this.handleMyConsultations.bind(this)
        this.handleMyConsultationRequests = this.handleMyConsultationRequests.bind(this)
        this.handleSubscription = this.handleSubscription.bind(this)
        this.handleProfile = this.handleProfile.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
    }

    handleProfileMenuOpen(event) {
        this.setState(state => ({
            anchorEl: event.currentTarget

        }))
    }

    handleMenuClose() {
        this.setState(state => ({
            anchorEl: null
        }))
    }

    handleMyBlogs(event) {
        this.setState(state => ({
            anchorEl: null
        }))
        this.props.history.push('/myBlogs')

    }

    handleMyOffers() {
        this.setState(state => ({
            anchorEl: null
        }))

        this.props.history.push('/myOffers')
    }

    handleMyConsultations() {
        this.setState(state => ({
            anchorEl: null
        }));
        this.props.history.push('/expert-consultation/my-consultations')
    }

    handleSubscription() {
        this.setState(state => ({
            anchorEl: null
        }))
    }

    handleProfile() {
        this.setState(state => ({
            anchorEl: null
        }))
    }

    handleLogin() {
        this.setState(state => ({
            anchorEl: null
        }))

        this.props.history.push('/login')
    }

    handleLogout() {

        UserService.logout()
        this.setState(state => ({
            user: UserService.isAuthenticated() ? UserService.getCurrentUser() : undefined,
            anchorEl: null
        }))

        if (this.props.location.pathname !== '/') {
            this.props.history.push('/')
        } else {
            window.location.reload()
        }
    }

    handleMyConsultationRequests() {
        this.setState(state => ({
            anchorEl: null
        }));
        this.props.history.push('/expert-consultation/my-requests')
    }

    render() {
        const {classes} = this.props

        return (
            <div className={classes.root}>
                <AppBar position="static" className={classes.appBar}>
                    <Toolbar>
                        <img src={jardinLogo} alt="jardinLogo" className={classes.logo}/>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon/>
                            </div>
                            <InputBase
                                placeholder="Search"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{'aria-label': 'search'}}
                            />
                        </div>
                        <div>
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={this.menuId}
                                aria-haspopup="true"
                                onClick={this.handleProfileMenuOpen}
                                color="inherit"
                                className={classes.icon}
                            >
                                <AccountCircle fontSize="large"/>
                            </IconButton>

                            <Menu
                                anchorEl={this.state.anchorEl}
                                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                                getContentAnchorEl={null}
                                id={this.menuId}
                                keepMounted
                                transformOrigin={{vertical: 'top', horizontal: 'right'}}
                                open={Boolean(this.state.anchorEl)}
                                onClose={this.handleMenuClose}
                            >
                                {UserService.isAuthenticated() ?
                                    <div className={classes.menu}>
                                        <span style={{'position': 'relative', 'left': '7%' }}><p><b> Topics </b></p></span>
                                        <hr/>
                                        <MenuItem onClick={this.handleMyBlogs}>My Blogs</MenuItem>
                                        <MenuItem onClick={this.handleMyOffers}>My Offers</MenuItem>
                                        <MenuItem onClick={this.handleMyConsultations}>My Consultations</MenuItem>
                                        <MenuItem onClick={this.handleMyConsultationRequests}>My Consultation Requests</MenuItem>
                                        <span style={{'position': 'relative', 'left': '7%' }}><p><b> User </b></p></span>
                                        <hr/>
                                        <MenuItem onClick={this.handleSubscription}>Subscription</MenuItem>
                                        <MenuItem onClick={this.handleProfile}>Profile</MenuItem>
                                        <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                                    </div>

                                    : <MenuItem onClick={this.handleLogin}>Login</MenuItem>

                                }
                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>
                <NavigationTabs selectedTab={this.props.selectedTab}  handleTabChange={(value) => this.props.handleTabChange(value)} />
            </div>
        )
    }
}

export default withStyles(styles)(withRouter(Header))