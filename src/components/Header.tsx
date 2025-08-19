type Title = {
  title: string;
};

export const Header: React.FC<Title> = ({ title }) => {
  return (
    <header>
      <h3>{title}</h3>
    </header>
  );
};
