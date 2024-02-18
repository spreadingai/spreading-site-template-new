type Props = {
  children: () => React.ReactNode;
  fallback?: React.ReactNode;
};

const BrowserOnly = ({ children, fallback }: Props) => {
  return <>{children()}</>;
};
export default BrowserOnly;
