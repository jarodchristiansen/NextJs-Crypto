import { useSession, getSession } from "next-auth/client";
import { useMediaQuery } from "react-responsive";
import clientPromise from "../lib/mongodb";
import { initializeStore, useStore } from "../store";
import styled from "styled-components";
import InfoCard from "../components/commons/info-cards/info-card";
import PriceScreener from "../components/commons/screener";
import { Colors } from "../styles/colors";

function HomePage({ isConnected, initialReduxState }) {
  const [session, loading, status] = useSession();

  // const { dispatch } = useStore();

  // const isDesktopOrLaptop = useMediaQuery({
  //   query: `(max-width: 620px)`,
  // });

  return (
    <PageWrapper>
      <PriceScreener />

      <HomePageWrapper className="text-center">
        {/* <LoadingSpinner /> */}
        <HeroImage>
          <h2>Doing The Same Thing, Differently</h2>
          <p>
            At HodlWatch, we feel that access to information information is a
            key paramter of equality. That is especially true of financial
            information. We're working to solve that a-symmetry of information
            by democratratizing blockchain data
          </p>
        </HeroImage>

        <div className="grid-template">
          <InfoCard
            headerText={"Historical Insights"}
            bodyText="History doesn't always repeat, but it often rhymes. Using historical data to find insights into existing markets"
          />
          <InfoCard
            headerText={"Community Analytics"}
            bodyText="A view of the market from the community's own eyes. Insights into some of the most popular current assets"
          />

          <InfoCard
            headerText={"OnChain Data"}
            bodyText="With a resource as beautiful as a decentralized immulatable ledger, why not use it for real time insights? "
          />
          <InfoCard
            headerText={"User Profiles"}
            bodyText="Web3 isn't as `Webby` without you. Allowing you to show off what makes you an individual in the space."
          />
        </div>
      </HomePageWrapper>
    </PageWrapper>
  );
}

const HeroImage = styled.div`
  width: 95%;
  min-height: 12rem;
  /* background-color: rgba(0, 25, 25, 0.2); */
  border-radius: 17px;
  padding: 2rem;
  box-shadow: 2px 4px 8px gray;
  background-color: white;
  border: 2px solid gray;

  h2 {
    padding: 1rem 0;
  }
`;

const PageWrapper = styled.div`
  background-color: ${Colors.pageBackground};
`;

const HomePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;

  .hero-image {
    width: 100%;
    background-color: green;
    margin-top: 4rem;
  }

  .grid-template {
    animation: fadeIn 2s;
    margin: 0 auto;
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  }
`;

export async function getServerSideProps(context, req) {
  const client = await clientPromise;
  const session = await getSession({ req });
  const reduxStore = initializeStore();
  const { dispatch } = reduxStore;

  // console.log('this is the client', client)
  // console.log("this is the session", session)
  // // dispatch({
  // //     type: 'TICK',
  // //     light: false,
  // //     lastUpdate: Date.now(),
  // // })
  //
  // dispatch({
  //     type: "RESET"
  // })

  // client.db() will be the default database passed in the MONGODB_URI
  // You can change the database by calling the client.db() function and specifying a database like:
  // const db = client.db("myDatabase");
  // Then you can execute queries against your database like so:
  // db.find({}) or any of the MongoDB Node Driver commands

  const isConnected = await client.isConnected();

  return {
    props: { isConnected },
  };
}

export default HomePage;
