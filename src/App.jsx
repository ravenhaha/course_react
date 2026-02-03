import Mainlayot from "./layouts/Mainlayout/Mainlayout.jsx";
import Header from "./components/Header/Header.jsx";
import './styles/global.css';
import Banner from "./components/Banner/Banner.jsx";

function App() {


  return (
    <Mainlayot>
        <Header />
        <Banner />
    </Mainlayot>
  )
}

export default App
