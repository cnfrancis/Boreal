import Navigation from "../Layout/Navigation";
import { BooksImage, WinesImage, CigarsImage } from "../../Assets/Images";
 

function HomePage(props) {
  return (
    <div>
      <Navigation />
      <div>
        <img
          src={BooksImage}
          alt=""
        />
        <img
          src={CigarsImage}
          alt=""
        />
        <img
          src={WinesImage}
          alt=""
        />
      </div>
      <div>
        <h2 style={{display: "inline"}}>BOOKS</h2>
        <h2 style={{display: "inline"}}>CIGARS</h2>
        <h2 style={{display: "inline"}}>WINES</h2>       
      </div>
    </div>
  );
}

export default HomePage;
