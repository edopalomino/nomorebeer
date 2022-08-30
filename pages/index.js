import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {connectToDatabase} from "./api/mongodb";

export default function Home({data}) {

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
          <div className={styles.circle} ><div className={styles.number}>{data.data}</div></div>
          <div className={styles.ocean}>
              <div className={styles.wave}></div>
              <div className={styles.wave}></div>
          </div>
      </main>

    </div>
  )
}

export async function getServerSideProps() {
    let mongo = await connectToDatabase();
    let value = await mongo.db.collection('beers').findOne();

    let data = {data: value.quantity}
    return {
        props: { data }, // will be passed to the page component as props
    }
}
