/* eslint-disable no-unused-expressions */
/* eslint-disable react/forbid-prop-types */
import Button from '@components/Button';
import TextField from '@components/Forms/TextField';
import Password from '@components/Forms/Password';
import Typography from '@components/Typography';
import Toast from '@components/Toast';
import { GraphOtp, GraphConfig } from '@services/graphql';
import PropTypes from 'prop-types';
import { useTranslation } from '@i18n';
import Backdrop from '@components/Loaders/Backdrop';

import useStyles from './style';

const OtpBlock = ({ phoneProps, codeProps, type }) => {
    const { t } = useTranslation(['otp', 'common']);
    const styles = useStyles();
    const [time, setTime] = React.useState(0);
    const [manySend, setManySend] = React.useState(1);
    const [message, setMessage] = React.useState({
        open: false,
        text: '',
        variant: 'info',
    });
    const [config, setConfig] = React.useState(null);
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [otp, setOtp] = React.useState('');
    const [load, setLoad] = React.useState(false);

    const [requestOtpRegister] = GraphOtp.requestOtpRegister();
    const [checkOtpRegister] = GraphOtp.checkOtpRegister();
    const [requestForgotPassword] = GraphOtp.requestOtpForgotPassword();
    const [checkOtpForgotPassword] = GraphOtp.checkOtpForgotPassword();
    const [requestOtpLogin] = GraphOtp.requestOtpLogin();
    const [checkOtpLogin] = GraphOtp.checkOtpLogin();

    const { loading, data } = GraphConfig.otpConfig();

    const handlePhone = (event) => {
        setPhoneNumber(event.target.value);
        phoneProps.onChange && phoneProps.onChange(event);
    };

    const handleOtp = (event) => {
        setOtp(event.target.value);
        codeProps.onChange && codeProps.onChange(event);
    };

    const handleSend = () => {
        setLoad(true);
        let sendOtp = () => {};
        if (type === 'register') {
            sendOtp = requestOtpRegister;
        } else if (type === 'forgotPassword') {
            sendOtp = requestForgotPassword;
        } else if (type === 'login') {
            sendOtp = requestOtpLogin;
        }
        const maxSend = config && config.maxTry ? config.maxTry : 3;
        if (manySend > maxSend) {
            setMessage({
                open: true,
                text: t('otp:maxSend'),
                variant: 'warning',
            });
        } else if (time <= 0) {
            sendOtp({
                variables: {
                    phoneNumber,
                },
            }).then(() => {
                setLoad(false);
                setManySend(manySend + 1);
                // eslint-disable-next-line no-nested-ternary
                setTime(config && config.expired ? config.expired : 60);
                setMessage({
                    open: true,
                    text: t('otp:sendSuccess'),
                    variant: 'success',
                });
            }).catch((e) => {
                setLoad(false);
                setMessage({
                    open: true,
                    text: e.message.split(':')[1] || t('customer:top:sendFailed'),
                    variant: 'error',
                });
            });
        } else {
            setMessage({
                open: true,
                text: `${t('otp:wait')} ${time} ${t('otp:resend')}`,
            });
        }
    };

    const handleCheck = () => {
        setLoad(true);
        let checkOtp = () => {};
        if (type === 'register') {
            checkOtp = checkOtpRegister;
        } else if (type === 'forgotPassword') {
            checkOtp = checkOtpForgotPassword;
        } else if (type === 'login') {
            checkOtp = checkOtpLogin;
        }

        checkOtp({
            variables: {
                phoneNumber,
                otp,
            },
        }).then((res) => {
            setLoad(false);
            let isValid;
            if (type === 'register') isValid = res.data.checkOtpRegister.is_valid_otp;
            if (type === 'forgotPassword') isValid = res.data.checkOtpForgotPassword.is_valid_otp;
            if (type === 'login') isValid = res.data.checkOtpLogin.is_valid_otp;
            if (isValid) {
                setMessage({
                    variant: 'success',
                    open: true,
                    text: t('otp:valid'),
                });
            } else {
                setMessage({
                    variant: 'error',
                    open: true,
                    text: t('otpLinvalid'),
                });
            }
        }).catch(() => {
            setLoad(false);
            setMessage({
                variant: 'error',
                open: true,
                text: t('otpLinvalid'),
            });
        });
    };

    React.useEffect(() => {
        if (!loading && data && data.otpConfig && config === null) {
            switch (type) {
            case 'register':
                setConfig({
                    maxLength: data.otpConfig.otp_length[0].length_otp_register || 4,
                    maxTry: data.otpConfig.otp_max_try[0].max_try_otp_register || 3,
                    expired: data.otpConfig.otp_expired_time[0].expired_time_otp_register || 60,
                });
                break;
            case 'login':
                setConfig({
                    maxLength: data.otpConfig.otp_length[0].length_otp_login || 4,
                    maxTry: data.otpConfig.otp_max_try[0].max_try_otp_login || 3,
                    expired: data.otpConfig.otp_expired_time[0].expired_time_otp_login || 60,
                });
                break;
            case 'forgotPassword':
                setConfig({
                    maxLength: data.otpConfig.otp_length[0].length_otp_forgot_password || 4,
                    maxTry: data.otpConfig.otp_max_try[0].max_try_otp_forgot_password || 3,
                    expired: data.otpConfig.otp_expired_time[0].expired_time_otp_forgot_password || 60,
                });
                break;

            default:
                setConfig(null);
                break;
            }
        }
        if (!time) return;
        const intervalId = setInterval(() => {
            setTime(time - 1);
        }, 1000);

        // eslint-disable-next-line consistent-return
        return () => clearInterval(intervalId);
    }, [time, data]);

    return (
        <div className={styles.root}>
            <Backdrop open={load} />
            <Toast open={message.open} message={message.text} variant={message.variant} setOpen={() => setMessage({ ...message, open: false })} />
            <div className={styles.componentContainer}>
                <div className={styles.input}>
                    <TextField label={t('common:form:phoneNumber')} fullWidth {...phoneProps} onChange={handlePhone} />
                </div>
                <div className={styles.button}>
                    <Button fullWidth onClick={handleSend} disabled={!!(!phoneProps.value || phoneProps.value === '' || phoneProps.error)}>
                        <Typography variant="p" color="white" align="center">
                            {t('common:button:sendOtp')}
                        </Typography>
                    </Button>
                </div>
            </div>
            <>
                {time > 0 && (
                    <Typography variant="p">
                        {t('otp:wait')}
                        {' '}
                        {time}
                        {' '}
                        {t('otp:resend')}
                    </Typography>
                )}
                {manySend > 1 && (
                    <Typography variant="p">
                        {t('otp:sendTimes')}
                        {' '}
                        {manySend - 1}
                        {' '}
                        {t('otp:time')}
                    </Typography>
                )}
            </>
            <div className={styles.componentContainer}>
                <div className={styles.input}>
                    <Password
                        label="Code Otp"
                        showVisible={false}
                        showPasswordMeter={false}
                        fullWidth
                        {...codeProps}
                        inputProps={{
                            maxLength: config !== null ? config.maxLength : 4,
                        }}
                        onChange={handleOtp}
                    />
                </div>
                <div className={styles.button}>
                    <Button fullWidth disabled={manySend <= 1} onClick={handleCheck}>
                        <Typography variant="p" color="white">
                            {t('common:button:verify')}
                        </Typography>
                    </Button>
                </div>
            </div>
        </div>
    );
};

OtpBlock.propTypes = {
    phoneProps: PropTypes.object,
    codeProps: PropTypes.object,
    type: PropTypes.oneOf(['login', 'register', 'forgotPassword']).isRequired,
};

OtpBlock.defaultProps = {
    phoneProps: {},
    codeProps: {},
};

export default OtpBlock;