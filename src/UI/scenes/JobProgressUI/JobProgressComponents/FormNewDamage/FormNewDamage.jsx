import React from 'react'

import Modal from 'react-bootstrap/Modal';
import { useJobProgressContext } from '../../../../../context/Context';

const FormNewDamage = () => {
  const {jobFolios, formDamageShow, setFormDamageShow} = useJobProgressContext()
  return (
    <Modal
        size="sm"
        show={formDamageShow}
        onHide={() => setFormDamageShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            NEW DAMAGE
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            
        </Modal.Body>
      </Modal>
  )
}

export default FormNewDamage