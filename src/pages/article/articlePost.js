import React, { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import MainCard from '../../components/MainCard';

function ArticlePost(props) {
    const [value, setValue] = React.useState('**Hello world!!!**');
    return (
        <MainCard title="文章编辑">
            <MDEditor height={600} value={value} onChange={setValue} />
        </MainCard>
    );
}

export default ArticlePost;
