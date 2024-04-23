// Card component with children and dark theme tailwind
export const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 w-full"
      style={{ maxWidth: "500px" }}
    >
      {children}
    </div>
  );
};
export const CardHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-xl font-bold">{children}</h3>
    </div>
  );
};
export const CardBody = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col gap-4">{children}</div>;
};
export const CardFooter = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex items-center justify-between">{children}</div>;
};