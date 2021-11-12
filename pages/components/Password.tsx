import {FC, useState} from "react";
import styles from "../../styles/Value.module.css";

interface PasswordProps {
	password: string
}

export const Password: FC<PasswordProps> = ({password}) => {
	const [show, setShow] = useState<boolean>(false);
	const passwordHidden = password.split("").map((_, index) => <span key={index}>*</span>)

	const copyValue = () => {
		navigator.clipboard.writeText(password);
	}

	return  <div className={styles.container}>
		<p className="mb-1">Password: {show ? password : passwordHidden}</p>
		<button type="button" className="btn btn-outline-primary btn-sm" onClick={() => setShow(!show)}><i className={show ? "bi bi-eye-fill" : "bi-eye-slash-fill"}/></button>
		<button type="button" className="btn btn-outline-primary btn-sm" onClick={copyValue}><i className="bi bi-clipboard"/></button>
	</div>
}
