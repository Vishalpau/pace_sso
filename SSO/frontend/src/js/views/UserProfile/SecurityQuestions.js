import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import {
  DialogTitle,
  OutlinedInput,
  InputAdornment,
  CircularProgress,
  Typography,
  FormControl,
  IconButton,
  Grid,
  withStyles,
  Button,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import classNames from "classnames";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import QuestionOne from "./QuestionOne";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const styles = (theme) => ({
  userProfileSection: {
    padding: "24px;",
  },
  textCenter: {
    textAlign: "center",
  },
  buttonStyleNext: {
    color: "#ffffff !important",
    padding: "5px 20px",
    fontSize: "16px",
    marginRight: "15px",
    textTransform: "none",
    backgroundColor: "#06425C",
    borderRadius: "25px",
    boxShadow: "none",
    border: "1px solid #06425C",
    float: "right",
    "&:hover": {
      backgroundColor: "#F28705",
      borderColor: "#F28705",
    },
  },
  dialogSection: {
    "& .MuiPaper-root.MuiDialog-paper": {
      width: "650px",
    },
  },
  questionInputLabel: {
    color: "#06425C",
    width: "100%",
    marginBottom: "10px",
    textAlign: "left",
    fontFamily: "Montserrat-SemiBold",
    fontSize: "14px",
    lineHeight: "18px",
    display: "inline-block",
    float: "left",
  },
  securityQuesInput: {
    "& .MuiFormControl-root": {
      "& fieldset": {
        "& legend": {
          width: "auto",
        },
      },
    },
  },
  securityQuesInput: {
    "& .MuiFormControl-root": {
      "& fieldset": {
        "& legend": {
          width: "auto",
        },
      },
    },
  },
  paddTRemove: {
    paddingTop: "0px !important",
  },
  securityQLabel: {
    color: "#06425C",
    fontSize: "16px !important",
    fontFamily: "Montserrat-Medium !important",
    lineHeight: "19px",
    fontWeight: "normal",
  },
  buttonStyle: {
    color: "#ffffff !important",
    padding: "7px 20px",
    fontSize: "14px",
    //marginRight: '15px',
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
  securityQstatus: {
    "& ul": {
      paddingTop: "0px",
      "& li": {
        padding: "0px",
        "& .MuiListItemAvatar-root": {
          marginTop: "5px",
          minWidth: "48px",
        },
        "& .MuiListItemText-root": {
          margin: "0px",
          "& .MuiListItemText-primary": {
            color: "#06425C",
            fontSize: "16px",
            fontFamily: "Montserrat-SemiBold !important",
            lineHeight: "19px",
            whiteSpace: "normal",
          },
        },
      },
    },
  },
  contentTitle: {
    fontSize: "30px",
    lineHeight: "50px",
    fontFamily: "xolonium",
    color: "#054D69",
    paddingBottom: "5px",
    borderBottom: "1px solid #d6d9da",
    marginBottom: "30px",
    [theme.breakpoints.down("md")]: {
      fontSize: "22px",
      lineHeight: "40px",
    },
  },
});

const SecurityQuestions = (props) => {
  const { classes } = props;

  const fkData = [
    {
      questionId: 1,
      question: "What is your name?",
    },
    {
      questionId: 2,
      question: "What is your middle name?",
    },
    {
      questionId: 3,
      question: "What is your spouce name?",
    },
    {
      questionId: 4,
      question: "Where do you live?",
    },
  ];

  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [openSnackbar, setopenSnackbar] = useState(false);

  const [securitValuesOne, setSecuritValuesOne] = useState({
    password: "",
    showPassword: false,
  });

  const [allSecurityQuestions, setAllSecurityQuestions] = useState([]);
  const [questErr, setQuestErr] = useState("");

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleChangeQOne = (oneQuestAns) => {
    if (answeredQuestions.length > 0) {
      const filteredOne = answeredQuestions.filter(
        (one) => one.questionId === oneQuestAns.questionId
      );
      if (filteredOne.length < 1) {
        setAnsweredQuestions([...answeredQuestions, oneQuestAns]);
      } else {
        let updatedList = answeredQuestions.map((item) => {
          if (item.questionId === oneQuestAns.questionId) {
            return {
              questionId: oneQuestAns.questionId,
              //   question: oneQuestAns.question,
              answer: oneQuestAns.answer,
            };
          }
          return item;
        });
        setAnsweredQuestions(updatedList);
      }
    } else if (oneQuestAns.questionId !== 0) {
      setAnsweredQuestions([...answeredQuestions, oneQuestAns]);
    }
    setError("");
  };

  useEffect(() => {
    console.log(answeredQuestions, "answeredQuestions");
  }, [answeredQuestions]);

  const handleClickShowSecQuestionOne = () => {
    setSecuritValuesOne({
      ...securitValuesOne,
      showPassword: !securitValuesOne.showPassword,
    });
  };

  const [error, setError] = useState("");
  const [laodingButton, setLaodingButton] = useState(false);

  const handleSaveSecurityQuestions = (e) => {
    const user = localStorage.getItem("user");
    if (answeredQuestions.length >= 3) {
      setLaodingButton(true);
      axios({
        url:
          process.env.API_URL +
          process.env.API_VERSION +
          "/user/" +
          user +
          "/securityquestions/answers/",
        method: "POST",
        data: { data: answeredQuestions },
      })
        .then((res) => {
          console.log({ result: res });
          setLaodingButton(true);
          setTimeout(() => {
            props.handleCloseAssignDepartment();
          }, 400);
        })
        .catch((err) => {
          console.log({ err: err });
          this.setState({ loading: false });
          if (err.response && err.response.status == 400) {
            setError(err.response.data.data.results);
          }
        });
    } else {
      setError("Please fill atleast 3 question's answer.");
    }
  };

  const getSecQuestions = async () => {
    const loggedInId = JSON.parse(localStorage.getItem("verifiedUserId"));

    if (
      props.view === "dashboard" &&
      window.location.pathname.includes("dashboard")
    ) {
      await axios({
        url:
          process.env.API_URL +
          process.env.API_VERSION +
          "/user/securityquestions/",
        method: "GET",
      })
        .then((res) => {
          console.log({ result: res }, "sec_questions");
          setAllSecurityQuestions(res.data.data.results);
        })
        .catch((err) => {
          console.log({ err: err });
          this.setState({ loading: false });
          if (err.response && err.response.status == 400) {
            setQuestErr(err.response.data.data.results);
            setopenSnackbar(true);
          }
        });
    } else if (window.location.pathname.includes("userprofile")) {
      await axios({
        url:
          process.env.API_URL +
          process.env.API_VERSION +
          "/user/" +
          loggedInId +
          "/securityquestions/",
        method: "GET",
      })
        .then((res) => {
          console.log({ result: res }, "sec_questions");
          setAllSecurityQuestions(res.data.data.results);
        })
        .catch((err) => {
          console.log({ err: err });

          if (err.response && err.response.status == 400) {
            setQuestErr(err.response.data.data.results);
            setopenSnackbar(true);
          }
        });
    }
  };

  useEffect(() => {
    console.log(questErr, "questErr");
  }, [questErr]);

  useEffect(() => {
    getSecQuestions();
  }, []);

  return (
    <div>
      <Dialog
        maxWidth={"md"}
        onClose={
          props.view === "dashboard" && props.assignDepartment === true
            ? ""
            : props.handleCloseAssignDepartment
        }
        aria-labelledby="customized-dialog-title"
        className={classes.dialogSection}
        open={props.assignDepartment}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={
            props.view === "dashboard" && props.assignDepartment === true
              ? ""
              : props.handleCloseAssignDepartment
          }
        >
          Set your security questions/answers.
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            {allSecurityQuestions.length > 0 ? (
              <>
                {error ? (
                  <p
                    style={{
                      color: "red",
                      fontSize: 14,
                      paddingLeft: 7,
                      marginBottom: 7,
                    }}
                  >
                    {error}
                  </p>
                ) : (
                  ""
                )}
                {allSecurityQuestions.map((one) => {
                  return (
                    <>
                      <QuestionOne
                        question={one.question}
                        answer={one.answer ? one.answer : ""}
                        questionId={one.questionId}
                        oneQuestAns={(oneQuestAns) =>
                          handleChangeQOne(oneQuestAns)
                        }
                      />
                    </>
                  );
                })}
              </>
            ) : (
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                align="center"
                className={classNames(
                  classes.securityQuesInput,
                  classes.formBox,
                  classes.textCenter
                )}
              >
                {questErr !== "" ? (
                  <Typography align="center" variant="h5">
                    {questErr}
                  </Typography>
                ) : (
                  <CircularProgress size={20} />
                )}
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions className={classes.popActionArea}>
          <Grid container spacing={2}>
            <Grid item md={12} sm={12} xs={12}>
              {props.view === "userProfile" ? (
                <Button
                  autoFocus
                  color="primary"
                  className={classes.custmTextBtn}
                  onClick={props.handleCloseAssignDepartment}
                >
                  Skip and continue
                </Button>
              ) : (
                ""
              )}
              {questErr === "" && (
                <Button
                  autoFocus
                  className={classes.buttonStyleNext}
                  onClick={(e) => handleSaveSecurityQuestions(e)}
                >
                  Save{" "}
                  {laodingButton ? (
                    <CircularProgress
                      style={{ marginLeft: 10, color: "#fff" }}
                      size={12}
                    />
                  ) : (
                    ""
                  )}
                </Button>
              )}
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={() => setopenSnackbar(false)}
        className="snackbarAlertBox"
      >
        <Alert
          onClose={() => setopenSnackbar(false)}
          severity={questErr ? "error" : "success"}
        >
          {questErr}
        </Alert>
      </Snackbar>
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default withRouter(
  connect(
    //mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles, { withTheme: true })(SecurityQuestions))
);
