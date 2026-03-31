import * as migration_20260331_142814_add_partners_section from './20260331_142814_add_partners_section';

export const migrations = [
  {
    up: migration_20260331_142814_add_partners_section.up,
    down: migration_20260331_142814_add_partners_section.down,
    name: '20260331_142814_add_partners_section'
  },
];
