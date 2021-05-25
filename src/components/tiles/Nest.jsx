import React, { memo } from 'react'
import { Polygon, Marker, Popup } from 'react-leaflet'

import { useStatic } from '@hooks/useStore'
import Utility from '@services/Utility'
import nestMarker from '../markers/nest'
import PopupContent from '../popups/Nest'

const NestTile = ({
  item, filters, iconSizes, path, availableForms,
}) => {
  const { pokemon } = useStatic(state => state.masterfile)
  const iconUrl = `${path}/${Utility.getPokemonIcon(availableForms, item.pokemon_id, item.pokemon_form)}.png`
  const parsedJson = JSON.parse(item.polygon_path)

  return (
    <>
      {filters.pokemon && (
        <Marker
          position={[item.lat, item.lon]}
          icon={nestMarker(iconUrl, pokemon[item.pokemon_id], filters.filter, iconSizes)}
        >
          <Popup position={[item.lat, item.lon]}>
            <PopupContent
              nest={item}
              iconUrl={iconUrl}
              pokemon={pokemon[item.pokemon_id]}
            />
          </Popup>
        </Marker>
      )}
      {parsedJson && filters.polygons && parsedJson.map(polygon => (
        <Polygon positions={polygon} key={polygon} />
      ))}
    </>
  )
}

const areEqual = (prev, next) => (
  prev.item.nest_id === next.item.nest_id
  && prev.item.updated === next.item.updated
  && prev.filters.pokemon === next.filters.pokemon
  && prev.filters.polygons === next.filters.polygons
)

export default memo(NestTile, areEqual)
