//Third party
import { useState, SyntheticEvent, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { Button, Form, message, Typography } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

//Page specific
import './loginStyles.css';
import axiosPrivateInstance from '../../api/Axios/privateInstance';

//components|hooks|utils
import FloatInput from '../../Components/FloatingInput/FloatingInput';
import HorizontalSeperator from '../../Components/HorizontalSeperator';
import BackroundCircles from './blocks/backroundCircles/BackroundCircles';
import Lock from './blocks/LockAnimation/Lock';
import { handleInputChange } from '../../utils/setDataIntoInputBasedOfId';
import useWindowDimensions from '../../Hooks/windowDimension';
import useAuth from '../../Hooks/useAuth';
import ThemeSwitchButton from '../../Components/ThemeSwitchButton';

interface FormData {
  phone: string;
  password: string;
}

interface LoginResponse {
  data: Auth;
}

export default function LoginPage() {
  const inputRef = useRef();
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState<FormData>({
    phone: '',
    password: ''
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [logddedInForLockAnimation, setLogddedInForLockAnimation] = useState(false);
  const { Title } = Typography;
  const { width, height } = useWindowDimensions();
  let timeoutId: NodeJS.Timeout | null = null; // Track the timeout ID

  const handleScreenClickToCancelTimeout = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  const startTimeout = () => {
    timeoutId = setTimeout(() => {
      navigate('/dashboard');
    }, 900);
  };

  useEffect(() => {
    if (logddedInForLockAnimation) {
      startTimeout();
    }
  }, [logddedInForLockAnimation]);

  const dealingWithLoginSubmission = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!data.password || !data.phone) {
      message.error({
        content: 'Please enter complete details',
        duration: 3
      });
      return;
    }
    try {
      const options = {
        method: 'POST',
        url: 'login',
        // TODO: Change this
        data: { password: data.password, mobileNumber: data.phone }
      };
      const resp: LoginResponse = await axiosPrivateInstance(options);
      setLogddedInForLockAnimation(true);
      console.log(resp);

      localStorage.setItem('token', resp.data.token);

      setAuth({
        mobileNumber: resp.data.mobileNumber,
        id: resp.data.id,
        token: resp.data.token
      });
    } catch (err) {
      const error = err as AxiosError;
      console.log(err);
      if (!error.response) {
        message.error({
          content: 'No server response',
          duration: 3
        });
      } else {
        message.error({
          content: 'Invalid credentials',
          duration: 3
        });
      }
    }
  };

  return (
    <>
      <div
        className="login-page"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          overflow: 'clip',
          backgroundColor: 'var(--background-color-secondary)',
          position: 'relative'
        }}
        onClick={handleScreenClickToCancelTimeout}
      >
        <BackroundCircles width={width} />
        <div
          style={{
            top: 0,
            right: 0,
            position: 'absolute',
            margin: '10px 10px 0px 0px'
          }}
        >
          <ThemeSwitchButton />
        </div>

        <div style={{ margin: '0px auto 4rem auto' }}>
          <div
            style={{
              marginTop: '30px'
            }}
          >
            <HorizontalSeperator height={2} marginOffsetY={26}>
              <Title
                style={{
                  letterSpacing: '3px',
                  marginTop: '3px',
                  whiteSpace: 'normal',
                  fontSize: `${
                    width > 1280
                      ? '2.5rem'
                      : width > 992
                      ? '2.375rem'
                      : width >= 768 && width < 992
                      ? '2.188rem'
                      : '1.875rem'
                  }`
                }}
              >
                PARKIT
              </Title>
            </HorizontalSeperator>
          </div>

          {/* Login Form */}
          <div
            className="login-card"
            style={{
              zIndex: 1000,
              backgroundColor: 'var(--fill-color)',
              padding: '24px',
              borderRadius: '12px',
              height: `${height > 569 ? '283px' : height > 640 ? '295px' : height > 768 ? '19.063rem' : ''}`,
              width: `${
                width > 1280 ? '400px' : width > 992 ? '320px' : width >= 768 && width < 992 ? '280px' : '15rem'
              }`
            }}
          >
            <div
              style={{
                height: '60px',
                width: '60px',
                borderRadius: '100%',
                margin: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyItems: 'center'
              }}
            >
              <Lock unlocked={logddedInForLockAnimation} />
            </div>

            <Form onSubmitCapture={dealingWithLoginSubmission}>
              <div style={{ marginTop: '20px', marginBottom: '17px' }}>
                <FloatInput
                  width="100%"
                  label="Phone"
                  value={data.phone}
                  placeholder="Enter Phone..."
                  required={true}
                  type={`${isPasswordVisible ? 'text' : 'password '}`}
                  id="phone"
                  onChange={(e) => {
                    handleInputChange<FormData>(e, setData, false);
                  }}
                />
              </div>

              <FloatInput
                width="100%"
                label="Password"
                type={`${isPasswordVisible ? 'text' : 'password'}`}
                value={data.password}
                placeholder="Enter password..."
                SuffixIcon={
                  isPasswordVisible ? (
                    <EyeOutlined
                      className="visible-pass"
                      type={'outline'}
                      style={{
                        marginRight: '6px',
                        cursor: 'pointer',
                        color: 'var(--background-color-secondary)'
                      }}
                      onClick={() => setIsPasswordVisible(false)}
                    />
                  ) : (
                    <EyeInvisibleOutlined
                      style={{
                        marginRight: '6px',
                        cursor: 'pointer',
                        color: 'var(--background-color-secondary)'
                      }}
                      onClick={() => setIsPasswordVisible(true)}
                    />
                  )
                }
                required={true}
                id="password"
                onChange={(e) => {
                  handleInputChange<FormData>(e, setData, false);
                }}
              />

              <div style={{ marginTop: '20px', marginBottom: '15px' }}>
                <Button
                  htmlType="submit"
                  className="positive-action-button"
                  style={{
                    width: '80%',
                    margin: '18px 10px 0px 30px',
                    height: '40px'
                  }}
                >
                  Submit
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
