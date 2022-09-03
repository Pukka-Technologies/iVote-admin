import AdminList from "./data";
import NewAdmin from "./new";

const Admins = ({create = false, type}) => (
   create ? <NewAdmin /> : <AdminList type={type} />
)

export default Admins;
