import Navigation from "../Layout/Navigation";
import ItemShelf from "../ItemShelf"

function HomePage(props) {
  return (
    <div>
      <Navigation />
      <ItemShelf items={props.items}/>
    </div>
  );
}

export default HomePage;
