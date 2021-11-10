import { FunctionComponent, useContext } from 'react';
import { random } from 'lodash';
import { GameContext, IItem } from '../entity';

interface ItemProps {
  i: string;
}

const Item: FunctionComponent<ItemProps> = (props) => {
  const { i } = props;

  const game = useContext(GameContext);
  const item = game.useBind<IItem>(['items', i]);

  return (
    <div
      style={{
        position: 'absolute',
        left: item.x,
        top: item.y,
        width: item.width,
        height: item.height,
        fontSize: item.height,
        fontWeight: 'bold',
        color: item.color,
      }}
    >
      {item.word}
    </div>
  );
};

export default Item;
