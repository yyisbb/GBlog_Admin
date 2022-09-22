import { useEffect, useState } from 'react';
import MainCard from '../../components/MainCard';
import { TableBody, TableContainer, Button, Table, TableHead, TableRow, TableCell, Paper } from '@mui/material';
import { getCategoryList, deleteCategoryByIds, getCategoryByID, updateCategoryById, createCategory } from '../../api/api';
import messageUtil from '../../utils/messageUtil';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';

function CategoryList() {
    const [categoryList, setCategoryList] = useState([]);
    const [dialogTitle, setDialogTitle] = useState('创建分类');
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [backGround, setBackGround] = useState('');
    const [updateId, setUpdateId] = useState(0);
    const [open, setOpen] = useState(false);

    const handleClickOpen = (type) => {
        return () => {
            if (type !== 'create') {
                setUpdateId(0);
                setDialogTitle('编辑分类');
            } else {
                setDialogTitle('创建分类');
            }
            setOpen(true);
        };
    };

    const handleClose = () => {
        setName('');
        setDesc('');
        setBackGround('');
        setUpdateId(0);
        setOpen(false);
    };
    const getList = () => {
        getCategoryList().then((res) => {
            setCategoryList(res.Data);
        });
    };
    useEffect(() => {
        getList();
    }, []);

    const categoryDeleteHandle = (id) => {
        return () => {
            deleteCategoryByIds(id).then((res) => {
                if (res.Code !== 10000) {
                    messageUtil.error({ content: res.Msg, duration: 1500 });
                } else {
                    messageUtil.success({ content: '删除成功', duration: 1500 });
                    getList();
                }
            });
        };
    };

    const nameHandle = (event) => {
        setName(event.target.value);
    };
    const descHandle = (event) => {
        setDesc(event.target.value);
    };
    const backGroundHandle = (event) => {
        setBackGround(event.target.value);
    };
    const submitHandle = () => {
        if (name === '' || desc === '' || backGround === '') {
            messageUtil.error({ content: '内容不允许为空', duration: 1500 });
        }
        const category = {
            id: updateId,
            name,
            description: desc,
            banner: backGround
        };
        if (category.id === 0) {
            //创建
            createCategory(category).then((res) => {
                if (res.Code !== 10000) {
                    messageUtil.error({ content: res.Msg, duration: 1500 });
                } else {
                    messageUtil.success({ content: '添加成功', duration: 1500 });
                    setOpen(false);
                    handleClose();
                    getList();
                }
            });
        } else {
            //修改
            updateCategoryById(category).then((res) => {
                if (res.Code !== 10000) {
                    messageUtil.error({ content: res.Msg, duration: 1500 });
                } else {
                    messageUtil.success({ content: '修改成功', duration: 1500 });
                    setOpen(false);
                    handleClose();
                    getList();
                }
            });
        }
    };
    const categoryUpdateHandle = (id) => {
        return () => {
            getCategoryByID(id).then((res) => {
                setName(res.Data.name || '');
                setDesc(res.Data.description || '');
                setBackGround(res.Data.banner || '');
                setUpdateId(id);
                setOpen(true);
            });
        };
    };
    return (
        <MainCard title={'分类列表'}>
            <Button sx={{ m: 1 }} variant="outlined" onClick={handleClickOpen('create')}>
                创建分类
            </Button>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>分类名</TableCell>
                            <TableCell>描述</TableCell>
                            <TableCell>背景图</TableCell>
                            <TableCell>操作</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categoryList.map((c) => (
                            <TableRow key={c.ID} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    {c.name}
                                </TableCell>
                                <TableCell>{c.description}</TableCell>
                                <TableCell>{c.banner}</TableCell>
                                <TableCell>
                                    <Button onClick={categoryUpdateHandle(c.ID)} sx={{ m: 1 }} variant={'contained'} color={'primary'}>
                                        编辑
                                    </Button>
                                    <Button onClick={categoryDeleteHandle(c.ID)} sx={{ m: 1 }} variant={'contained'} color={'error'}>
                                        删除
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{dialogTitle}</DialogTitle>
                <DialogContent>
                    <TextField
                        onChange={nameHandle}
                        margin="dense"
                        id="categoryName"
                        label="分类名"
                        type="text"
                        value={name}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        onChange={descHandle}
                        margin="dense"
                        id="categoryDesc"
                        label="描述"
                        value={desc}
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        onChange={backGroundHandle}
                        margin="dense"
                        id="categoryBackGround"
                        label="背景图"
                        value={backGround}
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>关闭</Button>
                    <Button onClick={submitHandle}>提交</Button>
                </DialogActions>
            </Dialog>
        </MainCard>
    );
}

export default CategoryList;
