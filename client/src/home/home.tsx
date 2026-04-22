import StudentsOnMap from "../map/studentOnMap"
import Menu from "./menu"
import './home.css'

const HomePage = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Menu />
      <main style={{ flex: 1, minHeight: '100vh' }}>
        <StudentsOnMap />
      </main>
    </div>
  );
}

export default HomePage;