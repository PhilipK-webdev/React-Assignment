type CustomButtonType = {
  style: string;
  title: string;
  onClick: (e) => void;
};
export const CustomButton: React.FC<CustomButtonType> = ({
  style,
  title,
  onClick,
}) => {
  return (
    <button className={style} onClick={onClick}>
      {title}
    </button>
  );
};
