import Snackbar from "@material-ui/core/Snackbar";

export default Snackbar = ({
  openSnackbar,
  responseMessage,
  setOpenSnackbar,
}) => {
  return (
    <Snackbar
      open={openSnackbar}
      onClose={() => setOpenSnackbar(false)}
      message={responseMessage}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "center", horizontal: "center" }}
    />
  );
};
