import Button from 'antd/es/button'

import './app.css'
import Header from '../header'
import MapiService from '../../services/mapi-service'

function App() {
  MapiService()
  return (
    <div>
      <Header />

      <Button type="primary"> Я - кнопка компонента antd </Button>
    </div>
  )
}

export default App
