export interface DispatchPayload<T> {
    actionType:string;
    actionPayload:T;
}