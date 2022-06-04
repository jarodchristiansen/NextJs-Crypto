import Link from "next/link";
import EducationContainerCard from "./EducationContainerCard";
import FadeIn from "react-fade-in";
const EducationEssentialsContainer = () => {
  return (
    <div className="container text-center">
      <div>
        <h4>Crypto Essentials</h4>
      </div>

      <div className={"row row-cols-1 border"}>
        <img src={"../vercel.svg"} />
      </div>
      <FadeIn transitionDuration={2000}>
        <div className="row row-cols-lg-3 g-2 g-lg-3 mt-3">
          <div className="col">
            <Link href={"/education/what-is-bitcoin"}>
              <div className="p-3 bg-light">
                <EducationContainerCard />
              </div>
            </Link>
          </div>
          <div className="col">
            <div className="p-3 bg-light">
              <EducationContainerCard />
            </div>
          </div>
          <div className="col">
            <div className="p-3 bg-light">
              <EducationContainerCard />
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};
export default EducationEssentialsContainer;
