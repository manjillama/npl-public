import React from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Loader from "../../components/commons/Loader";
import { IRestroom } from "../../interfaces";
import { withDashboard } from "../../hoc";
import Map from "../../components/map";
import { usePromiseFetch } from "../../hooks";

function RestroomPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const { pathname } = useLocation();

  const [fetching, response, error] = usePromiseFetch(`/restrooms/${id}`);

  if (fetching) return <Loader />;
  if (!response || error) return <Navigate to="/error" />;

  const restroom = response.restroom as IRestroom;

  const { name, address, isEnabled, phoneNumber, type, remarks } = restroom;
  return (
    <Container>
      <div className="head-panel d-flex">
        <div>
          <h1 className="page-title">Restroom</h1>
          {isEnabled ? (
            <div className="badge bg-success">Enabled</div>
          ) : (
            <div className="badge bg-danger">Disabled</div>
          )}
        </div>

        <div className="head-right">
          <Link to={`${pathname}/edit`} className="btn btn-dark">
            Update Restroom
          </Link>
        </div>
      </div>
      <div className="body-card">
        <Row>
          <Col>
            <ul className="neutralize p-0 list-unstyled">
              <li>Code: {id}</li>
              <li>Name: {name}</li>
              <li>Contact number: {phoneNumber}</li>
              <li>Address: {address}</li>
              <li>Type: {type}</li>
            </ul>
          </Col>
        </Row>
      </div>

      <div className="body-card">
        <Row>
          <Col>
            <strong>Remarks:</strong>
            <p style={{ whiteSpace: "pre-line" }}>{remarks ? remarks : "NA"}</p>
          </Col>
        </Row>
      </div>

      <div className="body-card">
        <Row>
          <Col>
            <Map mappable={restroom} />
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default withDashboard(RestroomPage);
