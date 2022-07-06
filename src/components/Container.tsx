interface Props {
  children: React.ReactNode;
}
const Container = ({ children }: Props) => (
  <div className="max-w-sm mx-auto">{children}</div>
);

export default Container;
