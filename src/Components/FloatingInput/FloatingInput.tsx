import React, { useState, ChangeEvent, useRef } from 'react';
import { Input } from 'antd';
import './floatingInputStyles.css';

interface FloatInputProps {
  label: string;
  value: string;
  placeholder?: string;
  width: string;
  type?: string;
  required?: boolean;
  SuffixIcon?: JSX.Element;
  id: string;
  onSubmitOfSearch?: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FloatInput: React.FC<FloatInputProps> = ({
  label,
  value,
  placeholder,
  type = 'text',
  required,
  id,
  SuffixIcon = <></>,
  width,
  onSubmitOfSearch,
  onChange
}) => {
  const [focus, setFocus] = useState(false);
  const InputRef = useRef();
  if (!placeholder) placeholder = label;
  const isOccupied = focus || (value && value.length !== 0);
  const labelClass = isOccupied ? 'label as-label' : 'label as-placeholder';
  const requiredMark = required ? <span className="text-danger">*</span> : null;

  return (
    <div className="float-label" onBlur={() => setFocus(false)} onFocus={() => setFocus(true)}>
      <Input
        className="floating-input"
        style={{
          height: '43px',
          width: width
        }}
        onPressEnter={onSubmitOfSearch}
        onChange={onChange}
        type={type}
        value={value}
        id={id}
        ref={InputRef}
        suffix={SuffixIcon}
      />
      <label
        className={labelClass}
        style={{
          background: `${labelClass === 'label as-label' && `var(--fill-color)`}`
        }}
      >
        {isOccupied ? label : placeholder} {isOccupied ? requiredMark : ''}
      </label>
    </div>
  );
};

export default FloatInput;
