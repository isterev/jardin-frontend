import React from 'react';
import {withRouter} from "react-router-dom";
import {fade} from '@material-ui/core/styles';
import {withStyles} from '@material-ui/styles';


import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import UserService from "../services/UserService";

const styles = (theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
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
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
});

/*
const [anchorEl, setAnchorEl] = React.useState(null);
const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

const isMenuOpen = Boolean(anchorEl);
const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

const handleProfileMenuOpen = (event) => {
  setAnchorEl(event.currentTarget);
};

const handleMobileMenuClose = () => {
  setMobileMoreAnchorEl(null);
};

const handleMenuClose = () => {
  setAnchorEl(null);
  handleMobileMenuClose();
};

const handleMobileMenuOpen = (event) => {
  setMobileMoreAnchorEl(event.currentTarget);
};
*/


/*const renderMenu = (
    <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
    >
      <p> <b> Topics </b></p> <hr></hr>
      <MenuItem onClick={handleMenuClose}>My Blogs</MenuItem>
      <MenuItem onClick={handleMenuClose}>My Offers</MenuItem>
      <MenuItem onClick={handleMenuClose}>My Consultations</MenuItem>
      <p> <b> User </b></p> <hr></hr>
      <MenuItem onClick={handleMenuClose}>Subscription</MenuItem>
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>

    </Menu>
);


const renderMobileMenu = (
    <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
    >

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
);*/

class Header extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: UserService.isAuthenticated() ? UserService.getCurrentUser() : undefined,
            anchorEl: null,
            mobileMoreAnchorEl: null, // mobile?
        }

        this.menuId = 'primary-search-account-menu';
        this.mobileMenuId = 'primary-search-account-menu-mobile';
    }

    isMenuOpen() {
        return this.state.anchorEl != null;
    }

    isMobileMenuOpen() {
        return this.state.mobileMoreAnchorEl != null;
    }


    handleProfileMenuOpen(event) {
        this.state.anchorEl = event.currentTarget;
    };


    handleMobileMenuClose() {
        this.state.mobileMoreAnchorEl = null;
    };

    handleMenuClose() {
        this.state.anchorEl = null;
        this.handleMobileMenuClose();
    };

    handleMobileMenuOpen(event) {
        this.state.mobileMoreAnchorEl = event.currentTarget;
    };


    logout() {
        UserService.logout();
        this.state = {
            user: UserService.isAuthenticated() ? UserService.getCurrentUser() : undefined
        };
        if (this.props.location.pathname != '/') {
            this.props.history.push('/');
        } else {
            window.location.reload();
        }
    }

    render() {

        const {classes} = this.props;

        return (
            <div className={classes.grow}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography className={classes.title} variant="h6" noWrap>
                            {this.props.title}
                        </Typography>
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
                        <div className={classes.grow}/>
                        <div className={classes.sectionDesktop}>

                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={this.menuId}
                                aria-haspopup="true"
                                onClick={this.handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle/>
                            </IconButton>
                        </div>
                        <div className={classes.sectionMobile}>
                            <IconButton
                                aria-label="show more"
                                aria-controls={this.mobileMenuId}
                                aria-haspopup="true"
                                onClick={this.handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon/>
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                <Menu
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                    id={this.menuId}
                    keepMounted
                    transformOrigin={{vertical: 'top', horizontal: 'right'}}
                    open={this.isMenuOpen}
                    onClose={this.handleMenuClose}
                >
                    <p><b> Topics </b></p>
                    <hr></hr>
                    <MenuItem onClick={this.handleMenuClose}>My Blogs</MenuItem>
                    <MenuItem onClick={this.handleMenuClose}>My Offers</MenuItem>
                    <MenuItem onClick={this.handleMenuClose}>My Consultations</MenuItem>
                    <p><b> User </b></p>
                    <hr></hr>
                    <MenuItem onClick={this.handleMenuClose}>Subscription</MenuItem>
                    <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
                    <MenuItem onClick={this.handleMenuClose}>Logout</MenuItem>
                </Menu>
                
            </div>
        );
    }
};

/*Header.propTypes = {
  classes: PropTypes.object.isRequired,
};*/

export default withStyles(styles)(withRouter(Header));