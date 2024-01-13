import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAPI } from '../../utils/dataFetching.js';

const IdeaForm = ({ enableEdit }) => {

    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [group, setGroup] = useState('');

    // useEffect(() => {
    //     if (enableEdit) {
    //         // Fetch Idea Title and Desc from Database
    //         // Then Assign those values to some Init var first 'coz at the end we'll be comparing them with title and desc state
    //     }
    // }, [])

    const editIdeaListener = () => {
        console.log({
            title,
            desc,
            group
        });
    };

    const createIdeaListener = async () => {
        try {
            const body = {
                title,
                description: desc,
                group
            };
            const { status } = await fetchAPI('POST', '/idea/create', body);

            if (status === 201) {
                alert('Idea has been saved Successfully');
                navigate('/dashboard');
                return;
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={enableEdit ? editIdeaListener : createIdeaListener}>
            <input
                className="w-full my-4 input input-bordered input-primary"
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Title" />
            <textarea
                className=" w-full textarea textarea-primary"
                value={desc}
                onChange={e => setDesc(e.target.value)}
                placeholder="Title Description" />
            <input
                className="w-full my-4 input input-bordered input-primary"
                type="text"
                value={group}
                onChange={e => setGroup(e.target.value)}
                placeholder="Group ID" />
            <button type='submit' className='btn btn-primary mt-4'>{enableEdit ? 'Save Changes' : 'Create'}</button>
        </form>
    );
};

export default connect()(IdeaForm);