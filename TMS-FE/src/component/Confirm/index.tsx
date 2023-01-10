type ConfirmProps = {
  onConfirm: () => void;
  onClose: () => void;
  message: string;
  label?: string;
  loading?: boolean;
  labelConfirm?: string;
  styleLeft?: any;
  styleRight?: any;
  labelLeft?: string;
  children?: React.ReactNode;
};

export const Confirm = ({
  styleLeft,
  styleRight,
  label,
  message,
  onClose,
  labelConfirm = 'Confirm',
  onConfirm,
  labelLeft = 'Close',
  children,
}: ConfirmProps) => {
  return (
    <div>
      <div style={{ minWidth: 450 }} className="account-content bg-white">
        {label ? <h4>{label} </h4> : null}

        <div className="form-group">
          <p>{message}</p>
        </div>
        {children ? children : null}
        <div style={{ marginTop: 25, justifyContent: 'center' }} className="row">
          <button
            style={{
              height: 45,
              color: '#179bee',
              borderWidth: 0,
              backgroundColor: 'white',
              marginRight: 20,
              paddingTop: 10,
              paddingBottom: 10,
              ...styleLeft,
            }}
            onClick={onClose}
            className="btn btn-primary d-block"
          >
            {labelLeft}
          </button>
          <button
            style={{ flexDirection: 'row', height: 45, paddingTop: 10, paddingBottom: 10, ...styleRight }}
            onClick={onConfirm}
            className="btn btn-primary d-block"
          >
            {labelConfirm}
          </button>
        </div>
      </div>
    </div>
  );
};
