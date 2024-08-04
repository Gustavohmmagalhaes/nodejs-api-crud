export function buildRoutePath(path){
    const routeParametersRegex = /:([a-zA-Z]+)/g
    const pathwithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)' )
    
    const pathRegex = new RegExp(`^${pathwithParams}(?<query>\\?(.*))?$`)

    return pathRegex
}