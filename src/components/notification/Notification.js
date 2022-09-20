import { toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const successNotification = (name) => {
  toast.success(name, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "dark",
    closeButton: false,
    transition: Flip,
  });
};

export const errorNotification = (message) => {
  toast.error(message, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    closeButton: false,
    progress: undefined,
    theme: "dark",
    transition: Flip,
  });
};

export const warningNotification = (message) => {
  toast.warning(message, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    closeButton: false,
    theme: "dark",
    transition: Flip,
  });
};