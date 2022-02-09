import { useEffect, useRef } from 'react';
import { Diachrony } from 'rx-immer';
import { RxImmerWithHooks, useRxImmer } from 'rx-immer-react';
import { skip } from 'rxjs';
import { FieldData } from 'rc-field-form/lib/interface';
import ContainerCard from './components/ContainerCard';
import { ListItem } from './components/TableEditor';
import { TreeData } from './components/TreeEditor';
import Editor from './components/Editor';
import { INITIAL_STORE } from './const';
import Replay from './replay';

export interface Store {
  count: number;
  title?: string;
  list: ListItem[];
  fields: FieldData[];
  obj: Record<string, any>;
  tree: TreeData;
}

export interface ReplayActions {
  open: (diachrony: Diachrony<Store>) => void;
}

export interface PropsWithStore {
  store: RxImmerWithHooks<Store>;
}

export default function Playground() {
  const store = useRxImmer<Store>(INITIAL_STORE, {
    history: {
      capacity: 100,
      bufferDebounce: 500,
    },
    diachrony: true,
  });

  const replayRef = useRef<ReplayActions>();

  useEffect(() => {
    store.startAffair(function () {
      const subscription = this.observe('count')
        .pipe(skip(1))
        .subscribe((count: number) => {
          this.commit((state) => {
            state.list.splice(count);
          });
        });
      return function () {
        console.log('affairs:', this.showAffairs());
        subscription.unsubscribe();
      };
    }, 'sync count and list length');
  }, [store]);

  return (
    <>
      <ContainerCard store={store} replayRef={replayRef}>
        <Editor store={store} />
      </ContainerCard>
      <Replay actionRef={replayRef} />
    </>
  );
}
