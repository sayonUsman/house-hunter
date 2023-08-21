const LogoCard = ({ logo }) => {
  return (
    <div className="flex mx-auto">
      <div className="card">
        <div className="flex justify-center items-center px-3">
          <figure className="flex mx-auto my-auto">
            <img src={logo} alt="logo" className="w-72 h-32" />
          </figure>
        </div>
      </div>
    </div>
  );
};

export default LogoCard;
