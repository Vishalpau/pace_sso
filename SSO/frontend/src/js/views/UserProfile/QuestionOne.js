import {
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
  withStyles,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

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

const QuestionOne = (props) => {
  const { classes } = props;

  const [showPass, setShowPass] = useState(false);

  const [oneQuestAns, setOneQuestAns] = useState({
    questionId: 0,
    // question: "",
    answer: props.answer,
  });

  const handleClickShowSecQuestionOne = () => {
    setShowPass(!showPass);
  };

  const handleChangeQOne = (e, questionId) => {
    setOneQuestAns({
      questionId: questionId,
      //   question,
      answer: e.target.value,
    });
  };

  useEffect(() => {
    props.oneQuestAns(oneQuestAns);
  }, [oneQuestAns.answer]);

  return (
    <>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        align="center"
        className={classNames(classes.securityQuesInput, classes.formBox)}
      >
        <Typography
          component="body1"
          variant="body1"
          className={classes.questionInputLabel}
        >
          {" "}
          {props.question}
        </Typography>
        <FormControl fullWidth>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPass ? "text" : "password"}
            value={oneQuestAns.answer}
            onChange={(e) =>
              handleChangeQOne(e, props.questionId, props.question)
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowSecQuestionOne}
                  edge="end"
                >
                  {showPass ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>
      </Grid>
    </>
  );
};

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default withRouter(
  connect(
    //mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles, { withTheme: true })(QuestionOne))
);
