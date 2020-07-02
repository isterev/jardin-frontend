import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    logo:{
        height:'100%',
        width:120
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
    root: {
            display: "flex"
        },
    paper: {
            marginRight: theme.spacing(2)
        }
}));

export default function PrimarySearchAppBar() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen(prevOpen => !prevOpen);
    };

    const handleClose = event => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === "Tab") {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <div className={classes.grow}>
            <AppBar position ={"static"} style={{backgroundColor:'#2b6343'}}>
                <Toolbar>
                    <img src="./jardin_logo.png" alt="jardnlogo" className={classes.logo} />
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search."
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    <div>
                        <IconButton color="inherit" onClick={handleToggle}>
                            <AccountCircle fontSize="large"/>
                        </IconButton>
                        <Popper
                            open={open}
                            anchorEl={anchorRef.current}
                            role={undefined}
                            transition
                            disablePortal
                        >
                            {({ TransitionProps, placement }) => (
                                <Grow
                                    {...TransitionProps}
                                    style={{
                                        transformOrigin:
                                            placement === "bottom" ? "center top" : "center bottom"
                                    }}
                                >
                                    <Paper>
                                        <ClickAwayListener onClickAway={handleClose}>
                                            <MenuList
                                                autoFocusItem={open}
                                                id="menu-list-grow"
                                                onKeyDown={handleListKeyDown}
                                            >
                                                <MenuItem onClick={handleClose}>
                                                    <Typography fontWeight="fontWeightBold">
                                                        Topics
                                                    </Typography>
                                                </MenuItem>
                                                <Divider />
                                                <MenuItem onClick={handleClose}>My Blogs</MenuItem>
                                                <Divider />
                                                <MenuItem onClick={handleClose}>My Offers</MenuItem>
                                                <Divider />
                                                <MenuItem onClick={handleClose}>My Consultation</MenuItem>
                                                <Divider />
                                                <MenuItem onClick={handleClose}>User</MenuItem>
                                                <Divider />
                                                <MenuItem onClick={handleClose}>Subscription</MenuItem>
                                                <Divider />
                                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                                <Divider />
                                                <MenuItem onClick={handleClose}>Logout</MenuItem>
                                                <Divider />
                                            </MenuList>
                                        </ClickAwayListener>
                                    </Paper>
                                </Grow>
                            )}
                        </Popper>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}
