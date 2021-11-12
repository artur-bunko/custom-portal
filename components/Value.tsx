import {FC, useMemo, useState} from "react";
import styles from "../styles/Value.module.css";
import classNames from "classnames";

interface ValueProps {
	hidden: boolean,
	label: string,
	value: string
}

export const Value: FC<ValueProps> = ({hidden, label, value}) => {
	const [hiddenValue, setHidden] = useState<boolean>(hidden);
	const valueHidden = value.split("").map((_, index) => <span key={index}>*</span>)

	const showHiddenButton = useMemo(() => hidden, []);

	const copyValue = () => {
		navigator.clipboard.writeText(value);
	}

	return <div className={styles.container}>
		<p className="mb-1"><span className={styles.label}>{label}</span>: {hiddenValue ? valueHidden : value }</p>
		{showHiddenButton && <button
				type="button"
				className={classNames("btn btn-outline-primary btn-sm", styles.valueButton)}
				onClick={() => setHidden(!hiddenValue)}
		>
			<i className={hiddenValue ? "bi bi-eye-fill" : "bi-eye-slash-fill"}/>
		</button> }
	<button
			type="button"
			className={classNames("btn btn-outline-primary btn-sm", styles.valueButton)}
			onClick={copyValue}
	>
		<i className="bi bi-clipboard"/>
	</button>
</div>
}
