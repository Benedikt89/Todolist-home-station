import * as React from 'react';
import { Draggable } from 'react-beautiful-dnd';


const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',

    background: isDragging ? '#0a0a0a' : 'black',

    ...draggableStyle
});

export default (props) =>
    <Draggable draggableId={props.draggableId} index={props.index}>
        {(provided, snapshot) => (
            <div className={props.className}
                 ref={provided.innerRef}
                 {...provided.draggableProps}
                 style={getItemStyle(
                     snapshot.isDragging,
                     provided.draggableProps.style
                 )}
                 {...provided.dragHandleProps}>
                {props.children}
            </div>
        )}
    </Draggable>