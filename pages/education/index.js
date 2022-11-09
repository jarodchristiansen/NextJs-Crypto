import EducationLinkList from "../../components/education/EducationLinkList";
import EducationEssentialsContainer from "../../components/education/EducationEssentialsContainer";
import RecentArticlesList from "../../components/education/RecentArticlesList";
import PriceScreener from "../../components/commons/screener";

const EducationPage = () => {
  return (
    <div>
      <PriceScreener />
      <div className="container px-4">
        <div className="row mt-5">
          <div className="col col-lg-9">
            <div className="p-3 border bg-light">
              <EducationEssentialsContainer />
            </div>
          </div>

          <div className="col">
            <div className="p-3 border bg-light">
              <EducationLinkList />
            </div>
          </div>
        </div>
        <div className={"row border bg-light text-center mt-3"}>
          <RecentArticlesList />
        </div>
      </div>
    </div>
  );
};

export default EducationPage;
