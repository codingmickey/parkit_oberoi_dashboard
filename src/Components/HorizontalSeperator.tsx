import { ReactNode } from 'react';

interface seperatorProps {
  children?: ReactNode;
  marginOffsetY?: number;
  height: number;
}

export default function HorizontalSeperator({ children, height, marginOffsetY }: seperatorProps) {
  return (
    <>
      {children ? (
        <>
          <div style={{ display: 'flex', textAlign: 'center' }}>
            <div
              style={{
                height: `${height}px`,
                width: '27%',
                margin: `${marginOffsetY}px auto`,
                background: 'linear-gradient(90deg, rgba(224, 225, 226, 0) 0%, var(--highlight-yellow) 50% )'
              }}
            ></div>
            {children}
            <div
              style={{
                height: `${height}px`,
                width: '27%',
                margin: `${marginOffsetY}px auto`,
                background: 'linear-gradient(90deg, var(--highlight-yellow) 50%, rgba(224, 225, 226, 0) 100%)'
              }}
            ></div>
          </div>
        </>
      ) : (
        <>
          <div
            style={{
              height: `${height}px`,
              width: '90%',
              margin: '0px auto',
              background:
                'linear-gradient(90deg, rgba(224, 225, 226, 0) 0%, var(--highlight-yellow) 50%, rgba(224, 225, 226, 0) 100%)'
            }}
          />
        </>
      )}
    </>
  );
}
