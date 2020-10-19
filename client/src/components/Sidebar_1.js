import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import * as Icons from '@material-ui/icons';
import * as RIcons from 'react-icons/all';
import Trelleborglogo from '../trelleborg.jpg';



const useStyles = makeStyles((theme)=>({
  list: {
    width: 280,
  },
  fullList: {
    width: 'auto',
  },
  nested: {
    paddingLeft: theme.spacing(7),
  },
  drawerPaper: {
    width: '290px',
  },
  listItemText:{
    width:'140px'
  },
  gutters:{
    paddingLeft:'28px'
  }
}));

export default function SwipeableTemporaryDrawer() {
  const classes = useStyles();

  const [state, setState] = React.useState({    
    left: false    
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);    
  };

  

  const list = (anchor) => (
    <div
      className={clsx(classes.list)}
      role="presentation"      
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem divider style={{justifyContent: "center"}} classes={{paper: classes.gutters}}>
          <img src={Trelleborglogo}  width="130" height="60"  />
        </ListItem>
        <br/>
        <ListItem classes={{paper: classes.gutters}}>
          <p style={{fontSize:"30px",textAlign:"center",fontWeight:"bold"}}>Menu</p>
        </ListItem>
        <ListItem button onClick={handleClick} classes={{gutters: classes.gutters}}>
            <ListItemIcon>
              <Icons.PersonAdd />
            </ListItemIcon>
            <ListItemText classes={{primary:classes.listItemText}} primary="New User Creation" />
            {open ? <Icons.ExpandLess /> : <Icons.ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding >
            <ListItem button component="a" href='/options/newuser' className={classes.nested}  >
              <ListItemIcon>
                <Icons.AddBox />
              </ListItemIcon>
              <ListItemText primary="Create New User" />
            </ListItem>
            <ListItem button component="a" href='/options/editdraftform' className={classes.nested} >
              <ListItemIcon>
                <Icons.Edit />
              </ListItemIcon>
              <ListItemText primary="Edit Saved User" />
            </ListItem>
            <ListItem button component="a" href='/options/deleteform' className={classes.nested} >
              <ListItemIcon>
                <Icons.Delete />
              </ListItemIcon>
              <ListItemText classes={{primary:classes.listItemText}} primary="Delete Saved User" />
            </ListItem>
          </List>
        </Collapse>        
        <ListItem button component="a" href='/changes_required' classes={{gutters: classes.gutters}} >
          <ListItemIcon><Icons.Edit/></ListItemIcon>
          <ListItemText primary="Changes Required"/>
        </ListItem>
        <ListItem button component="a" href='/deactivate' classes={{gutters: classes.gutters}} >
          <ListItemIcon><Icons.DeleteForever/></ListItemIcon>
          <ListItemText primary="Deactivation"/>
        </ListItem>
        <br/>
        <Divider/>
        <br/>
        <ListItem button component="a" href='/requests' classes={{gutters: classes.gutters}} >
          <ListItemIcon><RIcons.BsClockFill size={22}/></ListItemIcon>
          <ListItemText primary="Pending Requests"/>
        </ListItem>
        <ListItem button component="a" href='/rejected' classes={{gutters: classes.gutters}} >
          <ListItemIcon><Icons.Cancel/></ListItemIcon>
          <ListItemText primary="Rejected Requests"/>
        </ListItem>
        <ListItem button component="a" href='/status' classes={{gutters: classes.gutters}} >
          <ListItemIcon><Icons.Info/></ListItemIcon>
          <ListItemText primary="Status"/>
        </ListItem>
        
        
        
      </List>      
    </div>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton onClick={toggleDrawer(anchor, true)}><Icons.Menu fontSize='large' style={{color:"#9299a0"}}/></IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)} 
            classes={{
              paper: classes.drawerPaper,
            }}         
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
