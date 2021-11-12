import Head from "next/head";
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.css'
import {FC} from "react";

const Layout: FC = ({children}) => {
	return <div>
		<Head>
			<title>SignUp Portal</title>
			<meta name="description" content="Learning Portal" />
			<link rel="icon" href="/favicon.ico" />
		</Head>

		<main className={styles.main} style={{background: "url('/valley.jpeg')"}}>
			{children}
		</main>
	</div>
}

export default Layout;
