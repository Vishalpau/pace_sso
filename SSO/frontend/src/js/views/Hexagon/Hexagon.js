import React, { Component, forwardRef, Fragment } from 'react';
import PropTypes from "prop-types";
import '../../../../../frontend/src/App.css';
import { ContactsOutlined } from '@material-ui/icons';


class Hexagon extends Component {
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
    pace10hexagon:false
  }
}

  componentDidMount = () => {
    // alert(1223)
    // this.getClassicOnlySub();
    this.getSubscriptions();

    const pace10hexagon=localStorage.getItem('pace10hexagon')

    if(pace10hexagon!=undefined){
    this.setState({pace10hexagon:pace10hexagon})
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

    await console.log({'hex_props':this.props})
    await console.log({'hex_companycode_local':localStorage.getItem('companyCode')})
    console.log({'hex_companycode_props':this.props.companyCode})

    const companyId = localStorage.getItem('companyId')

    if(localStorage.getItem('companyCode')!=undefined){
      await this.setState({ companyCode: JSON.parse(localStorage.getItem('companyCode')).companyCode })
    }

    if(localStorage.getItem('pace10hexagon')!=undefined){
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


    console.log({pace10hexagon:this.state.pace10hexagon})

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
            console.log({'temp11':temp})
            this.setState({ codes: temp })
            console.log({'temp12':this.state.codes})
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

      // console.log(JSON.parse(localStorage.getItem('project')).vendorReferenceId)

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

      else if(data.modules.moduleCode == 'PMC10'){
        window.open(process.env.API_URL + process.env.API_VERSION + '/user/auth/authorize/?client_id=' + clientId + '&response_type=code&targetPage=' + targetPage + '&companyId=' + localStorage.getItem('companyId') + '&projectId=' + JSON.parse(localStorage.getItem('project')).vendorReferenceId + '&phaseId=' + phaseId + '&unitId=' + unitId,'_blank')
      }

      else if (companyCode.includes('SCDJV', 'SCDJVSTAGE')) {

        if (data.modules.moduleCode == 'gis') {
          window.open(process.env.API_URL + process.env.API_VERSION + '/user/auth/authorize/?client_id=' + process.env.client_id_gis + '&response_type=code&targetPage=gis_setup' + '&companyId=' + localStorage.getItem('companyId') + '&projectId=' + localStorage.getItem('ssoProjectId'), '_blank')
        }
      
      else{

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

    const { todos } = this.state;
    console.log({ codes: this.state.codes })
    const { modules } = this.state
    const { companyCode } = this.state
    
    console.log({'props_render':this.props})
    // if(companyCode!=''){
    //  var companyCode= JSON.parse(localStorage.getItem('companyCode')).companyCode
    // }

    console.log({companycode_render: companyCode})
    // const 
    // console.log({ 'props_companyCode': this.props })
    // console.log({ 'props_companyCode': this.props })
    // console.log({ 'companyCode': this.props.companyCode })
    // console.log({'var_companyCode':companyCode})
    // if(this.state.subscriptions[0] != undefined){
    //   const apps = this.state.subscriptions[0].map(app=>app.appId)
    //   this.getModules(apps)
    // }
    // else{
    //   alert('undefined')
    // }

    // console.log({applications: this.state.subscriptions[0].map(app=>app.appId)})
    return (

      // (this.props.companyCode.companyCode!=undefined?(!this.props.companyCode.companyCode.includes('SCDJV', 'SCDJVSTAGE')):true) ?
      // !this.state.pace10hexagon?
      (this.props.pace10hexagon!=undefined?!this.props.pace10hexagon:true) ?
        (<div className="seven_hexagon_row">
          <div className="honeycomb">
            <div className="ibws-fix hexagon_row1">

              <div className="hexagon hide_responsiv">
                <div className="hexagontent hexagon_content_box" />
              </div>
              

              <div className={!(this.state.codes.includes('HSE')) ? "hexagon hexagon_fullcontnt inactive_hexagon" : "hexagon hexagon_fullcontnt"}>
                <div className="hexagontent hexagon_content_box">
                  <a
                    className="hse_health_safety_environment_mgmt_new"
                    onClick={() => this.handleClick('HSE')}
                  >
                    <p>HSE Management</p>
                  </a>
                </div>
              </div>

              <div className="hexagon hide_responsiv">
                <div className="hexagontent hexagon_content_box" />
              </div>


            

              <div className={!(this.state.codes.includes('controltower')) ? "hexagon hexagon_fullcontnt inactive_hexagon" : "hexagon hexagon_fullcontnt"}>
                <div className="hexagontent hexagon_content_box">
                  <a className="hse_controltower_devlopment" onClick={() => this.handleClick('controltower')}>
                    <p>Control Tower</p>
                  </a>
                </div>
              </div>


              <div className="hexagon hide_responsiv">
                <div className="hexagontent hexagon_content_box" />
              </div>

              <div className={!(this.state.codes.includes('incidents')) ? "hexagon hexagon_fullcontnt inactive_hexagon" : "hexagon hexagon_fullcontnt"}>
                <div className="hexagontent hexagon_content_box">
                  <a
                    className="hse_incident_reporting_management"
                    onClick={() => this.handleClick('incidents')}
                  >
                    <p>Incident Management</p>
                  </a>
                </div>
              </div>

              <div className="hexagon hide_responsiv">
                <div className="hexagontent hexagon_content_box" />
              </div>
            </div>

            <div className="ibws-fix hexagon_row2">
              <div className={!(this.state.codes.includes('ProjectInfo')) ? "hexagon hexagon_fullcontnt inactive_hexagon" : "hexagon hexagon_fullcontnt"}>
                <div className="hexagontent hexagon_content_box">
                  <a className="project_information_hub" onClick={() => this.handleClick('ProjectInfo')}>
                    <p>Project Information Hub</p>
                  </a>
                </div>
              </div>

              {/* <div className="hexagon hide_responsiv">
              <div className="hexagontent hexagon_content_box" />
            </div> */}



              <div className={!(this.state.codes.includes('compliances')) ? "hexagon hexagon_fullcontnt inactive_hexagon" : "hexagon hexagon_fullcontnt"} >
                <div className="hexagontent hexagon_content_box">
                  <a className="hse_compliance_protocols" onClick={() => this.handleClick('compliances')}>
                    <p>Compliance</p>
                  </a>
                </div>
              </div>

              <div className={!(this.state.codes.includes('observations')) ? "hexagon hexagon_fullcontnt inactive_hexagon" : "hexagon hexagon_fullcontnt"}>
                <div className="hexagontent hexagon_content_box">
                  <a className="hse_observations" onClick={() => this.handleClick('observations')}>
                    <p>iCare</p>
                  </a>
                </div>
              </div>

              <div className={!(this.state.codes.includes('assessments')) ? "hexagon hexagon_fullcontnt inactive_hexagon" : "hexagon hexagon_fullcontnt"}>
                <div className="hexagontent hexagon_content_box">
                  <a className="hse_smart_permit_management" onClick={() => this.handleClick('assessments')}>
                    <p>Assessments</p>
                  </a>
                </div>
              </div>


              <div className={!(this.state.codes.includes('actions')) ? "hexagon hexagon_fullcontnt inactive_hexagon" : "hexagon hexagon_fullcontnt"}>
                <div className="hexagontent hexagon_content_box">
                  <a className="hse_action_tracker"
                    onClick={() => this.handleClick('actions')}
                  >
                    <p>Action Tracker</p>
                  </a>
                </div>
              </div>
              <div className={!(this.state.codes.includes('permits')) ? "hexagon hexagon_fullcontnt inactive_hexagon" : "hexagon hexagon_fullcontnt"}>
                <div className="hexagontent hexagon_content_box">
                  <a
                    className="hse_intelligent_permit_management_new"
                    onClick={() => this.handleClick('permits')}
                  >
                    <p>Permit Management</p>
                  </a>
                </div>
              </div>

              <div className={!(this.state.codes.includes('gis')) ? "hexagon hexagon_fullcontnt inactive_hexagon" : "hexagon hexagon_fullcontnt"}>
                <div className="hexagontent hexagon_content_box">
                  <a className="hse_rapid_knowledge_collaboration"
                    onClick={() => this.handleClick('gis')}
                  >
                    <p>Safety Plot Manager</p>
                  </a>
                </div>
              </div>

              {/* <div className={!(this.state.codes.includes('knowledge')) ? "hexagon hexagon_fullcontnt inactive_hexagon" : "hexagon hexagon_fullcontnt"}>
              <div className="hexagontent hexagon_content_box">
                <a className="hse_rapid_knowledge_collaboration"
                  onClick={() => this.handleClick('knowledge')}
                >
                  <p>Rapid Knowledge &amp; Collaboration</p>
                </a>
              </div>
            </div> */}




              {/* <div className="hexagon hide_responsiv">
            <div className="hexagontent hexagon_content_box" />
          </div> */}

              {/* <div className={!(this.state.codes.includes('environments')) ? "hexagon hexagon_fullcontnt inactive_hexagon" : "hexagon hexagon_fullcontnt"}>
              <div className="hexagontent hexagon_content_box">
                <a className="hse_environment_development"
                  onClick={() => this.handleClick('environments')}
                >
                  <p>Environment Management</p>
                </a>
              </div>
            </div> */}

            </div>

            <div className="ibws-fix hexagon_row3">
              <div className="hexagon hide_responsiv">
                <div className="hexagontent hexagon_content_box" />
              </div>
              

              <div className="hexagon bghide_in_view hide_responsiv">
                <div className="hexagontent hexagon_content_box" />
              </div>
              

              <div className="hexagon hide_responsiv hide_responsiv">
                <div className="hexagontent hexagon_content_box" />
              </div>

              

              <div className="hexagon bghide_in_view hide_responsiv">
                <div className="hexagontent hexagon_content_box" />
              </div>

              <div className="hexagon hide_responsiv">
                <div className="hexagontent hexagon_content_box" />
              </div>

              <div className="hexagon bghide_in_view hide_responsiv">
                <div className="hexagontent hexagon_content_box" />
              </div>

              <div className={!(this.state.codes.includes('PMC10')) ? "hexagon hexagon_fullcontnt inactive_hexagon" : "hexagon hexagon_fullcontnt"}>
                <div className="hexagontent hexagon_content_box">
                  <a className="media_channel"
                    onClick={() => this.handleClick('PMC10')}
                  >
                    <p>Media Channel</p>
                  </a>
                </div>
              </div>

              {/* <div className="hexagon hide_responsiv">
                <div className="hexagontent hexagon_content_box" />
              </div> */}

            </div>
          </div>
        </div>) :
        (<div className="seven_hexagon_row">
          <div className="honeycomb">
            <div className="ibws-fix hexagon_row1">

              {/* <div className="hexagon hide_responsiv">
            <div className="hexagontent hexagon_content_box" />
          </div> */}

              {/* <div className={!(this.state.codes.includes('incidents')) ? "hexagon hexagon_fullcontnt inactive_hexagon" : "hexagon hexagon_fullcontnt"}>
            <div className="hexagontent hexagon_content_box">
              <a
                className="hse_incident_reporting_management"
                onClick={() => this.handleClick('incidents')}
              >
                <p>Project Information Hub</p>
              </a>
            </div>
          </div> */}
              <div className={!(this.state.codes.includes('ProjectInfo')) ? "hexagon hexagon_fullcontnt inactive_hexagon" : "hexagon hexagon_fullcontnt"}>
                <div className="hexagontent hexagon_content_box">
                  <a className="project_information_hub" onClick={() => this.handleClick('ProjectInfo')}>
                    <p>Project Information Hub</p>
                  </a>
                </div>
              </div>

              <div className={!(this.state.codes.includes('DDM10')) ? "hexagon hexagon_fullcontnt inactive_hexagon" : "hexagon hexagon_fullcontnt"}>
                <div className="hexagontent hexagon_content_box">
                  <a
                    className="design_deliverables_management"
                    onClick={() => this.handleClick('DDM10')}
                  >
                    <p>Design Deliverables Management</p>
                  </a>
                </div>
              </div>

              {/* <div className="hexagon hide_responsiv">
            <div className="hexagontent hexagon_content_box" />
          </div> */}
              <div className={!(this.state.codes.includes('HSE')) ? "hexagon hexagon_fullcontnt inactive_hexagon" : "hexagon hexagon_fullcontnt"}>
                <div className="hexagontent hexagon_content_box">
                  <a
                    className="hse_health_safety_environment_mgmt_new"
                    onClick={() => this.handleClick('HSE')}
                  >
                    <p>HSE Management</p>
                  </a>
                </div>
              </div>

              <div className={!(this.state.codes.includes('PCT10')) ? "hexagon hexagon_fullcontnt inactive_hexagon" : "hexagon hexagon_fullcontnt"}>
                <div className="hexagontent hexagon_content_box">
                  <a className="hse_controltower_devlopment" onClick={() => this.handleClick('PCT10')}>
                    <p>Control Tower (APE, OCS, QCX, HSE)</p>
                  </a>
                </div>
              </div>


              {/* <div className="hexagon hide_responsiv">
            <div className="hexagontent hexagon_content_box" />
          </div> */}
              <div className={!(this.state.codes.includes('EWP10')) ? "hexagon hexagon_fullcontnt inactive_hexagon" : "hexagon hexagon_fullcontnt"}>
                <div className="hexagontent hexagon_content_box">
                  <a
                    className="engineering_work_package"
                    onClick={() => this.handleClick('EWP10')}
                  >
                    <p>Engineering Work Packages</p>
                  </a>
                </div>
              </div>

              <div className={!(this.state.codes.includes('PWP10')) ? "hexagon hexagon_fullcontnt inactive_hexagon" : "hexagon hexagon_fullcontnt"}>
                <div className="hexagontent hexagon_content_box">
                  <a
                    className="construction_work_package"
                    onClick={() => this.handleClick('PWP10')}
                  >
                    <p>Construction Work Packages</p>
                  </a>
                </div>
              </div>

              {/* <div className="hexagon hide_responsiv">
            <div className="hexagontent hexagon_content_box" />
          </div> */}

              <div className={!(this.state.codes.includes('IWP10')) ? "hexagon hexagon_fullcontnt inactive_hexagon" : "hexagon hexagon_fullcontnt"}>
                <div className="hexagontent hexagon_content_box">
                  <a
                    className="installation_work_package"
                    onClick={() => this.handleClick('IWP10')}
                  >
                    <p>Installation Work Packages</p>
                  </a>
                </div>
              </div>
            </div>



            <div className="ibws-fix hexagon_row2">
              <div className={!(this.state.codes.includes('IPM10')) ? "hexagon hexagon_fullcontnt inactive_hexagon" : "hexagon hexagon_fullcontnt"}>
                <div className="hexagontent hexagon_content_box">
                  <a className="hse_intelligent_permit_management_new" onClick={() => this.handleClick('IPM10')}>
                    <p>Intelligent Permit Management</p>
                  </a>
                </div>
              </div>

              <div className={!(this.state.codes.includes('SSM10')) ? "hexagon hexagon_fullcontnt inactive_hexagon" : "hexagon hexagon_fullcontnt"}>
                <div className="hexagontent hexagon_content_box">
                  <a className="hse_services_management"
                    onClick={() => this.handleClick('SSM10')}
                  >
                    <p>Services Management</p>
                  </a>
                </div>
              </div>


              <div className={!(this.state.codes.includes('PEM10')) ? "hexagon hexagon_fullcontnt inactive_hexagon" : "hexagon hexagon_fullcontnt"}>
                <div className="hexagontent hexagon_content_box">
                  <a className="hse_equipment_management" onClick={() => this.handleClick('PEM10')}>
                    <p>Equipment Management</p>
                  </a>
                </div>
              </div>

              <div className={!(this.state.codes.includes('MAM10')) ? "hexagon hexagon_fullcontnt inactive_hexagon" : "hexagon hexagon_fullcontnt"}>
                <div className="hexagontent hexagon_content_box">
                  <a className="hse_master_asset_management" onClick={() => this.handleClick('MAM10')}>
                    <p>Master Asset Management</p>
                  </a>
                </div>
              </div>

              <div className={!(this.state.codes.includes('COP10')) ? "hexagon hexagon_fullcontnt inactive_hexagon" : "hexagon hexagon_fullcontnt"} >
                <div className="hexagontent hexagon_content_box">
                  <a className="hse_competency_management" onClick={() => this.handleClick('COP10')}>
                    <p>Competency Management</p>
                  </a>
                </div>
              </div>

              <div className={!(this.state.codes.includes('PAQ10')) ? "hexagon hexagon_fullcontnt inactive_hexagon" : "hexagon hexagon_fullcontnt"}>
                <div className="hexagontent hexagon_content_box">
                  <a
                    className="preconstruction_allocation"
                    onClick={() => this.handleClick('PAQ10')}
                  >
                    <p>Preconstruction Allocation</p>
                  </a>
                </div>
              </div>

              <div className={!(this.state.codes.includes('PAA10')) ? "hexagon hexagon_fullcontnt inactive_hexagon" : "hexagon hexagon_fullcontnt"}>
                <div className="hexagontent hexagon_content_box">
                  <a className="advance_analytics"
                    onClick={() => this.handleClick('PAA10')}
                  >
                    <p>Advance Analytics</p>
                  </a>
                </div>
              </div>
            </div>
            <div className="ibws-fix hexagon_row3">
              {/* <div className="hexagon hide_responsiv">
            <div className="hexagontent hexagon_content_box" />
          </div> */}

              <div className={!(this.state.codes.includes('PAT10')) ? "hexagon hexagon_fullcontnt inactive_hexagon" : "hexagon hexagon_fullcontnt"}>
                <div className="hexagontent hexagon_content_box">
                  <a className="hse_action_tracker"
                    onClick={() => this.handleClick('PAT10')}
                  >
                    <p>Action Tracker</p>
                  </a>
                </div>
              </div>

              {/* <div className="hexagon bghide_in_view hide_responsiv">
            <div className="hexagontent hexagon_content_box" />
          </div> */}
              <div className={!(this.state.codes.includes('TRT10')) ? "hexagon hexagon_fullcontnt inactive_hexagon" : "hexagon hexagon_fullcontnt"}>
                <div className="hexagontent hexagon_content_box">
                  <a className="hse_intelligent_permit_management_new"
                    onClick={() => this.handleClick('TRT10')}
                  >
                    <p>Time and Resource Tracker</p>
                  </a>
                </div>
              </div>

              {/* <div className="hexagon hide_responsiv hide_responsiv">
            <div className="hexagontent hexagon_content_box" />
          </div> */}
              <div className={!(this.state.codes.includes('ENQ10')) ? "hexagon hexagon_fullcontnt inactive_hexagon" : "hexagon hexagon_fullcontnt"}>
                <div className="hexagontent hexagon_content_box">
                  <a className="engineering_quantities"
                    onClick={() => this.handleClick('ENQ10')}
                  >
                    <p>Engineering Quantities</p>
                  </a>
                </div>
              </div>


              {/* <div className="hexagon bghide_in_view hide_responsiv">
            <div className="hexagontent hexagon_content_box" />
          </div> */}
              <div className={!(this.state.codes.includes('FAE10')) ? "hexagon hexagon_fullcontnt inactive_hexagon" : "hexagon hexagon_fullcontnt"}>
                <div className="hexagontent hexagon_content_box">
                  <a className="fabrication_erection"
                    onClick={() => this.handleClick('FAE10')}
                  >
                    <p>Fabrication and Erection</p>
                  </a>
                </div>
              </div>

              <div className={!(this.state.codes.includes('PUM10')) ? "hexagon hexagon_fullcontnt inactive_hexagon" : "hexagon hexagon_fullcontnt"}>
                <div className="hexagontent hexagon_content_box">
                  <a
                    className="hse_rapid_knowledge_collaboration_new"
                    onClick={() => this.handleClick('PUM10')}
                  >
                    <p>Rapid Knowledge and Collaboration</p>
                  </a>
                </div>
              </div>

              {/* <div className="hexagon bghide_in_view hide_responsiv">
            <div className="hexagontent hexagon_content_box" />
          </div> */}
              <div className={!(this.state.codes.includes('PMC10')) ? "hexagon hexagon_fullcontnt inactive_hexagon" : "hexagon hexagon_fullcontnt"}>
                <div className="hexagontent hexagon_content_box">
                  <a className="media_channel"
                    onClick={() => this.handleClick('PMC10')}
                  >
                    <p>Media Channel</p>
                  </a>
                </div>
              </div>

              {/* <div className="hexagon hide_responsiv">
                <div className="hexagontent hexagon_content_box" />
              </div> */}
              <div className={!(this.state.codes.includes('gis')) ? "hexagon hexagon_fullcontnt inactive_hexagon" : "hexagon hexagon_fullcontnt"}>
                <div className="hexagontent hexagon_content_box">
                  <a className="hse_rapid_knowledge_collaboration"
                    onClick={() => this.handleClick('gis')}
                  >
                    <p>Safety Plot Manager</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        )

    );
  }
}

Hexagon.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default Hexagon;
//export default withStyles(styles)(Hexagon);
