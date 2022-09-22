import { useState } from 'react';
import MainCard from '../../components/MainCard';
import { Box, Grid, TextField, FormControl, Select, MenuItem, InputLabel, Button } from '@mui/material';
import { getArticleByID, getCategoryList, updateArticleById, createArticle } from '../../api/api';
import { useEffect } from 'react';
import ReactMde from 'react-mde';
import ReactMarkdown from 'react-markdown';
import 'react-mde/lib/styles/css/react-mde-all.css';
import 'github-markdown-css/github-markdown-light.css';
import messageUtil from '../../utils/messageUtil';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router';
function loadSuggestions(text) {
    return new Promise((accept) => {
        setTimeout(() => {
            const suggestions = [
                {
                    preview: 'Andre',
                    value: '@andre'
                },
                {
                    preview: 'Angela',
                    value: '@angela'
                },
                {
                    preview: 'David',
                    value: '@david'
                },
                {
                    preview: 'Louise',
                    value: '@louise'
                }
            ].filter((i) => i.preview.toLowerCase().includes(text.toLowerCase()));
            accept(suggestions);
        }, 250);
    });
}

function ArticlePost() {
    const {
        state: { id }
    } = useLocation();
    const [post, setPost] = useState({});
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [backGround, setBackGround] = useState('');
    const [categoryList, setCategoryList] = useState([]);
    const [categoryID, setCategoryID] = useState(0);
    const [selectedTab, setSelectedTab] = useState('write');
    const navigate = useNavigate();
    const handleChange = (event) => {
        setCategoryID(event.target.value);
    };
    const backGroundHandle = (event) => {
        setBackGround(event.target.value);
    };
    const titleHandle = (event) => {
        setTitle(event.target.value);
    };
    const submitArticleHandle = (id) => {
        return () => {
            const article = {
                id,
                title,
                backGround,
                categoryID,
                content
            };
            if (id !== 0) {
                updateArticleById(article).then((res) => {
                    if (res.Code !== 10000) {
                        messageUtil.error({ content: res.Msg, duration: 1500 });
                    } else {
                        messageUtil.success({ content: '修改成功', duration: 1500 });
                        navigate('/article/list', {
                            replace: true
                        });
                    }
                });
            } else {
                createArticle(article).then((res) => {
                    if (res.Code !== 10000) {
                        messageUtil.error({ content: res.Msg, duration: 1500 });
                    } else {
                        messageUtil.success({ content: '添加成功', duration: 1500 });
                        navigate('/article/list', {
                            replace: true
                        });
                    }
                });
            }
        };
    };

    useEffect(() => {
        getCategoryList().then((res) => {
            setCategoryList(res.Data);
        });
        if (id !== 0) {
            getArticleByID(id).then((res) => {
                setPost(res.Data);
                setContent(res.Data.content || '');
                setTitle(res.Data.title);
                setBackGround(res.Data.backGround);
                setCategoryID(res.Data.categoryID);
            });
        }
    }, [id]);

    return (
        <MainCard title="文章编辑">
            <Grid container alignItems="center" justifyContent="space-between" rowSpacing={3} columnSpacing={3}>
                <Grid item xs={12} sm={12} md={12} lg={6}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <TextField value={title} onChange={titleHandle} fullWidth label="标题" variant="filled" />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={6}>
                    <FormControl variant={'filled'} fullWidth>
                        <InputLabel id={'categoryID_label'}>分类</InputLabel>
                        <Select
                            required
                            labelId="categoryID_label"
                            id="categoryID_select"
                            value={categoryID || 0}
                            label="分类"
                            onChange={handleChange}
                        >
                            <MenuItem key={0} value={0}>
                                请选择分类
                            </MenuItem>
                            {categoryList.map((c) => {
                                return (
                                    <MenuItem key={c.ID} value={c.ID}>
                                        {c.name}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <TextField value={backGround} onChange={backGroundHandle} fullWidth label="背景图片" variant="filled" />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12}>
                    {/*<MDEditor style={{ marginTop: 10 }} height={900} value={content} onChange={setContent} />*/}
                    <ReactMde
                        value={content}
                        onChange={setContent}
                        selectedTab={selectedTab}
                        onTabChange={setSelectedTab}
                        generateMarkdownPreview={(markdown) =>
                            Promise.resolve(
                                <div className={'markdown-body'}>
                                    <ReactMarkdown children={markdown} />
                                </div>
                            )
                        }
                        loadSuggestions={loadSuggestions}
                        childProps={{
                            writeButton: {
                                tabIndex: -1
                            }
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Button fullWidth variant="contained" color="success" onClick={submitArticleHandle(post.ID || 0)}>
                        提交
                    </Button>
                </Grid>
            </Grid>
        </MainCard>
    );
}

export default ArticlePost;
