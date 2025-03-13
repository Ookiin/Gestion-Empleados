import "../../styles/loader.css";
const Loader = () => {
  return (
    <div style={styles.loader}>
      <div className="spinner"></div>
    </div>
  );
};

const styles = {
  loader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
};

export default Loader;
