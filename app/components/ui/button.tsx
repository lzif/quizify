// Unique button component & rich customization use tailwind
const Button = ({
  children,
  type = "button",
  disabled = false,
}: {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}) => {
  return (
    <button
      className="bg-sky-500 hover:bg-sky-700 text-white dark:text-black font-bold py-2 px-4 rounded"
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
