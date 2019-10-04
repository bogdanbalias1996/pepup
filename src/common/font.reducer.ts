import { IAction } from '../coreTypes'

export class FontState {
  isFontLoaded: boolean

  constructor() {
    this.isFontLoaded = false
  }
}

export const initialState = new FontState()

export const FontReducer = (state: FontState = initialState, action: IAction<any>): FontState => {
  switch (action.type) {
    case 'FONT_LOADED':
      return {
        ...state,
        isFontLoaded: true
      }
    default:
      return state
  }
}
