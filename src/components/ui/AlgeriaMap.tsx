import algeriaMap from '../../assets/Right_Stylized_Algeria_Faculties_Map.svg'

/** Carte statique de l'Algérie (asset Figma). */
export default function AlgeriaMap() {
  return (
    <img
      className="algeria-map"
      src={algeriaMap}
      alt="Carte de l'Algérie avec les facultés couvertes par EliteMed"
    />
  )
}