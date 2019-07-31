import React, { useRef, useContext } from 'react';
import { useDrop } from 'react-dnd';
import { MdAdd } from 'react-icons/md';
import { Container } from './styles';
import Card from '../Card';
import BoardContext from '../Board/context';

const List = ({ data, index: listIndex }) => {
	const ref = useRef();
	const { move } = useContext(BoardContext);

	const [, dropRef] = useDrop({
		accept: 'CARD',
		hover(item, monitor) {
			const draggedListIndex = item.listIndex;
			const targetListIndex = listIndex;

			const draggedIndex = item.index;
			const targetIndex = listIndex;

			if (draggedIndex === targetIndex && draggedListIndex === targetListIndex) return;

			if (draggedListIndex === targetListIndex) return;

			move(draggedListIndex, targetListIndex, draggedIndex, targetIndex);

			item.index = targetIndex;
			item.listIndex = targetListIndex;
		},
	});

	dropRef(ref);

	return (
		<Container done={data.done} ref={ref}>
			<header>
				<h2>{data.title}</h2>
				{data.creatable && (
					<button type="button">
						<MdAdd size={24} color="#fff" />
					</button>
				)}
			</header>
			<ul>{data.cards.map((card, index) => card && <Card key={card.id} data={card} index={index} listIndex={listIndex} />)}</ul>
		</Container>
	);
};

export default List;
