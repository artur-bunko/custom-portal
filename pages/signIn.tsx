import type {NextPage} from "next";
import Link from "next/link";
import {useRef} from "react";

const SignIn: NextPage = () => {
	const formRef = useRef<HTMLFormElement>(null);

	const signIn = async () => {
		// const response = await axios.post('/api/signIn');

		const email = formRef.current?.email.value;
		const password = formRef.current?.password.value;

		console.log({email, password});
	}

	return <div className="container-fluid vh-100" style={{display: 'grid', alignItems: 'center'}}>
		<div>
			<div className="rounded d-flex justify-content-center">
				<div className="col-md-4 col-sm-12 shadow-lg p-5 bg-light">
					<div className="text-center">
						<h3 className="text-primary">Log In</h3>
					</div>
					<div className="p-4">
						<form action="" ref={formRef}>
							<div className="input-group mb-3">
	<span className="input-group-text bg-primary"><i
			className="bi bi-envelope text-white"/></span>
								<input type="email" name="email" className="form-control" placeholder="Email"/>
							</div>
							<div className="input-group mb-3">
	<span className="input-group-text bg-primary"><i
			className="bi bi-key-fill text-white"/></span>
								<input type="password" name="password" className="form-control" placeholder="password"/>
							</div>
							<div className="d-grid col-12 mx-auto">
								<button className="btn btn-primary" type="button" onClick={signIn}><span></span>Log In</button>
							</div>
							<p className="text-center mt-3">If you haven&apos;t an account?
								<Link href="/"><a className="text-primary">Sign Up</a></Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
}

export default SignIn;
