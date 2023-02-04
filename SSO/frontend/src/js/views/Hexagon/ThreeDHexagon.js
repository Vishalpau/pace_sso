import React, { Component, forwardRef, Fragment } from "react";
import PropTypes from "prop-types";
import "../../../../../frontend/src/App.css";
import "./ThDStyle.css";
import { ContactsOutlined } from "@material-ui/icons";
import projectInformationHub from "../../../../../static/public/images/LoginImg/projectInformationHub.svg";
import HSEManagement from "../../../../../static/public/images/LoginImg/HSEManagement.png";
import safetyPlotManager from "../../../../../static/public/images/LoginImg/safetyPlotManager.svg";
import controlTower from "../../../../../static/public/images/LoginImg/controlTower.svg";
import incidentManagement from "../../../../../static/public/images/LoginImg/incidentManagement.svg";
import compliance from "../../../../../static/public/images/LoginImg/compliance.svg";
import icare from "../../../../../static/public/images/LoginImg/icare.svg";
import assessment from "../../../../../static/public/images/LoginImg/assessment.svg";
import actionTracker from "../../../../../static/public/images/LoginImg/actionTracker.svg";
import permitManagement from "../../../../../static/public/images/LoginImg/permitManagement.svg";

class ThreeDHexagon extends Component {
  render() {
    return (
      <Fragment>
        <div className="cubeSection">
          <div className="cubeSectionCenter">
            <div className="cubeArea row1">

              {/* start blank hexagon structure */}
              {/* <div className="cubeBox cubeBlankPlain"></div> */}
              {/* end blank hexagon structure */}

              <div className="cubeBox cubeBlank">
                <div className="boxLayerLeft"></div>
                <div className="boxLayerRight"></div>
                <div className="boxLayerTop"></div>
                {/* <div className="cubeInnerText">
                        <i><img src={projectInformationHub} title="Project information" alt="Pace OS" /></i>
                        <p>Project Information Hub</p>
                    </div> */}
              </div>
              <div className="cubeBox cubeInactive responsiveArrang">
                <div className="boxLayerLeft"></div>
                <div className="boxLayerRight"></div>
                <div className="boxLayerTop"></div>
                <div className="cubeInnerText">
                  <i>
                    <img src={projectInformationHub} alt="module-icon" />
                  </i>
                  <p>Project Information Hub</p>
                </div>
              </div>
              <div className="cubeBox cubeInactive responsiveArrang">
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
              <div className="cubeBox cubeAccessRestricted">
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
              <div className="cubeBox">
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
              <div className="cubeBox cubeBlank">
                <div className="boxLayerLeft"></div>
                <div className="boxLayerRight"></div>
                <div className="boxLayerTop"></div>
                {/* <div className="cubeInnerText">
                        <i><img src={safetyPlotManager} alt='module-icon' /></i>
                        <p>Safety Plot Manager</p>
                    </div> */}
              </div>
            </div>
            {/* End first row  */}
            {/* Start Second row  */}
            <div className="cubeArea row-2">
              <div className="cubeBox cubeBlank">
                <div className="boxLayerLeft"></div>
                <div className="boxLayerRight"></div>
                <div className="boxLayerTop"></div>
                {/* <div className="cubeInnerText">
                  <i>
                    <img src={compliance} alt="module-icon" />
                  </i>
                  <p>Compliance</p>
                </div> */}
              </div>
              <div className="cubeBox cubeAccessRestricted">
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
              <div className="cubeBox cubeInactive">
                <div className="boxLayerLeft"></div>
                <div className="boxLayerRight"></div>
                <div className="boxLayerTop"></div>
                <div className="cubeInnerText">
                  <i>
                    <img src={incidentManagement} alt="module-icon" />
                  </i>
                  <p>Incident Management</p>
                </div>
              </div>
              <div className="cubeBox cubeInactive">
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
                <div className="boxLayerLeft"></div>
                <div className="boxLayerRight"></div>
                <div className="boxLayerTop"></div>
                {/* <div className="cubeInnerText">
                        <i><img src={permitManagement} alt='module-icon' /></i>
                        <p>Permit Management</p>
                    </div> */}
              </div>
            </div>
            {/* End second row  */}
            {/* Start third row  */}
            <div className="cubeArea row-3">
              <div className="cubeBox cubeBlank">
                <div className="boxLayerLeft"></div>
                <div className="boxLayerRight"></div>
                <div className="boxLayerTop"></div>
                {/* <div className="cubeInnerText">
                        <i><img src={projectInformationHub} alt='module-icon' /></i>
                        <p>Project Information Hub</p>
                    </div> */}
              </div>
              <div className="cubeBox cubeInactive">
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
              <div className="cubeBox">
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
              <div className="cubeBox cubeInactive">
                <div className="boxLayerLeft"></div>
                <div className="boxLayerRight"></div>
                <div className="boxLayerTop"></div>
                <div className="cubeInnerText">
                  <i><img src={permitManagement} alt='module-icon' /></i>
                  <p>Permit Management</p>
                </div>
              </div>
              <div className="cubeBox cubeBlank">
                <div className="boxLayerLeft"></div>
                <div className="boxLayerRight"></div>
                <div className="boxLayerTop"></div>
                {/* <div className="cubeInnerText">
                        <i><img src={safetyPlotManager} alt='module-icon' /></i>
                        <p>Safety Plot Manager</p>
                    </div> */}
              </div>
              <div className="cubeBox cubeBlank">
                <div className="boxLayerLeft"></div>
                <div className="boxLayerRight"></div>
                <div className="boxLayerTop"></div>
                {/* <div className="cubeInnerText">
                        <i><img src={safetyPlotManager} alt='module-icon' /></i>
                        <p>Safety Plot Manager</p>
                    </div> */}
              </div>
            </div>
            {/* end third row  */}
          </div>
        </div>
      </Fragment>
    );
  }
}

ThreeDHexagon.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default ThreeDHexagon;
