export interface HandlerReq<Input, Output> {
  (props: Input): Promise<Output>
}
