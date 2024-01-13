import React from 'react';
import { useNavigate } from 'react-router-dom';

const IdeaListItem = ({ details, author, isUnique = false }) => {

    const navigate = useNavigate();

    const goToIdea = () => {
        navigate(`/idea/${details?.id}`);
    };

    const authorListener = () => {
        console.log(details.author.id);
    };

    return (
        <div className='mb-20'>
            {/*Banner image*/}
            <img
                className="rounded-lg object-cover object-center w-full"
                style={isUnique ? { "maxHeight": "24rem", "marginTop": "20px" } : { "maxHeight": "12rem" }}
                src="https://images.unsplash.com/photo-1603349206295-dde20617cb6a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
            />
            {/*Tag*/}
            <p className="text-indigo-500 font-semibold text-base mt-2">Science</p>
            {/*Title*/}
            <h1 onClick={goToIdea} className="font-extrabold cursor-pointer leading-none text-xl mt-1 capitalize truncate">
                {details?.title}
            </h1>
            {/*Description*/}
            <div className="max-w-full">
                <p className="text-base font-medium tracking-wide text-gray-400 mt-1">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati vel
                    soluta dolore id nesciunt eum nam ipsam, eveniet cupiditate sint
                    veritatis harum odit. Iste dignissimos, ad provident nulla voluptatum
                    ut.
                </p>
            </div>
            <div className="flex items-center space-x-2 mt-4">
                {/*Author's profile photo*/}
                <img
                    className="w-10 h-10 object-cover object-center rounded-full"
                    src="https://randomuser.me/api/portraits/men/54.jpg"
                    alt="random user"
                />
                <div>
                    {/*Author name*/}
                    {/* <p className="text-gray-200 font-bold" onClick={authorListener}>{details?.author?.userName}</p> */}
                    <p className="font-bold" onClick={authorListener}>{details?.author?.userName}</p>
                    <p className="text-gray-500 font-semibold text-sm">
                        Feb 24,2021 · 6 min read
                    </p>
                </div>
            </div>
        </div>

    );
};

export default IdeaListItem;

// <div className="card w-96 bg-base-100 shadow-xl">
//             <div className="card-body">
//                 <h2 className="card-title">{details?.title}</h2>
//                 <p>If a dog chews shoes whose shoes does he choose?</p>
//                 <div className="card-actions justify-end">
//                     <button className="btn btn-primary">Buy Now</button>
//                 </div>
//             </div>
//         </div>

// <div className='idea-item'>
//             <div className='idea-left'>
//                 <div className='content' onClick={goToIdea}>{details?.title}</div>
//                 {
//                     author && <p onClick={authorListener}>author: {details?.author?.userName}</p>
//                 }
//             </div>
//             <div className='idea-right'>
//                 <div className='content'>Upvotes: {details?.upvotes}</div>
//                 <div className='content'>Downvotes: {details?.downvotes}</div>
//             </div>
//         </div>