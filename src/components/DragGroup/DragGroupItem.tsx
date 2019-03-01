import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import * as styles from './styles';
import { DragContext } from 'components/DragContainer';

interface DragGroupItemProps {
  /**
   * Must be exactly one node. The children will be passed a
   * `wrapDragHandle` prop which MUST be used to wrap the draggable
   * portion of the child content inside the child's render function
   */
  children: React.ReactNode;

  /**
   * Called with (fromGroupId, toGroupId) when the item is moved
   * between groups.
   */
  onMove: (from: string, to: string) => void;

  /**
   * Provided by parent DragGroup
   * Indicates the current parent's group id.
   */
  groupId: string;
  /**
   * Function provided by react-dnd library that previews the drag item
   * @ignore
   */
  connectDragPreview: (image: any, options: object) => void;
  /**
   * Function provided by react-dnd library that connects the drag source
   * @ignore
   */
  connectDragSource: (source: React.ReactNode) => void;
  /**
   * Function provided by react-dnd library that connects the drag source
   * @ignore
   */
  connectDropTarget: (source: React.ReactNode) => React.ReactNode;
  canDrag: boolean;
  isDragging: boolean;
}

/**
 * Used to wrap an item used in DragGroup. See DragGroup documentation.
 *
 * @visibleName DragGroup.Item
 */
class DragGroupItem extends React.Component<DragGroupItemProps> {
  static styles = styles;

  componentDidMount() {
    // Use empty image as a drag preview so browsers don't draw it
    // and we can draw whatever we want on the custom drag layer instead.
    this.props.connectDragPreview(getEmptyImage(), {
      // IE fallback: specify that we'd rather screenshot the node
      // when it already knows it's being dragged so we can hide it with CSS.
      captureDraggingState: true,
    });
  }

  wrapDragHandle = dragHandleNode =>
    /**
     * The element passed to connectDragSource must be a plain
     * React element, not a component. Thus, to do proper
     * vendor prefixing with styling, we assign a class name
     * and target it from DragItemContainer's styles; see
     * styles/DragItemContainer.js
     */
    this.props.connectDragSource(
      <div
        className="DragGroupItem--handle"
        style={{
          display: this.props.canDrag ? 'block' : 'none',
        }}
      >
        {dragHandleNode}
      </div>,
    );

  render() {
    const {
      props: {
        connectDragSource,
        connectDragPreview,
        isDragging,
        children,
        onMove,
        ...rest
      },
      wrapDragHandle,
    } = this;

    return (
      <styles.DragItemContainer isDragging={isDragging} {...rest}>
        <DragContext.Provider value={{ isDragging, wrapDragHandle }}>
          {children}
        </DragContext.Provider>
      </styles.DragItemContainer>
    );
  }
}

const itemSource = {
  beginDrag(props, monitor, component) {
    const domNode = ReactDOM.findDOMNode(component) as Element;
    const clientRect = domNode.getBoundingClientRect();
    return {
      children: props.children,
      dimensions: clientRect,
    };
  },

  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }

    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    if (dropResult.type === 'group') {
      props.onMove(props.groupId, dropResult.groupId);
    }
  },
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging(),
});

/**
 * @component
 * @visibleName DragGroup.Item
 */
export default DragSource(props => props.itemType, itemSource, collect)(
  DragGroupItem,
);