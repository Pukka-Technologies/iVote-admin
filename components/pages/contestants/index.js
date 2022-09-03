import ContestantsList from "./data";
import NewContestant from "./new";

const Contestants = ({create = false}) => (
   create ? <NewContestant /> : <ContestantsList />
)

export default Contestants;
