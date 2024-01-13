import React from 'react';
import GroupForm from './GroupForm.jsx';

const CreateGroup = ({ isOpen, onRequestClose }) => {
    return (
        <>
            <input
                type="checkbox"
                id="my-modal-3"
                className="modal-toggle" />

            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">Create Group</h3>
                    <GroupForm />
                </div>
            </div>
        </>
    );
};

export default CreateGroup;