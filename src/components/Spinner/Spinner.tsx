import "./spinner.scss";

function Spinner(props: any) {
  return (
    <div className="spinner" style={{ color: props.color }}>
      <div />
      <div />
      <div />
    </div>
  );
}

Spinner.defaultProps = {
  color: null,
};

export default Spinner;
