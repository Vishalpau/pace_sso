import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DeleteIcon from "@material-ui/icons/Delete";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
  buttonStyle: {
    marginRight: "15px",
    fontSize: "14px",
    textTransform: "none",
    padding: "6px 20px",
    backgroundColor: "#06425C",
    color: "#ffffff !important",
    border: "1px solid #06425C",
    borderRadius: "20px",
    boxShadow: "none",
    "&:hover": {
      backgroundColor: "#ff8533",
      border: "1px solid #ff8533",
    },
  },
  formControl: {
    width: "100%",
  },
  multiSelectChek: {
    "& .MuiInputLabel-shrink": {
      backgroundColor: "#fafafa",
      paddingRight: "0.313rem",
      paddingLeft: "0.188rem",
    },
    "& .MuiOutlinedInput-root.Mui-focused": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#06374a",
      },
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: "#06374a",
    },
  },
  increasActionArea: {
    padding: "8px 0px !important",
    marginTop: "11px",
    "& button": {
      padding: "8px",
      "&:hover": {
        color: "#F28705",
      },
    },
  },
  increasActionAreaPlus: {
    padding: "0px 0px !important",
    float: "right",
    "& button": {
      padding: "8px",
      float: "right",
      "&:hover": {
        color: "#F28705",
      },
    },
  },
  formBox: {
    position: "relative",
    //padding: '5px 12px !important',
    "& .MuiTextField-root": {
      width: "100%",
    },
    "& .MuiOutlinedInput-root.Mui-focused": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#06374a",
      },
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: "#06374a",
    },
    "& .MuiBadge-badge": {
      left: "0px",
      right: "auto",
      borderRadius: "3px",
    },
  },
  customTooltip: {
    backgroundColor: "rgba(6, 66, 92, 0.8)",
    padding: "8px",
    fontFamily: "Montserrat-Regular",
  },
  customArrow: {
    color: "rgba(6, 66, 92, 0.8)",
  },
}));

export default function AddInviteUser() {
  const classes = useStyles();

  const [inviteRecipient, setinviteRecipient] = useState([{}]);
  const handleMoreQuestionCatgry = () => {
    let temp = [...inviteRecipient];
    temp.push({});
    setinviteRecipient(temp);
  };
  const handleCloseCatgry = (indexOne) => {
    console.log("close", indexOne);
    let temp = [...inviteRecipient];
    let newData = temp.filter((item, key) => key !== indexOne);
    setinviteRecipient(newData);
    // console.log('closeclick', newData)
  };

  const ITEM_HEIGHT = 56;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
    getContentAnchorEl: null,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "center",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "center",
    },
    variant: "menu",
  };

  const application = [
    "Accounts",
    "Action tracker",
    "GIS",
    "PACE classic",
    "Safety",
  ];
  const module = ["Observation", "Compliance", "Assessments"];
  const [applicationSelected, setApplicationSelected] = useState([]);
  const [moduleSelected, setModuleSelected] = useState([]);

  const isAllSelectedApplication =
    application.length > 0 && applicationSelected.length === application.length;
  const isAllSelectedModule =
    module.length > 0 && moduleSelected.length === module.length;

  const handleApplicationSelectChange = (event) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setApplicationSelected(
        applicationSelected.length === application.length ? [] : application
      );
      return;
    }
    setApplicationSelected(value);
  };
  const handleModuleSelectChange = (event) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setModuleSelected(moduleSelected.length === module.length ? [] : module);
      return;
    }
    setModuleSelected(value);
  };

  const [emailMobileNo, setEmailMobileNo] = useState();
  const handleInputValueChange = (event) => {
    setEmailMobileNo(event.target.value);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={12} sm={12} xs={12}>
          <Grid container spacing={2}>
            {inviteRecipient.map((value, indexOne) => (
              <>
                <Grid
                  item
                  md={3}
                  sm={inviteRecipient.length > 1 ? 6 : 6}
                  xs={inviteRecipient.length > 1 ? 11 : 12}
                  className={classes.formBox}
                >
                  {indexOne == 0 ? (
                    <>
                      <TextField
                        label="Email/Mobile number"
                        name="newfunctionalrol"
                        id="newfunctionalrol"
                        type="text"
                        fullWidth
                        variant="outlined"
                        required
                        value={emailMobileNo}
                        onChange={handleInputValueChange}
                      />
                    </>
                  ) : (
                    <>
                      <TextField
                        label="Email/Mobile number"
                        name="newfunctionalrol"
                        id="newfunctionalrol"
                        type="text"
                        fullWidth
                        variant="outlined"
                        required
                        value={emailMobileNo}
                        onChange={handleInputValueChange}
                        disabled
                      />
                    </>
                  )}
                </Grid>

                <Grid
                  item
                  md={3}
                  sm={inviteRecipient.length > 1 ? 5 : 6}
                  xs={inviteRecipient.length > 1 ? 11 : 12}
                  className={classes.formBox}
                >
                  <FormControl variant="outlined" required fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Application name
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="applicationname"
                      label="Application name"
                      required
                    >
                      <MenuItem key="2" value="accounts">
                        Accounts
                      </MenuItem>
                      <MenuItem key="3" value="actiontracker">
                        Action Tracker
                      </MenuItem>
                      <MenuItem key="4" value="gis">
                        GIS
                      </MenuItem>
                      <MenuItem key="0" value="safety">
                        Safety
                      </MenuItem>
                      <MenuItem key="1" value="PACEClassic">
                        PACE Classic
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* <Grid
                                    item
                                    md={3}
                                    sm={inviteRecipient.length > 1 ? 5 : 6}
                                    xs={inviteRecipient.length > 1 ? 11 : 12}
                                    className={classes.multiSelectChek}
                                >
                                    <FormControl
                                        variant="outlined"
                                        className={classes.formControl}
                                    >
                                        <InputLabel id="mutiple-select-label">
                                            Applications*
                                        </InputLabel>
                                        <Select
                                            labelId="mutiple-select-label"
                                            multiple
                                            value={applicationSelected}
                                            variant="outlined"
                                            onChange={handleApplicationSelectChange}
                                            renderValue={(applicationSelected) =>
                                                applicationSelected.join(", ")
                                            }
                                            MenuProps={MenuProps}
                                            fullWidth
                                        >
                                            <MenuItem
                                                value="all"
                                                variant="outlined"
                                                classes={{
                                                    root: isAllSelectedApplication
                                                        ? classes.selectedAll
                                                        : "",
                                                }}
                                            >
                                                <ListItemIcon>
                                                    <Checkbox
                                                        classes={{
                                                            indeterminate: classes.indeterminateColor,
                                                        }}
                                                        checked={isAllSelectedApplication}
                                                        indeterminate={
                                                            applicationSelected.length > 0 &&
                                                            applicationSelected.length < application.length
                                                        }
                                                    />
                                                </ListItemIcon>
                                                <ListItemText
                                                    classes={{ primary: classes.selectAllText }}
                                                    primary="All applications"
                                                />
                                            </MenuItem>
                                            {application.map((option) => (
                                                <MenuItem key={option} value={option}>
                                                    <ListItemIcon>
                                                        <Checkbox
                                                            checked={applicationSelected.indexOf(option) > -1}
                                                        />
                                                    </ListItemIcon>
                                                    <ListItemText primary={option} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid> */}
                <Grid
                  item
                  md={3}
                  sm={inviteRecipient.length > 1 ? 6 : 6}
                  xs={inviteRecipient.length > 1 ? 11 : 12}
                  //className={classes.formBox}
                  className={classes.multiSelectChek}
                >
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="mutiple-select-label">Modules*</InputLabel>
                    <Select
                      labelId="mutiple-select-label"
                      multiple
                      value={moduleSelected}
                      variant="outlined"
                      onChange={handleModuleSelectChange}
                      renderValue={(moduleSelected) =>
                        moduleSelected.join(", ")
                      }
                      MenuProps={MenuProps}
                      fullWidth
                    >
                      <MenuItem
                        value="all"
                        variant="outlined"
                        classes={{
                          root: isAllSelectedModule ? classes.selectedAll : "",
                        }}
                      >
                        <ListItemIcon>
                          <Checkbox
                            classes={{
                              indeterminate: classes.indeterminateColor,
                            }}
                            checked={isAllSelectedModule}
                            indeterminate={
                              moduleSelected.length > 0 &&
                              moduleSelected.length < module.length
                            }
                          />
                        </ListItemIcon>
                        <ListItemText
                          classes={{ primary: classes.selectAllText }}
                          primary="All modules"
                        />
                      </MenuItem>
                      {module.map((option) => (
                        <MenuItem key={option} value={option}>
                          <ListItemIcon>
                            <Checkbox
                              checked={moduleSelected.indexOf(option) > -1}
                            />
                          </ListItemIcon>
                          <ListItemText primary={option} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid
                  item
                  md={inviteRecipient.length > 1 ? 2 : 3}
                  sm={inviteRecipient.length > 1 ? 5 : 6}
                  xs={inviteRecipient.length > 1 ? 11 : 12}
                  className={classes.formBox}
                >
                  <FormControl variant="outlined" required fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Application role
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="applicationrole"
                      label="Application role"
                      required
                    >
                      <MenuItem key="0" value="supervisor">
                        Supervisor
                      </MenuItem>
                      <MenuItem key="1" value="safetymanager">
                        Safety manager
                      </MenuItem>
                      <MenuItem key="2" value="contractor">
                        Contractor
                      </MenuItem>
                      <MenuItem key="2" value="constructionmanager">
                        Construction manager
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {inviteRecipient.length > 1 ? (
                  <>
                    <Grid
                      item
                      md={1}
                      sm={1}
                      xs={1}
                      className={classes.increasActionArea}
                    >
                      <Tooltip
                        title="Delete row data"
                        arrow
                        classes={{
                          tooltip: classes.customTooltip,
                          arrow: classes.customArrow,
                        }}
                      >
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleCloseCatgry(indexOne)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  </>
                ) : null}
              </>
            ))}
            <Grid
              item
              md={inviteRecipient.length > 1 ? 11 : 12}
              sm={inviteRecipient.length > 1 ? 11 : 12}
              xs={inviteRecipient.length > 1 ? 11 : 12}
              className={classes.increasActionAreaPlus}
            >
              {inviteRecipient.length <= 9 && (
                <Tooltip
                  title="Add more application"
                  arrow
                  classes={{
                    tooltip: classes.customTooltip,
                    arrow: classes.customArrow,
                  }}
                >
                  <IconButton
                    aria-label="add"
                    onClick={() => handleMoreQuestionCatgry()}
                  >
                    <AddCircleOutlineIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
