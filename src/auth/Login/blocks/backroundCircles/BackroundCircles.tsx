import './backroundCirclesStyles.css';

interface BackroundCircles {
  width: number;
}

export default function BackroundCircles({ width }: BackroundCircles) {
  const sizeFactor = width >= 1280 ? 0.95 : width > 962 ? 1 : width > 800 ? 1.15 : 1.2;

  return (
    <>
      <div
        className="circle"
        style={{
          position: 'absolute',
          top: `${-50 / sizeFactor}px`,
          left: `${-50 / sizeFactor}px`,
          width: `${100 / sizeFactor}px`,
          height: `${100 / sizeFactor}px`
        }}
      ></div>
      <div
        className="circle"
        style={{
          position: 'absolute',
          top: `${-70 / sizeFactor}px`,
          left: `${-70 / sizeFactor}px`,
          width: `${140 / sizeFactor}px`,
          height: `${140 / sizeFactor}px`,
          opacity: 0.5
        }}
      ></div>
      <div
        className="circle"
        style={{
          position: 'absolute',
          top: `${-98 / sizeFactor}px`,
          left: `${-98 / sizeFactor}px`,
          width: `${196 / sizeFactor}px`,
          height: `${196 / sizeFactor}px`,
          opacity: 0.28
        }}
      ></div>

      <div
        className="circle"
        style={{
          position: 'absolute',
          bottom: `${-100 / sizeFactor}px`,
          right: `${-100 / sizeFactor}px`,
          width: `${200 / sizeFactor}px`,
          height: `${200 / sizeFactor}px`
        }}
      ></div>
      <div
        className="circle"
        style={{
          position: 'absolute',
          bottom: `${-140 / sizeFactor}px`,
          right: `${-140 / sizeFactor}px`,
          width: `${280 / sizeFactor}px`,
          height: `${280 / sizeFactor}px`,
          opacity: 0.39
        }}
      ></div>
      <div
        className="circle"
        style={{
          position: 'absolute',
          bottom: `${-196 / sizeFactor}px`,
          right: `${-196 / sizeFactor}px`,
          width: `${392 / sizeFactor}px`,
          height: `${392 / sizeFactor}px`,
          opacity: 0.2
        }}
      ></div>
    </>
  );
}
