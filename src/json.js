// @flow

export type JSONData = | string | number | boolean | null | JSONObject | JSONArray
export type JSONObject = { [key:string]: JSONData }
export type JSONArray = Array<JSONData>
