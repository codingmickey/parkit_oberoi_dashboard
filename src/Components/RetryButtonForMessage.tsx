import { Button } from 'antd';

interface RetryButtonForMessaage {
  setReloadTrigger?: React.Dispatch<React.SetStateAction<number>>;
  onRetryClick?: () => void;
}

export default function RetryButtonForMessage({ setReloadTrigger, onRetryClick }: RetryButtonForMessaage) {
  return (
    <>
      {setReloadTrigger && (
        <Button
          className="positive-action-button"
          style={{ marginRight: '17px' }}
          onClick={() => setReloadTrigger((prev) => prev + 1)}
        >
          Retry
        </Button>
      )}
      {onRetryClick && (
        <Button className="positive-action-button" style={{ marginRight: '17px' }} onClick={onRetryClick}>
          Retry
        </Button>
      )}
    </>
  );
}
