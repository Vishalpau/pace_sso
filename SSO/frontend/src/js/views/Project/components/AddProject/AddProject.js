import React, { useState, forwardRef } from 'react';
import { Grid, Typography, CardContent, Card, TextField, Button } from '@material-ui/core';
import { withStyles } from "@material-ui/core";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link, NavLink as RouterLink } from 'react-router-dom';
//import PaceLoader from '../../../../user/auth/PaceLoader';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Draggable from "react-draggable";
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import AddIcon from '@material-ui/icons/Add';
import ListItemText from '@material-ui/core/ListItemText';
import BusinessIcon from '@material-ui/icons/Business';

const styles = (theme) => ({
  root: {
    padding: theme.spacing(3)
  },
  projectAddFormSection: {
    '& .MuiGrid-item': {
    float: 'left',
    width: '100%',
    },
  },
  contentTitle: {
    fontSize: '30px',
    lineHeight: '50px',
    fontFamily: 'xolonium',
    color: '#054D69',
    paddingBottom: '5px',
    borderBottom: '1px solid #d6d9da',
    marginBottom: '30px',
    [theme.breakpoints.down("md")]: {
      fontSize: '22px',
      lineHeight: '40px',
    },
  },
  custmSubmitBtn: {
    textTransform: 'capitalize',
    fontFamily: 'Montserrat-Medium',
    marginTop: '25px',
    '&:focus':{
      outline: 'none',
    },
    '&:hover':{
      backgroundColor: '#06374a',
      color: '#ffffff',
    }
  },
  formBox: {
    position: 'relative',
    padding: '5px 12px !important',
    '& .MuiTextField-root': {
        width: '100%',
    },
    '& .MuiOutlinedInput-root.Mui-focused': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#06374a',
      },
    },
    '& .MuiFormLabel-root.Mui-focused': {
      color: '#06374a',
    },
    '& .MuiBadge-badge': {
      left: '0px',
      right: 'auto',
      borderRadius: '3px',
    },
    '& .MuiInputBase-root': {
      fontFamily: 'Montserrat-Medium',
    },
  },
  formControl: {
      '& .MuiOutlinedInput-input': {
        //padding: '10.5px 14px',
      },
  },
  custmCancelBtn: {
    textTransform: 'capitalize',
    marginLeft: '5px',
    marginTop: '25px',
    backgroundColor: '#ffffff',
    color: '#f28705',
    padding: '0px',
    '& a': {
      backgroundColor: '#ffffff',
      color: '#263238',
      padding: '5px 15px',
      borderRadius: '4px',
      fontFamily: 'Montserrat-Medium',
    },
    '& a:hover': {
      backgroundColor: '#f28705',
      color: '#ffffff !important',
    },
  },

  profileImgBox: {
    position: 'relative',
    padding: '5px 12px !important',
    '& .MuiAvatar-colorDefault': {
      backgroundColor: '#ffffff',
      border: '1px solid #cccccc',
      borderRadius: '4px',
    },
    '& input': {
      display: 'none',
    },
    '& .MuiAvatar-root': {
      width: '80px',
      height: '80px',
      position: 'relative',
    },
    '& .MuiButtonBase-root': {
      position: 'absolute',
      left: '46px',
      top: '45px',
    },
    '& .MuiSvgIcon-root': {
      color: '#054D69',
      fontSize: '70px',
    },
  },
  dragDropSection : {
    //height: '325px',
    paddingBottom: '12px',
    border: '1px dashed #ccc',
    '& .MuiGrid-item': {
      float: 'left',
      width: '100%',
    },
  },
  publishUserCheck: {
    '&.Mui-checked':{
    color: '#f28705 !important',
    },
  },
  dragCardBox: {
    width: "50%",
    marginBottom: "10px",
    //color: "#333333",
    padding: "5px 15px",
    textAlign: "center",
    cursor: "pointer",
    // webkitBoxShadow: "0px 0px 15px 0px rgba(50, 50, 50, 0.2)",
    // mozBoxShadow: '0px 0px 15px 0px rgba(50, 50, 50, 0.2)',
    // boxShadow: '0px 0px 15px 0px rgba(50, 50, 50, 0.2)',
    boxShadow: '0px 0px 0px -1px rgb(0 0 0 / 20%), 0px 1px 0px 2px rgb(0 0 0 / 14%), 0px 0px 0px 0px rgb(0 0 0 / 12%)',
    borderRadius: '1px',
  },
  dragIconBox: {
    verticalAlign: 'middle',
    float: 'left',
  },
  dragTextBox: {
    fontFamily: 'Montserrat-Medium',
    display: 'inline-block',
  },
  DragSectionTitle: {
    color: '#05374A',
    fontSize: '15px',
    fontFamily: 'Montserrat-Medium',
    marginBottom: '15px',
    paddingBottom: '15px',
    borderBottom: '1px solid #cbcbcb',
  },
  dragBoxFirst: {
    paddingRight: '30px !important',
    minHeight: '292px',
    borderRight: '1px solid #cbcbcb',
  },
  dragBoxSecond: {
    paddingLeft: '30px !important',
    minHeight: '292px',
  },
  dragCustomBox: {
    '& .MuiTextField-root': {
      width: 'calc(100% - 50px)',
      float: 'left',
    },
  },
  breakupAddBtn: {
    minWidth: '40px',
    float: 'left',
    padding: '8px 2px',
    fontSize: '10px',
    textTransform: 'capitalize',
    fontFamily: 'Montserrat-Medium',
    marginTop: '8px',
    marginLeft: '10px',
    '& .MuiButton-startIcon': {
      marginLeft: '0px',
      marginRight: '0px',
    },
    '&:focus': {
      outline: 'none',
    },
    '&:hover': {
      backgroundColor: '#f28705 ',
      color: '#ffffff',
    },
  },
  cardLableBoxOne: {
    marginBottom: '12px',
    border: '1px dashed #06374a',
    width: '65%',
    '& .MuiCardContent-root': {
      padding: '10px',
      height: '45px',
    },
    '& .MuiListItemText-root': {
      position: 'relative',
      margin: '0px',
    },
    '& .MuiListItemText-secondary': {
      position: 'absolute',
      right: '0px',
      top: '4px',
      fontSize: '14px',
      fontFamily: 'Montserrat-Medium',
      opacity: .5,
    },
  },
  cardLableBoxTwo: {
    marginBottom: '12px',
    marginLeft: '20px',
    border: '1px dashed #06374a',
    width: '65%',
    '& .MuiCardContent-root': {
      padding: '10px',
      height: '45px',
    },
    '& .MuiListItemText-root': {
      position: 'relative',
      margin: '0px',
    },
    '& .MuiListItemText-secondary': {
      position: 'absolute',
      right: '0px',
      top: '4px',
      fontSize: '14px',
      fontFamily: 'Montserrat-Medium',
      opacity: .5,
    },
  },
  cardLableBoxThree: {
    marginBottom: '12px',
    marginLeft: '40px',
    border: '1px dashed #06374a',
    width: '65%',
    '& .MuiCardContent-root': {
      padding: '10px',
      height: '45px',
    },
    '& .MuiListItemText-root': {
      position: 'relative',
      margin: '0px',
    },
    '& .MuiListItemText-secondary': {
      position: 'absolute',
      right: '0px',
      top: '4px',
      fontSize: '14px',
      fontFamily: 'Montserrat-Medium',
      opacity: .5,
    },
  },
  cardLableBoxFour: {
    marginBottom: '12px',
    marginLeft: '60px',
    border: '1px dashed #06374a',
    width: '65%',
    '& .MuiCardContent-root': {
      padding: '10px',
      height: '45px',
    },
    '& .MuiListItemText-root': {
      position: 'relative',
      margin: '0px',
    },
    '& .MuiListItemText-secondary': {
      position: 'absolute',
      right: '0px',
      top: '4px',
      fontSize: '14px',
      fontFamily: 'Montserrat-Medium',
      opacity: .5,
    },
  },
  cardLableBoxFive: {
    marginBottom: '12px',
    marginLeft: '80px',
    border: '1px dashed #06374a',
    width: '65%',
    '& .MuiCardContent-root': {
      padding: '10px',
      height: '45px',
    },
    '& .MuiListItemText-root': {
      position: 'relative',
      margin: '0px',
    },
    '& .MuiListItemText-secondary': {
      position: 'absolute',
      right: '0px',
      top: '4px',
      fontSize: '14px',
      fontFamily: 'Montserrat-Medium',
      opacity: .5,
    },
  },
});

/**
 * Material-UI Button in a Card. You can drag and drop the button
 * anywhere within the card.
 */
// const DraggableButtonInCard = ({ text, bgColor }) => {
//   return (
//     <Card style={{ width: "40%", backgroundColor: bgColor, color: "#ffffff" }}>
//       <Draggable>
//         <Button variant="text">BUY</Button>
//       </Draggable>
//       <Typography variant="h6">{text}</Typography>
//     </Card>
//   );
// };



class AddProject extends React.Component {

  projectPhase = [
    {
      value: 'None',
      label: 'None',
    },
    {
      value: 'Training',
      label: 'Training',
    },
    {
      value: 'Training1',
      label: 'Training2',
    },
    {
      value: 'Training3',
      label: 'Training3',
    },
  ];

  projectNature = [
    {
      value: 'None',
      label: 'None',
    },
    {
      value: 'Training',
      label: 'Training',
    },
    {
      value: 'Training1',
      label: 'Training2',
    },
    {
      value: 'Training3',
      label: 'Training3',
    },
  ];
  
  render() {
    const { classes } = this.props;

    const DraggableCard = ({ text, bgColor, borderColor }) => {
  
      return (
        <Draggable>
          <Card
            className={classes.dragCardBox}
            style={{ backgroundColor: bgColor, borderColor: borderColor }}
          >
            {/* <Button variant="text">BUY</Button> */}
            <DragIndicatorIcon className={classes.dragIconBox} />
            <Typography className={classes.dragTextBox} style={{fontFamily: 'Montserrat-Medium'}} variant="h6">{text}</Typography>
          </Card>
        </Draggable>
      );
    };

    // const DraggableButtonInCard = ({ text, bgColor, borderColor }) => {
    //   return (
    //     <Card className={classes.dragCardBox} style={{ backgroundColor: bgColor, borderColor: borderColor }}>
    //       <Draggable>
    //         <DragIndicatorIcon className={classes.dragIconBox} />
    //         <Typography className={classes.dragTextBox} style={{fontFamily: 'Montserrat-Medium'}} variant="h6">{text}</Typography>
    //       </Draggable>
    //     </Card>
    //   );
    // };
    
    return (
      <div className={classes.root}>
        <Grid item md={12} xs={12} className={classes.contentSection}>
          <Typography className={classes.contentTitle} varient="h1">New Project</Typography>
        </Grid>
        <Card className={classes.formBoxSection}>
          <CardContent>
            <Grid
              container
              spacing={3}
            >
              <Grid
                className={classes.projectAddFormSection}        
                md={8}
                xs={12}
              >
                <Grid
                  item
                  md={12}
                  xs={12}
                  className={classes.profileImgBox}
                >
                  {/* <PaceLoader /> */}
                  <input accept="image/*" className={classes.input} id="icon-button-file" name="avatar" type="file"/>
                  <label htmlFor="icon-button-file">
                    <Avatar variant="square" alt="Project Image" ><BusinessIcon /></Avatar>
                    {/* <IconButton color="primary" aria-label="upload picture" component="span">
                      <PhotoCamera />
                    </IconButton> */}
                  </label>
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                  className={classes.formBox}
                >
                <TextField
                    label="Project Name"
                    margin="dense"
                    name="projectname"
                    id="projectname"
                    type="text"
                    fullWidth
                    value=""
                    variant="outlined"
                    className={classes.formControl}
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                  className={classes.formBox}
                >
                <TextField
                    label="Project Code"
                    margin="dense"
                    name="projectcode"
                    id="projectcode"
                    type="text"
                    defaultValue=""
                    fullWidth 
                    variant="outlined"
                    className={classes.formControl}
                  />
                </Grid>
                <Grid
                    item
                    md={12}
                    xs={12}
                    className={classes.formBox}
                  >
                  <TextField
                    label="Project Details"
                    margin="dense"
                    name="departmentdescription"
                    id="departmentdescription"
                    multiline
                    rows={2}
                    defaultValue=""
                    fullWidth 
                    variant="outlined"
                    className={classes.formControl}
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                  className={classes.formBox}
                >
                <TextField
                  label="Project Phase"
                  margin="dense"
                  name="projectphase"
                  id="projectphase"
                  select
                  fullWidth
                  value=""
                  variant="outlined"
                >
                    {this.projectPhase.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                    ))}
                </TextField>
              </Grid>
              <Grid
                  item
                  md={6}
                  xs={12}
                  className={classes.formBox}
                >
                <TextField
                  label="Project Nature"
                  margin="dense"
                  name="projectnature"
                  id="projectnature"
                  select
                  fullWidth
                  value=""
                  variant="outlined"
                >
                    {this.projectNature.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                    ))}
                </TextField>
              </Grid>

              <Grid
                item
                md={12}
                xs={12}
                className={classes.formBox}
              >
                <FormControl component="fieldset">
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    value="publishUsers"
                    control={<Checkbox className={classes.publishUserCheck} />}
                    label="Publish to users"
                    labelPlacement="end"
                  />
                </FormGroup>
              </FormControl>
              </Grid>
              </Grid>
              <Grid
                item
                md={12}
                xs={12}
                className={classes.formBox}
              >
                <Card className={classes.dragDropSection}>
                  <CardContent>
                    <Grid
                      item
                      md={6}
                      xs={12}
                      className={classes.dragBoxFirst}
                    >
                      <Typography className={classes.DragSectionTitle} gutterBottom>Project Information Breakdown Structure </Typography>
                      
                      <Grid
                      item
                      md={12}
                      xs={12}
                      className={classes.dragAreaLable}
                    >
                      <Card className={classes.cardLableBoxOne}>
                        <CardContent>
                          <ListItemText className={classes.userProfileView} primary=" " secondary="L 1" />
                        </CardContent>
                      </Card>
                      <Card className={classes.cardLableBoxTwo}>
                        <CardContent>
                          <ListItemText className={classes.userProfileView} primary=" " secondary="L 2" />
                        </CardContent>
                      </Card>
                      <Card className={classes.cardLableBoxThree}>
                        <CardContent>
                          <ListItemText className={classes.userProfileView} primary=" " secondary="L 3" />
                        </CardContent>
                      </Card>
                      <Card className={classes.cardLableBoxFour}>
                        <CardContent>
                          <ListItemText className={classes.userProfileView} primary=" " secondary="L 4" />
                        </CardContent>
                      </Card>
                      <Card className={classes.cardLableBoxFive}>
                        <CardContent>
                          <ListItemText className={classes.userProfileView} primary=" " secondary="L 5" />
                        </CardContent>
                      </Card>

                    </Grid>

                      {/* <DraggableButtonInCard text="Ashutosh" bgColor="#ffffff" borderColor="#cccccc" />
                      <DraggableButtonInCard text="Sonu" bgColor="#ffffff" borderColor="#cccccc" />
                      <DraggableButtonInCard text="Mayank" bgColor="#ffffff" borderColor="#cccccc" /> */}
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                      className={classes.dragBoxSecond}
                    >
                      <Typography className={classes.DragSectionTitle} gutterBottom>Breakdown Structure</Typography>
                      <DraggableCard text="Phase" bgColor="#ffffff" borderColor="#cccccc" />
                      <DraggableCard text="Unit" bgColor="#ffffff" borderColor="#cccccc" />
                      <DraggableCard text="Work Areas" bgColor="#ffffff" borderColor="#cccccc" />
                      <Grid
                        item
                        md={6}
                        xs={12}
                        className={classes.dragCustomBox}
                      >
                        <TextField
                          label="New Breakup"
                          margin="dense"
                          name="newbreakup"
                          id="newbreakup"
                          type="text"
                          defaultValue=""
                          fullWidth 
                          variant="outlined"
                          className={classes.formControl}
                        />
                        <Button
                          variant="contained"
                          margin="dense"
                          className={classes.breakupAddBtn}
                          startIcon={<AddIcon />}
                        >

                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Grid 
              item
              md={6}
              xs={12}
            >
              <Button variant="outlined" size="medium" className={classes.custmSubmitBtn}>Save </Button>
              <Button variant="outlined" size="medium" className={classes.custmCancelBtn}><Link to="/project">Cancel </Link></Button>
            </Grid>
          </CardContent>
        </Card>
      </div>
    );
  }
};



// UserDetails.propTypes = {
//   className: PropTypes.string
// };

//function mapStateToProps(state, props) { return { user: state } }
function mapDispatchToProps(dispatch) { return { dispatch }; }

export default withRouter(connect(
  //mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(AddProject)));