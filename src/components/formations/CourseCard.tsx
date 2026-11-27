import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { LABELS, type Course, type FacultyKey } from '../../data/formations'
import { ArrowRight, Star } from '../ui/Icons'

interface Props {
  course: Course
  faculty: FacultyKey
  /** position dans la liste (décale l'animation d'entrée) */
  index: number
}

export default function CourseCard({ course, faculty, index }: Props) {
  const { featured } = course

  return (
    <article
      className={`course ${featured ? 'course--featured' : ''}`}
      style={{ '--i': index } as CSSProperties}
    >
      <span className={`pill ${featured ? 'pill--dark' : ''}`}>
        {featured && <Star size={12} className="pill__star" />}
        {course.yearLabel}
      </span>

      <h3>{course.title}</h3>
      <p>{course.text}</p>

      <div className="course__tags">
        {course.highlight && <span className="tag tag--highlight">{course.highlight}</span>}
        {course.tags.map((t) => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>

      <div className="course__footer">
        <Link to={`/${faculty}/${course.id}`} className="module__link">
          {featured ? LABELS.openProgram : LABELS.openCourse} <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  )
}
