type Props = {
  children: React.ReactNode;
  to: string;
};

const Link = ({ to, children }: Props) => {
  return <a href={to}>{children}</a>;
};
export default Link;
