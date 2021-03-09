import { useLiveQuery } from 'dexie-react-hooks';
import { useMemo } from 'react';
import { TabName } from 'App';
import { Frameworks } from 'data/frameworks';
import { Overclocks } from 'data/overclocks';
import { Pickaxes } from 'data/pickaxes';
import useDB from 'db/useDB';
import { MinerWeapons } from 'utils/weapons';

type TabProgress = {
  progress: number;
  partialProgress: number | null;
};

export default function useCurrentTabProgress(
  currentTab: TabName
): TabProgress {
  const db = useDB();

  const totalItems = useMemo(() => {
    switch (currentTab) {
      case 'frameworks':
        return (
          Frameworks.length *
          Object.values(MinerWeapons).reduce((p, c) => p + c.length, 0)
        );
      case 'overclocks':
        return Object.values(Overclocks)
          .flatMap((w) => Object.values(w))
          .flat().length;
      case 'pickaxes':
        return Object.values(Pickaxes)
          .flatMap((w) => Object.values(w))
          .flat().length;
    }
  }, [currentTab]);

  const p = useLiveQuery(
    async () => {
      switch (currentTab) {
        case 'frameworks': {
          const acquiredFrameworks = await db.frameworks.count();
          return {
            progress: (acquiredFrameworks / totalItems) * 100,
            partialProgress: null,
          };
        }
        case 'overclocks': {
          const acquiredOverclocks = await db.overclocks.toArray();
          return {
            progress:
              (acquiredOverclocks.filter((o) => o.isForged).length /
                totalItems) *
              100,
            partialProgress:
              (acquiredOverclocks.filter((o) => !o.isForged).length /
                totalItems) *
              100,
          };
        }
        // TODO: Fix placeholder progress data for pickaxes tab
        case 'pickaxes': {
          // const acquiredPickaxeParts = await db.pickaxes.toArray();
          console.warn(
            'Overall progress bar using random Pickaxe progress. Fix me before going live!'
          );
          return {
            progress: Math.random() * 100,
            partialProgress: null,
          };
        }
      }
    },
    [currentTab],
    {
      progress: 0,
      partialProgress: null,
    }
  );

  return {
    progress: Math.round(p.progress),
    partialProgress:
      p.partialProgress === null ? null : Math.round(p.partialProgress),
  };
}
