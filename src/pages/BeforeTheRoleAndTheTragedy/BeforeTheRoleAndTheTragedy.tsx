import Article_001 from "../../components/Article_001/Article_001";
import Footer001 from "../../components/Footer/Footer001/Footer001";
import Header001 from "../../components/Header/Header001";
import "./BeforeTheRoleAndTheTragedy.css"

export default () => {

   return (
      <div className="page">
         <Header001/>
         <Article_001 url="https://eduardoos.com/static_data/between_the_role_and_the_tragedy/article_rich_data" />
         {/* <Article_001 url="static_data/responding_to_hard_discipline.json" /> */}
         <Footer001/>
      </div>
   );
 }