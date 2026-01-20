const FlexRow = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`flex flex-row items-center ${className}`}>{children}</div>
  );
};

export default FlexRow;
