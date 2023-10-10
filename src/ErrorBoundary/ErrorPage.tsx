import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { smallButtonStyleProps } from '../Styles/CSS/CommonProps/smallButtonStyleProps';

export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button
          style={{ ...smallButtonStyleProps, width: '150px', display: 'inline-flex', alignItems: 'center' }}
          onClick={() => navigate('/dashboard')}
        >
          Back Home
        </Button>
      }
    />
  );
}
