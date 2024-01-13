import React from 'react';
import IdeaListItem from './IdeaListItem.jsx';

const IdeaPostsList = ({ ideaPosts }) => {

    return (
        <>
            <h1 className='font-black text-2xl mt-10 mb-4'>Idea Posts</h1>
            {
                ideaPosts?.map(idea => {
                    return (
                        <IdeaListItem key={idea.id} details={idea} />
                    );
                })
            }
        </>
    );
};

export default IdeaPostsList;