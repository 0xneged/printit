import { JSXInternal } from 'preact/src/jsx'

type OnClick = { onClick?: () => void }

export type OnClickEvent<T extends Element> = JSXInternal.MouseEventHandler<T>

export default OnClick
