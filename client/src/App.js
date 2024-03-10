import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Landing from './Pages/Landing';

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
