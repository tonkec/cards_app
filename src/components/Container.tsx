interface Props {
  children: React.ReactNode;
}
const Container = ({ children }: Props) => (
  <div className="max-w-sm mx-auto px-2">{children}</div>
);

export default Container;
