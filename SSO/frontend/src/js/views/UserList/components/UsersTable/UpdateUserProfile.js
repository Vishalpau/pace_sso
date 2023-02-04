import React, { useState, Component, Fragment, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import "date-fns";
// import "../../../../../../../../SSO/frontend/src/App.css";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import PaceLoader from "../../../../user/auth/PaceLoader";
import { useHistory } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  allPadding: {
    padding: "24px 24px 0px 24px",
    marginBottom: "10px",
  },
  contentTitle: {
    fontSize: "26px",
    lineHeight: "29px",
    fontFamily: "xolonium",
    color: "#06425C",
    paddingBottom: "15px",
    borderBottom: "1px solid #d6d9da",
    "& svg": {
      verticalAlign: "middle",
      marginRight: "15px",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "22px",
      lineHeight: "40px",
    },
  },
  groupIconSection: {
    marginBottom: "20px",
    paddingLeft: "24px",
    paddingRight: "24px",
  },
  iconGroupTitle: {
    paddingBottom: "2px !important",
    paddingTop: "0px !important",
    "& h6": {
      color: "#06425C",
      fontSize: "16px",
      fontFamily: "Montserrat-SemiBold",
      lineHeight: "19px",
      paddingTop: "8px",
      "& svg": {
        verticalAlign: "middle",
      },
    },
  },
  mainGroupSection: {
    paddingTop: "0px !important",
  },
  paperSection: {
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingTop: "20px",
    paddingBottom: "20px",
  },
  formBox: {
    position: "relative",
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
  innerLabelHead: {
    fontSize: "14px",
    color: "#666666",
    fontFamily: "Montserrat-SemiBold !important",
    lineHeight: "19px",
  },
  customeRadioBTN: {
    color: "#ccc",
    "& label": {
      marginBottom: "0px",
      "& .MuiRadio-root": {
        color: "rgba(0, 0, 0, 0.54)",
        "&.Mui-checked": {
          color: "#06425c",
        },
      },
      "& .MuiTypography-root": {
        fontFamily: "Montserrat-Medium",
        lineHeight: "21px",
        color: "#737373",
        fontSize: "15px",
      },
    },
  },
  buttonStyle: {
    color: "#ffffff !important",
    padding: "5px 20px",
    fontSize: "16px",
    marginRight: "15px",
    textTransform: "none",
    backgroundColor: "#06425C",
    borderRadius: "25px",
    boxShadow: "none",
    border: "1px solid #06425C",
    "&:hover": {
      backgroundColor: "#F28705",
      borderColor: "#F28705",
    },
  },
  custmCancelBtn: {
    color: "#06425C",
    padding: "5px 20px",
    fontSize: "16px",
    marginRight: "15px",
    textTransform: "none",
    backgroundColor: "#ffffff",
    borderRadius: "25px",
    boxShadow: "none",
    border: "1px solid #06425C",
    "&:hover": {
      backgroundColor: "#F28705",
      color: "#ffffff",
      borderColor: "#F28705",
    },
  },
  topMessageDilog: {
    "& h2": {
      fontSize: "30px",
      fontFamily: "Montserrat-SemiBold",
      lineHeight: "37px",
      color: "#06425C",
    },
  },
  deleteMassBox: {
    "& h6": {
      fontSize: "16px",
      lineHeight: "19px",
      fontFamily: "Montserrat-Medium",
      color: "#666666",
      paddingBottom: "10px",
    },
    "& div": {
      paddingBottom: "22px",
      paddingTop: "10px",
    },
  },
}));

const DialogContent = withStyles((theme) => ({
  root: {
    //padding: theme.spacing(2),
  },
}))(MuiDialogContent);
const UpdateUserProfile = () => {
  const classes = useStyles();

  const userId = JSON.parse(localStorage.getItem("userClicked")).id;
  const companyId = JSON.parse(localStorage.getItem("companyId"));

  const [deleteAddress, setDeleteAddress] = useState(false);
  const [maxWidth, setMaxWidth] = useState("md");
  const [errorMsg, setErrorMsg] = useState("");
  const [hasError, setHasError] = useState(false);

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  let history = useHistory();

  const handleClickUpdateSuccess = async () => {
    console.log({ userProfile: userProfile });
    const userId = JSON.parse(localStorage.getItem("user"));
    const res = await axios
      .put(
        process.env.API_URL +
          process.env.API_VERSION +
          `/user/${userId}/${companyId}/profile/`,
        {
          badgeNo: userProfile.badgeNo,
          city: userProfile.city,
          country: userProfile.country,
          department: userProfile.department,
          email: userProfile.email,
          mobile: number,
          name: userProfile.name,
          state: userProfile.state,
          status: userProfile.status,
          timeZone: userProfile.timeZone,
        }
      )
      .then((res) => {
        setDeleteAddress(true);
        setTimeout(() => {
          history.push("/users");
        }, 100);
      })
      .catch((err) => {
        console.log(err);
        setHasError(true);
        // if (userProfile.name === "" || userProfile.name === null) {
        //   setErrorMsg("Please fill the full name");
        // } else {
        //   setErrorMsg(err.message);
        // }
        setErrorMsg(err.response.data.error.error);
        console.log(err.response.data.error.error, "Error msg");
      });
    console.log(res, "response");
  };

  const handleCloseDelete = () => {
    setDeleteAddress(false);
  };

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [number, setNumber] = useState();
  const [countryObj, setCountryObj] = useState({
    country: "",
    state: "",
    city: "",
  });
  const [timezone, setTimezone] = useState("");
  const [userProfile, setUserProfile] = useState({});
  const [departments, setDepartments] = useState([]);
  const [userDepartment, setUserDepartment] = useState([]);
  const [statusVal, setStatusVal] = useState("true");

  const getUserProfileDetail = async () => {
    const res = await axios
      .get(
        process.env.API_URL +
          process.env.API_VERSION +
          `/user/${userId}/${companyId}/profile/`
      )
      .catch((err) => {
        console.log(err);
        setHasError(true);
        // if (userProfile.name === "" || userProfile.name === null) {
        //   setErrorMsg("Please fill the full name");
        // } else {
        //   setErrorMsg(err.message);
        // }
        setErrorMsg(err.response.data.error.error);
        console.log(err.response.data.error.error, "Error msg");
        if (err.response.data.error.error) {
          setTimeout(() => {
            history.push("/users");
          }, 2000);
        }
      });

    if (res.data.data.results) {
      setUserProfile(res.data.data.results[0]);
      setNumber(res.data.data.results[0].mobile);
      let tempArr = [];
      const userdepts = res.data.data.results[0].companies;
      if (userdepts.length > 0) {
        userdepts.forEach((element) => {
          if (element.departments.length > 0) {
            element.departments.forEach((one) => {
              tempArr.push(parseInt(one.departmentId, 10));
            });
          }
        });
        console.log(tempArr, "tmparr");
        if (tempArr.length > 0) {
          setUserDepartment(tempArr);
        }
      }
      const deptRes = await axios.get(
        process.env.API_URL +
          process.env.API_VERSION +
          `/companies/${companyId}/departments/`
      );
      if (deptRes) {
        console.log(deptRes, "deptRes");
        setDepartments(deptRes.data.data.results);
      }
    }
  };

  useEffect(() => {
    console.log(departments, "departments");
  }, [departments]);

  const getCountries = async () => {
    const res = await axios.get(
      process.env.API_URL + process.env.API_VERSION + "/user/countryList/"
    );
    await console.log(res.data.data.results, "Countries");
    await setCountries(res.data.data.results);
  };

  const getStates = async (value) => {
    const filtered = countries.filter((one) => one.countryName === value);
    console.log(filtered);
    const res = await axios.get(
      process.env.API_URL +
        process.env.API_VERSION +
        `/user/${filtered[0].countryId}/stateList/`
    );
    await console.log(res.data.data.results, "States");
    await setStates(res.data.data.results);
    await setCities([]);
    await setTimezone(filtered[0].utc);
  };

  const getCities = async (value) => {
    const filtered = states.filter((one) => one.stateName === value);
    console.log(filtered);
    const res = await axios.get(
      process.env.API_URL +
        process.env.API_VERSION +
        `/user/${filtered[0].stateId}/cityList/`
    );
    await console.log(res.data.data.results, "States");
    await setCities(res.data.data.results);
  };

  useEffect(() => {
    getCountries();
    getUserProfileDetail();
  }, []);

  useEffect(() => {
    console.log(userProfile, "userProfile");
    if (Object.keys(userProfile).length > 0) {
      setCountryObj({
        country: userProfile.country,
        state: userProfile.state,
        city: userProfile.city,
      });
      setTimezone(userProfile.timeZone);
      getStates(userProfile.country);
    }
  }, [userProfile.country, userProfile.state, userProfile.city]);

  useEffect(() => {
    setStatusVal(userProfile?.status);
    console.log(userProfile, "Userprofile");
  }, [userProfile]);

  useEffect(() => {
    getCities(userProfile.state);
  }, [states]);

  // useEffect(() => {
  //   return () => {
  //     localStorage.setItem("userClicked", "");
  //   };
  // });

  const goBackHandler = () => {
    history.push("/users");
  };

  const handleChangeSelect = (event) => {
    const {
      target: { value },
    } = event;
    setUserDepartment(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <Fragment>
      <Grid container spacing={3} className={classes.allPadding}>
        <Grid item md={12} xs={12} className={classes.contentSection}>
          <Typography className={classes.contentTitle} varient="h1">
            <img
              src="https://media.pace-os.com/icons/svg/user-profile-40x40.svg"
              alt="User profile"
            />{" "}
            User Profile
          </Typography>
        </Grid>
      </Grid>

      {/* Start user details section */}
      {Object.keys(userProfile).length > 0 ? (
        <Grid container spacing={3} className={classes.groupIconSection}>
          <Grid item md={12} sm={12} xs={12} className={classes.iconGroupTitle}>
            <Typography variant="h6" style={{ marginBottom: 20 }}>
              <img
                src="https://media.pace-os.com/icons/svg/my-account-32x32.svg"
                alt="User details"
              />{" "}
              User details
            </Typography>
          </Grid>
          <Grid
            item
            md={12}
            sm={12}
            xs={12}
            className={classes.mainGroupSection}
          >
            <Paper elevation={1} className={classes.paperSection}>
              <Grid container spacing={3}>
                <Fragment>
                  <Grid item md={4} sm={4} xs={12} className={classes.formBox}>
                    <TextField
                      label="Full name"
                      name="clientrepnu"
                      id="clientrepnu"
                      defaultValue={userProfile.name}
                      value={userProfile.name}
                      fullWidth
                      variant="outlined"
                      onChange={(e) => {
                        setUserProfile({
                          ...userProfile,
                          name: e.target.value,
                        });
                      }}
                      required
                    />
                  </Grid>
                  <Grid item md={4} sm={4} xs={12} className={classes.formBox}>
                    <TextField
                      label="Email"
                      name="clientrepnu"
                      id="clientrepnu"
                      disabled
                      defaultValue={userProfile.email}
                      value={userProfile.email}
                      onChange={(e) => {
                        setUserProfile({
                          ...userProfile,
                          email: e.target.value,
                        });
                      }}
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={4} sm={4} xs={12} className={classes.formBox}>
                    <TextField
                      label="Mobile"
                      name="mobile"
                      id="mobile"
                      defaultValue={number}
                      value={number}
                      onChange={(e) => {
                        // setUserProfile({
                        //   ...userProfile,
                        //   mobile: e.target.value,
                        // });
                        setNumber(e.target.value);
                      }}
                      fullWidth
                      variant="outlined"
                      disabled={
                        userProfile.mobile === null || userProfile.mobile === ""
                          ? false
                          : true
                      }
                    />
                  </Grid>

                  <Grid item md={4} sm={4} xs={12} className={classes.formBox}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel id="project-name-label">
                        Department
                      </InputLabel>
                      <Select
                        id="department"
                        labelId="department"
                        label="Department"
                        value={userDepartment}
                        multiple
                        // disabled={departments.length === 0}
                        onChange={(e) => {
                          // setUserDepartment(e.target.value);
                          handleChangeSelect(e);

                          setUserProfile({
                            ...userProfile,
                            department: e.target.value,
                          });
                        }}
                      >
                        {departments.map((one) => {
                          return (
                            <MenuItem value={one.id}>
                              {one.departmentName}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item md={4} sm={4} xs={12} className={classes.formBox}>
                    <TextField
                      label="Badge no"
                      name="badgeno"
                      id="badgeno"
                      defaultValue={userProfile.badgeNo}
                      value={userProfile.badgeNo}
                      onChange={(e) => {
                        setUserProfile({
                          ...userProfile,
                          badgeNo: e.target.value,
                        });
                      }}
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={12} sm={12} xs={12}>
                    <Grid container spacing={3}>
                      <Grid
                        item
                        md={4}
                        sm={4}
                        xs={12}
                        className={classes.formBox}
                      >
                        <FormControl variant="outlined" fullWidth>
                          <InputLabel id="country">Country</InputLabel>
                          <Select
                            id="country"
                            labelId="country"
                            label="Country"
                            value={countryObj.country}
                            onChange={(e) => {
                              setCountryObj({
                                ...countryObj,
                                country: e.target.value,
                              });
                              setUserProfile({
                                ...userProfile,
                                country: e.target.value,
                                timeZone: timezone,
                              });
                              getStates(e.target.value);
                            }}
                          >
                            {countries.map((one) => {
                              return (
                                <MenuItem
                                  id={one.countryId}
                                  key={one.countryId}
                                  value={one.countryName}
                                >
                                  {one.countryName}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid
                        item
                        md={4}
                        sm={4}
                        xs={12}
                        className={classes.formBox}
                      >
                        <FormControl variant="outlined" fullWidth>
                          <InputLabel id="state">State</InputLabel>
                          <Select
                            id="states"
                            labelId="states"
                            label="States"
                            value={countryObj.state}
                            onChange={(e) => {
                              setCountryObj({
                                ...countryObj,
                                state: e.target.value,
                              });
                              setUserProfile({
                                ...userProfile,
                                state: e.target.value,
                              });
                              getCities(e.target.value);
                            }}
                          >
                            {states.map((one) => {
                              return (
                                <MenuItem
                                  id={one.stateId}
                                  key={one.stateId}
                                  value={one.stateName}
                                >
                                  {one.stateName}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid
                        item
                        md={4}
                        sm={4}
                        xs={12}
                        className={classes.formBox}
                      >
                        <FormControl variant="outlined" fullWidth>
                          <InputLabel id="city">City</InputLabel>
                          <Select
                            id="states"
                            labelId="states"
                            label="States"
                            value={countryObj.city}
                            onChange={(e) => {
                              setCountryObj({
                                ...countryObj,
                                city: e.target.value,
                              });
                              setUserProfile({
                                ...userProfile,
                                city: e.target.value,
                              });
                            }}
                          >
                            {cities.map((one) => {
                              return (
                                <MenuItem
                                  id={one.cityId}
                                  key={one.cityId}
                                  value={one.cityName}
                                >
                                  {one.cityName}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid
                        item
                        md={12}
                        sm={12}
                        xs={12}
                        className={classes.formBox}
                      >
                        <TextField
                          label="Time zone"
                          name="timezone"
                          id="timezone"
                          defaultValue={timezone}
                          value={timezone}
                          onChange={(e) => {
                            setUserProfile({
                              ...userProfile,
                              timeZone: e.target.value,
                            });
                          }}
                          fullWidth
                          variant="outlined"
                          disabled
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    md={12}
                    sm={12}
                    xs={12}
                    className={classes.formBox}
                  >
                    <FormControl component="fieldset">
                      <FormLabel
                        component="legend"
                        className={classes.innerLabelHead}
                      >
                        Status
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        className={classes.customeRadioBTN}
                        value={statusVal?.toString() || ""}
                        onChange={(e) => {
                          setUserProfile({
                            ...userProfile,
                            status: e.target.value,
                          });
                          setStatusVal(e.target.value);
                        }}
                      >
                        <FormControlLabel
                          value={"true"}
                          control={<Radio />}
                          label="Active"
                          // checked={statusVal === true}
                          // disabled
                        />
                        <FormControlLabel
                          value={"false"}
                          // disabled
                          control={<Radio />}
                          label="Inactive"
                          // checked={statusVal === false}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Fragment>
              </Grid>
            </Paper>
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <Button
              size="medium"
              variant="contained"
              className={classes.buttonStyle}
              onClick={(e) => handleClickUpdateSuccess(e)}
            >
              Update
            </Button>
            <Button
              size="medium"
              variant="contained"
              className={classes.custmCancelBtn}
              onClick={goBackHandler}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      ) : (
        <PaceLoader />
      )}
      {/* End user details section */}

      <Dialog
        maxWidth={maxWidth}
        onClose={handleCloseDelete}
        aria-labelledby="customized-dialog-title"
        open={deleteAddress}
      >
        <DialogContent>
          <Grid container spacing={2}>
            <Grid
              item
              md={12}
              sm={12}
              xs={12}
              className={classes.topMessageDilog}
            >
              <Typography variant="h3" align="center">
                <img
                  src="https://media.pace-os.com/icons/svg/success-72x72.svg"
                  alt="success"
                />
              </Typography>
              <Typography variant="h2" align="center">
                Done
              </Typography>
            </Grid>
            <Grid
              item
              md={12}
              sm={12}
              xs={12}
              align="center"
              className={classes.deleteMassBox}
            >
              <Typography variant="h6" align="center">
                User details update successfully
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={hasError}
        autoHideDuration={3000}
        onClose={() => {
          setHasError(false);
          setErrorMsg("");
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        className="snackbarAlertBox"
      >
        <Alert
          onClose={() => {
            setHasError(false);
            setErrorMsg("");
          }}
          severity={"error"}
        >
          {errorMsg}
        </Alert>
      </Snackbar>
    </Fragment>
  );
};

export default UpdateUserProfile;
