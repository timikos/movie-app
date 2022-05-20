import { Tabs } from 'antd'
import * as PropTypes from 'prop-types'

function TabPane() {
  return null
}
function SwitchTab({ toggleTab, setToggleTab }) {
  const toggleHandler = () => {
    setToggleTab(!toggleTab)
  }
  return (
    <div>
      <Tabs
        onChange={toggleHandler}
        defaultActiveKey="1"
        className="tabs__container"
      >
        <TabPane tab="Search" key="1" />
        <TabPane tab="Rated" key="2" />
      </Tabs>
    </div>
  )
}

TabPane.propTypes = {
  tab: PropTypes.string,
  children: PropTypes.node,
}

TabPane.defaultProps = {
  tab: '',
  children: <div> </div>,
}

export default SwitchTab
