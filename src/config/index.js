import { toast } from "react-toastify";

// Email Validation :
export const EmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// Password Validation :
export const PasswordRegex =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

// React-Toastify Toaster :
export const notifySuccess = (message) => {
	toast.success(message);
};

export const notifyError = (message) => {
	toast.error(message);
};

export const notifyWarn = (message) => {
	toast.warning(message);
};
