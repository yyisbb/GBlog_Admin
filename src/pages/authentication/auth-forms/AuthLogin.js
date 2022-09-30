import { useEffect, useState } from 'react';

// material-ui
import { Button, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack } from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import messageUtil from '../../../utils/messageUtil';
import { login } from '../../../api/api';
import tokenUtil from '../../../utils/tokenUtil';

// ============================|| FIREBASE - LOGIN ||============================ //

const AuthLogin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const onSubmit = (values) => {
        const { username, password } = values;
        setSubmitting(true);
        login(username, password).then((res) => {
            if (res.Code !== 10000) {
                messageUtil.error({ content: res.Msg, duration: 1500 });
                setSubmitting(false);
            } else {
                messageUtil.success({ content: '登录成功', duration: 1500 });
                tokenUtil.saveToken(res.Data);
                setSubmitting(false);
                navigate('/dashboard/index');
            }
        });
    };

    useEffect(() => {
        if (tokenUtil.getToken()) {
            navigate('/dashboard/index');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Formik
                initialValues={{
                    username: '',
                    password: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    username: Yup.string().max(255).required('用户名必须输入'),
                    password: Yup.string().max(255).required('密码必须输入')
                })}
                onSubmit={onSubmit}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="username-login">用户名</InputLabel>
                                    <OutlinedInput
                                        id="username-login"
                                        type="username"
                                        value={values.username}
                                        name="username"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="请输入用户名"
                                        fullWidth
                                        error={Boolean(touched.username && errors.username)}
                                    />
                                    {touched.username && errors.username && (
                                        <FormHelperText error id="standard-weight-helper-text-username-login">
                                            {errors.username}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="password-login">密码</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.password && errors.password)}
                                        id="-password-login"
                                        type={showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        name="password"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    size="large"
                                                >
                                                    {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        placeholder="请输入密码"
                                    />
                                    {touched.password && errors.password && (
                                        <FormHelperText error id="standard-weight-helper-text-password-login">
                                            {errors.password}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            {errors.submit && (
                                <Grid item xs={12}>
                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <AnimateButton>
                                    <Button
                                        disableElevation
                                        disabled={submitting}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                    >
                                        登录
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default AuthLogin;
