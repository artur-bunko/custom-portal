import Head from "next/head";
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.css'
import {FC} from "react";

const Layout: FC = ({children}) => {
	return <div>
		<Head>
			<title>Create Next App</title>
			<meta name="description" content="Generated by create next app" />
			<link rel="icon" href="/favicon.ico" />
		</Head>

		<main className={styles.main} style={{background: "url('/valley.jpeg')"}}>
			{children}
		</main>
	</div>
}

export default Layout;
