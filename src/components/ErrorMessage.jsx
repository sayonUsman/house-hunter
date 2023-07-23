const ErrorMessage = ({ errorMessage }) => {
  return (
    <div className="toast toast-end">
      <div className="alert alert-error">
        <div>
          <span>{errorMessage}</span>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
