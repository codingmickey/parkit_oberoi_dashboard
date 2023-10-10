import { useContext } from 'react';
import ColorModeContext from '../Contexts/ColorModeProvider';

const useColorMode = () => {
  return useContext(ColorModeContext);
};

export default useColorMode;
