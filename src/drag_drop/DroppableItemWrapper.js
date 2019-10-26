import * as React from 'react';
import { Droppable } from 'react-beautiful-dnd';



export default (props) =>
    <Droppable droppableId={props.droppableId}>
        {(provided) => (
            <div className={props.className}
                 ref={provided.innerRef}
                 {...provided.droppableProps}
                 {...provided.droppablePlaceholder}>
                {props.children}
            </div>
        )}
    </Droppable>