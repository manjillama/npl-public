import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AiFillEye } from "react-icons/ai";
import { Container, Row, Col, Table } from "react-bootstrap";
import { TableLoader } from "../../components/commons/Loader";
import { IStaff } from "../../interfaces";
import { withDashboard } from "../../hoc";
import { usePromiseFetch } from "../../hooks";
import Paginate from "../../components/paginate";
import { SearchFields } from "../../components/search-box";

function StaffsPage(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();

  const [fetching, response] = usePromiseFetch("/staffs", searchParams);

  if (fetching) return <TableLoader />;

  const {
    staffs,
    size,
    total,
  }: { staffs: IStaff[]; size: number; total: number } = response
    ? response
    : {
        staffs: [],
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
              <h1 className="page-title">Staffs</h1>
              <span className="text-muted">{total} entries found</span>
            </div>
            <div className="head-right">
              <Link to="/staffs/add" className="btn btn-dark">
                Add staff
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
                { label: "Email", name: "email" },
                {
                  label: "Phone number",
                  name: "phoneNumber",
                },
              ]}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Table responsive hover bordered>
              <thead className="table-secondary">
                <tr>
                  <th>Code</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone number</th>
                  <th>Status</th>
                  <th>Roles</th>
                  <th>Added date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {staffs.map(
                  ({
                    id,
                    name,
                    email,
                    phoneNumber,
                    enabled,
                    roles,
                    createdAt,
                  }) => (
                    <tr key={id}>
                      <td>
                        <small>{id}</small>
                      </td>
                      <td>{name}</td>
                      <td>{email}</td>
                      <td>{phoneNumber}</td>
                      <td>
                        {enabled ? (
                          <div className="badge bg-success">Enabled</div>
                        ) : (
                          <div className="badge bg-danger">Disabled</div>
                        )}
                      </td>
                      <td>
                        {roles?.map((role) => (
                          <span key={role} className="badge bg-info">
                            {role?.split("ROLE_")[1]}
                          </span>
                        ))}
                      </td>
                      <td>{new Date(createdAt as string).toLocaleString()}</td>

                      <td>
                        <Link
                          className="btn btn-secondary"
                          to={`/staffs/${id}/edit`}
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

export default withDashboard(StaffsPage);
