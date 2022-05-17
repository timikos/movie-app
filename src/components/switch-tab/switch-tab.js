import { Tabs } from 'antd'
import * as PropTypes from 'prop-types'

function TabPane() {
  return null
}

function SwitchTab() {
  const tmp = () => {
  }
  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        onChange={tmp}
        className="tabs__container"
      >
        <TabPane tab="Search" key="1">
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="Rated" key="2">
          Content of Tab Pane 2
        </TabPane>
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
