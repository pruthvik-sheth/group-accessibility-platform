import React from 'react';
import IdeaForm from './IdeaForm.jsx';

const AddIdea = () => {
    return (
        <>
            <input type="checkbox" id="my-modal-idea" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="my-modal-idea" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">Create Idea</h3>
                    <IdeaForm enableEdit={false} />
                </div>
            </div>
        </>
    );
};

export default AddIdea;