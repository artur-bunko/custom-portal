import axios from "axios";
import Link from 'next/link';
import {FC, useRef} from "react";

type CountryOption = {
	value: string,
	name: string,
	default: boolean
}



const SignUp: FC<{ countryOptions: CountryOption[] }> = ({countryOptions = []})  => {
	const formRef = useRef<HTMLFormElement>(null);
	const iframeRef = useRef<HTMLIFrameElement>(null);

	const signUp = async () => {
		const fullName = formRef.current?.fullName.value;
		const email = formRef.current?.email.value;
		const username = email.split('@')[0];
		const password = formRef.current?.password.value;

		const response = await axios.post('/api/signUp', {
			fullName,
			email,
			username,
			password
		});

		Object.keys(response.data).forEach(item => {
			localStorage.setItem(item, response.data[item]);
		});

		window.location.href = "https://learning.storeworkflows.com";
	}

	return <div className="container-fluid vh-100" style={{display: 'grid', alignItems: 'center'}}>
		<div>
			<div className="rounded d-flex justify-content-center">
				<div className="col-md-4 col-sm-12 shadow-lg p-5 bg-light">
					<div className="text-center">
						<h3 className="text-primary">Create Account</h3>
					</div>
					<div className="p-4">
						<form ref={formRef} onSubmit={e => e.preventDefault()}>
							<div className="input-group mb-3">
                                    <span className="input-group-text bg-primary"><i
																				className="bi bi-person-plus text-white"/></span>
								<input type="text" name="fullName" className="form-control" placeholder="Full Name" required />
							</div>
							<div className="input-group mb-3">
                                    <span className="input-group-text bg-primary"><i
																				className="bi bi-envelope text-white"/></span>
								<input type="email" name="email" className="form-control" placeholder="Email" required />
							</div>
							<div className="input-group mb-3">
                                    <span className="input-group-text bg-primary"><i
																				className="bi bi-key-fill text-white"/></span>
								<input type="password" name="password" className="form-control" placeholder="Password" required />
							</div>
							{ countryOptions.length ? <div className="input-group mb-3">
								<span className="input-group-text bg-primary"><i className="bi bi-bank"/></span>
								<select className="form-select" name="country" aria-label="Select your country" required>
									{
										countryOptions.map(({value, name}) => <option key={value} value={value}>{name}</option>)
									}
								</select>
							</div> : null }
							<div className="d-grid col-12 mx-auto">
								<button className="btn btn-primary" type="submit" onClick={signUp}><span/> Sign up</button>
							</div>
							<p className="text-center mt-3">Already have an account?
								<Link href='/signIn'><a className="text-primary">Sign in</a></Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
}

export default SignUp;
