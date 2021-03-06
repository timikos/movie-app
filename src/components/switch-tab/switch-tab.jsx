import { Tabs } from 'antd'
import * as PropTypes from 'prop-types'

import './switch-tab.css'

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
        <TabPane
          tab="Search"
          key="1"
        />
        <TabPane
          tab="Rated"
          key="2"
        />
      </Tabs>
    </div>
  )
}

SwitchTab.propTypes = {
  toggleTab: PropTypes.bool,
  setToggleTab: PropTypes.func,
}

SwitchTab.defaultProps = {
  toggleTab: false,
  setToggleTab: () => {},
}

export default SwitchTab
