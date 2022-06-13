import React from "react";
import { Col, Container, Row, Table } from "react-bootstrap";

const Loader = (): JSX.Element => (
  <div
    style={{
      position: "relative",
      width: "100%",
      height: "100%",
      minWidth: 40,
      minHeight: 40,
    }}
  >
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="spi" />
    </div>
  </div>
);

export const FullScreenLoader = (): JSX.Element => (
  <div style={{ position: "fixed", width: "100%", height: "100%" }}>
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <img
        src="/assets/images/logo-s.png"
        alt="logo"
        width={100}
        className="blink"
      />
    </div>
  </div>
);

export const TableLoader = (): JSX.Element => (
  <Container>
    <Row>
      <Col>
        <div className="head-panel d-flex">
          <div className="head-left">
            <h1 className="page-title">
              <div
                style={{
                  borderRadius: 4,
                  width: 60,
                  height: 24,
                  backgroundColor: "#dee2e6",
                }}
              />
            </h1>
            <div
              style={{
                marginTop: 8,
                borderRadius: 4,
                width: 72,
                height: 12,
                backgroundColor: "#dee2e6",
              }}
            />{" "}
          </div>
          <div className="head-right">
            <div
              style={{
                borderRadius: 4,
                width: 68,
                height: 32,
                backgroundColor: "#dee2e6",
              }}
            />
          </div>
        </div>
      </Col>
    </Row>
    <div className="body-card">
      <Row>
        <Col>
          <Table responsive>
            <thead className="table-secondary">
              <tr>
                <th>
                  <div
                    style={{
                      borderRadius: 4,
                      width: 50,
                      height: 10,
                      backgroundColor: "#fafafa",
                    }}
                  />
                </th>
                <th>
                  <div
                    style={{
                      borderRadius: 4,
                      width: 50,
                      height: 10,
                      backgroundColor: "#fafafa",
                    }}
                  />
                </th>
                <th>
                  <div
                    style={{
                      borderRadius: 4,
                      width: 50,
                      height: 10,
                      backgroundColor: "#fafafa",
                    }}
                  />
                </th>
                <th>
                  <div
                    style={{
                      borderRadius: 4,
                      width: 50,
                      height: 10,
                      backgroundColor: "#fafafa",
                    }}
                  />
                </th>
                <th>
                  <div
                    style={{
                      borderRadius: 4,
                      width: 50,
                      height: 10,
                      backgroundColor: "#fafafa",
                    }}
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div
                    style={{
                      borderRadius: 4,
                      width: 50,
                      height: 10,
                      backgroundColor: "#dee2e6",
                    }}
                  />
                </td>
                <td>
                  <div
                    style={{
                      borderRadius: 4,
                      width: 50,
                      height: 10,
                      backgroundColor: "#dee2e6",
                    }}
                  />
                </td>
                <td>
                  <div
                    style={{
                      borderRadius: 4,
                      width: 50,
                      height: 10,
                      backgroundColor: "#dee2e6",
                    }}
                  />
                </td>
                <td>
                  <div
                    style={{
                      borderRadius: 4,
                      width: 50,
                      height: 10,
                      backgroundColor: "#dee2e6",
                    }}
                  />
                </td>
                <td>
                  <div
                    style={{
                      borderRadius: 4,
                      width: 50,
                      height: 10,
                      backgroundColor: "#dee2e6",
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <div
                    style={{
                      borderRadius: 4,
                      width: 50,
                      height: 10,
                      backgroundColor: "#dee2e6",
                    }}
                  />
                </td>
                <td>
                  <div
                    style={{
                      borderRadius: 4,
                      width: 50,
                      height: 10,
                      backgroundColor: "#dee2e6",
                    }}
                  />
                </td>
                <td>
                  <div
                    style={{
                      borderRadius: 4,
                      width: 50,
                      height: 10,
                      backgroundColor: "#dee2e6",
                    }}
                  />
                </td>
                <td>
                  <div
                    style={{
                      borderRadius: 4,
                      width: 50,
                      height: 10,
                      backgroundColor: "#dee2e6",
                    }}
                  />
                </td>
                <td>
                  <div
                    style={{
                      borderRadius: 4,
                      width: 50,
                      height: 10,
                      backgroundColor: "#dee2e6",
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <div
                    style={{
                      borderRadius: 4,
                      width: 50,
                      height: 10,
                      backgroundColor: "#dee2e6",
                    }}
                  />
                </td>
                <td>
                  <div
                    style={{
                      borderRadius: 4,
                      width: 50,
                      height: 10,
                      backgroundColor: "#dee2e6",
                    }}
                  />
                </td>
                <td>
                  <div
                    style={{
                      borderRadius: 4,
                      width: 50,
                      height: 10,
                      backgroundColor: "#dee2e6",
                    }}
                  />
                </td>
                <td>
                  <div
                    style={{
                      borderRadius: 4,
                      width: 50,
                      height: 10,
                      backgroundColor: "#dee2e6",
                    }}
                  />
                </td>
                <td>
                  <div
                    style={{
                      borderRadius: 4,
                      width: 50,
                      height: 10,
                      backgroundColor: "#dee2e6",
                    }}
                  />
                </td>
              </tr>
            </tbody>
          </Table>
          <br />
        </Col>
      </Row>
    </div>
  </Container>
);

export default Loader;
