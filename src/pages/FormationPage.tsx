import { useEffect, useMemo, useState } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import CourseCard from '../components/formations/CourseCard'
import FilterSidebar, {
  type LevelFilter,
  type YearFilter,
} from '../components/formations/FilterSidebar'
import { Search } from '../components/ui/Icons'
import { FACULTIES, LABELS, type FacultyKey } from '../data/formations'
import '../styles/home.css'
import '../styles/formations.css'

const PAGE_SIZE = 6

/** minuscules + sans accents, pour une recherche tolérante */
const normalize = (s: string) =>
  s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

export default function FormationPage({ faculty }: { faculty: FacultyKey }) {
  const data = FACULTIES[faculty]

  const [query, setQuery] = useState('')
  const [year, setYear] = useState<YearFilter>('all')
  const [level, setLevel] = useState<LevelFilter>('all')
  const [page, setPage] = useState(1)

  useEffect(() => {
    document.title = `${data.name} — EliteMed`
  }, [data.name])

  const filtered = useMemo(() => {
    const q = normalize(query.trim())
    return data.courses.filter((c) => {
      if (year !== 'all' && !c.years.includes(year)) return false
      if (level !== 'all' && c.level !== level) return false
      if (!q) return true
      const haystack = normalize([c.title, c.text, c.yearLabel, c.highlight ?? '', ...c.tags].join(' '))
      return haystack.includes(q)
    })
  }, [data.courses, query, year, level])

  const total = filtered.length
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const current = Math.min(page, pageCount)
  const start = (current - 1) * PAGE_SIZE
  const visible = filtered.slice(start, start + PAGE_SIZE)

  // Chaque changement de filtre repart de la page 1
  const withReset = <T,>(setter: (v: T) => void) => (v: T) => {
    setter(v)
    setPage(1)
  }

  return (
    <>
      <Navbar />
      <main className="catalog">
        <h1 className="sr-only">{data.name} — modules et cours</h1>

        <div className="container catalog__layout">
          <FilterSidebar
            yearCount={data.yearCount}
            year={year}
            level={level}
            onYear={withReset(setYear)}
            onLevel={withReset(setLevel)}
          />

          <section className="catalog__main">
            <div className="search">
              <Search size={16} />
              <input
                type="search"
                value={query}
                placeholder={data.searchPlaceholder}
                aria-label={data.searchPlaceholder}
                onChange={(e) => withReset(setQuery)(e.target.value)}
              />
            </div>

            <div className="catalog__meta" aria-live="polite">
              <span>
                Showing {total === 0 ? 0 : start + 1}-{Math.min(start + PAGE_SIZE, total)} of{' '}
                {total} courses
              </span>
              <span>
                Page {current} of {pageCount}
              </span>
            </div>

            {total === 0 ? (
              <p className="catalog__empty">{LABELS.empty}</p>
            ) : (
              <div className="catalog__grid">
                {visible.map((course, i) => (
                  <CourseCard key={course.id} course={course} faculty={faculty} index={i} />
                ))}
              </div>
            )}

            {pageCount > 1 && (
              <nav className="pager" aria-label="Pagination">
                <button type="button" disabled={current === 1} onClick={() => setPage(current - 1)}>
                  ← Précédent
                </button>
                <button
                  type="button"
                  disabled={current === pageCount}
                  onClick={() => setPage(current + 1)}
                >
                  Suivant →
                </button>
              </nav>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
