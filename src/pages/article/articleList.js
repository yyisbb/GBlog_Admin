import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Edit, Delete } from '@mui/icons-material';
import { visuallyHidden } from '@mui/utils';
import MainCard from '../../components/MainCard';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { getArticleList, deleteArticleByIds } from '../../api/api';
import { fDateTime } from '../../utils/formatTime';
import messageUtil from '../../utils/messageUtil';
import { useNavigate } from 'react-router';
import tokenUtil from '../../utils/tokenUtil';
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'created_time',
        numeric: false,
        disablePadding: true,
        label: '发布时间'
    },
    {
        id: 'title',
        numeric: true,
        disablePadding: false,
        label: '标题'
    },
    {
        id: 'category_name',
        numeric: true,
        disablePadding: false,
        label: '分类'
    },
    {
        id: 'shareNum',
        numeric: true,
        disablePadding: false,
        label: '分享数'
    },
    {
        id: 'watchNum',
        numeric: true,
        disablePadding: false,
        label: '查看数'
    },
    {
        id: 'commentNum',
        numeric: true,
        disablePadding: false,
        label: '评论数'
    },
    {
        id: 'operation',
        numeric: true,
        disablePadding: false,
        label: '操作'
    }
];

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts'
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired
};

const EnhancedTableToolbar = (props) => {
    const { numSelected, SelectedIds, flushCallBack } = props;
    const navigate = useNavigate();
    const deleteArticle = () => {
        if (numSelected === 0) {
            messageUtil.error({ content: '请选择需要删除的文章', duration: 1500 });
        }
        SelectedIds.map((id) => {
            deleteArticleByIds(id).then((res) => {
                if (res.Code === 10000) {
                    flushCallBack();
                    messageUtil.success({ content: '删除成功', duration: 1500 });
                } else if (res.Code === 10008 || res.Code === 10007) {
                    messageUtil.error({ content: res.Msg, duration: 1500 });
                    tokenUtil.removeToken();
                    navigate('/login');
                }
            });
        });
    };
    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
                })
            }}
        >
            {numSelected > 0 ? (
                <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                <></>
            )}

            {numSelected > 0 ? (
                <div>
                    <Tooltip title="Delete">
                        <div>
                            <IconButton onClick={deleteArticle}>
                                <Delete />
                            </IconButton>
                        </div>
                    </Tooltip>
                </div>
            ) : (
                <></>
            )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
    SelectedIds: PropTypes.array.isRequired,
    flushCallBack: PropTypes.func.isRequired
};

export default function ArticleList() {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [blogs, SetBlogs] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [count, SetCount] = useState(1);
    const navigate = useNavigate();
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = blogs.map((b) => b.ID);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - blogs.length) : 0;

    useEffect(() => {
        // 获取文章列表
        getArticleList(page).then((res) => {
            SetBlogs(res.Data);
            SetCount(res.Count);
        });
    }, [page]);

    const flushCallBack = () => {
        setSelected([]);
        // 获取文章列表
        getArticleList(page).then((res) => {
            SetBlogs(res.Data);
            SetCount(res.Count);
        });
    };
    const editArticle = (id) => {
        return (e) => {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            navigate('/article/post/', {
                state: {
                    id: id
                }
            });
        };
    };

    const createArticleHandle = () => {
        navigate('/article/post', {
            state: {
                id: 0
            }
        });
    };

    return (
        <MainCard title="文章列表">
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 1 }}>
                    <EnhancedTableToolbar flushCallBack={flushCallBack} numSelected={selected.length} SelectedIds={selected} />
                    <Button onClick={createArticleHandle} sx={{ m: 3 }} variant={'contained'} color={'primary'}>
                        新增文章
                    </Button>
                    <TableContainer>
                        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'medium'}>
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={blogs.length}
                            />
                            <TableBody>
                                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                                {stableSort(blogs, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((blog, index) => {
                                        const isItemSelected = isSelected(blog.ID);
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                hover
                                                onClick={(event) => handleClick(event, blog.ID)}
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={blog.ID}
                                                selected={isItemSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        color="primary"
                                                        checked={isItemSelected}
                                                        inputProps={{
                                                            'aria-labelledby': labelId
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell component="th" id={labelId} scope="row" padding="none">
                                                    {fDateTime(blog.CreatedAt || '') || ''}
                                                </TableCell>
                                                <TableCell align="right">{blog.title || ''}</TableCell>
                                                <TableCell align="right">{blog.categoryName || ''}</TableCell>
                                                <TableCell align="right">{blog.shareNum || 0}</TableCell>
                                                <TableCell align="right">{blog.watchNum || 0}</TableCell>
                                                <TableCell align="right">{blog.commentNum || 0}</TableCell>
                                                <TableCell align="right">
                                                    <IconButton onClick={editArticle(blog.ID)}>
                                                        <Edit />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: 53 * emptyRows
                                        }}
                                    >
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={blogs.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Box>
        </MainCard>
    );
}
