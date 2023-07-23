const Message = ({ message }) => {
  return (
    <div className="toast toast-end">
      <div className="alert alert-info">
        <div>
          <span>{message}</span>
        </div>
      </div>
    </div>
  );
};

export default Message;
