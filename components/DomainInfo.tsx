import {FC} from "react";
import {Password} from "./Password";
import {Value} from "./Value";

interface DomainInfoProps {
	domain: string,
	name: string,
	password: string
}

export const DomainInfo: FC<DomainInfoProps> = ({ domain, name, password }) => {
	return <div className="list-group-item" aria-current="true">
			<div className="d-flex w-100 justify-content-between">
				<a href={`https://${domain}`}  target="_blank" rel="noreferrer">
					<h5 className="mb-1">{domain}</h5>
				</a>
			</div>
			<Value hidden={false} label="Login" value={name} />
			<Value hidden={true} label="Password" value={password} />
	</div>
}
