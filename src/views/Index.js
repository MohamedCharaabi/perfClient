/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useState } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";

const Index = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");
  const [user, setUser] = useState({});
  const [statMonth, setStatMonth] = useState([])
  const [statData, setStatData] = useState({})
  const [topThemeStat, setTopThemeStat] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [themes, setThemes] = useState([])
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];


  async function getUser() {
    let result = await axios.get('https://cims-server.herokuapp.com/auth/user', {
      headers: {
        'Content-Type': 'Application/json'
      },
      withCredentials: true
    });
    setUser(result.data);

    // console.log(result.data);


  }
  async function getThemes() {
    await axios.get('https://cims-server.herokuapp.com/theme', {
      headers: {
        'Content-Type': 'Application/json'
      },
      withCredentials: true
    }).then(res => setThemes(res.data.data)
    ).catch(err => alert(`Error ===> ${err}`));

  }


  async function getData() {

    await axios.get('https://cims-server.herokuapp.com/theme', {
      headers: {
        'Content-Type': 'Application/json'
      },
      withCredentials: true
    }).then(async (res) => {
      const themeResult = res.data.data;

      let result = await axios.get('https://cims-server.herokuapp.com/stat', {
        headers: {
          'Content-Type': 'Application/json'
        },
        withCredentials: true
      });
      setStatMonth(result.data);
      console.log(themeResult)

      let chartThemes = result.data.topTheme.map(theme =>
        themeResult.find((th) => th._id === theme._id).name,
      );

      console.log(chartThemes)
      let themeStat = {
        labels: chartThemes,
        datasets: [
          {
            label: "Sales",
            data: [6, 5],
            maxBarThickness: 10,
          },
        ],
      };

      let stData = {
        labels: result.data.monthSesion.map(stat => months[parseInt(stat._id)]),
        datasets: [
          {
            label: "Performance",
            data: result.data.monthSesion.map(stat => stat.nubr),
          },
        ],
      };
      setStatData(stData)
      setTopThemeStat(themeStat)
      // console.log(result.data);
      setIsLoading(false)
    })

  }

  useEffect(() => {
    getUser()
    getThemes()
    getData()
  }, [])





  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };



  if (isLoading) return <div style={{ height: '100%', width: '100%' }}>
    <CircularProgress style={{ justifyContent: 'center', alignContent: 'center' }} />
    <h3>Lodaing</h3>
  </div>

  return (
    <>
      <Header name={user['name']} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    {/* <h6 className="text-uppercase text-light ls-1 mb-1">
                      Overview
                    </h6> */}
                    <h2 className="text-white mb-0">Sessions</h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 1,
                          })}
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 1)}
                        >
                          <span className="d-none d-md-block" >Month</span>
                          <span className="d-md-none">M</span>
                        </NavLink>
                      </NavItem>
                      {/* <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 2,
                          })}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 2)}
                        >
                          <span className="d-none d-md-block">Week</span>
                          <span className="d-md-none">W</span>
                        </NavLink>
                      </NavItem>
                    */}
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Line
                    // data={chartExample1[chartExample1Data]}
                    data={statData}
                    options={chartExample1.options}
                    getDatasetAtEvent={(e) => console.log(e)}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Themes Statistiques
                    </h6>
                    <h2 className="mb-0">Top Themes</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Bar
                    data={topThemeStat}
                    options={chartExample2.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
