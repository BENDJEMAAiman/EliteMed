import {
  LABELS,
  yearName,
  type CourseLevel,
} from '../../data/formations'
import {
  Asterisk,
  Bookmark,
  ChevronDown,
  Flask,
  GradCap,
  HeartPulse,
  Layers,
  PlusSquare,
} from '../ui/Icons'

const YEAR_ICONS = [Flask, Layers, HeartPulse, PlusSquare, Bookmark, Asterisk, GradCap]

export type LevelFilter = CourseLevel | 'all'
export type YearFilter = number | 'all'

interface Props {
  yearCount: number
  year: YearFilter
  level: LevelFilter
  onYear: (y: YearFilter) => void
  onLevel: (l: LevelFilter) => void
}

export default function FilterSidebar({ yearCount, year, level, onYear, onLevel }: Props) {
  return (
    <aside className="filters" aria-label={LABELS.filterTitle}>
      <h2 className="filters__title">
        <span className="filters__dot" aria-hidden="true" />
        {LABELS.filterTitle}
      </h2>

      <div className="filters__years">
        <button
          type="button"
          className={`filters__btn filters__btn--all ${year === 'all' ? 'is-active' : ''}`}
          aria-pressed={year === 'all'}
          onClick={() => onYear('all')}
        >
          {LABELS.all}
        </button>

        {Array.from({ length: yearCount }, (_, i) => i + 1).map((n) => {
          const Icon = YEAR_ICONS[(n - 1) % YEAR_ICONS.length]
          return (
            <button
              key={n}
              type="button"
              className={`filters__btn ${year === n ? 'is-active' : ''}`}
              aria-pressed={year === n}
              onClick={() => onYear(n)}
            >
              <Icon size={14} />
              {yearName(n)}
            </button>
          )
        })}
      </div>

      <div className="filters__level">
        <label htmlFor="level-select">{LABELS.level}</label>
        <div className="select">
          <select
            id="level-select"
            value={level}
            onChange={(e) => onLevel(e.target.value as LevelFilter)}
          >
            <option value="all">{LABELS.allLevels}</option>
            {(Object.keys(LABELS.levels) as CourseLevel[]).map((l) => (
              <option key={l} value={l}>
                {LABELS.levels[l]}
              </option>
            ))}
          </select>
          <ChevronDown size={16} />
        </div>
      </div>
    </aside>
  )
}
