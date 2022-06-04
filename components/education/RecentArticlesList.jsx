import Link from "next/link";
import EducationContainerCard from "./EducationContainerCard";

const RecentArticlesList = () => {
  return (
    <div className={"container"}>
      Return Articles List
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
    </div>
  );
};

export default RecentArticlesList;
