import WMTS from 'ol/source/WMTS'
function wmts({url, layer, format, matrixSet, tileGrid}){
    return new WMTS({url, layer, format, matrixSet, tileGrid})
}

export default wmts