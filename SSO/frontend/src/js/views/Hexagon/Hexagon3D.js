import React, { Component, forwardRef, Fragment } from "react";
import PropTypes from "prop-types";
import "../../../../../frontend/src/App.css";
import "./ThDStyle.css";
import { ContactsOutlined } from "@material-ui/icons";
import projectInformationHub from "../../../../../static/public/images/LoginImg/projectInformationHub.svg";
import HSEManagement from "../../../../../static/public/images/LoginImg/HSEManagement.png";
import safetyPlotManager from "../../../../../static/public/images/LoginImg/safetyPlotManager.svg";
import controlTower from "../../../../../static/public/images/LoginImg/controlTower.svg";
import incidentManagement2 from "../../../../../static/public/images/LoginImg/incidentManagement2.svg";
import compliance from "../../../../../static/public/images/LoginImg/compliance.svg";
import icare from "../../../../../static/public/images/LoginImg/icare.svg";
import assessment from "../../../../../static/public/images/LoginImg/assessment.svg";
import actionTracker from "../../../../../static/public/images/LoginImg/actionTracker.svg";
import permitManagement from "../../../../../static/public/images/LoginImg/permitManagement.svg";
import controlTower10 from "../../../../../static/public/images/LoginImg/controlTower10.svg";
import mediaChannel from "../../../../../static/public/images/LoginImg/mediaChannel.svg";
import advanceanalytics from "../../../../../static/public/images/LoginImg/advanceanalytics.svg";
import assetmanagement from "../../../../../static/public/images/LoginImg/assetmanagement.svg";
import competencymanagement from "../../../../../static/public/images/LoginImg/competencymanagement.svg";
import cwp from "../../../../../static/public/images/LoginImg/cwp.svg";
import designdeliverable from "../../../../../static/public/images/LoginImg/designdeliverable.svg";
import engineeringquantities from "../../../../../static/public/images/LoginImg/engineeringquantities.svg";
import equipmentmanagement from "../../../../../static/public/images/LoginImg/equipmentmanagement.svg";
import ewp from "../../../../../static/public/images/LoginImg/ewp.svg";
import iwp from "../../../../../static/public/images/LoginImg/iwp.svg";
import fabricationquantities from "../../../../../static/public/images/LoginImg/fabricationquantities.svg";
// import permitmanagement from "../../../../../static/public/images/LoginImg/permitmanagement.svg";
import preconstructionallocation from "../../../../../static/public/images/LoginImg/preconstructionallocation.svg";
import rapidknowledgecollaboration from "../../../../../static/public/images/LoginImg/rapidknowledgecollaboration.svg";
import servicemanagement from "../../../../../static/public/images/LoginImg/servicemanagement.svg";
import broadcastMediaChannel from "../../../../../static/public/images/LoginImg/broadcastMediaChannel.svg";
import timeResourceTracker from "../../../../../static/public/images/LoginImg/timeResourceTracker.svg";

import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import {
  Grid, Typography
} from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';



const useStyles = theme => ({

  PortfolioLegend: {
    display: 'block',
    width: '100%',
    float: 'left',
    padding: '0px',
    '& li .MuiListItemText-root .MuiListItemText-primary': {
      fontSize: '16px',
      fontFamily: 'Montserrat-Regular',
      lineHeight: '19px',
      color: '#666666',
    },
    '& li:nth-child(1)': {
      width: '110px',
      float: 'left',
    },
    '& li:nth-child(2)': {
      width: '120px',
      float: 'left',
    },
    '& li:nth-child(3)': {
      width: '200px',
      float: 'left',
    },
  },
  legendIconBox: {
    padding: '10px',
    display: 'block',
    borderRadius: '3px',
    width: '10px',
    height: '10px',
    backgroundColor: '#ddd',
    marginRight: '10px',
    float: 'left',
  },
});

class Hexagon3D extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subscriptions: [],
      user: [],
      applications: [],
      codes: [],
      modules: [],
      phaseId: '',
      unitId: '',
      companyCode: '',
      pace10hexagon: false
    }
  }


  componentDidMount = () => {
    // alert(1223)
    // this.getClassicOnlySub();
    this.getSubscriptions();

    const pace10hexagon = localStorage.getItem('pace10hexagon')

    if (pace10hexagon != undefined) {
      this.setState({ pace10hexagon: pace10hexagon })
    }


  }


  getSubscriptions = async () => {

    // console.log({'props_comp':this.props.companyCode})
    // if(this.props.companyCode!==undefined){ 

    //   if(typeof this.props.companyCode !== 'string'){
    //   console.log('inside')
    //   this.setState({ companyCode: this.props.companyCode.companyCode })
    //   console.log(this.state.companyCode)
    // }
    // }

    await console.log({ 'hex_props': this.props })
    await console.log({ 'hex_companycode_local': localStorage.getItem('companyCode') })
    console.log({ 'hex_companycode_props': this.props.companyCode })

    const companyId = localStorage.getItem('companyId')

    if (localStorage.getItem('companyCode') != undefined) {
      await this.setState({ companyCode: JSON.parse(localStorage.getItem('companyCode')).companyCode })
    }

    if (localStorage.getItem('pace10hexagon') != undefined) {
      await this.setState({ pace10hexagon: localStorage.getItem('pace10hexagon') })
    }

    let data = await axios
      .get(process.env.API_URL + process.env.API_VERSION + '/user/self/' + companyId + '/')
      .then(function (res) {
        console.log({ data: res.data.data.results.data.companies })
        return res.data.data.results.data.companies[0].subscriptions;
      })
      .catch(function (error) {
        console.log(error);
      });

    this.setState({ subscriptions: data });


    console.log({ pace10hexagon: this.state.pace10hexagon })

    console.log({ module_data: data })
    // console.log({applications: data.map(app=>app.appId)})
    const modules = data.map(subscription => subscription.modules)

    console.log({ modules111: modules })
    this.setState({ modules: modules })

    var modulesState = []
    var temp = []
    modules.map(module =>
    // console.log({code_in:module})
    {
      modulesState = [...modulesState]
      temp = [...temp]
      if (module.length > 0) {
        module.map(mod =>

        // console.log({code_in:mod})
        {
          modulesState.push(mod)
          this.setState({ modules: module })
          if (mod.subscriptionStatus == 'active') {

            temp.push(mod.moduleCode)
            console.log({ 'temp11': temp })
            this.setState({ codes: temp })
            console.log({ 'temp12': this.state.codes })
            return temp
          }
        }
        )

        // this.setState({ codes: codes })

      }
    })
    console.log({ modulestate: modulesState })

    //    {
    //   if (module.length > 0) {
    //     if (module.subscription_status == 'active') {
    //       return module.moduleCode;
    //     }
    //   }
    // }

    // this.setState({ codes: codes })




    // this.getModules(apps)

  }

  getModules = async (apps) => {

    let data = await axios
      .post(process.env.API_URL + process.env.API_VERSION + '/applications/modules/', data = { "fkAppId": apps })
      .then(function (res) {
        console.log({ data: res.data.data.results })
        return res.data.data.results;
      })
      .catch(function (error) {
        console.log(error);
      });

    this.setState({ modules: data })
    const codes = data.map(module => module.moduleCode)

    this.setState({ codes: codes })

    console.log({ codes: codes })
  }

  // handleClick = (appCode) => {
  //   console.log('in handle click')
  //   console.log({modules: this.state.modules})
  //   let fkAppId = this.state.modules.map(module => {
  //     console.log({modulecode: module.moduleCode})
  //     console.log({appcode: appCode})
  //     if (module.moduleCode == appCode) {
  //       return module.fkAppId;
  //     }
  //   }).join(' ')
  //   console.log({appId: this.state.modules})

  //   let targetPage = this.state.modules.map(module => {
  //     if (module.moduleCode == appCode) {
  //       return module.targetPage;
  //     }
  //   }).join(' ')

  //   console.log({ sub: this.state.subscriptions })
  //   let hostings = this.state.subscriptions.map(apps => {
  //     console.log({appId: fkAppId})
  //     console.log({apps: apps})
  //     if (fkAppId == apps.appId) {
  //       console.log({ hostings1: apps.hostings })
  //       return apps.hostings;
  //     }
  //   });

  //   console.log({ hostings1111: hostings })
  //   Object.keys(hostings).forEach(key => hostings[key] == undefined && delete hostings[key]);

  //   // var array = [0, 1, null, 2, "", 3, undefined, 3,,,,,, 4,, 4,, 5,, 6,,,,];

  //   var filtered = hostings.filter(function (el) {
  //     return el != null;
  //   });

  //   console.log({filtered: filtered})
  //   // return;
  //   // hostings = hostings[0]
  //   console.log({ hostings: hostings })
  //   if (filtered != undefined) {
  //     // alert(localStorage.getItem('companyId'))
  //     const clientId = filtered[0][0].clientId
  //     window.open(
  //       window.location.href = process.env.API_URL + process.env.API_VERSION + '/user/auth/authorize/?client_id=' + clientId + '&response_type=code&targetPage=' + targetPage + '&companyId=' + localStorage.getItem('companyId') + '&projectId=' + localStorage.getItem('ssoProjectId'),
  //       '_blank' // <- This is what makes it open in a new window.
  //     );
  //   }

  //   // window.open(
  //   //   window.location.href = process.env.API_URL + process.env.API_VERSION + '/user/auth/authorize/?client_id='+clientId+'&response_type=code',
  //   //   '_blank' // <- This is what makes it open in a new window.
  //   // );

  // }


  handleClick = async (appCode) => {
    let data = await axios
      .get(process.env.API_URL + process.env.API_VERSION + '/applications/modules/' + appCode + '/' + localStorage.getItem('companyId') + '/')
      .then(function (res) {
        console.log({ data: res.data.data.results })
        return res.data.data.results;
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log({ 'hostings': data.hostings })
    if (data.hostings != undefined) {
      const targetPage = (data.modules ? data.modules.targetPage : "")
      // alert(localStorage.getItem('companyId'))
      const clientId = data.hostings.clientId
      console.log({ 'data.modules': data.modules.moduleCode })
      console.log({ 'hhhh': data.modules.moduleCode.includes('PMC10', 'IPM10', 'COP10') })
      console.log({ 'phaseId:': localStorage.getItem('phaseId') })

      const phaseId = localStorage.getItem('phaseId') ? localStorage.getItem('phaseId') : 1
      const unitId = localStorage.getItem('unitId') ? localStorage.getItem('unitId') : 1

      const firstlevel = localStorage.getItem('firstlevel') ? localStorage.getItem('firstlevel') : ''
      const secondlevel = localStorage.getItem('secondlevel') ? localStorage.getItem('secondlevel') : ''
      const lastlevel = localStorage.getItem('lastlevel') ? localStorage.getItem('lastlevel') : ''
      const companyCode = this.state.companyCode
      const pace10hexagon = this.state.pace10hexagon
      // const projectStructure = firstlevel + ':' + secondlevel + ':' + lastlevel

      if (data.modules.moduleCode == 'HSE' && companyCode == 'NTPC1004') {
        window.open(process.env.API_URL + process.env.API_VERSION + '/user/auth/authorize/?client_id=' + clientId + '&response_type=code&targetPage=' + targetPage + '&companyId=' + localStorage.getItem('companyId') + '&projectId=' + JSON.parse(localStorage.getItem('project')).vendorReferenceId + '&phaseId=' + phaseId + '&unitId=' + unitId + '&moduleType=' + 1,
          '_blank')
      }
      else if (data.modules.moduleCode == 'ProjectInfo' && companyCode == 'NTPC1004') {
        window.open(process.env.API_URL + process.env.API_VERSION + '/user/auth/authorize/?client_id=' + clientId + '&response_type=code&targetPage=' + targetPage + '&companyId=' + localStorage.getItem('companyId') + '&projectId=' + JSON.parse(localStorage.getItem('project')).vendorReferenceId + '&phaseId=' + phaseId + '&unitId=' + unitId + '&moduleType=' + 2,
          '_blank')
      }
      else if (data.modules.moduleCode == 'IPM10') {
        window.open(process.env.API_URL + process.env.API_VERSION + '/user/auth/authorize/?client_id=' + clientId + '&response_type=code&targetPage=' + targetPage + '&companyId=' + localStorage.getItem('companyId') + '&projectId=' + JSON.parse(localStorage.getItem('project')).vendorReferenceId + '&phaseId=' + phaseId + '&unitId=' + unitId + '&type=2&wctype=iwp',
          '_blank')
      }
      else if (data.modules.moduleCode == 'MAM10') {
        window.open(process.env.API_URL + process.env.API_VERSION + '/user/auth/authorize/?client_id=' + clientId + '&response_type=code&targetPage=' + targetPage + '&companyId=' + localStorage.getItem('companyId') + '&projectId=' + JSON.parse(localStorage.getItem('project')).vendorReferenceId + '&phaseId=' + phaseId + '&unitId=' + unitId,
          '_blank')
      }

      else if (data.modules.moduleCode == 'PMC10' || data.modules.moduleCode == 'COP10') {
        window.open(process.env.API_URL + process.env.API_VERSION + '/user/auth/authorize/?client_id=' + clientId + '&response_type=code&targetPage=' + targetPage + '&companyId=' + localStorage.getItem('companyId') + '&projectId=' + JSON.parse(localStorage.getItem('project')).vendorReferenceId + '&phaseId=' + phaseId + '&unitId=' + unitId,
          '_blank')
      }
      // else if (companyCode.includes('SCDJV', 'SCDJVSTAGE')) {
      else if (pace10hexagon) {
        if (data.modules.moduleCode == 'gis') {
          window.open(process.env.API_URL + process.env.API_VERSION + '/user/auth/authorize/?client_id=' + process.env.client_id_gis + '&response_type=code&targetPage=gis_setup' + '&companyId=' + localStorage.getItem('companyId') + '&projectId=' + localStorage.getItem('ssoProjectId'), '_blank')
        }
        else {
          console.log('in else')
          window.open(process.env.API_URL + process.env.API_VERSION + '/user/auth/authorize/?client_id=' + clientId + '&response_type=code&targetPage=' + targetPage + '&companyId=' + localStorage.getItem('companyId') + '&projectId=' + JSON.parse(localStorage.getItem('project')).vendorReferenceId + '&phaseId=' + phaseId + '&unitId=' + unitId,
            '_blank')
        }

      }
      else if (data.modules.moduleCode == 'gis') {
        window.open(process.env.API_URL + process.env.API_VERSION + '/user/auth/authorize/?client_id=' + process.env.client_id_gis + '&response_type=code&targetPage=gis_setup' + '&companyId=' + localStorage.getItem('companyId') + '&projectId=' + localStorage.getItem('ssoProjectId'), '_blank')
      }
      else {
        // console.log({ 'id': JSON.parse(localStorage.getItem('project')).vendorReferenceId })
        window.open(process.env.API_URL + process.env.API_VERSION + '/user/auth/authorize/?client_id=' + clientId + '&response_type=code&targetPage=' + targetPage + '&companyId=' + localStorage.getItem('companyId') + '&projectId=' + localStorage.getItem('ssoProjectId') + '&projectStructure=' + localStorage.getItem('selectedProjectStructure'),
          '_blank') // <- This is what makes it open in a new window.
      }


    }
  }

  handleDisableModule = (appcode) => {
    // alert(appcode)
    let moduleDisable = this.state.modules.map(module => {
      if (module.moduleCode == appCode) {
        return false;
      }
      else {
        return true
      }
    })[0]

    console.log(moduleDisable)
  }
  render() {
    const {
      classes,
    } = this.props;

    const { todos } = this.state;
    console.log({ codes: this.state.codes })
    const { modules } = this.state
    const { companyCode } = this.state

    console.log({ 'props_render': this.props })
    // if(companyCode!=''){
    //  var companyCode= JSON.parse(localStorage.getItem('companyCode')).companyCode
    // }

    console.log({ companycode_render: companyCode })
    return (
      (this.props.pace10hexagon != undefined ? !this.props.pace10hexagon : true) ?
        (<Fragment>
          <div className="cubeSection">
            <div className="cubeSectionCenter">
              <div className="cubeArea row1">

                {/* start blank hexagon structure */}
                {/* <div className="cubeBox cubeBlankPlain"></div> */}
                {/* end blank hexagon structure */}

                <div
                  className="cubeBox cubeBlank">
                  <div className="boxLayerLeft"></div>
                  <div className="boxLayerRight"></div>
                  <div className="boxLayerTop"></div>
                  {/* <div className="cubeInnerText">
                        <i><img src={projectInformationHub} title="Project information" alt="Pace OS" /></i>
                        <p>Project Information Hub</p>
                    </div> */}
                </div>
                <div className="cubeBox cubeBlank">
                  {/* <div  onClick={() => this.handleClick('HSE')} className={(this.state.codes.includes('HSE'))?"cubeBox":"cubeBox cubeInactive"}> */}
                  <div className="boxLayerLeft"></div>
                  <div className="boxLayerRight"></div>
                  <div className="boxLayerTop"></div>
                  {/* <div className="cubeInnerText">
                  <i>
                    <img src={HSEManagement} alt="module-icon" />
                  </i>
                  <p>HSE Management</p>
                </div> */}
                </div>

                {/* <div className="cubeBox cubeAccessRestricted"> */}
                <div onClick={() => this.handleClick('controltower')} className={(this.state.codes.includes('controltower')) ? "cubeBox" : "cubeBox cubeInactive"}>
                  <div className="boxLayerLeft"></div>
                  <div className="boxLayerRight"></div>
                  <div className="boxLayerTop"></div>
                  <div className="cubeInnerText">
                    <i>
                      <img src={controlTower} alt="module-icon" />
                    </i>
                    <p>Control Tower</p>
                  </div>
                </div>
                {/* <div className="cubeBox"> */}
                <div onClick={() => this.handleClick('gis')} className={(this.state.codes.includes('gis')) ? "cubeBox" : "cubeBox cubeInactive"}>
                  <div className="boxLayerLeft"></div>
                  <div className="boxLayerRight"></div>
                  <div className="boxLayerTop"></div>
                  <div className="cubeInnerText">
                    <i>
                      <img src={safetyPlotManager} alt="module-icon" />
                    </i>
                    <p>Safety Plot Manager</p>
                  </div>
                </div>
                <div className="cubeBox cubeBlank">
                  {/* <div onClick={() => this.handleClick('ProjectInfo')} className={(this.state.codes.includes('ProjectInfo'))?"cubeBox":"cubeBox cubeInactive"}> */}
                  <div className="boxLayerLeft"></div>
                  <div className="boxLayerRight"></div>
                  <div className="boxLayerTop"></div>
                  {/* <div className="cubeInnerText">
                  <i >
                    <img src={projectInformationHub} alt="module-icon" />
                  </i>
                  <p>Project Information Hub</p>
                </div> */}
                </div>
                <div className="cubeBox cubeBlank">
                  {/* <div  onClick={() => this.handleClick('HSE')} className={(this.state.codes.includes('HSE'))?"cubeBox":"cubeBox cubeInactive"}> */}
                  <div className="boxLayerLeft"></div>
                  <div className="boxLayerRight"></div>
                  <div className="boxLayerTop"></div>
                  {/* <div className="cubeInnerText">
                  <i>
                    <img src={HSEManagement} alt="module-icon" />
                  </i>
                  <p>HSE Management</p>
                </div> */}
                </div>
              </div>
              {/* End first row  */}
              {/* Start Second row  */}
              <div className="cubeArea row-2">
                {/* <div className="cubeBox cubeBlank"> */}
                <div onClick={() => this.handleClick('ProjectInfo')} className={(this.state.codes.includes('ProjectInfo')) ? "cubeBox" : "cubeBox cubeInactive"}>
                  <div className="boxLayerLeft"></div>
                  <div className="boxLayerRight"></div>
                  <div className="boxLayerTop"></div>
                  <div className="cubeInnerText">
                    <i >
                      <img src={projectInformationHub} alt="module-icon" />
                    </i>
                    <p>Project Information Hub</p>
                  </div>
                </div>
                {/* <div className="cubeBox cubeAccessRestricted"> */}
                <div onClick={() => this.handleClick('HSE')} className={(this.state.codes.includes('HSE')) ? "cubeBox" : "cubeBox cubeInactive"}>
                  <div className="boxLayerLeft"></div>
                  <div className="boxLayerRight"></div>
                  <div className="boxLayerTop"></div>
                  <div className="cubeInnerText">
                    <i>
                      <img src={HSEManagement} alt="module-icon" />
                    </i>
                    <p>HSE Management</p>
                  </div>
                </div>
                {/* <div className="cubeBox cubeInactive"> */}
                <div onClick={() => this.handleClick('assessments')} className={(this.state.codes.includes('assessments')) ? "cubeBox" : "cubeBox cubeInactive"}>
                  <div className="boxLayerLeft"></div>
                  <div className="boxLayerRight"></div>
                  <div className="boxLayerTop"></div>
                  <div className="cubeInnerText">
                    <i>
                      <img src={assessment} alt="module-icon" />
                    </i>
                    <p>Assessments</p>
                  </div>
                </div>
                {/* <div className="cubeBox cubeInactive"> */}
                <div onClick={() => this.handleClick('compliances')} className={(this.state.codes.includes('compliances')) ? "cubeBox" : "cubeBox cubeInactive"}>
                  <div className="boxLayerLeft"></div>
                  <div className="boxLayerRight"></div>
                  <div className="boxLayerTop"></div>
                  <div className="cubeInnerText">
                    <i>
                      <img src={compliance} alt="module-icon" />
                    </i>
                    <p>Compliance</p>
                  </div>
                </div>
                {/* <div className="cubeBox cubeBlank">
                <div className="boxLayerLeft"></div>
                <div className="boxLayerRight"></div>
                <div className="boxLayerTop"></div>
                <div className="cubeInnerText">
                        <i><img src={permitManagement} alt='module-icon' /></i>
                        <p>Permit Management</p>
                    </div>
              </div> */}
                <div onClick={() => this.handleClick('actions')} className={(this.state.codes.includes('actions')) ? "cubeBox" : "cubeBox cubeInactive"}>
                  <div className="boxLayerLeft"></div>
                  <div className="boxLayerRight"></div>
                  <div className="boxLayerTop"></div>
                  <div className="cubeInnerText">
                    <i>
                      <img src={actionTracker} alt="module-icon" />
                    </i>
                    <p>Action Tracker</p>
                  </div>
                </div>
              </div>
            </div>
            {/* End second row  */}
            {/* Start third row  */}
            <div className="cubeArea row-3">
              {/* <div className="cubeBox cubeBlank"> */}
              <div onClick={() => this.handleClick('observations')} className={(this.state.codes.includes('observations')) ? "cubeBox" : "cubeBox cubeInactive"}>
                <div className="boxLayerLeft"></div>
                <div className="boxLayerRight"></div>
                <div className="boxLayerTop"></div>
                <div className="cubeInnerText">
                  <i>
                    <img src={icare} alt="module-icon" />
                  </i>
                  <p>iCare</p>
                </div>
              </div>
              {/* <div className="cubeBox cubeInactive"> */}
              <div onClick={() => this.handleClick('IPM10')} className={(this.state.codes.includes('IPM10')) ? "cubeBox" : "cubeBox cubeInactive"}>
                <div className="boxLayerLeft"></div>
                <div className="boxLayerRight"></div>
                <div className="boxLayerTop"></div>
                <div className="cubeInnerText">
                  <i><img src={permitManagement} alt='module-icon' /></i>
                  <p>Intelligent Permit Management</p>
                </div>
              </div>
              {/* <div className="cubeBox"> */}
              <div onClick={() => this.handleClick('COP10')} className={(this.state.codes.includes('COP10')) ? "cubeBox" : "cubeBox cubeInactive"}>
                <div className="boxLayerLeft"></div>
                <div className="boxLayerRight"></div>
                <div className="boxLayerTop"></div>
                <div className="cubeInnerText">
                  <i><img src={competencymanagement} alt='module-icon' /></i>
                  <p>Competency Management</p>
                </div>
              </div>
              {/* <div className="cubeBox cubeInactive"> */}
              <div onClick={() => this.handleClick('MAM10')} className={(this.state.codes.includes('MAM10')) ? "cubeBox" : "cubeBox cubeInactive"}>
                <div className="boxLayerLeft"></div>
                <div className="boxLayerRight"></div>
                <div className="boxLayerTop"></div>
                <div className="cubeInnerText">
                  <i>
                    <img src={assetmanagement} alt="module-icon" />
                  </i>
                  <p>Master Asset Management</p>
                </div>
              </div>
              <div onClick={() => this.handleClick('incidents')} className={(this.state.codes.includes('incidents')) ? "cubeBox" : "cubeBox cubeInactive"}>
                <div className="boxLayerLeft"></div>
                <div className="boxLayerRight"></div>
                <div className="boxLayerTop"></div>
                <div className="cubeInnerText">
                  <i>
                    <img src={incidentManagement2} alt="module-icon" />
                  </i>
                  <p>Incident Management</p>
                </div>
              </div>
              <div onClick={() => this.handleClick('PMC10')} className={(this.state.codes.includes('PMC10')) ? "cubeBox" : "cubeBox cubeInactive"}>
                <div className="boxLayerLeft"></div>
                <div className="boxLayerRight"></div>
                <div className="boxLayerTop"></div>
                <div className="cubeInnerText">
                  <i>
                    <img src={broadcastMediaChannel} alt="module-icon" />
                  </i>
                  <p>Broadcast and Media Channel</p>
                </div>
              </div>
              {/* <div className="cubeBox cubeBlank">
                <div className="boxLayerLeft"></div>
                <div className="boxLayerRight"></div>
                <div className="boxLayerTop"></div>
                <div className="cubeInnerText">
                        <i><img src={projectInformationHub} alt='module-icon' /></i>
                        <p>Project Information Hub</p>
                    </div>
              </div> */}

              {/* <div className="cubeBox cubeBlank">
                <div className="boxLayerLeft"></div>
                <div className="boxLayerRight"></div>
                <div className="boxLayerTop"></div>
                <div className="cubeInnerText">
                        <i><img src={safetyPlotManager} alt='module-icon' /></i>
                        <p>Safety Plot Manager</p>
                    </div>
              </div> */}
              {/* <div className="cubeBox cubeBlank">
                <div className="boxLayerLeft"></div>
                <div className="boxLayerRight"></div>
                <div className="boxLayerTop"></div>
                <div className="cubeInnerText">
                        <i><img src={safetyPlotManager} alt='module-icon' /></i>
                        <p>Safety Plot Manager</p>
                    </div>
              </div> */}

              {/* end third row  */}
            </div>
          </div>
          <Grid item md={12} sm={12} xs={12} className={classes.PortfolioLegendSection}>
            <List className={classes.PortfolioLegend}>
              <ListItem>
                <span className={classes.legendIconBox} style={{ backgroundColor: '#06425C', }} ></span>
                <ListItemText primary="Active" />
              </ListItem>
              <ListItem>
                <span className={classes.legendIconBox} style={{ backgroundColor: '#CECECE', }}></span>
                <ListItemText primary="Inactive" />
              </ListItem>
              {/* <ListItem>
                                        <span className={classes.legendIconBox} style={{backgroundColor: '#99ABBA',}}></span>
                                        <ListItemText primary="Access restricted" />
                                    </ListItem> */}
            </List>
          </Grid>

        </Fragment>)
        :
        (<Fragment>
          <div className="cubeSection">
            <div className="cubeSectionCenter">
              <div className="cubeArea row1">

                {/* start blank hexagon structure */}
                {/* <div className="cubeBox cubeBlankPlain"></div> */}
                {/* end blank hexagon structure */}

                {/* <div className="cubeBox cubeInactive"> */}
                <div onClick={() => this.handleClick('ProjectInfo')} className={(this.state.codes.includes('ProjectInfo')) ? "cubeBox" : "cubeBox cubeInactive"}>
                  <div className="boxLayerLeft"></div>
                  <div className="boxLayerRight"></div>
                  <div className="boxLayerTop"></div>
                  <div className="cubeInnerText">
                    <i><img src={projectInformationHub} title="Project information" alt="Pace OS" /></i>
                    <p>Project Information Hub</p>
                  </div>
                </div>
                <div onClick={() => this.handleClick('DDM10')} className={(this.state.codes.includes('DDM10')) ? "cubeBox" : "cubeBox cubeInactive"}>
                  <div className="boxLayerLeft"></div>
                  <div className="boxLayerRight"></div>
                  <div className="boxLayerTop"></div>
                  <div className="cubeInnerText">
                    <i>
                      <img src={designdeliverable} title="Design Deliverables Management" alt="Pace OS" />
                    </i>
                    <p>Design Deliverables Management</p>
                  </div>
                </div>
                <div onClick={() => this.handleClick('HSE')} className={(this.state.codes.includes('HSE')) ? "cubeBox" : "cubeBox cubeInactive"}>
                  <div className="boxLayerLeft"></div>
                  <div className="boxLayerRight"></div>
                  <div className="boxLayerTop"></div>
                  <div className="cubeInnerText">
                    <i>
                      <img src={HSEManagement} alt="module-icon" />
                    </i>
                    <p>HSE Management</p>
                  </div>
                </div>
                {/* <div className="cubeBox cubeAccessRestricted"> */}
                <div onClick={() => this.handleClick('PUM10')} className={(this.state.codes.includes('PUM10')) ? "cubeBox" : "cubeBox cubeInactive"}>
                  <div className="boxLayerLeft"></div>
                  <div className="boxLayerRight"></div>
                  <div className="boxLayerTop"></div>
                  <div className="cubeInnerText">
                    <i>
                      <img src={rapidknowledgecollaboration} alt="module-icon" />
                    </i>
                    <p>Rapid Knowledge and Collaboration</p>
                  </div>
                </div>
                {/* <div className="cubeBox"> */}
                <div onClick={() => this.handleClick('PMC10')} className={(this.state.codes.includes('PMC10')) ? "cubeBox" : "cubeBox cubeInactive"}>
                  <div className="boxLayerLeft"></div>
                  <div className="boxLayerRight"></div>
                  <div className="boxLayerTop"></div>
                  <div className="cubeInnerText">
                    <i>
                      <img src={broadcastMediaChannel} alt="module-icon" />
                    </i>
                    <p>Broadcast and Media Channel</p>
                  </div>
                </div>
                {/* <div className="cubeBox cubeInactive"> */}
                <div onClick={() => this.handleClick('PCT10')} className={(this.state.codes.includes('PCT10')) ? "cubeBox" : "cubeBox cubeInactive"}>
                  <div className="boxLayerLeft"></div>
                  <div className="boxLayerRight"></div>
                  <div className="boxLayerTop"></div>
                  <div className="cubeInnerText">
                    <i ><img src={controlTower10} alt='module-icon' /></i>
                    <p>Control Tower (APE, OCS, QCX, HSE)</p>
                  </div>
                </div>
              </div>
              {/* End first row  */}
              {/* Start Second row  */}
              <div className="cubeArea row-2">
                {/* <div className="cubeBox cubeInactive"> */}
                <div onClick={() => this.handleClick('EWP10')} className={(this.state.codes.includes('EWP10')) ? "cubeBox" : "cubeBox cubeInactive"}>
                  <div className="boxLayerLeft"></div>
                  <div className="boxLayerRight"></div>
                  <div className="boxLayerTop"></div>
                  <div className="cubeInnerText">
                    <i>
                      <img src={ewp} alt="module-icon" />
                    </i>
                    <p>Engineering Work Packages</p>
                  </div>
                </div>
                {/* <div className="cubeBox cubeAccessRestricted"> */}
                <div onClick={() => this.handleClick('PWP10')} className={(this.state.codes.includes('PWP10')) ? "cubeBox" : "cubeBox cubeInactive"}>
                  <div className="boxLayerLeft"></div>
                  <div className="boxLayerRight"></div>
                  <div className="boxLayerTop"></div>
                  <div className="cubeInnerText">
                    <i>
                      <img src={cwp} alt="module-icon" />
                    </i>
                    <p>Construction Work Packages</p>
                  </div>
                </div>
                {/* <div className="cubeBox cubeInactive"> */}
                <div onClick={() => this.handleClick('IWP10')} className={(this.state.codes.includes('IWP10')) ? "cubeBox" : "cubeBox cubeInactive"}>
                  <div className="boxLayerLeft"></div>
                  <div className="boxLayerRight"></div>
                  <div className="boxLayerTop"></div>
                  <div className="cubeInnerText">
                    <i>
                      <img src={iwp} alt="module-icon" />
                    </i>
                    <p>Installation Work Packages</p>
                  </div>
                </div>
                {/* <div className="cubeBox cubeInactive"> */}
                <div onClick={() => this.handleClick('gis')} className={(this.state.codes.includes('gis')) ? "cubeBox" : "cubeBox cubeInactive"}>
                  <div className="boxLayerLeft"></div>
                  <div className="boxLayerRight"></div>
                  <div className="boxLayerTop"></div>
                  <div className="cubeInnerText">
                    <i>
                      <img src={safetyPlotManager} alt="module-icon" />
                    </i>
                    <p>Safety Plot Manager</p>
                  </div>
                </div>
                {/* <div className="cubeBox cubeInactive"> */}
                <div onClick={() => this.handleClick('PAT10')} className={(this.state.codes.includes('PAT10')) ? "cubeBox" : "cubeBox cubeInactive"}>
                  <div className="boxLayerLeft"></div>
                  <div className="boxLayerRight"></div>
                  <div className="boxLayerTop"></div>
                  <div className="cubeInnerText">
                    <i><img src={actionTracker} alt='module-icon' /></i>
                    <p>Action Tracker</p>
                  </div>
                </div>
              </div>
              {/* End second row  */}
              {/* Start third row  */}
              <div className="cubeArea row-3">
                {/* <div className="cubeBox cubeInactive"> */}
                <div onClick={() => this.handleClick('SSM10')} className={(this.state.codes.includes('SSM10')) ? "cubeBox" : "cubeBox cubeInactive"}>
                  <div className="boxLayerLeft"></div>
                  <div className="boxLayerRight"></div>
                  <div className="boxLayerTop"></div>
                  <div className="cubeInnerText">
                    <i><img src={servicemanagement} alt='module-icon' /></i>
                    <p>Services Management</p>
                  </div>
                </div>
                {/* <div className="cubeBox cubeInactive"> */}
                <div onClick={() => this.handleClick('PEM10')} className={(this.state.codes.includes('PEM10')) ? "cubeBox" : "cubeBox cubeInactive"}>
                  <div className="boxLayerLeft"></div>
                  <div className="boxLayerRight"></div>
                  <div className="boxLayerTop"></div>
                  <div className="cubeInnerText">
                    <i>
                      <img src={compliance} alt="module-icon" />
                    </i>
                    <p>Equipment Management</p>
                  </div>
                </div>
                {/* <div className="cubeBox"> */}
                <div onClick={() => this.handleClick('MAM10')} className={(this.state.codes.includes('MAM10')) ? "cubeBox" : "cubeBox cubeInactive"}>
                  <div className="boxLayerLeft"></div>
                  <div className="boxLayerRight"></div>
                  <div className="boxLayerTop"></div>
                  <div className="cubeInnerText">
                    <i>
                      <img src={assetmanagement} alt="module-icon" />
                    </i>
                    <p>Master Asset Management</p>
                  </div>
                </div>
                {/* <div className="cubeBox cubeInactive"> */}
                <div onClick={() => this.handleClick('COP10')} className={(this.state.codes.includes('COP10')) ? "cubeBox" : "cubeBox cubeInactive"}>
                  <div className="boxLayerLeft"></div>
                  <div className="boxLayerRight"></div>
                  <div className="boxLayerTop"></div>
                  <div className="cubeInnerText">
                    <i><img src={competencymanagement} alt='module-icon' /></i>
                    <p>Competency Management</p>
                  </div>
                </div>
                {/* <div className="cubeBox cubeInactive"> */}
                <div onClick={() => this.handleClick('PAQ10')} className={(this.state.codes.includes('PAQ10')) ? "cubeBox" : "cubeBox cubeInactive"}>
                  <div className="boxLayerLeft"></div>
                  <div className="boxLayerRight"></div>
                  <div className="boxLayerTop"></div>
                  <div className="cubeInnerText">
                    <i><img src={preconstructionallocation} alt='module-icon' /></i>
                    <p>Preconstruction Allocation</p>
                  </div>
                </div>
                {/* <div className="cubeBox cubeInactive"> */}
                <div onClick={() => this.handleClick('IPM10')} className={(this.state.codes.includes('IPM10')) ? "cubeBox" : "cubeBox cubeInactive"}>
                  <div className="boxLayerLeft"></div>
                  <div className="boxLayerRight"></div>
                  <div className="boxLayerTop"></div>
                  <div className="cubeInnerText">
                    <i><img src={permitManagement} alt='module-icon' /></i>
                    <p>Intelligent Permit Management</p>
                  </div>
                </div>
              </div>
              {/* end third row  */}
              {/* Start fourth row  */}
              <div className="cubeArea row-4">
                {/* <div className="cubeBox cubeInactive"> */}
                <div onClick={() => this.handleClick('PAA10')} className={(this.state.codes.includes('PAA10')) ? "cubeBox" : "cubeBox cubeInactive"}>
                  <div className="boxLayerLeft"></div>
                  <div className="boxLayerRight"></div>
                  <div className="boxLayerTop"></div>
                  <div className="cubeInnerText">
                    <i>
                      <img src={advanceanalytics} alt="module-icon" />
                    </i>
                    <p>Advance Analytics</p>
                  </div>
                </div>
                {/* <div className="cubeBox cubeAccessRestricted"> */}
                <div onClick={() => this.handleClick('FAE10')} className={(this.state.codes.includes('FAE10')) ? "cubeBox" : "cubeBox cubeInactive"}>
                  <div className="boxLayerLeft"></div>
                  <div className="boxLayerRight"></div>
                  <div className="boxLayerTop"></div>
                  <div className="cubeInnerText">
                    <i>
                      <img src={fabricationquantities} alt="module-icon" />
                    </i>
                    <p>Fabrication and Erection</p>
                  </div>
                </div>
                {/* <div className="cubeBox cubeInactive"> */}
                <div onClick={() => this.handleClick('TRT10')} className={(this.state.codes.includes('TRT10')) ? "cubeBox" : "cubeBox cubeInactive"}>
                  <div className="boxLayerLeft"></div>
                  <div className="boxLayerRight"></div>
                  <div className="boxLayerTop"></div>
                  <div className="cubeInnerText">
                    <i >
                      <img src={timeResourceTracker} alt="module-icon" />
                    </i>
                    <p>Time and Resource Tracker</p>
                  </div>
                </div>
                {/* <div className="cubeBox cubeInactive"> */}
                <div onClick={() => this.handleClick('ENQ10')} className={(this.state.codes.includes('ENQ10')) ? "cubeBox" : "cubeBox cubeInactive"}>
                  <div className="boxLayerLeft"></div>
                  <div className="boxLayerRight"></div>
                  <div className="boxLayerTop"></div>
                  <div className="cubeInnerText">
                    <i>
                      <img src={engineeringquantities} alt="module-icon" />
                    </i>
                    <p>Engineering Quantities</p>
                  </div>
                </div>
                {/* <div className="cubeBox cubeInactive"> */}
                {/* <div className={(this.state.codes.includes('FAE10'))?"cubeBox":"cubeBox cubeInactive"}>
                <div className="boxLayerLeft"></div>
                <div className="boxLayerRight"></div>
                <div className="boxLayerTop"></div>
                <div className="cubeInnerText">
                        <i><img alt='module-icon' /></i>
                        <p>Fabrication and Erection</p>
                    </div>
              </div> */}
              </div>
              {/* end fourth row  */}
            </div>
          </div>
          <Grid item md={12} sm={12} xs={12} className={classes.PortfolioLegendSection}>
            <List className={classes.PortfolioLegend}>
              <ListItem>
                <span className={classes.legendIconBox} style={{ backgroundColor: '#06425C', }} ></span>
                <ListItemText primary="Active" />
              </ListItem>
              <ListItem>
                <span className={classes.legendIconBox} style={{ backgroundColor: '#CECECE', }}></span>
                <ListItemText primary="Inactive" />
              </ListItem>
              {/* <ListItem>
                                        <span className={classes.legendIconBox} style={{backgroundColor: '#99ABBA',}}></span>
                                        <ListItemText primary="Access restricted" />
                                    </ListItem> */}
            </List>
          </Grid>

        </Fragment>)
    );
  }
}

Hexagon3D.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state, props) { return { user: state } }
function mapDispatchToProps(dispatch) { return { dispatch }; }

// export default Hexagon3D;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles, { withTheme: true })(Hexagon3D));