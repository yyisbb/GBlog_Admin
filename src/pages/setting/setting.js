import { useEffect, useState } from 'react';
import MainCard from '../../components/MainCard';
import { Box, Grid, TextField, Button } from '@mui/material';
import { getSetting, updateSetting } from '../../api/api';
import messageUtil from '../../utils/messageUtil';
import ReactMde from 'react-mde';
import ReactMarkdown from 'react-markdown';
import 'react-mde/lib/styles/css/react-mde-all.css';
import 'github-markdown-css/github-markdown-light.css';

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

function Setting() {
    const [name, setName] = useState('');
    const [logo, setLogo] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [homeText, setHomeText] = useState('');
    const [aboutContent, setAboutContent] = useState('');
    const [githubUrl, setGithubUrl] = useState('');
    const [selectedTab, setSelectedTab] = useState('write');
    const changeHandle = (type) => {
        return (event) => {
            switch (type) {
                case 'name':
                    setName(event.target.value);
                    break;
                case 'logo':
                    setLogo(event.target.value);
                    break;
                case 'email':
                    setEmail(event.target.value);
                    break;
                case 'avatar':
                    setAvatar(event.target.value);
                    break;
                case 'authorName':
                    setAuthorName(event.target.value);
                    break;
                case 'homeText':
                    setHomeText(event.target.value);
                    break;
                case 'aboutContent':
                    setAboutContent(event.target.value);
                    break;
                case 'githubUrl':
                    setGithubUrl(event.target.value);
                    break;
            }
        };
    };
    const getSettingList = () => {
        getSetting().then((res) => {
            setName(res.Data.name);
            setLogo(res.Data.logo);
            setEmail(res.Data.email);
            setAvatar(res.Data.avatar);
            setAuthorName(res.Data.authorName);
            setHomeText(res.Data.homeText);
            setAboutContent(res.Data.aboutContent);
            setGithubUrl(res.Data.githubUrl);
        });
    };
    useEffect(() => {
        getSettingList();
    }, []);

    const submitHandle = (id) => {
        return () => {
            const setting = {
                id,
                name,
                logo,
                email,
                avatar,
                authorName,
                homeText,
                aboutContent,
                githubUrl
            };
            updateSetting(setting).then((res) => {
                if (res.Code !== 10000) {
                    messageUtil.error({ content: res.Msg, duration: 1500 });
                } else {
                    messageUtil.success({ content: '修改成功', duration: 1500 });
                    getSettingList();
                }
            });
        };
    };

    return (
        <MainCard title={'网站设置'}>
            <Grid container alignItems="center" justifyContent="space-between" rowSpacing={3} columnSpacing={3}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <TextField value={name} onChange={changeHandle('name')} fullWidth label="站点名" variant="filled" />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <TextField value={logo} onChange={changeHandle('logo')} fullWidth label="LOGO" variant="filled" />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <TextField value={email} onChange={changeHandle('email')} fullWidth label="邮箱" variant="filled" />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <TextField value={avatar} onChange={changeHandle('avatar')} fullWidth label="头像" variant="filled" />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <TextField value={authorName} onChange={changeHandle('authorName')} fullWidth label="站长名" variant="filled" />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <TextField value={homeText} onChange={changeHandle('homeText')} fullWidth label="首页文字" variant="filled" />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <TextField value={githubUrl} onChange={changeHandle('githubUrl')} fullWidth label="Github链接" variant="filled" />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <ReactMde
                        value={aboutContent}
                        onChange={setAboutContent}
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
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <Button fullWidth variant="contained" color="success" onClick={submitHandle(1)}>
                            提交
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </MainCard>
    );
}

export default Setting;
