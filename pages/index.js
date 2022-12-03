import Head from "next/head";
import styles from "../styles/Home.module.css";
import Header from "../components/EasyHeader";
import LotteryEntrance from "../components/LotteryEntrance";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Loteria Descentralizada</title>
        <meta name="description" content="Loteria descentralizada con Js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <LotteryEntrance></LotteryEntrance>
    </div>
  );
}
