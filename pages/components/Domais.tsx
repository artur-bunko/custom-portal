import {FC} from "react";
import {DomainInfo} from "./DomainInfo";

type DomainCredentials = {
	domain: string,
	name: string,
	password: string
}

interface DomainsProps {
	domains: DomainCredentials[]
}

export const Domains: FC<DomainsProps> = ({domains}) => {
	return <div className="list-group">
		{
			domains.map(({domain, name, password}) => <DomainInfo domain={domain} name={name} password={password} />)
		}
	</div>
}
