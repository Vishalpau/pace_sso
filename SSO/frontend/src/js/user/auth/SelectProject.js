import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  borderTop: {
    borderTop: '1px solid #ccc',
    paddingTop: '15px',
  }
}));

export default function SelectProject() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <Typography className={classes.heading}>Amrut Projects</Typography>      
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}><AddIcon /> Phase</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ul className={classes.borderTop}>
            <li><ArrowRightIcon /> Unit 1</li>
            <li><ArrowRightIcon /> Unit 1</li>
            <li><ArrowRightIcon /> Unit 1</li>
            <li><ArrowRightIcon /> Unit 1</li>
          </ul>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography className={classes.heading}><AddIcon /> Phase</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <ul className={classes.borderTop}>
            <li><ArrowRightIcon /> Unit 1</li>
            <li><ArrowRightIcon /> Unit 1</li>
            <li><ArrowRightIcon /> Unit 1</li>
            <li><ArrowRightIcon /> Unit 1</li>
          </ul>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography className={classes.heading}><AddIcon /> Phase</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <AccordionDetails>
        <ul className={classes.borderTop}>
            <li><ArrowRightIcon /> Unit 1</li>
            <li><ArrowRightIcon /> Unit 1</li>
            <li><ArrowRightIcon /> Unit 1</li>
            <li><ArrowRightIcon /> Unit 1</li>
          </ul>
        </AccordionDetails>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography className={classes.heading}><AddIcon /> Phase</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <ul className={classes.borderTop}>
            <li><ArrowRightIcon /> Unit 1</li>
            <li><ArrowRightIcon /> Unit 1</li>
            <li><ArrowRightIcon /> Unit 1</li>
            <li><ArrowRightIcon /> Unit 1</li>
          </ul>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
