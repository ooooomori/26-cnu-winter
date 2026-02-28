import Snackbar from "@mui/joy/Snackbar";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import useAlertStore from "../stores/alertStore";

export default function AlertSnackbar() {
    const { open, message, closeAlert } = useAlertStore();

    const handleCloseSnackbar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        closeAlert();
    };

    return (
        <>
            {/* 성공 스낵바 */}
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                startDecorator={<CheckCircleOutlineIcon />}
                open={open === true}
                color="success"
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
            >
                {message}
            </Snackbar>

            {/* 실패 스낵바 */}
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                startDecorator={<ErrorOutlineIcon />}
                open={open === false}
                color="danger"
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
            >
                {message}
            </Snackbar>
        </>
    );
}
