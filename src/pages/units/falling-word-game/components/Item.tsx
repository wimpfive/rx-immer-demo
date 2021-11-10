import { FunctionComponent, useContext } from 'react';
import { GameContext, IItem } from '../entity';

interface ItemProps {
  i: string;
}

const Item: FunctionComponent<ItemProps> = (props) => {
  const { i } = props;

  const game = useContext(GameContext);
  const item = game.useBind<IItem>(['items', i]);

  return (
    <span
      style={{
        position: 'absolute',
        left: item.x,
        top: item.y,
        width: item.width,
        height: item.height,
        fontSize: item.height,
        lineHeight: '100%',
        textAlign: 'center',
        verticalAlign: 'baseline',
        fontWeight: 'bold',
        color: item.color,
      }}
    >
      {item.word}
    </span>
  );
};

export default Item;
