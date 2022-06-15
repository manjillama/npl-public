import React from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { Container, Row, Col, Table } from "react-bootstrap";
import { usePromiseFetch } from "../../hooks";
import { TableLoader } from "../../components/commons/Loader";
import { IRestroom } from "../../interfaces";
import { withDashboard } from "../../hoc";
import Paginate from "../../components/paginate";
import { SearchFields } from "../../components/search-box";
import { AiFillEye } from "react-icons/ai";
import { REST_ROOM_TYPE } from "../../constants";

function RestroomsPage(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();

  const [fetching, response, error] = usePromiseFetch(
    "/restrooms",
    searchParams
  );

  if (fetching) return <TableLoader />;
  if (!response || error) return <Navigate to="/error" />;

  const {
    restrooms,
    size,
    total,
  }: { restrooms: IRestroom[]; size: number; total: number } = response
    ? response
    : {
        restrooms: [],
        size: 40,
        total: 0,
      };

  const totalPage = Math.ceil(total / size);

  return (
    <Container>
      <Row>
        <Col>
          <div className="head-panel d-flex">
            <div className="head-left">
              <h1 className="page-title">Restrooms</h1>
              <span className="text-muted">{total} entries found</span>
            </div>
            <div className="head-right">
              <Link to="/restrooms/add" className="btn btn-dark">
                Add restroom
              </Link>
            </div>
          </div>
        </Col>
      </Row>
      <div className="body-card">
        <Row>
          <Col>
            <SearchFields
              fields={[
                { label: "Id", name: "_id" },
                {
                  label: "Type",
                  name: "type",
                  type: "dropDown",
                  options: [
                    {
                      label: "All",
                      value: "",
                    },
                    ...REST_ROOM_TYPE.map((t) => ({ label: t, value: t })),
                  ],
                },
              ]}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Table responsive hover bordered>
              <thead className="table-dark">
                <tr>
                  <th>Code</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Address</th>
                  <th>Phone number</th>
                  <th>Enabled</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {restrooms.map(
                  ({ id, name, type, isEnabled, phoneNumber, address }) => (
                    <tr key={id}>
                      <td>
                        <small>{id}</small>
                      </td>
                      <td style={{ maxWidth: 200 }}>
                        <div>{name}</div>
                      </td>
                      <td>{type}</td>
                      <td>{address}</td>
                      <td>{phoneNumber}</td>
                      <td>
                        {isEnabled ? (
                          <div className="badge bg-success">Enabled</div>
                        ) : (
                          <div className="badge bg-danger">Disabled</div>
                        )}
                      </td>
                      <td>
                        <Link
                          className="btn btn-secondary"
                          to={`/restrooms/${id}`}
                        >
                          <AiFillEye />
                        </Link>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col>
            <Paginate
              totalPage={totalPage}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default withDashboard(RestroomsPage);
