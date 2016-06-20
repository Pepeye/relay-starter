import React, { PropTypes } from 'react'
import JSONTree from 'react-json-tree'
import { monokai as theme } from './Themes'

const identity = value => value

const getLabelStyle = ({ style }, nodeType, expanded) => ({
  style: {
    ...style,
    textTransform: expanded ? 'uppercase' : style.textTransform
  }
})

const getBoolStyle = ({ style }, nodeType) => ({
  style: {
    ...style,
    border: nodeType === 'Boolean' ? '1px solid #DD3333' : style.border,
    borderRadius: nodeType === 'Boolean' ? 3 : style.borderRadius
  }
})

const getValueLabelStyle = ({ style }, nodeType, keyPath) => ({
  style: {
    ...style,
    color: !isNaN(keyPath[0]) && !(parseInt(keyPath, 10) % 2)
    ? '#33F' : style.color
  }
})

const getItemString = (type) => (<span> | {type}</span>)

export const options = (theme) => {
  return {
    extend: theme,
    // switch key for objects to uppercase when object is expanded.
    // `nestedNodeLabel` receives additional arguments `expanded` and `keyPath`
    nestedNodeLabel: getLabelStyle,
    value: getBoolStyle,
    valueLabel: getValueLabelStyle
  }
}

class Logger extends React.Component {
  // propTypes from original JSON Tree
  static propTypes = {
    data: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ]).isRequired,
    hideRoot: PropTypes.bool,
    theme: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string
    ]),
    isLightTheme: PropTypes.bool,
    expandRoot: PropTypes.bool,
    expandAll: PropTypes.bool,
    keyPath: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    postprocessValue: PropTypes.func,
    sortObjectKeys: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
  }

  static defaultProps = {
    shouldExpandNode: (keyName, data, level) => level === 0, // expands root by default,
    hideRoot: false,
    keyPath: ['root'],
    getItemString: (type, data, itemType, itemString) => (<span>{itemType} {itemString}</span>),
    labelRenderer: identity,
    valueRenderer: identity,
    postprocessValue: identity,
    isCustomNode: () => false,
    collectionLimit: 50,
    isLightTheme: true
  }

  labelRenderer = (raw) => (<strong>{raw}</strong>)
  valueRenderer = (raw) => (<em>{raw}</em>)

  render () {
    return (
      <JSONTree
        data={this.props.data}
        theme={options(theme)}
        isLightTheme={this.props.isLightTheme}
        getItemString={getItemString}
        labelRenderer={this.labelRenderer}
        valueRenderer={this.valueRenderer}
        sortObjectKeys
      />
    )
  }
}

export default Logger
