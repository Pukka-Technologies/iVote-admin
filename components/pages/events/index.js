import EventsList from "./data";
import NewEvent from "./new";

const Events = ({create = false, type}) => (
   create ? <NewEvent /> : <EventsList type={type} />
)

export default Events;
