import { useNavigate, useLocation } from 'react-router-dom';

const useCustomNavigate = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const customNavigate = (to, options = {}) => {
    const currentParams = new URLSearchParams(location.search);
    const paramString = Array.from(currentParams.entries())
      .map(([key, value]) => (value ? `${key}=${value}` : key))
      .join('&');
    const newUrl = paramString ? `${to}?${paramString}` : to;
    navigate(newUrl, options);
  };

  return customNavigate;
};

export default useCustomNavigate;
