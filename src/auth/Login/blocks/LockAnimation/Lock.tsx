import './lockStyles.css';

interface LockTypes {
  unlocked: boolean;
}

export default function Lock({ unlocked }: LockTypes) {
  return (
    <div className="container">
      <span className={`lock ${unlocked && 'unlocked'} ${!unlocked && 'notUnlocked'}`}></span>
    </div>
  );
}
