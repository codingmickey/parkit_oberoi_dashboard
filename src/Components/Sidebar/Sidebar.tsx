//Third party
import { Layout, Menu, Typography, Image } from 'antd';
import { NavLink, useLocation } from 'react-router-dom';

//Page specific
import './SidebarStyles.css';
import { SidebarLinks } from './SidebarItems';
import logo from '../../Assets/Images/Parkit/SVG/LogoSymbol.svg';

interface MenuItem {
  key: string;
  icon: React.ReactNode;
  label: string;
  route?: string;
  children?: MenuItem[];
}

interface SideBarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({ collapsed, setCollapsed }: SideBarProps) {
  const { Sider } = Layout;
  const location = useLocation();
  const { Title } = Typography;

  function getItem(
    label: string,
    key: string,
    icon?: React.ReactNode,
    route?: string,
    children?: MenuItem[]
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      route: route ?? '' // Provide a default empty string if route is undefined
    };
  }

  const items: MenuItem[] = SidebarLinks.map((item) => {
    if (item.children) {
      const children = item.children.map((child) => getItem(child.displayName, child.route, child.icon));
      return {
        key: item.displayName,
        icon: item.icon,
        label: item.displayName,
        children
      };
    } else {
      return getItem(item.displayName, item.route, item.icon);
    }
  });

  const selectedKeys = [location.pathname];

  return (
    <>
      <Sider
        collapsible
        breakpoint="md"
        style={{
          backgroundColor: `var(--background-color-secondary)`,
          minHeight: '97vh'
        }}
        collapsed={collapsed}
        trigger={null}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            width: '100%',
            marginBottom: '39px',
            marginTop: '10px',
            height: '100px',
            textAlign: 'center',
            // opacity: collapsed ? 0 : 1,
            transform: collapsed ? 'scale(0.45)' : 'scale(0.9)',
            transition: `opacity ${collapsed ? '0s' : '0.7s'} ease-out`
          }}
        >
          <Image src={logo} preview={false} style={{ width: '100%', margin: '10px 0' }} />
        </div>

        <Menu
          mode="inline"
          className="sidebar-menu"
          style={{
            backgroundColor: 'inherit',
            transition: 'all 1s'
          }}
          selectedKeys={selectedKeys}
        >
          {items.map((item) => {
            return item.children ? (
              <Menu.SubMenu
                className="sidebar-submenu"
                key={item.key}
                icon={item.icon}
                style={{
                  fontWeight: location.pathname === item.route ? 'bold' : 'normal'
                }}
                title={item.label}
              >
                {item.children.map((child) => {
                  return (
                    <Menu.Item key={child.key} icon={child.icon} className="no-children">
                      <NavLink to={child.key} className="sidebar-link">
                        {child.label}
                      </NavLink>
                    </Menu.Item>
                  );
                })}
              </Menu.SubMenu>
            ) : (
              <Menu.Item
                key={item.key}
                icon={item.icon}
                className="no-children"
                style={{
                  fontWeight: location.pathname === item.route ? 'bold' : 'normal'
                }}
              >
                <NavLink
                  to={item.key}
                  style={{
                    fontWeight: location.pathname === item.route ? 'bold' : 'normal'
                  }}
                  className="sidebar-link"
                >
                  {item.label}
                </NavLink>
              </Menu.Item>
            );
          })}
        </Menu>
      </Sider>
    </>
  );
}
