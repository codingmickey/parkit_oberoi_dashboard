import React from 'react';
import { FilterOutlined } from '@ant-design/icons';
import { Button, Menu, Dropdown } from 'antd';
import { SyntheticEventData } from 'react-dom/test-utils';
import { smallButtonStyleProps } from '../Styles/CSS/CommonProps/smallButtonStyleProps';

const items: { key: string; label: string }[] = [
  {
    key: '0',
    label: 'Match separately'
  },
  {
    key: '1',
    label: 'Match together'
  }
];

interface FilterDropDownProps {
  together: number;
  setTogether: React.Dispatch<React.SetStateAction<number>>;
}

const FilterOptionsDropDown: React.FC<FilterDropDownProps> = ({ together, setTogether }) => {
  const handleMenuClick = (e: SyntheticEventData) => {
    setTogether(Number(e.key));
  };

  return (
    <Dropdown
      overlay={
        <Menu onClick={handleMenuClick} selectedKeys={[String(together)]}>
          {items.map((item) => {
            return (
              <Menu.Item
                style={{
                  backgroundColor: 'inherit',
                  color: Number(item.key) === together ? `var(--positive-color)` : 'inherit'
                }}
                key={item.key}
              >
                {item.label}
              </Menu.Item>
            );
          })}
        </Menu>
      }
    >
      <Button
        icon={<FilterOutlined />}
        style={{
          ...smallButtonStyleProps
        }}
      ></Button>
    </Dropdown>
  );
};

export default FilterOptionsDropDown;
