import * as migration_20260331_142814_add_partners_section from './20260331_142814_add_partners_section'
import * as migration_20260331_143824_add_partners_badge_label from './20260331_143824_add_partners_badge_label'
import * as migration_20261013_153828_payload_3_90_columns from './20261013_153828_payload_3_90_columns'

export const migrations = [
	{
		up: migration_20260331_142814_add_partners_section.up,
		down: migration_20260331_142814_add_partners_section.down,
		name: '20260331_142814_add_partners_section',
	},
	{
		up: migration_20260331_143824_add_partners_badge_label.up,
		down: migration_20260331_143824_add_partners_badge_label.down,
		name: '20260331_143824_add_partners_badge_label',
	},
	{
		up: migration_20261013_153828_payload_3_90_columns.up,
		down: migration_20261013_153828_payload_3_90_columns.down,
		name: '20261013_153828_payload_3_90_columns',
	},
]
