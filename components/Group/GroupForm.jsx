import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAPI } from '../../utils/dataFetching.js';

const GroupForm = ({ enableEdit }) => {

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');

    const editGroupListener = () => {
        console.log({
            name,
            desc
        });
    };

    const createGroupListener = async () => {
        try {
            const body = {
                name,
                description: desc
            };
            const { status } = await fetchAPI('POST', '/group/create', body);

            if (status === 201) {
                alert('Group has been created Successfully.');
                navigate('/dashboard');
                return;
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={enableEdit ? editGroupListener : createGroupListener}>
            <input
                className="w-full my-4 input input-bordered input-primary"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Group Name" />
            <textarea
                className=" w-full textarea textarea-primary"
                value={desc}
                onChange={e => setDesc(e.target.value)}
                placeholder="Group Description"></textarea>
            <button className='btn btn-primary mt-4'>{enableEdit ? 'Save Changes' : 'Create'}</button>
        </form>
    );
};

export default GroupForm;