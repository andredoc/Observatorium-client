/*import ImageWMS from 'ol/source/ImageWMS'*/
import TileWMS from 'ol/source/TileWMS'

function wms({url, tileGrid}){
    return new TileWMS({url, tileGrid})
}

export default wms
