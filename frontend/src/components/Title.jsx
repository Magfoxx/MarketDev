const Title = ({ title1, title2, title3, titleStyles }) => {
  return (
    <div
      className={`${titleStyles} max-w-4xl space-y-6 leading-tight font-extrabold  text-secondary dark:text-white`}
    >
      <h2>
        {title1}
        <span className="text-primary">{title2}</span>
        {title3}
      </h2>
    </div>
  );
};

export default Title;
