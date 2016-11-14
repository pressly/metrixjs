// @flow

declare module 'goog' {
  declare module.exports: {
    provide(name: string): void
  }
}

declare module 'exports?proto!imports?goog=>{provide:function(){}},proto=>{events:{}}!./proto.js' {
  declare module.exports: any
}
