import EventItem from "./event-item";
import classes from "./event-list.module.css";

function EventList(props) {
  const { items } = props;
  return (
    <ul className={classes.list}>
      {items ? (
        items.map((event) => (
          <EventItem
            key={event.id}
            id={event.id}
            title={event.title}
            symbol={event.symbol}
            description={event.description}
            image={event.imageUrl}
            price={event.price}
            favorited={event?.favorited}
          />
        ))
      ) : (
        <div>No data found</div>
      )}
    </ul>
  );
}

export default EventList;
