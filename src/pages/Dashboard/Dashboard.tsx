import { useState } from 'react';
import { Box } from '../../Components/Box';

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false); //To pass into the sidebar and navbar

  return (
    <>
      <Box collapsed={collapsed} setCollapsed={setCollapsed}>
        Dashboard
      </Box>
    </>
  );
}
