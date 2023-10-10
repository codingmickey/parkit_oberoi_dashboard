import {
  UserOutlined,
  CreditCardOutlined,
  UnorderedListOutlined,
  CarOutlined,
  IdcardOutlined,
  MenuOutlined,
  HomeOutlined,
  FolderOutlined,
  DatabaseOutlined,
  TeamOutlined
} from '@ant-design/icons';

export const SidebarLinks = [
  {
    displayName: 'Dashboard',
    route: '/dashboard',
    icon: <HomeOutlined className="home" />
  },
  {
    displayName: 'Logs',
    route: '/dashboard/logs',
    icon: <MenuOutlined />
  },
  {
    displayName: 'Resident Logs',
    route: '/dashboard/resident-logs',
    icon: <CarOutlined />
  },
  {
    displayName: 'Registered Vehicle',
    route: '/dashboard/registered-vehicle',
    icon: <UserOutlined />
  }
  // {
  //   displayName: 'Report',
  //   route: '/dashboard/report',
  //   icon: <UnorderedListOutlined />
  // },
  // {
  //   displayName: 'Operators',
  //   icon: <TeamOutlined />,
  //   children: [
  //     {
  //       displayName: 'Operator details',
  //       route: '/dashboard/operator',
  //       icon: <UserOutlined />
  //     },
  //     {
  //       displayName: 'Operator Logs',
  //       route: '/dashboard/operator-logs',
  //       icon: <IdcardOutlined />
  //     }
  //   ]
  // },
  // {
  //   displayName: 'Toll Details',
  //   icon: <FolderOutlined />,
  //   children: [
  //     {
  //       displayName: 'Vehicle types',
  //       route: '/dashboard/vehicle-types',
  //       icon: <CarOutlined />
  //       //TODO: make a truck svg icon
  //     },
  //     {
  //       displayName: 'Pricing',
  //       route: '/dashboard/pricing',
  //       icon: <CreditCardOutlined />
  //     }
  //   ]
  // },
  // {
  //   displayName: 'Toll Data',
  //   icon: <DatabaseOutlined />,
  //   children: [
  //     {
  //       displayName: 'Local Vehicle',
  //       route: '/dashboard/local-vehicle',
  //       icon: <CarOutlined />
  //     },
  //     {
  //       displayName: 'Monthly pass',
  //       route: '/dashboard/monthly-pass',
  //       icon: <UnorderedListOutlined />
  //     }
  //   ]
  // }
];
