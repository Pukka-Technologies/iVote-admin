import EventsList from "./data";
import NewEvent from "./new";


const Events = ({create = false}) => (
   create ? <NewEvent /> : <EventsList />
)

export default Events;
