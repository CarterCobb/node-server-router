type OptionalKeys<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? K : never }[keyof T];
type Defaults<T> = Required<Pick<T, OptionalKeys<T>>>;
export default Defaults;
