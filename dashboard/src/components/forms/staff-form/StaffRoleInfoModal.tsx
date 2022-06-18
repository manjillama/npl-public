import React from "react";
import { Modal } from "react-bootstrap";

type IProps = {
  showStaffRoleModal: boolean;
  setShowStaffRoleModal: (flag: boolean) => void;
};

const StaffRoleInfoModal = ({
  showStaffRoleModal,
  setShowStaffRoleModal,
}: IProps): JSX.Element => (
  <Modal
    size="lg"
    show={showStaffRoleModal}
    onHide={() => setShowStaffRoleModal(false)}
  >
    <Modal.Header closeButton>
      <Modal.Title>Staff roles</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div style={{ margin: "1.5rem 0" }}>
        <h4 style={{ fontSize: "1rem" }}>ADMIN</h4>
        <p>
          Admins can access and manage all features and settings including
          creating other admins and staffs and assign permissions.
        </p>
      </div>
      <div style={{ margin: "1.5rem 0" }}>
        <h4 style={{ fontSize: "1rem" }}>Editor</h4>
        <p>
          Editor role has low level access and can create, or update collections
          i.e. restrooms etc.
        </p>
      </div>
    </Modal.Body>
  </Modal>
);

export default StaffRoleInfoModal;
